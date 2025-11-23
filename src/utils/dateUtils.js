import { format, parseISO, isToday, isTomorrow, isThisWeek } from "date-fns";

// Format date for display
export function formatDate(date, formatStr = "MMM d, yyyy") {
  if (!date) return "";
  const dateObj = typeof date === "string" ? parseISO(date) : date;
  return format(dateObj, formatStr);
}

// Get relative date string (Today, Tomorrow, or date)
export function getRelativeDateString(date) {
  if (!date) return "";

  const dateObj = typeof date === "string" ? parseISO(date) : date;

  if (isToday(dateObj)) {
    return "Today";
  }
  if (isTomorrow(dateObj)) {
    return "Tomorrow";
  }
  if (isThisWeek(dateObj)) {
    return format(dateObj, "EEEE");
  }

  return format(dateObj, "MMM d");
}

// Get calendar grid data for a month
export function getCalendarDays(year, month) {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startingDayOfWeek = firstDay.getDay();
  const daysInMonth = lastDay.getDate();

  const days = [];

  // Add empty cells for days before month starts
  for (let i = 0; i < startingDayOfWeek; i++) {
    days.push(null);
  }

  // Add all days in month
  for (let day = 1; day <= daysInMonth; day++) {
    days.push(new Date(year, month, day));
  }

  return days;
}

// Check if date has tasks
export function dateHasTasks(date, tasks) {
  if (!date) return false;

  const dateStr = format(date, "yyyy-MM-dd");
  return tasks.some((task) => {
    if (!task.dueDate) return false;
    return task.dueDate === dateStr;
  });
}
