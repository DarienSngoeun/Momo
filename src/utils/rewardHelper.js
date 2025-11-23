// Calculate coin rewards based on task priority
export function calculateReward(priority) {
  const rewards = {
    low: 10,
    medium: 20,
    high: 30,
  };

  return rewards[priority] || 10;
}

// Get reward message for completion
export function getRewardMessage(coins) {
  return `Great job! +${coins} coins`;
}

