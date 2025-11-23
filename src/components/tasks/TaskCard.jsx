import { CheckCircle, Clock, Trash2, AlertCircle } from "lucide-react";
import { Button } from "../ui/Button";
import { getRelativeDateString } from "../../utils/dateUtils";
import { parseISO, isBefore } from "date-fns";

// Format time from 24-hour to 12-hour format
const formatTime = (time24) => {
  if (!time24) return "";
  const [hours, minutes] = time24.split(":");
  const hour = parseInt(hours, 10);
  const ampm = hour >= 12 ? "PM" : "AM";
  const hour12 = hour % 12 || 12;
  return `${hour12}:${minutes} ${ampm}`;
};

const priorityColors = {
  low: "bg-priority-low",
  medium: "bg-priority-medium",
  high: "bg-priority-high",
};

const priorityLabels = {
  low: "Low",
  medium: "Medium",
  high: "High",
};

export function TaskCard({ task, onComplete, onDelete }) {
  // Check if task is overdue
  const isOverdue =
    task.status === "open" &&
    task.dueDate &&
    task.dueTime &&
    isBefore(parseISO(`${task.dueDate}T${task.dueTime}`), new Date());

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm card-hover relative">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          {/* Priority and Overdue badges */}
          <div className="flex items-center gap-2 mb-2">
            <span
              className={`
                inline-block px-2 py-1 rounded text-xs font-medium text-white
                ${priorityColors[task.priority]}
              `}
            >
              {priorityLabels[task.priority]}
            </span>
            {isOverdue && (
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium text-white bg-red-500">
                <AlertCircle size={12} />
                OVERDUE
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="text-base font-semibold text-gray-900 mb-1">
            {task.title}
          </h3>

          {/* Description */}
          {task.description && (
            <p className="text-sm text-gray-600 text-truncate-2 mb-2">
              {task.description}
            </p>
          )}

          {/* Due date and time */}
          {(task.dueDate || task.dueTime) && (
            <div className="flex items-center gap-2 text-xs text-gray-500">
              {task.dueDate && (
                <span>Due: {getRelativeDateString(task.dueDate)}</span>
              )}
              {task.dueTime && (
                <span className="flex items-center gap-1">
                  <Clock size={12} />
                  {formatTime(task.dueTime)}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Complete button (only for open tasks) */}
        {task.status === "open" && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onComplete(task.id)}
            className="flex items-center gap-1 shrink-0"
          >
            <CheckCircle size={16} />
            <span className="hidden sm:inline">Complete</span>
          </Button>
        )}
      </div>

      {/* Remove button - bottom right corner */}
      <button
        onClick={() => onDelete(task.id)}
        className="absolute bottom-2 right-2 text-gray-400 hover:text-red-500 transition-colors p-1"
        aria-label="Remove task"
      >
        <Trash2 size={14} />
      </button>
    </div>
  );
}
