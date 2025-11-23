import { create } from "zustand";
import { persist } from "./middleware";
import { seedUser } from "../data/sampleData";
import { differenceInDays, parseISO } from "date-fns";

const initialState = {
  username: seedUser.username,
  coins: seedUser.coins,
  streak: seedUser.streak,
  totalTasksCompleted: seedUser.totalTasksCompleted,
  memberSince: seedUser.memberSince,
};

export const useUserStore = create(
  persist(
    (set, get) => ({
      ...initialState,

      addCoins: (amount) => {
        set((state) => ({
          coins: state.coins + amount,
        }));
      },

      deductCoins: (amount) => {
        set((state) => ({
          coins: Math.max(0, state.coins - amount),
        }));
        return get().coins >= amount;
      },

      updateStreak: () => {
        const { streak } = get();
        const today = new Date().toISOString().split("T")[0];
        const lastActive = streak.lastActiveDate;

        // If already updated today, do nothing
        if (lastActive === today) {
          return;
        }

        const lastActiveDate = parseISO(lastActive);
        const daysDiff = differenceInDays(new Date(today), lastActiveDate);

        // Forgiving streak: if completed today or yesterday, increment
        if (daysDiff <= 1) {
          set((state) => ({
            streak: {
              current: state.streak.current + 1,
              longest: Math.max(state.streak.current + 1, state.streak.longest),
              lastActiveDate: today,
            },
          }));
        } else {
          // Streak broken, but don't reset longest
          set(() => ({
            streak: {
              current: 1,
              longest: streak.longest,
              lastActiveDate: today,
            },
          }));
        }
      },

      breakStreak: () => {
        const { streak } = get();
        // Reset current streak to 0 when a task is missed
        set(() => ({
          streak: {
            current: 0,
            longest: streak.longest,
            lastActiveDate: streak.lastActiveDate,
          },
        }));
      },

      setUsername: (newUsername) => {
        set(() => ({
          username: newUsername,
        }));
      },

      incrementTasksCompleted: () => {
        set((state) => ({
          totalTasksCompleted: state.totalTasksCompleted + 1,
        }));
      },

      getStreak: () => get().streak,
      getCoins: () => get().coins,
      getUsername: () => get().username,
      getTotalTasksCompleted: () => get().totalTasksCompleted,
      getMemberSince: () => get().memberSince,
    }),
    {
      name: "momo-user",
    }
  )
);
