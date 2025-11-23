import { create } from "zustand";
import { persist } from "./middleware";
import { seedTasks } from "../data/sampleData";
import {
  startOfToday,
  startOfWeek,
  endOfWeek,
  isWithinInterval,
  parseISO,
} from "date-fns";

const initialState = {
  tasks: seedTasks,
};

export const useTaskStore = create(
  persist(
    (set, get) => ({
      ...initialState,

      addTask: (taskData) => {
        const newTask = {
          id: Date.now().toString(),
          title: taskData.title,
          description: taskData.description || "",
          priority: taskData.priority || "low",
          timeframe: taskData.timeframe || "today",
          dueDate: taskData.dueDate || null,
          dueTime: taskData.dueTime || null,
          status: "open",
          createdAt: new Date().toISOString(),
        };

        set((state) => ({
          tasks: [...state.tasks, newTask],
        }));

        return newTask;
      },

      completeTask: (id) => {
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id
              ? {
                  ...task,
                  status: "done",
                  completedAt: new Date().toISOString(),
                }
              : task
          ),
        }));

        // Return the completed task for reward calculation
        return get().tasks.find((task) => task.id === id);
      },

      deleteTask: (id) => {
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        }));
      },

      clearCompletedTasks: () => {
        set((state) => ({
          tasks: state.tasks.filter((task) => task.status !== "done"),
        }));
      },

      getTodayTasks: () => {
        const today = startOfToday();
        return get().tasks.filter((task) => {
          if (task.status === "done") return false;
          if (task.timeframe === "today") return true;
          if (task.dueDate) {
            const dueDate = parseISO(task.dueDate);
            return dueDate.toDateString() === today.toDateString();
          }
          return false;
        });
      },

      getThisWeekTasks: () => {
        const weekStart = startOfWeek(new Date());
        const weekEnd = endOfWeek(new Date());

        return get().tasks.filter((task) => {
          if (task.status === "done") return false;
          if (task.timeframe === "today" || task.timeframe === "week")
            return true;
          if (task.dueDate) {
            const dueDate = parseISO(task.dueDate);
            return isWithinInterval(dueDate, {
              start: weekStart,
              end: weekEnd,
            });
          }
          return false;
        });
      },

      getOpenTasks: () => {
        return get().tasks.filter((task) => task.status === "open");
      },

      getTasksSortedByPriority: () => {
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        return [...get().tasks]
          .filter((task) => task.status === "open")
          .sort(
            (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
          );
      },
    }),
    {
      name: "momo-tasks",
    }
  )
);
