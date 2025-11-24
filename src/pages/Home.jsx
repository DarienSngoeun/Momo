import { useMemo } from "react";
import { Link } from "react-router-dom";
import { Plus, ArrowRight, ShoppingCart, AlertCircle } from "lucide-react";
import {
  startOfToday,
  parseISO,
  isBefore,
  startOfDay,
  isToday,
} from "date-fns";
import { Container } from "../components/layout/Container";
import { ThemedPetDisplay } from "../components/pet/ThemedPetDisplay";
import { CoinsBadge } from "../components/progress/CoinsBadge";
import { StreakBadge } from "../components/progress/StreakBadge";
import { WeeklyProgress } from "../components/progress/WeeklyProgress";
import { Button } from "../components/ui/Button";
import { useTaskStore } from "../store/useTaskStore";
import { usePetStore } from "../store/usePetStore";

function Home() {
  const tasks = useTaskStore((state) => state.tasks);
  const activePetId = usePetStore((state) => state.activePetId);
  const activeIdleKey = usePetStore((state) => state.activeIdleKey);

  // Calculate today's tasks inline (includes overdue tasks)
  const todayTasks = useMemo(() => {
    const today = startOfToday();
    return tasks.filter((task) => {
      if (task.status === "done") return false;
      if (task.timeframe === "today") return true;
      if (task.dueDate) {
        const dueDate = startOfDay(parseISO(task.dueDate));
        // Show tasks due today or overdue (before today)
        return isToday(dueDate) || isBefore(dueDate, today);
      }
      return false;
    });
  }, [tasks]);

  return (
    <Container className="pt-12 pb-6">
      {/* Header with badges */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome back!</h1>
          <p className="text-sm text-gray-600 mt-1">
            Let's get things done today
          </p>
        </div>
        <Link
          to="/shop"
          className="p-3 rounded-xl bg-accent-warm text-white hover:bg-accent-cozy transition-colors shadow-sm"
          aria-label="Shop"
        >
          <ShoppingCart size={24} />
        </Link>
      </div>

      {/* Stats badges */}
      <div className="flex gap-3 mb-6">
        <CoinsBadge />
        <StreakBadge showLongest />
      </div>

      {/* Pet Display with Theme */}
      <ThemedPetDisplay
        petId={activePetId}
        animationKey={activeIdleKey}
        size="xl"
        className="mb-6 shadow-lg"
      />

      {/* Weekly Progress */}
      <WeeklyProgress className="mb-6" />

      {/* Today's Tasks */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Today's Tasks
            <span className="ml-2 text-sm font-normal text-gray-600">
              ({todayTasks.length})
            </span>
          </h2>
          <Link
            to="/tasks"
            className="text-sm text-accent-warm hover:text-accent-cozy font-medium flex items-center gap-1"
          >
            View all
            <ArrowRight size={16} />
          </Link>
        </div>

        {todayTasks.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
            <p className="text-gray-500 mb-4">
              No tasks for today. You're all set!
            </p>
            <Link to="/tasks">
              <Button
                variant="primary"
                size="sm"
                className="flex items-center gap-2 mx-auto"
              >
                <Plus size={18} />
                Add a Task
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-2">
            {todayTasks.slice(0, 3).map((task) => {
              // Check if task is overdue
              const isOverdue =
                task.status === "open" &&
                task.dueDate &&
                task.dueTime &&
                isBefore(
                  parseISO(`${task.dueDate}T${task.dueTime}`),
                  new Date()
                );

              return (
                <Link
                  key={task.id}
                  to="/tasks"
                  className="block bg-white rounded-lg border border-gray-200 p-3 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className={`
                            px-2 py-1 rounded text-xs font-medium text-white shrink-0
                            ${
                              task.priority === "high" ? "bg-priority-high" : ""
                            }
                            ${
                              task.priority === "medium"
                                ? "bg-priority-medium"
                                : ""
                            }
                            ${task.priority === "low" ? "bg-priority-low" : ""}
                          `}
                        >
                          {task.priority}
                        </span>
                        {isOverdue && (
                          <span className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium text-white bg-red-500 shrink-0">
                            <AlertCircle size={12} />
                            OVERDUE
                          </span>
                        )}
                      </div>
                      <h3 className="font-medium text-gray-900">
                        {task.title}
                      </h3>
                      {task.description && (
                        <p className="text-sm text-gray-600 mt-1 text-truncate-2">
                          {task.description}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
            {todayTasks.length > 3 && (
              <Link
                to="/tasks"
                className="block text-center py-3 text-sm text-accent-warm hover:text-accent-cozy font-medium"
              >
                View {todayTasks.length - 3} more tasks
              </Link>
            )}
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3">
        <Link to="/tasks">
          <Button
            variant="primary"
            className="w-full flex items-center justify-center gap-2"
          >
            <Plus size={18} />
            Add Task
          </Button>
        </Link>
        <Link to="/shop">
          <Button variant="secondary" className="w-full">
            Visit Shop
          </Button>
        </Link>
      </div>
    </Container>
  );
}

export default Home;
