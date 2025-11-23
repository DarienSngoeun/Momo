import { ProgressBar } from '../ui/ProgressBar';
import { useTaskStore } from '../../store/useTaskStore';
import { startOfWeek, endOfWeek } from 'date-fns';

export function WeeklyProgress({ className = '' }) {
  const tasks = useTaskStore((state) => state.tasks);

  const weekStart = startOfWeek(new Date());
  const weekEnd = endOfWeek(new Date());

  const weekTasks = tasks.filter((task) => {
    const createdAt = new Date(task.createdAt);
    return createdAt >= weekStart && createdAt <= weekEnd;
  });

  const completedThisWeek = weekTasks.filter((task) => task.status === 'done').length;
  const totalThisWeek = weekTasks.length;

  return (
    <div className={className}>
      <ProgressBar
        current={completedThisWeek}
        total={totalThisWeek}
        label="This Week"
      />
    </div>
  );
}

