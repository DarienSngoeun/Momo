import { useState } from 'react';
import { ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { getCalendarDays, dateHasTasks, getRelativeDateString } from '../../utils/dateUtils';
import { useTaskStore } from '../../store/useTaskStore';

// Format time from 24-hour to 12-hour format
const formatTime = (time24) => {
  if (!time24) return '';
  const [hours, minutes] = time24.split(':');
  const hour = parseInt(hours, 10);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const hour12 = hour % 12 || 12;
  return `${hour12}:${minutes} ${ampm}`;
};

const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export function CalendarView() {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  
  const tasks = useTaskStore((state) => state.tasks);

  const days = getCalendarDays(currentYear, currentMonth);
  const monthName = format(new Date(currentYear, currentMonth), 'MMMM yyyy');

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const upcomingTasks = tasks
    .filter((task) => task.status === 'open' && task.dueDate)
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
    .slice(0, 7);

  return (
    <div>
      {/* Month Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={handlePrevMonth}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors touch-target"
          aria-label="Previous month"
        >
          <ChevronLeft size={20} />
        </button>
        <h2 className="text-lg font-semibold text-gray-900">{monthName}</h2>
        <button
          onClick={handleNextMonth}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors touch-target"
          aria-label="Next month"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="bg-white rounded-lg border border-gray-200 p-3 mb-6">
        {/* Day headers */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {DAYS_OF_WEEK.map((day) => (
            <div
              key={day}
              className="text-center text-xs font-medium text-gray-600 py-2"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar days */}
        <div className="grid grid-cols-7 gap-1">
          {days.map((date, index) => {
            if (!date) {
              return <div key={`empty-${index}`} className="aspect-square" />;
            }

            const isToday = date.toDateString() === new Date().toDateString();
            const hasTasks = dateHasTasks(date, tasks);

            return (
              <div
                key={date.toISOString()}
                className={`
                  aspect-square flex items-center justify-center rounded-lg text-sm
                  ${isToday ? 'bg-accent-warm text-white font-semibold' : ''}
                  ${!isToday && hasTasks ? 'bg-accent-soft bg-opacity-20 text-gray-900 font-medium' : ''}
                  ${!isToday && !hasTasks ? 'text-gray-700' : ''}
                `}
              >
                {date.getDate()}
              </div>
            );
          })}
        </div>
      </div>

      {/* Upcoming Tasks */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Upcoming Tasks</h3>
        {upcomingTasks.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No upcoming tasks</p>
        ) : (
          <div className="space-y-2">
            {upcomingTasks.map((task) => (
              <div
                key={task.id}
                className="bg-white rounded-lg border border-gray-200 p-3"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-900 truncate">{task.title}</h4>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                      <span>{getRelativeDateString(task.dueDate)}</span>
                      {task.dueTime && (
                        <span className="flex items-center gap-1 text-xs">
                          <Clock size={12} />
                          {formatTime(task.dueTime)}
                        </span>
                      )}
                    </div>
                  </div>
                  <span
                    className={`
                      ml-2 px-2 py-1 rounded text-xs font-medium text-white shrink-0
                      ${task.priority === 'high' ? 'bg-priority-high' : ''}
                      ${task.priority === 'medium' ? 'bg-priority-medium' : ''}
                      ${task.priority === 'low' ? 'bg-priority-low' : ''}
                    `}
                  >
                    {task.priority}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

