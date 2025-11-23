// Theme registry for background themes
export const themeRegistry = {
  // Beach Themes
  'beach-1': {
    id: 'beach-1',
    name: 'Sunny Beach',
    category: 'Beach',
    background: '/themes/beach-2d-game-backgrounds/PNG/game_background_1/game_background_1.png',
    preview: '/themes/beach-2d-game-backgrounds/PNG/game_background_1/game_background_1.png',
    price: 0,
    owned: true, // Default theme
  },
  'beach-2': {
    id: 'beach-2',
    name: 'Island Paradise',
    category: 'Beach',
    background: '/themes/beach-2d-game-backgrounds/PNG/game_background_2/game_background_2.png',
    preview: '/themes/beach-2d-game-backgrounds/PNG/game_background_2/game_background_2.png',
    price: 150,
    owned: false,
  },
  'beach-3': {
    id: 'beach-3',
    name: 'Coastal View',
    category: 'Beach',
    background: '/themes/beach-2d-game-backgrounds/PNG/game_background_3/game_background_3.png',
    preview: '/themes/beach-2d-game-backgrounds/PNG/game_background_3/game_background_3.png',
    price: 150,
    owned: false,
  },
  'beach-4': {
    id: 'beach-4',
    name: 'Sunset Beach',
    category: 'Beach',
    background: '/themes/beach-2d-game-backgrounds/PNG/game_background_4/game_background_4.png',
    preview: '/themes/beach-2d-game-backgrounds/PNG/game_background_4/game_background_4.png',
    price: 180,
    owned: false,
  },

  // Cartoon Themes
  'cartoon-1': {
    id: 'cartoon-1',
    name: 'Candy Land',
    category: 'Fantasy',
    background: '/themes/cartoon-parallax-2d-backgrounds/PNG/platformer_background_1/platformer_background_1.png',
    preview: '/themes/cartoon-parallax-2d-backgrounds/PNG/platformer_background_1/platformer_background_1.png',
    price: 200,
    owned: false,
  },
  'cartoon-2': {
    id: 'cartoon-2',
    name: 'Starry Castle',
    category: 'Fantasy',
    background: '/themes/cartoon-parallax-2d-backgrounds/PNG/platformer_background_2/platformer_background_2.png',
    preview: '/themes/cartoon-parallax-2d-backgrounds/PNG/platformer_background_2/platformer_background_2.png',
    price: 220,
    owned: false,
  },
  'cartoon-3': {
    id: 'cartoon-3',
    name: 'Green Valley',
    category: 'Fantasy',
    background: '/themes/cartoon-parallax-2d-backgrounds/PNG/platformer_background_3/platformer_background_3.png',
    preview: '/themes/cartoon-parallax-2d-backgrounds/PNG/platformer_background_3/platformer_background_3.png',
    price: 200,
    owned: false,
  },
  'cartoon-4': {
    id: 'cartoon-4',
    name: 'Forest Kingdom',
    category: 'Fantasy',
    background: '/themes/cartoon-parallax-2d-backgrounds/PNG/platformer_background_4/platformer_background_4.png',
    preview: '/themes/cartoon-parallax-2d-backgrounds/PNG/platformer_background_4/platformer_background_4.png',
    price: 220,
    owned: false,
  },

  // Halloween Themes
  'halloween-1': {
    id: 'halloween-1',
    name: 'Spooky Night',
    category: 'Halloween',
    background: '/themes/halloween-2d-game-backgrounds/PNG/1_game_background/1_game_background.png',
    preview: '/themes/halloween-2d-game-backgrounds/PNG/1_game_background/1_game_background.png',
    price: 250,
    owned: false,
  },
  'halloween-2': {
    id: 'halloween-2',
    name: 'Haunted Forest',
    category: 'Halloween',
    background: '/themes/halloween-2d-game-backgrounds/PNG/2_game_background/2_game_background.png',
    preview: '/themes/halloween-2d-game-backgrounds/PNG/2_game_background/2_game_background.png',
    price: 250,
    owned: false,
  },
  'halloween-3': {
    id: 'halloween-3',
    name: 'Creepy Manor',
    category: 'Halloween',
    background: '/themes/halloween-2d-game-backgrounds/PNG/3_game_background/3_game_background.png',
    preview: '/themes/halloween-2d-game-backgrounds/PNG/3_game_background/3_game_background.png',
    price: 280,
    owned: false,
  },
  'halloween-4': {
    id: 'halloween-4',
    name: 'Moonlit Graveyard',
    category: 'Halloween',
    background: '/themes/halloween-2d-game-backgrounds/PNG/4_game_background/4_game_background.png',
    preview: '/themes/halloween-2d-game-backgrounds/PNG/4_game_background/4_game_background.png',
    price: 280,
    owned: false,
  },

  // Winter Holiday Themes
  'winter-1': {
    id: 'winter-1',
    name: 'Snowy Village',
    category: 'Winter',
    background: '/themes/winter-holiday-game-backgrounds/PNG/BG_01/BG_01.png',
    preview: '/themes/winter-holiday-game-backgrounds/PNG/BG_01/BG_01.png',
    price: 200,
    owned: false,
  },
  'winter-2': {
    id: 'winter-2',
    name: 'Winter Wonderland',
    category: 'Winter',
    background: '/themes/winter-holiday-game-backgrounds/PNG/BG_02/BG_02.png',
    preview: '/themes/winter-holiday-game-backgrounds/PNG/BG_02/BG_02.png',
    price: 200,
    owned: false,
  },
  'winter-3': {
    id: 'winter-3',
    name: 'Frozen Forest',
    category: 'Winter',
    background: '/themes/winter-holiday-game-backgrounds/PNG/BG_03/BG_03.png',
    preview: '/themes/winter-holiday-game-backgrounds/PNG/BG_03/BG_03.png',
    price: 220,
    owned: false,
  },
  'winter-4': {
    id: 'winter-4',
    name: 'Christmas Eve',
    category: 'Winter',
    background: '/themes/winter-holiday-game-backgrounds/PNG/BG_04/BG_04.png',
    preview: '/themes/winter-holiday-game-backgrounds/PNG/BG_04/BG_04.png',
    price: 250,
    owned: false,
  },
};

// Get theme by ID
export function getTheme(themeId) {
  return themeRegistry[themeId];
}

// Get all themes as array
export function getAllThemes() {
  return Object.values(themeRegistry);
}

// Get themes by category
export function getThemesByCategory(category) {
  return Object.values(themeRegistry).filter((theme) => theme.category === category);
}

// Get all categories
export function getThemeCategories() {
  const categories = new Set();
  Object.values(themeRegistry).forEach((theme) => categories.add(theme.category));
  return Array.from(categories);
}

