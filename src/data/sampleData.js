export const seedTasks = [];

export const seedUser = {
  username: "DemoUser",
  coins: 1000,
  streak: {
    current: 0,
    longest: 0,
    lastActiveDate: "2025-11-23",
  },
  totalTasksCompleted: 0,
  memberSince: "2025-11-23",
};

export const seedPets = {
  activePetId: "cat-01",
  activeIdleKey: "idle",
  ownedPets: ["cat-01", "bear-01"],
  ownedAnimations: ["idle", "walk", "roll"],
};

export const seedFriends = [
  {
    id: "1",
    username: "Sarah_K",
    activePet: "panda-01",
    streak: 8,
    totalTasks: 24,
    lastGoodLuckSent: null,
  },
  {
    id: "2",
    username: "Alex_M",
    activePet: "bear-01",
    streak: 3,
    totalTasks: 15,
    lastGoodLuckSent: null,
  },
];
