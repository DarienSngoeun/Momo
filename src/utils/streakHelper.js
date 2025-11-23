import { differenceInDays, parseISO } from 'date-fns';

// Check if streak should continue (forgiving - allows yesterday completion)
export function shouldContinueStreak(lastActiveDate) {
  const today = new Date();
  const lastActive = parseISO(lastActiveDate);
  const daysDiff = differenceInDays(today, lastActive);

  // 0 = today, 1 = yesterday are both acceptable
  return daysDiff <= 1;
}

// Calculate new streak based on last active date
export function calculateNewStreak(currentStreak, lastActiveDate) {
  const today = new Date().toISOString().split('T')[0];
  
  // Already updated today
  if (lastActiveDate === today) {
    return { current: currentStreak, shouldUpdate: false };
  }

  if (shouldContinueStreak(lastActiveDate)) {
    return { current: currentStreak + 1, shouldUpdate: true };
  }

  // Streak broken, start fresh
  return { current: 1, shouldUpdate: true };
}

