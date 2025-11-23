import { create } from "zustand";
import { persist } from "./middleware";
import { seedFriends } from "../data/sampleData";

const initialState = {
  friends: seedFriends,
};

export const useFriendsStore = create(
  persist(
    (set, get) => ({
      ...initialState,

      addFriend: (friend) => {
        set((state) => ({
          friends: [...state.friends, friend],
        }));
      },

      sendGoodLuck: (friendId) => {
        const now = new Date().toISOString();
        set((state) => ({
          friends: state.friends.map((friend) =>
            friend.id === friendId
              ? { ...friend, lastGoodLuckSent: now }
              : friend
          ),
        }));
      },

      canSendGoodLuck: (friendId) => {
        const friend = get().friends.find((f) => f.id === friendId);
        if (!friend || !friend.lastGoodLuckSent) return true;

        // Can only send good luck once per day
        const lastSent = new Date(friend.lastGoodLuckSent);
        const now = new Date();
        const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

        return lastSent < oneDayAgo;
      },

      getFriends: () => get().friends,
    }),
    {
      name: "momo-friends",
    }
  )
);

