import { useState, useMemo, useEffect, useRef } from "react";
import { Plus, Filter } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import {
  startOfToday,
  startOfWeek,
  endOfWeek,
  isWithinInterval,
  parseISO,
  isAfter,
  isBefore,
  differenceInDays,
} from "date-fns";
import { Container } from "../components/layout/Container";
import { TaskList } from "../components/tasks/TaskList";
import { CreateTaskModal } from "../components/tasks/CreateTaskModal";
import { Button } from "../components/ui/Button";
import { Toast, useToast } from "../components/ui/Toast";
import { ConfirmModal } from "../components/ui/ConfirmModal";
import { PetReaction } from "../components/pet/PetReaction";
import { useTaskStore } from "../store/useTaskStore";
import { useUserStore } from "../store/useUserStore";
import { usePetStore } from "../store/usePetStore";
import { calculateReward, getRewardMessage } from "../utils/rewardHelper";

function Tasks() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showReaction, setShowReaction] = useState(false);
  const [reactionType, setReactionType] = useState("happy");
  const [reactionMessage, setReactionMessage] = useState("");
  const [activeTab, setActiveTab] = useState("open"); // 'open' or 'completed'
  const [priorityFilter, setPriorityFilter] = useState("all"); // 'all', 'low', 'medium', 'high'
  const [timeframeFilter, setTimeframeFilter] = useState("all"); // 'all', 'today', 'week', 'upcoming'
  const [showFilters, setShowFilters] = useState(false);
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    action: null,
    taskId: null,
  });
  const hasShownOverdueWarning = useRef(false);
  const { toast, showToast } = useToast();

  const allTasks = useTaskStore((state) => state.tasks);
  const addTask = useTaskStore((state) => state.addTask);
  const completeTask = useTaskStore((state) => state.completeTask);
  const deleteTask = useTaskStore((state) => state.deleteTask);
  const clearCompletedTasks = useTaskStore(
    (state) => state.clearCompletedTasks
  );
  const addCoins = useUserStore((state) => state.addCoins);
  const updateStreak = useUserStore((state) => state.updateStreak);
  const breakStreak = useUserStore((state) => state.breakStreak);
  const incrementTasksCompleted = useUserStore(
    (state) => state.incrementTasksCompleted
  );
  const activePetId = usePetStore((state) => state.activePetId);

  // Filter and sort tasks
  const tasks = useMemo(() => {
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    const today = startOfToday();
    const weekStart = startOfWeek(new Date());
    const weekEnd = endOfWeek(new Date());

    return [...allTasks]
      .filter((task) => {
        // Tab filter (status)
        if (activeTab === "open" && task.status !== "open") return false;
        if (activeTab === "completed" && task.status !== "done") return false;

        // Remove completed tasks older than 3 days
        if (task.status === "done" && task.completedAt) {
          const completedDate = parseISO(task.completedAt);
          const daysSinceCompleted = differenceInDays(today, completedDate);
          if (daysSinceCompleted > 3) return false;
        }

        // Priority filter
        if (priorityFilter !== "all" && task.priority !== priorityFilter)
          return false;

        // Timeframe filter
        if (timeframeFilter !== "all" && task.dueDate) {
          const dueDate = parseISO(task.dueDate);

          if (timeframeFilter === "today") {
            if (dueDate.toDateString() !== today.toDateString()) return false;
          } else if (timeframeFilter === "week") {
            if (!isWithinInterval(dueDate, { start: weekStart, end: weekEnd }))
              return false;
          } else if (timeframeFilter === "upcoming") {
            if (!isAfter(dueDate, today)) return false;
          }
        }

        return true;
      })
      .sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
  }, [allTasks, activeTab, priorityFilter, timeframeFilter]);

  const handleAddTask = (taskData) => {
    addTask(taskData);
    showToast("Task added!", "info");
  };

  // Check for overdue tasks on mount only
  useEffect(() => {
    // Only check once per session
    if (hasShownOverdueWarning.current) return;

    const now = new Date();
    const overdueTasks = allTasks.filter((task) => {
      if (task.status !== "open" || !task.dueDate || !task.dueTime)
        return false;

      const dueDateTime = parseISO(`${task.dueDate}T${task.dueTime}`);
      return isBefore(dueDateTime, now);
    });

    // Show stunned reaction for the first overdue task found
    if (overdueTasks.length > 0) {
      const overdueTask = overdueTasks[0];
      // Break the streak when a task is missed
      breakStreak();
      setReactionType("stunned");
      setReactionMessage(`You missed task: ${overdueTask.title}`);
      setShowReaction(true);
      hasShownOverdueWarning.current = true;
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleCompleteTask = (taskId) => {
    const completedTask = completeTask(taskId);

    if (completedTask) {
      // Calculate and add coins
      const reward = calculateReward(completedTask.priority);
      addCoins(reward);

      // Update streak
      updateStreak();

      // Increment total tasks completed
      incrementTasksCompleted();

      // Show pet reaction with message
      setReactionType("happy");
      setReactionMessage(getRewardMessage(reward));
      setShowReaction(true);
    }
  };

  const handleReactionComplete = () => {
    setShowReaction(false);
    setReactionMessage("");
    setReactionType("happy");
  };

  const handleDeleteTask = (taskId) => {
    setConfirmModal({ isOpen: true, action: "delete", taskId });
  };

  const handleClearCompleted = () => {
    setConfirmModal({ isOpen: true, action: "clearAll", taskId: null });
  };

  const handleConfirmAction = () => {
    if (confirmModal.action === "delete") {
      deleteTask(confirmModal.taskId);
      showToast("Task removed!", "info");
    } else if (confirmModal.action === "clearAll") {
      clearCompletedTasks();
      showToast("Completed tasks cleared!", "info");
    }
  };

  return (
    <>
      <Container className="pt-12 pb-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Tasks</h1>
            <p className="text-sm text-gray-600 mt-1">
              {tasks.length} {tasks.length === 1 ? "task" : "tasks"}
            </p>
          </div>
          <Button
            variant="primary"
            size="sm"
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2"
          >
            <Plus size={16} />
            Add
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setActiveTab("open")}
            className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
              activeTab === "open"
                ? "bg-accent-warm text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Open
          </button>
          <button
            onClick={() => setActiveTab("completed")}
            className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
              activeTab === "completed"
                ? "bg-accent-warm text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Completed
          </button>
        </div>

        {/* Clear Completed Button (only show on completed tab) */}
        {activeTab === "completed" && tasks.length > 0 && (
          <button
            onClick={handleClearCompleted}
            className="w-full mb-4 py-2 px-4 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg font-medium transition-colors"
          >
            Clear All Completed Tasks
          </button>
        )}

        {/* Filter Toggle */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 mb-4 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors w-full"
        >
          <Filter size={16} />
          <span className="text-sm font-medium">Filters</span>
          {(priorityFilter !== "all" || timeframeFilter !== "all") && (
            <span className="ml-auto bg-accent-warm text-white text-xs px-2 py-1 rounded-full">
              Active
            </span>
          )}
        </button>

        {/* Filters */}
        {showFilters && (
          <div className="bg-white rounded-xl border border-gray-200 p-4 mb-4 space-y-4">
            {/* Priority Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Priority
              </label>
              <div className="grid grid-cols-4 gap-2">
                {["all", "low", "medium", "high"].map((priority) => (
                  <button
                    key={priority}
                    onClick={() => setPriorityFilter(priority)}
                    className={`py-2 px-3 rounded-lg text-sm font-medium capitalize transition-colors ${
                      priorityFilter === priority
                        ? "bg-accent-warm text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {priority}
                  </button>
                ))}
              </div>
            </div>

            {/* Timeframe Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Timeframe
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { value: "all", label: "All" },
                  { value: "today", label: "Today" },
                  { value: "week", label: "This Week" },
                  { value: "upcoming", label: "Upcoming" },
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setTimeframeFilter(option.value)}
                    className={`py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                      timeframeFilter === option.value
                        ? "bg-accent-warm text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Clear Filters */}
            {(priorityFilter !== "all" || timeframeFilter !== "all") && (
              <button
                onClick={() => {
                  setPriorityFilter("all");
                  setTimeframeFilter("all");
                }}
                className="w-full py-2 text-sm text-accent-warm hover:text-accent-cozy font-medium"
              >
                Clear All Filters
              </button>
            )}
          </div>
        )}

        {/* Task List */}
        <TaskList
          tasks={tasks}
          onComplete={handleCompleteTask}
          onDelete={handleDeleteTask}
          emptyMessage={
            activeTab === "open"
              ? "No open tasks. Add one to get started!"
              : "No completed tasks yet."
          }
        />

        {/* Floating Add Button (mobile) */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="fixed bottom-20 right-4 w-14 h-14 bg-accent-warm text-white rounded-full shadow-lg flex items-center justify-center hover:bg-accent-cozy transition-colors touch-target lg:hidden"
          aria-label="Add task"
        >
          <Plus size={24} />
        </button>
      </Container>

      {/* Create Task Modal */}
      <CreateTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddTask}
      />

      {/* Toast notifications */}
      <Toast {...toast} />

      {/* Pet Reaction */}
      <AnimatePresence>
        {showReaction && (
          <PetReaction
            type={reactionType}
            petId={activePetId}
            message={reactionMessage}
            onComplete={handleReactionComplete}
          />
        )}
      </AnimatePresence>

      {/* Confirm Modal */}
      <ConfirmModal
        isOpen={confirmModal.isOpen}
        onClose={() =>
          setConfirmModal({ isOpen: false, action: null, taskId: null })
        }
        onConfirm={handleConfirmAction}
        title="Confirm Removal"
        message={
          confirmModal.action === "delete"
            ? "Are you sure you want to remove this task?"
            : "Are you sure you want to clear all completed tasks?"
        }
      />
    </>
  );
}

export default Tasks;
