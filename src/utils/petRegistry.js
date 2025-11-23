// Species-specific frame counts
const speciesFrameCounts = {
  cat: {
    idle: 20,
    walk: 20,
    jump: 20,
    hit: 50,
    roll: 8,
    fly: 20,
    throwing: 40,
    dead: 45,
    stuned: 24,
  },
  raccoon: {
    idle: 20,
    walk: 20,
    jump: 20,
    hit: 50,
    roll: 8,
    fly: 20,
    throwing: 40,
    dead: 45,
    stuned: 24,
  },
  bear: {
    idle: 20,
    walk: 30,
    jump: 20,
    hit: 45,
    roll: 8,
    fly: 20,
    throwing: 35,
    dead: 50,
    stuned: 24,
  },
  bunny: {
    idle: 20,
    walk: 30,
    jump: 20,
    hit: 45,
    roll: 8,
    fly: 20,
    throwing: 35,
    dead: 50,
    stuned: 24,
  },
  koala: {
    idle: 20,
    walk: 30,
    jump: 20,
    hit: 45,
    roll: 8,
    fly: 20,
    throwing: 35,
    dead: 50,
    stuned: 24,
  },
  panda: {
    idle: 20,
    walk: 30,
    jump: 20,
    hit: 45,
    roll: 8,
    fly: 20,
    throwing: 35,
    dead: 40,
    stuned: 24,
  },
  penguin: {
    idle: 20,
    walk: 30,
    jump: 20,
    hit: 35,
    roll: 8,
    fly: 20,
    throwing: 35,
    dead: 45,
    confused: 24,
  },
  capybara: {
    idle: 20,
    walk: 20,
    jump: 20,
    hit: 40,
    roll: 8,
    fly: 20,
    throwing: 35,
    dead: 60,
    stuned: 24,
  },
  pig: {
    idle: 20,
    walk: 20,
    jump: 20,
    hit: 40,
    roll: 8,
    fly: 20,
    throwing: 35,
    dead: 60,
    stuned: 24,
  },
  beaver: {
    idle: 20,
    walk: 20,
    jump: 20,
    hit: 40,
    roll: 8,
    fly: 20,
    throwing: 35,
    dead: 60,
    stuned: 24,
  },
  redpanda: {
    idle: 20,
    walk: 20,
    jump: 20,
    hit: 40,
    roll: 8,
    fly: 20,
    throwing: 35,
    dead: 60,
    stuned: 24,
  },
  duckling: {
    idle: 20,
    walk: 20,
    jump: 20,
    hit: 40,
    roll: 8,
    fly: 20,
    throwing: 35,
    dead: 45,
    stuned: 24,
  },
};

// Generate frame paths for animations with species-specific counts
// Map species names to their asset folder names
const speciesAssetFolders = {
  cat: 'cute-cats-assets',
  raccoon: 'cute-raccoons-assets',
  bear: 'cute-bears-assets',
  bunny: 'cartoon-bunnies-assets',
  koala: 'cute-koalas-assets',
  panda: 'cute-pandas-assets',
  penguin: 'cartoon-penguins-assets',
  capybara: 'cartoon-capybaras-assets',
  pig: 'cute-pigs-assets',
  duckling: 'cute-ducklings-assets',
  beaver: 'funny-beavers-assets',
  redpanda: 'red-pandas-assets',
};

function generateFramePaths(species, character, animation, count) {
  const frames = [];
  // If count not provided, use species-specific count
  const frameCount =
    count !== undefined ? count : speciesFrameCounts[species][animation];

  // Get the asset folder name for this species
  const assetFolder = speciesAssetFolders[species];
  
  // Convert character01 -> Character01
  const characterNum = character.replace('character', '');
  const characterFolder = `Character${characterNum}`;
  
  // Convert animation name to Title Case (idle -> Idle, stuned -> Stuned, etc.)
  const animationFolder = animation.charAt(0).toUpperCase() + animation.slice(1);

  // Species that use lowercase "walk" in their file names (inconsistent asset naming)
  const lowercaseWalkSpecies = ['capybara', 'duckling', 'pig', 'beaver', 'redpanda'];
  
  // Determine the actual animation name in the file (most use Title Case, some use lowercase "walk")
  const animationInFileName = (animation === 'walk' && lowercaseWalkSpecies.includes(species)) 
    ? 'walk' 
    : animationFolder;

  // Penguins use "All Characters-" prefix, others use "Characters-"
  const filePrefix = species === 'penguin' ? 'All Characters' : 'Characters';

  for (let i = 0; i < frameCount; i++) {
    // Roll animation uses single-digit numbering without padding (0, 1, 2...)
    // All other animations use zero-padded numbering (00, 01, 02...)
    const frameNum =
      animation === "roll" ? String(i) : String(i).padStart(2, "0");
    frames.push(
      `/assets/${assetFolder}/Png/${characterFolder}/${animationFolder}/${filePrefix}-${characterFolder}-${animationInFileName}_${frameNum}.png`
    );
  }
  return frames;
}

// Pet registry with all available pets and ALL animations
export const petRegistry = {
  "cat-01": {
    id: "cat-01",
    name: "Classic Cat",
    species: "cat",
    character: "character01",
    thumbnail: "/assets/cute-cats-assets/Png/Character01/Idle/Characters-Character01-Idle_00.png",
    animations: {
      idle: {
        frames: generateFramePaths("cat", "character01", "idle", 20),
        fps: 12,
      },
      walk: {
        frames: generateFramePaths("cat", "character01", "walk", 20),
        fps: 12,
      },
      jump: {
        frames: generateFramePaths("cat", "character01", "jump", 20),
        fps: 14,
      },
      hit: {
        frames: generateFramePaths("cat", "character01", "hit", 50),
        fps: 14,
      },
      roll: {
        frames: generateFramePaths("cat", "character01", "roll", 8),
        fps: 10,
      },
      fly: {
        frames: generateFramePaths("cat", "character01", "fly", 20),
        fps: 12,
      },
      throwing: {
        frames: generateFramePaths("cat", "character01", "throwing", 40),
        fps: 14,
      },
      dead: {
        frames: generateFramePaths("cat", "character01", "dead", 45),
        fps: 14,
      },
      stuned: {
        frames: generateFramePaths("cat", "character01", "stuned"),
        fps: 14,
      },
    },
    price: 0,
    owned: true,
  },
  "cat-02": {
    id: "cat-02",
    name: "Cheerful Cat",
    species: "cat",
    character: "character02",
    thumbnail: "/assets/cute-cats-assets/Png/Character02/Idle/Characters-Character02-Idle_00.png",
    animations: {
      idle: {
        frames: generateFramePaths("cat", "character02", "idle", 20),
        fps: 12,
      },
      walk: {
        frames: generateFramePaths("cat", "character02", "walk", 20),
        fps: 12,
      },
      jump: {
        frames: generateFramePaths("cat", "character02", "jump", 20),
        fps: 14,
      },
      hit: {
        frames: generateFramePaths("cat", "character02", "hit", 50),
        fps: 14,
      },
      roll: {
        frames: generateFramePaths("cat", "character02", "roll", 8),
        fps: 10,
      },
      fly: {
        frames: generateFramePaths("cat", "character02", "fly", 20),
        fps: 12,
      },
      throwing: {
        frames: generateFramePaths("cat", "character02", "throwing", 40),
        fps: 14,
      },
      dead: {
        frames: generateFramePaths("cat", "character02", "dead", 45),
        fps: 14,
      },
      stuned: {
        frames: generateFramePaths("cat", "character02", "stuned"),
        fps: 14,
      },
    },
    price: 100,
    owned: false,
  },
  "cat-03": {
    id: "cat-03",
    name: "Sleepy Cat",
    species: "cat",
    character: "character03",
    thumbnail: "/assets/cute-cats-assets/Png/Character03/Idle/Characters-Character03-Idle_00.png",
    animations: {
      idle: {
        frames: generateFramePaths("cat", "character03", "idle", 20),
        fps: 12,
      },
      walk: {
        frames: generateFramePaths("cat", "character03", "walk", 20),
        fps: 12,
      },
      jump: {
        frames: generateFramePaths("cat", "character03", "jump", 20),
        fps: 14,
      },
      hit: {
        frames: generateFramePaths("cat", "character03", "hit", 50),
        fps: 14,
      },
      roll: {
        frames: generateFramePaths("cat", "character03", "roll", 8),
        fps: 10,
      },
      fly: {
        frames: generateFramePaths("cat", "character03", "fly", 20),
        fps: 12,
      },
      throwing: {
        frames: generateFramePaths("cat", "character03", "throwing", 40),
        fps: 14,
      },
      dead: {
        frames: generateFramePaths("cat", "character03", "dead", 45),
        fps: 14,
      },
      stuned: {
        frames: generateFramePaths("cat", "character03", "stuned"),
        fps: 14,
      },
    },
    price: 200,
    owned: false,
  },
  "bear-01": {
    id: "bear-01",
    name: "Classic Bear",
    species: "bear",
    character: "character01",
    thumbnail: "/assets/cute-bears-assets/Png/Character01/Idle/Characters-Character01-Idle_00.png",
    animations: {
      idle: {
        frames: generateFramePaths("bear", "character01", "idle", 20),
        fps: 12,
      },
      walk: {
        frames: generateFramePaths("bear", "character01", "walk", 30),
        fps: 12,
      },
      jump: {
        frames: generateFramePaths("bear", "character01", "jump", 20),
        fps: 14,
      },
      hit: {
        frames: generateFramePaths("bear", "character01", "hit", 45),
        fps: 14,
      },
      roll: {
        frames: generateFramePaths("bear", "character01", "roll", 8),
        fps: 10,
      },
      fly: {
        frames: generateFramePaths("bear", "character01", "fly", 20),
        fps: 12,
      },
      throwing: {
        frames: generateFramePaths("bear", "character01", "throwing", 35),
        fps: 14,
      },
      dead: {
        frames: generateFramePaths("bear", "character01", "dead", 50),
        fps: 14,
      },
      stuned: {
        frames: generateFramePaths("bear", "character01", "stuned"),
        fps: 14,
      },
    },
    price: 150,
    owned: false,
  },
  "bear-02": {
    id: "bear-02",
    name: "Cheerful Bear",
    species: "bear",
    character: "character02",
    thumbnail: "/assets/cute-bears-assets/Png/Character02/Idle/Characters-Character02-Idle_00.png",
    animations: {
      idle: {
        frames: generateFramePaths("bear", "character02", "idle", 20),
        fps: 12,
      },
      walk: {
        frames: generateFramePaths("bear", "character02", "walk", 30),
        fps: 12,
      },
      jump: {
        frames: generateFramePaths("bear", "character02", "jump", 20),
        fps: 14,
      },
      hit: {
        frames: generateFramePaths("bear", "character02", "hit", 45),
        fps: 14,
      },
      roll: {
        frames: generateFramePaths("bear", "character02", "roll", 8),
        fps: 10,
      },
      fly: {
        frames: generateFramePaths("bear", "character02", "fly", 20),
        fps: 12,
      },
      throwing: {
        frames: generateFramePaths("bear", "character02", "throwing", 35),
        fps: 14,
      },
      dead: {
        frames: generateFramePaths("bear", "character02", "dead", 50),
        fps: 14,
      },
      stuned: {
        frames: generateFramePaths("bear", "character02", "stuned"),
        fps: 14,
      },
    },
    price: 250,
    owned: false,
  },
  "bear-03": {
    id: "bear-03",
    name: "Sleepy Bear",
    species: "bear",
    character: "character03",
    thumbnail: "/assets/cute-bears-assets/Png/Character03/Idle/Characters-Character03-Idle_00.png",
    animations: {
      idle: {
        frames: generateFramePaths("bear", "character03", "idle", 20),
        fps: 12,
      },
      walk: {
        frames: generateFramePaths("bear", "character03", "walk", 30),
        fps: 12,
      },
      jump: {
        frames: generateFramePaths("bear", "character03", "jump", 20),
        fps: 14,
      },
      hit: {
        frames: generateFramePaths("bear", "character03", "hit", 45),
        fps: 14,
      },
      roll: {
        frames: generateFramePaths("bear", "character03", "roll", 8),
        fps: 10,
      },
      fly: {
        frames: generateFramePaths("bear", "character03", "fly", 20),
        fps: 12,
      },
      throwing: {
        frames: generateFramePaths("bear", "character03", "throwing", 35),
        fps: 14,
      },
      dead: {
        frames: generateFramePaths("bear", "character03", "dead", 50),
        fps: 14,
      },
      stuned: {
        frames: generateFramePaths("bear", "character03", "stuned"),
        fps: 14,
      },
    },
    price: 350,
    owned: false,
  },
  "panda-01": {
    id: "panda-01",
    name: "Classic Panda",
    species: "panda",
    character: "character01",
    thumbnail: "/assets/cute-pandas-assets/Png/Character01/Idle/Characters-Character01-Idle_00.png",
    animations: {
      idle: {
        frames: generateFramePaths("panda", "character01", "idle", 20),
        fps: 12,
      },
      walk: {
        frames: generateFramePaths("panda", "character01", "walk", 30),
        fps: 12,
      },
      jump: {
        frames: generateFramePaths("panda", "character01", "jump", 20),
        fps: 14,
      },
      hit: {
        frames: generateFramePaths("panda", "character01", "hit", 45),
        fps: 14,
      },
      roll: {
        frames: generateFramePaths("panda", "character01", "roll", 8),
        fps: 10,
      },
      fly: {
        frames: generateFramePaths("panda", "character01", "fly", 20),
        fps: 12,
      },
      throwing: {
        frames: generateFramePaths("panda", "character01", "throwing", 35),
        fps: 14,
      },
      dead: {
        frames: generateFramePaths("panda", "character01", "dead", 40),
        fps: 14,
      },
      stuned: {
        frames: generateFramePaths("panda", "character01", "stuned"),
        fps: 14,
      },
    },
    price: 200,
    owned: false,
  },
  "panda-02": {
    id: "panda-02",
    name: "Cheerful Panda",
    species: "panda",
    character: "character02",
    thumbnail: "/assets/cute-pandas-assets/Png/Character02/Idle/Characters-Character02-Idle_00.png",
    animations: {
      idle: {
        frames: generateFramePaths("panda", "character02", "idle", 20),
        fps: 12,
      },
      walk: {
        frames: generateFramePaths("panda", "character02", "walk", 30),
        fps: 12,
      },
      jump: {
        frames: generateFramePaths("panda", "character02", "jump", 20),
        fps: 14,
      },
      hit: {
        frames: generateFramePaths("panda", "character02", "hit", 45),
        fps: 14,
      },
      roll: {
        frames: generateFramePaths("panda", "character02", "roll", 8),
        fps: 10,
      },
      fly: {
        frames: generateFramePaths("panda", "character02", "fly", 20),
        fps: 12,
      },
      throwing: {
        frames: generateFramePaths("panda", "character02", "throwing", 35),
        fps: 14,
      },
      dead: {
        frames: generateFramePaths("panda", "character02", "dead", 40),
        fps: 14,
      },
      stuned: {
        frames: generateFramePaths("panda", "character02", "stuned"),
        fps: 14,
      },
    },
    price: 300,
    owned: false,
  },
  "panda-03": {
    id: "panda-03",
    name: "Sleepy Panda",
    species: "panda",
    character: "character03",
    thumbnail: "/assets/cute-pandas-assets/Png/Character03/Idle/Characters-Character03-Idle_00.png",
    animations: {
      idle: {
        frames: generateFramePaths("panda", "character03", "idle", 20),
        fps: 12,
      },
      walk: {
        frames: generateFramePaths("panda", "character03", "walk", 30),
        fps: 12,
      },
      jump: {
        frames: generateFramePaths("panda", "character03", "jump", 20),
        fps: 14,
      },
      hit: {
        frames: generateFramePaths("panda", "character03", "hit", 45),
        fps: 14,
      },
      roll: {
        frames: generateFramePaths("panda", "character03", "roll", 8),
        fps: 10,
      },
      fly: {
        frames: generateFramePaths("panda", "character03", "fly", 20),
        fps: 12,
      },
      throwing: {
        frames: generateFramePaths("panda", "character03", "throwing", 35),
        fps: 14,
      },
      dead: {
        frames: generateFramePaths("panda", "character03", "dead", 40),
        fps: 14,
      },
      stuned: {
        frames: generateFramePaths("panda", "character03", "stuned"),
        fps: 14,
      },
    },
    price: 400,
    owned: false,
  },
  "bunny-01": {
    id: "bunny-01",
    name: "Classic Bunny",
    species: "bunny",
    character: "character01",
    thumbnail: "/assets/cartoon-bunnies-assets/Png/Character01/Idle/Characters-Character01-Idle_00.png",
    animations: {
      idle: {
        frames: generateFramePaths("bunny", "character01", "idle", 20),
        fps: 12,
      },
      walk: {
        frames: generateFramePaths("bunny", "character01", "walk", 30),
        fps: 12,
      },
      jump: {
        frames: generateFramePaths("bunny", "character01", "jump", 20),
        fps: 14,
      },
      hit: {
        frames: generateFramePaths("bunny", "character01", "hit", 45),
        fps: 14,
      },
      roll: {
        frames: generateFramePaths("bunny", "character01", "roll", 8),
        fps: 10,
      },
      fly: {
        frames: generateFramePaths("bunny", "character01", "fly", 20),
        fps: 12,
      },
      throwing: {
        frames: generateFramePaths("bunny", "character01", "throwing", 35),
        fps: 14,
      },
      dead: {
        frames: generateFramePaths("bunny", "character01", "dead", 50),
        fps: 14,
      },
      stuned: {
        frames: generateFramePaths("bunny", "character01", "stuned"),
        fps: 14,
      },
    },
    price: 100,
    owned: false,
  },
  "bunny-02": {
    id: "bunny-02",
    name: "Cheerful Bunny",
    species: "bunny",
    character: "character02",
    thumbnail: "/assets/cartoon-bunnies-assets/Png/Character02/Idle/Characters-Character02-Idle_00.png",
    animations: {
      idle: {
        frames: generateFramePaths("bunny", "character02", "idle", 20),
        fps: 12,
      },
      walk: {
        frames: generateFramePaths("bunny", "character02", "walk", 30),
        fps: 12,
      },
      jump: {
        frames: generateFramePaths("bunny", "character02", "jump", 20),
        fps: 14,
      },
      hit: {
        frames: generateFramePaths("bunny", "character02", "hit", 45),
        fps: 14,
      },
      roll: {
        frames: generateFramePaths("bunny", "character02", "roll", 8),
        fps: 10,
      },
      fly: {
        frames: generateFramePaths("bunny", "character02", "fly", 20),
        fps: 12,
      },
      throwing: {
        frames: generateFramePaths("bunny", "character02", "throwing", 35),
        fps: 14,
      },
      dead: {
        frames: generateFramePaths("bunny", "character02", "dead", 50),
        fps: 14,
      },
      stuned: {
        frames: generateFramePaths("bunny", "character02", "stuned"),
        fps: 14,
      },
    },
    price: 150,
    owned: false,
  },
  "bunny-03": {
    id: "bunny-03",
    name: "Sleepy Bunny",
    species: "bunny",
    character: "character03",
    thumbnail: "/assets/cartoon-bunnies-assets/Png/Character03/Idle/Characters-Character03-Idle_00.png",
    animations: {
      idle: {
        frames: generateFramePaths("bunny", "character03", "idle", 20),
        fps: 12,
      },
      walk: {
        frames: generateFramePaths("bunny", "character03", "walk", 30),
        fps: 12,
      },
      jump: {
        frames: generateFramePaths("bunny", "character03", "jump", 20),
        fps: 14,
      },
      hit: {
        frames: generateFramePaths("bunny", "character03", "hit", 45),
        fps: 14,
      },
      roll: {
        frames: generateFramePaths("bunny", "character03", "roll", 8),
        fps: 10,
      },
      fly: {
        frames: generateFramePaths("bunny", "character03", "fly", 20),
        fps: 12,
      },
      throwing: {
        frames: generateFramePaths("bunny", "character03", "throwing", 35),
        fps: 14,
      },
      dead: {
        frames: generateFramePaths("bunny", "character03", "dead", 50),
        fps: 14,
      },
      stuned: {
        frames: generateFramePaths("bunny", "character03", "stuned"),
        fps: 14,
      },
    },
    price: 200,
    owned: false,
  },
  "bunny-04": {
    id: "bunny-04",
    name: "Playful Bunny",
    species: "bunny",
    character: "character04",
    thumbnail: "/assets/cartoon-bunnies-assets/Png/Character04/Idle/Characters-Character04-Idle_00.png",
    animations: {
      idle: {
        frames: generateFramePaths("bunny", "character04", "idle", 20),
        fps: 12,
      },
      walk: {
        frames: generateFramePaths("bunny", "character04", "walk", 30),
        fps: 12,
      },
      jump: {
        frames: generateFramePaths("bunny", "character04", "jump", 20),
        fps: 14,
      },
      hit: {
        frames: generateFramePaths("bunny", "character04", "hit", 45),
        fps: 14,
      },
      roll: {
        frames: generateFramePaths("bunny", "character04", "roll", 8),
        fps: 10,
      },
      fly: {
        frames: generateFramePaths("bunny", "character04", "fly", 20),
        fps: 12,
      },
      throwing: {
        frames: generateFramePaths("bunny", "character04", "throwing", 35),
        fps: 14,
      },
      dead: {
        frames: generateFramePaths("bunny", "character04", "dead", 50),
        fps: 14,
      },
      stuned: {
        frames: generateFramePaths("bunny", "character04", "stuned"),
        fps: 14,
      },
    },
    price: 250,
    owned: false,
  },
  "bunny-05": {
    id: "bunny-05",
    name: "Shy Bunny",
    species: "bunny",
    character: "character05",
    thumbnail: "/assets/cartoon-bunnies-assets/Png/Character05/Idle/Characters-Character05-Idle_00.png",
    animations: {
      idle: {
        frames: generateFramePaths("bunny", "character05", "idle", 20),
        fps: 12,
      },
      walk: {
        frames: generateFramePaths("bunny", "character05", "walk", 30),
        fps: 12,
      },
      jump: {
        frames: generateFramePaths("bunny", "character05", "jump", 20),
        fps: 14,
      },
      hit: {
        frames: generateFramePaths("bunny", "character05", "hit", 45),
        fps: 14,
      },
      roll: {
        frames: generateFramePaths("bunny", "character05", "roll", 8),
        fps: 10,
      },
      fly: {
        frames: generateFramePaths("bunny", "character05", "fly", 20),
        fps: 12,
      },
      throwing: {
        frames: generateFramePaths("bunny", "character05", "throwing", 35),
        fps: 14,
      },
      dead: {
        frames: generateFramePaths("bunny", "character05", "dead", 50),
        fps: 14,
      },
      stuned: {
        frames: generateFramePaths("bunny", "character05", "stuned"),
        fps: 14,
      },
    },
    price: 300,
    owned: false,
  },
  "bunny-06": {
    id: "bunny-06",
    name: "Energetic Bunny",
    species: "bunny",
    character: "character06",
    thumbnail: "/assets/cartoon-bunnies-assets/Png/Character06/Idle/Characters-Character06-Idle_00.png",
    animations: {
      idle: {
        frames: generateFramePaths("bunny", "character06", "idle", 20),
        fps: 12,
      },
      walk: {
        frames: generateFramePaths("bunny", "character06", "walk", 30),
        fps: 12,
      },
      jump: {
        frames: generateFramePaths("bunny", "character06", "jump", 20),
        fps: 14,
      },
      hit: {
        frames: generateFramePaths("bunny", "character06", "hit", 45),
        fps: 14,
      },
      roll: {
        frames: generateFramePaths("bunny", "character06", "roll", 8),
        fps: 10,
      },
      fly: {
        frames: generateFramePaths("bunny", "character06", "fly", 20),
        fps: 12,
      },
      throwing: {
        frames: generateFramePaths("bunny", "character06", "throwing", 35),
        fps: 14,
      },
      dead: {
        frames: generateFramePaths("bunny", "character06", "dead", 50),
        fps: 14,
      },
      stuned: {
        frames: generateFramePaths("bunny", "character06", "stuned"),
        fps: 14,
      },
    },
    price: 350,
    owned: false,
  },
  "bunny-07": {
    id: "bunny-07",
    name: "Gentle Bunny",
    species: "bunny",
    character: "character07",
    thumbnail: "/assets/cartoon-bunnies-assets/Png/Character07/Idle/Characters-Character07-Idle_00.png",
    animations: {
      idle: {
        frames: generateFramePaths("bunny", "character07", "idle", 20),
        fps: 12,
      },
      walk: {
        frames: generateFramePaths("bunny", "character07", "walk", 30),
        fps: 12,
      },
      jump: {
        frames: generateFramePaths("bunny", "character07", "jump", 20),
        fps: 14,
      },
      hit: {
        frames: generateFramePaths("bunny", "character07", "hit", 45),
        fps: 14,
      },
      roll: {
        frames: generateFramePaths("bunny", "character07", "roll", 8),
        fps: 10,
      },
      fly: {
        frames: generateFramePaths("bunny", "character07", "fly", 20),
        fps: 12,
      },
      throwing: {
        frames: generateFramePaths("bunny", "character07", "throwing", 35),
        fps: 14,
      },
      dead: {
        frames: generateFramePaths("bunny", "character07", "dead", 50),
        fps: 14,
      },
      stuned: {
        frames: generateFramePaths("bunny", "character07", "stuned"),
        fps: 14,
      },
    },
    price: 400,
    owned: false,
  },
  "bunny-08": {
    id: "bunny-08",
    name: "Curious Bunny",
    species: "bunny",
    character: "character08",
    thumbnail: "/assets/cartoon-bunnies-assets/Png/Character08/Idle/Characters-Character08-Idle_00.png",
    animations: {
      idle: {
        frames: generateFramePaths("bunny", "character08", "idle", 20),
        fps: 12,
      },
      walk: {
        frames: generateFramePaths("bunny", "character08", "walk", 30),
        fps: 12,
      },
      jump: {
        frames: generateFramePaths("bunny", "character08", "jump", 20),
        fps: 14,
      },
      hit: {
        frames: generateFramePaths("bunny", "character08", "hit", 45),
        fps: 14,
      },
      roll: {
        frames: generateFramePaths("bunny", "character08", "roll", 8),
        fps: 10,
      },
      fly: {
        frames: generateFramePaths("bunny", "character08", "fly", 20),
        fps: 12,
      },
      throwing: {
        frames: generateFramePaths("bunny", "character08", "throwing", 35),
        fps: 14,
      },
      dead: {
        frames: generateFramePaths("bunny", "character08", "dead", 50),
        fps: 14,
      },
      stuned: {
        frames: generateFramePaths("bunny", "character08", "stuned"),
        fps: 14,
      },
    },
    price: 450,
    owned: false,
  },
  "bunny-09": {
    id: "bunny-09",
    name: "Brave Bunny",
    species: "bunny",
    character: "character09",
    thumbnail: "/assets/cartoon-bunnies-assets/Png/Character09/Idle/Characters-Character09-Idle_00.png",
    animations: {
      idle: {
        frames: generateFramePaths("bunny", "character09", "idle", 20),
        fps: 12,
      },
      walk: {
        frames: generateFramePaths("bunny", "character09", "walk", 30),
        fps: 12,
      },
      jump: {
        frames: generateFramePaths("bunny", "character09", "jump", 20),
        fps: 14,
      },
      hit: {
        frames: generateFramePaths("bunny", "character09", "hit", 45),
        fps: 14,
      },
      roll: {
        frames: generateFramePaths("bunny", "character09", "roll", 8),
        fps: 10,
      },
      fly: {
        frames: generateFramePaths("bunny", "character09", "fly", 20),
        fps: 12,
      },
      throwing: {
        frames: generateFramePaths("bunny", "character09", "throwing", 35),
        fps: 14,
      },
      dead: {
        frames: generateFramePaths("bunny", "character09", "dead", 50),
        fps: 14,
      },
      stuned: {
        frames: generateFramePaths("bunny", "character09", "stuned"),
        fps: 14,
      },
    },
    price: 500,
    owned: false,
  },
  "bunny-10": {
    id: "bunny-10",
    name: "Sweet Bunny",
    species: "bunny",
    character: "character10",
    thumbnail: "/assets/cartoon-bunnies-assets/Png/Character10/Idle/Characters-Character10-Idle_00.png",
    animations: {
      idle: {
        frames: generateFramePaths("bunny", "character10", "idle", 20),
        fps: 12,
      },
      walk: {
        frames: generateFramePaths("bunny", "character10", "walk", 30),
        fps: 12,
      },
      jump: {
        frames: generateFramePaths("bunny", "character10", "jump", 20),
        fps: 14,
      },
      hit: {
        frames: generateFramePaths("bunny", "character10", "hit", 45),
        fps: 14,
      },
      roll: {
        frames: generateFramePaths("bunny", "character10", "roll", 8),
        fps: 10,
      },
      fly: {
        frames: generateFramePaths("bunny", "character10", "fly", 20),
        fps: 12,
      },
      throwing: {
        frames: generateFramePaths("bunny", "character10", "throwing", 35),
        fps: 14,
      },
      dead: {
        frames: generateFramePaths("bunny", "character10", "dead", 50),
        fps: 14,
      },
      stuned: {
        frames: generateFramePaths("bunny", "character10", "stuned"),
        fps: 14,
      },
    },
    price: 550,
    owned: false,
  },
  "bunny-11": {
    id: "bunny-11",
    name: "Silly Bunny",
    species: "bunny",
    character: "character11",
    thumbnail: "/assets/cartoon-bunnies-assets/Png/Character11/Idle/Characters-Character11-Idle_00.png",
    animations: {
      idle: {
        frames: generateFramePaths("bunny", "character11", "idle", 20),
        fps: 12,
      },
      walk: {
        frames: generateFramePaths("bunny", "character11", "walk", 30),
        fps: 12,
      },
      jump: {
        frames: generateFramePaths("bunny", "character11", "jump", 20),
        fps: 14,
      },
      hit: {
        frames: generateFramePaths("bunny", "character11", "hit", 45),
        fps: 14,
      },
      roll: {
        frames: generateFramePaths("bunny", "character11", "roll", 8),
        fps: 10,
      },
      fly: {
        frames: generateFramePaths("bunny", "character11", "fly", 20),
        fps: 12,
      },
      throwing: {
        frames: generateFramePaths("bunny", "character11", "throwing", 35),
        fps: 14,
      },
      dead: {
        frames: generateFramePaths("bunny", "character11", "dead", 50),
        fps: 14,
      },
      stuned: {
        frames: generateFramePaths("bunny", "character11", "stuned"),
        fps: 14,
      },
    },
    price: 600,
    owned: false,
  },
  "bunny-12": {
    id: "bunny-12",
    name: "Wise Bunny",
    species: "bunny",
    character: "character12",
    thumbnail: "/assets/cartoon-bunnies-assets/Png/Character12/Idle/Characters-Character12-Idle_00.png",
    animations: {
      idle: {
        frames: generateFramePaths("bunny", "character12", "idle", 20),
        fps: 12,
      },
      walk: {
        frames: generateFramePaths("bunny", "character12", "walk", 30),
        fps: 12,
      },
      jump: {
        frames: generateFramePaths("bunny", "character12", "jump", 20),
        fps: 14,
      },
      hit: {
        frames: generateFramePaths("bunny", "character12", "hit", 45),
        fps: 14,
      },
      roll: {
        frames: generateFramePaths("bunny", "character12", "roll", 8),
        fps: 10,
      },
      fly: {
        frames: generateFramePaths("bunny", "character12", "fly", 20),
        fps: 12,
      },
      throwing: {
        frames: generateFramePaths("bunny", "character12", "throwing", 35),
        fps: 14,
      },
      dead: {
        frames: generateFramePaths("bunny", "character12", "dead", 50),
        fps: 14,
      },
      stuned: {
        frames: generateFramePaths("bunny", "character12", "stuned"),
        fps: 14,
      },
    },
    price: 650,
    owned: false,
  },
  "bunny-13": {
    id: "bunny-13",
    name: "Cool Bunny",
    species: "bunny",
    character: "character13",
    thumbnail: "/assets/cartoon-bunnies-assets/Png/Character13/Idle/Characters-Character13-Idle_00.png",
    animations: {
      idle: {
        frames: generateFramePaths("bunny", "character13", "idle", 20),
        fps: 12,
      },
      walk: {
        frames: generateFramePaths("bunny", "character13", "walk", 30),
        fps: 12,
      },
      jump: {
        frames: generateFramePaths("bunny", "character13", "jump", 20),
        fps: 14,
      },
      hit: {
        frames: generateFramePaths("bunny", "character13", "hit", 45),
        fps: 14,
      },
      roll: {
        frames: generateFramePaths("bunny", "character13", "roll", 8),
        fps: 10,
      },
      fly: {
        frames: generateFramePaths("bunny", "character13", "fly", 20),
        fps: 12,
      },
      throwing: {
        frames: generateFramePaths("bunny", "character13", "throwing", 35),
        fps: 14,
      },
      dead: {
        frames: generateFramePaths("bunny", "character13", "dead", 50),
        fps: 14,
      },
      stuned: {
        frames: generateFramePaths("bunny", "character13", "stuned"),
        fps: 14,
      },
    },
    price: 700,
    owned: false,
  },
  "bunny-14": {
    id: "bunny-14",
    name: "Warm Bunny",
    species: "bunny",
    character: "character14",
    thumbnail: "/assets/cartoon-bunnies-assets/Png/Character14/Idle/Characters-Character14-Idle_00.png",
    animations: {
      idle: {
        frames: generateFramePaths("bunny", "character14", "idle", 20),
        fps: 12,
      },
      walk: {
        frames: generateFramePaths("bunny", "character14", "walk", 30),
        fps: 12,
      },
      jump: {
        frames: generateFramePaths("bunny", "character14", "jump", 20),
        fps: 14,
      },
      hit: {
        frames: generateFramePaths("bunny", "character14", "hit", 45),
        fps: 14,
      },
      roll: {
        frames: generateFramePaths("bunny", "character14", "roll", 8),
        fps: 10,
      },
      fly: {
        frames: generateFramePaths("bunny", "character14", "fly", 20),
        fps: 12,
      },
      throwing: {
        frames: generateFramePaths("bunny", "character14", "throwing", 35),
        fps: 14,
      },
      dead: {
        frames: generateFramePaths("bunny", "character14", "dead", 50),
        fps: 14,
      },
      stuned: {
        frames: generateFramePaths("bunny", "character14", "stuned"),
        fps: 14,
      },
    },
    price: 750,
    owned: false,
  },
  "bunny-15": {
    id: "bunny-15",
    name: "Friendly Bunny",
    species: "bunny",
    character: "character15",
    thumbnail: "/assets/cartoon-bunnies-assets/Png/Character15/Idle/Characters-Character15-Idle_00.png",
    animations: {
      idle: {
        frames: generateFramePaths("bunny", "character15", "idle", 20),
        fps: 12,
      },
      walk: {
        frames: generateFramePaths("bunny", "character15", "walk", 30),
        fps: 12,
      },
      jump: {
        frames: generateFramePaths("bunny", "character15", "jump", 20),
        fps: 14,
      },
      hit: {
        frames: generateFramePaths("bunny", "character15", "hit", 45),
        fps: 14,
      },
      roll: {
        frames: generateFramePaths("bunny", "character15", "roll", 8),
        fps: 10,
      },
      fly: {
        frames: generateFramePaths("bunny", "character15", "fly", 20),
        fps: 12,
      },
      throwing: {
        frames: generateFramePaths("bunny", "character15", "throwing", 35),
        fps: 14,
      },
      dead: {
        frames: generateFramePaths("bunny", "character15", "dead", 50),
        fps: 14,
      },
      stuned: {
        frames: generateFramePaths("bunny", "character15", "stuned"),
        fps: 14,
      },
    },
    price: 800,
    owned: false,
  },
  "capybara-01": {
    id: "capybara-01",
    name: "Classic Capybara",
    species: "capybara",
    character: "character01",
    thumbnail: "/assets/cartoon-capybaras-assets/Png/Character01/Idle/Characters-Character01-Idle_00.png",
    animations: {
      idle: {
        frames: generateFramePaths("capybara", "character01", "idle", 20),
        fps: 12,
      },
      walk: {
        frames: generateFramePaths("capybara", "character01", "walk", 20),
        fps: 12,
      },
      jump: {
        frames: generateFramePaths("capybara", "character01", "jump", 20),
        fps: 14,
      },
      hit: {
        frames: generateFramePaths("capybara", "character01", "hit", 40),
        fps: 14,
      },
      roll: {
        frames: generateFramePaths("capybara", "character01", "roll", 8),
        fps: 10,
      },
      fly: {
        frames: generateFramePaths("capybara", "character01", "fly", 20),
        fps: 12,
      },
      throwing: {
        frames: generateFramePaths("capybara", "character01", "throwing", 35),
        fps: 14,
      },
      dead: {
        frames: generateFramePaths("capybara", "character01", "dead", 60),
        fps: 14,
      },
      stuned: {
        frames: generateFramePaths("capybara", "character01", "stuned"),
        fps: 14,
      },
    },
    price: 250,
    owned: false,
  },
  "capybara-02": {
    id: "capybara-02",
    name: "Cheerful Capybara",
    species: "capybara",
    character: "character02",
    thumbnail: "/assets/cartoon-capybaras-assets/Png/Character02/Idle/Characters-Character02-Idle_00.png",
    animations: {
      idle: {
        frames: generateFramePaths("capybara", "character02", "idle", 20),
        fps: 12,
      },
      walk: {
        frames: generateFramePaths("capybara", "character02", "walk", 20),
        fps: 12,
      },
      jump: {
        frames: generateFramePaths("capybara", "character02", "jump", 20),
        fps: 14,
      },
      hit: {
        frames: generateFramePaths("capybara", "character02", "hit", 40),
        fps: 14,
      },
      roll: {
        frames: generateFramePaths("capybara", "character02", "roll", 8),
        fps: 10,
      },
      fly: {
        frames: generateFramePaths("capybara", "character02", "fly", 20),
        fps: 12,
      },
      throwing: {
        frames: generateFramePaths("capybara", "character02", "throwing", 35),
        fps: 14,
      },
      dead: {
        frames: generateFramePaths("capybara", "character02", "dead", 60),
        fps: 14,
      },
      stuned: {
        frames: generateFramePaths("capybara", "character02", "stuned"),
        fps: 14,
      },
    },
    price: 300,
    owned: false,
  },
  "capybara-03": {
    id: "capybara-03",
    name: "Sleepy Capybara",
    species: "capybara",
    character: "character03",
    thumbnail: "/assets/cartoon-capybaras-assets/Png/Character03/Idle/Characters-Character03-Idle_00.png",
    animations: {
      idle: {
        frames: generateFramePaths("capybara", "character03", "idle", 20),
        fps: 12,
      },
      walk: {
        frames: generateFramePaths("capybara", "character03", "walk", 20),
        fps: 12,
      },
      jump: {
        frames: generateFramePaths("capybara", "character03", "jump", 20),
        fps: 14,
      },
      hit: {
        frames: generateFramePaths("capybara", "character03", "hit", 40),
        fps: 14,
      },
      roll: {
        frames: generateFramePaths("capybara", "character03", "roll", 8),
        fps: 10,
      },
      fly: {
        frames: generateFramePaths("capybara", "character03", "fly", 20),
        fps: 12,
      },
      throwing: {
        frames: generateFramePaths("capybara", "character03", "throwing", 35),
        fps: 14,
      },
      dead: {
        frames: generateFramePaths("capybara", "character03", "dead", 60),
        fps: 14,
      },
      stuned: {
        frames: generateFramePaths("capybara", "character03", "stuned"),
        fps: 14,
      },
    },
    price: 350,
    owned: false,
  },
  "capybara-04": {
    id: "capybara-04",
    name: "Playful Capybara",
    species: "capybara",
    character: "character04",
    thumbnail: "/assets/cartoon-capybaras-assets/Png/Character04/Idle/Characters-Character04-Idle_00.png",
    animations: {
      idle: {
        frames: generateFramePaths("capybara", "character04", "idle", 20),
        fps: 12,
      },
      walk: {
        frames: generateFramePaths("capybara", "character04", "walk", 20),
        fps: 12,
      },
      jump: {
        frames: generateFramePaths("capybara", "character04", "jump", 20),
        fps: 14,
      },
      hit: {
        frames: generateFramePaths("capybara", "character04", "hit", 40),
        fps: 14,
      },
      roll: {
        frames: generateFramePaths("capybara", "character04", "roll", 8),
        fps: 10,
      },
      fly: {
        frames: generateFramePaths("capybara", "character04", "fly", 20),
        fps: 12,
      },
      throwing: {
        frames: generateFramePaths("capybara", "character04", "throwing", 35),
        fps: 14,
      },
      dead: {
        frames: generateFramePaths("capybara", "character04", "dead", 60),
        fps: 14,
      },
      stuned: {
        frames: generateFramePaths("capybara", "character04", "stuned"),
        fps: 14,
      },
    },
    price: 400,
    owned: false,
  },
  "capybara-05": {
    id: "capybara-05",
    name: "Shy Capybara",
    species: "capybara",
    character: "character05",
    thumbnail: "/assets/cartoon-capybaras-assets/Png/Character05/Idle/Characters-Character05-Idle_00.png",
    animations: {
      idle: {
        frames: generateFramePaths("capybara", "character05", "idle", 20),
        fps: 12,
      },
      walk: {
        frames: generateFramePaths("capybara", "character05", "walk", 20),
        fps: 12,
      },
      jump: {
        frames: generateFramePaths("capybara", "character05", "jump", 20),
        fps: 14,
      },
      hit: {
        frames: generateFramePaths("capybara", "character05", "hit", 40),
        fps: 14,
      },
      roll: {
        frames: generateFramePaths("capybara", "character05", "roll", 8),
        fps: 10,
      },
      fly: {
        frames: generateFramePaths("capybara", "character05", "fly", 20),
        fps: 12,
      },
      throwing: {
        frames: generateFramePaths("capybara", "character05", "throwing", 35),
        fps: 14,
      },
      dead: {
        frames: generateFramePaths("capybara", "character05", "dead", 60),
        fps: 14,
      },
      stuned: {
        frames: generateFramePaths("capybara", "character05", "stuned"),
        fps: 14,
      },
    },
    price: 450,
    owned: false,
  },
  "capybara-06": {
    id: "capybara-06",
    name: "Energetic Capybara",
    species: "capybara",
    character: "character06",
    thumbnail: "/assets/cartoon-capybaras-assets/Png/Character06/Idle/Characters-Character06-Idle_00.png",
    animations: {
      idle: {
        frames: generateFramePaths("capybara", "character06", "idle", 20),
        fps: 12,
      },
      walk: {
        frames: generateFramePaths("capybara", "character06", "walk", 20),
        fps: 12,
      },
      jump: {
        frames: generateFramePaths("capybara", "character06", "jump", 20),
        fps: 14,
      },
      hit: {
        frames: generateFramePaths("capybara", "character06", "hit", 40),
        fps: 14,
      },
      roll: {
        frames: generateFramePaths("capybara", "character06", "roll", 8),
        fps: 10,
      },
      fly: {
        frames: generateFramePaths("capybara", "character06", "fly", 20),
        fps: 12,
      },
      throwing: {
        frames: generateFramePaths("capybara", "character06", "throwing", 35),
        fps: 14,
      },
      dead: {
        frames: generateFramePaths("capybara", "character06", "dead", 60),
        fps: 14,
      },
      stuned: {
        frames: generateFramePaths("capybara", "character06", "stuned"),
        fps: 14,
      },
    },
    price: 500,
    owned: false,
  },
  "capybara-07": {
    id: "capybara-07",
    name: "Gentle Capybara",
    species: "capybara",
    character: "character07",
    thumbnail: "/assets/cartoon-capybaras-assets/Png/Character07/Idle/Characters-Character07-Idle_00.png",
    animations: {
      idle: {
        frames: generateFramePaths("capybara", "character07", "idle", 20),
        fps: 12,
      },
      walk: {
        frames: generateFramePaths("capybara", "character07", "walk", 20),
        fps: 12,
      },
      jump: {
        frames: generateFramePaths("capybara", "character07", "jump", 20),
        fps: 14,
      },
      hit: {
        frames: generateFramePaths("capybara", "character07", "hit", 40),
        fps: 14,
      },
      roll: {
        frames: generateFramePaths("capybara", "character07", "roll", 8),
        fps: 10,
      },
      fly: {
        frames: generateFramePaths("capybara", "character07", "fly", 20),
        fps: 12,
      },
      throwing: {
        frames: generateFramePaths("capybara", "character07", "throwing", 35),
        fps: 14,
      },
      dead: {
        frames: generateFramePaths("capybara", "character07", "dead", 60),
        fps: 14,
      },
      stuned: {
        frames: generateFramePaths("capybara", "character07", "stuned"),
        fps: 14,
      },
    },
    price: 550,
    owned: false,
  },
  "capybara-08": {
    id: "capybara-08",
    name: "Curious Capybara",
    species: "capybara",
    character: "character08",
    thumbnail: "/assets/cartoon-capybaras-assets/Png/Character08/Idle/Characters-Character08-Idle_00.png",
    animations: {
      idle: {
        frames: generateFramePaths("capybara", "character08", "idle", 20),
        fps: 12,
      },
      walk: {
        frames: generateFramePaths("capybara", "character08", "walk", 20),
        fps: 12,
      },
      jump: {
        frames: generateFramePaths("capybara", "character08", "jump", 20),
        fps: 14,
      },
      hit: {
        frames: generateFramePaths("capybara", "character08", "hit", 40),
        fps: 14,
      },
      roll: {
        frames: generateFramePaths("capybara", "character08", "roll", 8),
        fps: 10,
      },
      fly: {
        frames: generateFramePaths("capybara", "character08", "fly", 20),
        fps: 12,
      },
      throwing: {
        frames: generateFramePaths("capybara", "character08", "throwing", 35),
        fps: 14,
      },
      dead: {
        frames: generateFramePaths("capybara", "character08", "dead", 60),
        fps: 14,
      },
      stuned: {
        frames: generateFramePaths("capybara", "character08", "stuned"),
        fps: 14,
      },
    },
    price: 600,
    owned: false,
  },
  "capybara-09": {
    id: "capybara-09",
    name: "Brave Capybara",
    species: "capybara",
    character: "character09",
    thumbnail: "/assets/cartoon-capybaras-assets/Png/Character09/Idle/Characters-Character09-Idle_00.png",
    animations: {
      idle: {
        frames: generateFramePaths("capybara", "character09", "idle", 20),
        fps: 12,
      },
      walk: {
        frames: generateFramePaths("capybara", "character09", "walk", 20),
        fps: 12,
      },
      jump: {
        frames: generateFramePaths("capybara", "character09", "jump", 20),
        fps: 14,
      },
      hit: {
        frames: generateFramePaths("capybara", "character09", "hit", 40),
        fps: 14,
      },
      roll: {
        frames: generateFramePaths("capybara", "character09", "roll", 8),
        fps: 10,
      },
      fly: {
        frames: generateFramePaths("capybara", "character09", "fly", 20),
        fps: 12,
      },
      throwing: {
        frames: generateFramePaths("capybara", "character09", "throwing", 35),
        fps: 14,
      },
      dead: {
        frames: generateFramePaths("capybara", "character09", "dead", 60),
        fps: 14,
      },
      stuned: {
        frames: generateFramePaths("capybara", "character09", "stuned"),
        fps: 14,
      },
    },
    price: 650,
    owned: false,
  },
  "capybara-10": {
    id: "capybara-10",
    name: "Sweet Capybara",
    species: "capybara",
    character: "character10",
    thumbnail: "/assets/cartoon-capybaras-assets/Png/Character10/Idle/Characters-Character10-Idle_00.png",
    animations: {
      idle: {
        frames: generateFramePaths("capybara", "character10", "idle", 20),
        fps: 12,
      },
      walk: {
        frames: generateFramePaths("capybara", "character10", "walk", 20),
        fps: 12,
      },
      jump: {
        frames: generateFramePaths("capybara", "character10", "jump", 20),
        fps: 14,
      },
      hit: {
        frames: generateFramePaths("capybara", "character10", "hit", 40),
        fps: 14,
      },
      roll: {
        frames: generateFramePaths("capybara", "character10", "roll", 8),
        fps: 10,
      },
      fly: {
        frames: generateFramePaths("capybara", "character10", "fly", 20),
        fps: 12,
      },
      throwing: {
        frames: generateFramePaths("capybara", "character10", "throwing", 35),
        fps: 14,
      },
      dead: {
        frames: generateFramePaths("capybara", "character10", "dead", 60),
        fps: 14,
      },
      stuned: {
        frames: generateFramePaths("capybara", "character10", "stuned"),
        fps: 14,
      },
    },
    price: 700,
    owned: false,
  },
  "capybara-11": {
    id: "capybara-11",
    name: "Silly Capybara",
    species: "capybara",
    character: "character11",
    thumbnail: "/assets/cartoon-capybaras-assets/Png/Character11/Idle/Characters-Character11-Idle_00.png",
    animations: {
      idle: {
        frames: generateFramePaths("capybara", "character11", "idle", 20),
        fps: 12,
      },
      walk: {
        frames: generateFramePaths("capybara", "character11", "walk", 20),
        fps: 12,
      },
      jump: {
        frames: generateFramePaths("capybara", "character11", "jump", 20),
        fps: 14,
      },
      hit: {
        frames: generateFramePaths("capybara", "character11", "hit", 40),
        fps: 14,
      },
      roll: {
        frames: generateFramePaths("capybara", "character11", "roll", 8),
        fps: 10,
      },
      fly: {
        frames: generateFramePaths("capybara", "character11", "fly", 20),
        fps: 12,
      },
      throwing: {
        frames: generateFramePaths("capybara", "character11", "throwing", 35),
        fps: 14,
      },
      dead: {
        frames: generateFramePaths("capybara", "character11", "dead", 60),
        fps: 14,
      },
      stuned: {
        frames: generateFramePaths("capybara", "character11", "stuned"),
        fps: 14,
      },
    },
    price: 750,
    owned: false,
  },
  "capybara-12": {
    id: "capybara-12",
    name: "Wise Capybara",
    species: "capybara",
    character: "character12",
    thumbnail: "/assets/cartoon-capybaras-assets/Png/Character12/Idle/Characters-Character12-Idle_00.png",
    animations: {
      idle: {
        frames: generateFramePaths("capybara", "character12", "idle", 20),
        fps: 12,
      },
      walk: {
        frames: generateFramePaths("capybara", "character12", "walk", 20),
        fps: 12,
      },
      jump: {
        frames: generateFramePaths("capybara", "character12", "jump", 20),
        fps: 14,
      },
      hit: {
        frames: generateFramePaths("capybara", "character12", "hit", 40),
        fps: 14,
      },
      roll: {
        frames: generateFramePaths("capybara", "character12", "roll", 8),
        fps: 10,
      },
      fly: {
        frames: generateFramePaths("capybara", "character12", "fly", 20),
        fps: 12,
      },
      throwing: {
        frames: generateFramePaths("capybara", "character12", "throwing", 35),
        fps: 14,
      },
      dead: {
        frames: generateFramePaths("capybara", "character12", "dead", 60),
        fps: 14,
      },
      stuned: {
        frames: generateFramePaths("capybara", "character12", "stuned"),
        fps: 14,
      },
    },
    price: 800,
    owned: false,
  },
  "capybara-13": {
    id: "capybara-13",
    name: "Cool Capybara",
    species: "capybara",
    character: "character13",
    thumbnail: "/assets/cartoon-capybaras-assets/Png/Character13/Idle/Characters-Character13-Idle_00.png",
    animations: {
      idle: {
        frames: generateFramePaths("capybara", "character13", "idle", 20),
        fps: 12,
      },
      walk: {
        frames: generateFramePaths("capybara", "character13", "walk", 20),
        fps: 12,
      },
      jump: {
        frames: generateFramePaths("capybara", "character13", "jump", 20),
        fps: 14,
      },
      hit: {
        frames: generateFramePaths("capybara", "character13", "hit", 40),
        fps: 14,
      },
      roll: {
        frames: generateFramePaths("capybara", "character13", "roll", 8),
        fps: 10,
      },
      fly: {
        frames: generateFramePaths("capybara", "character13", "fly", 20),
        fps: 12,
      },
      throwing: {
        frames: generateFramePaths("capybara", "character13", "throwing", 35),
        fps: 14,
      },
      dead: {
        frames: generateFramePaths("capybara", "character13", "dead", 60),
        fps: 14,
      },
      stuned: {
        frames: generateFramePaths("capybara", "character13", "stuned"),
        fps: 14,
      },
    },
    price: 850,
    owned: false,
  },
  "capybara-14": {
    id: "capybara-14",
    name: "Warm Capybara",
    species: "capybara",
    character: "character14",
    thumbnail: "/assets/cartoon-capybaras-assets/Png/Character14/Idle/Characters-Character14-Idle_00.png",
    animations: {
      idle: {
        frames: generateFramePaths("capybara", "character14", "idle", 20),
        fps: 12,
      },
      walk: {
        frames: generateFramePaths("capybara", "character14", "walk", 20),
        fps: 12,
      },
      jump: {
        frames: generateFramePaths("capybara", "character14", "jump", 20),
        fps: 14,
      },
      hit: {
        frames: generateFramePaths("capybara", "character14", "hit", 40),
        fps: 14,
      },
      roll: {
        frames: generateFramePaths("capybara", "character14", "roll", 8),
        fps: 10,
      },
      fly: {
        frames: generateFramePaths("capybara", "character14", "fly", 20),
        fps: 12,
      },
      throwing: {
        frames: generateFramePaths("capybara", "character14", "throwing", 35),
        fps: 14,
      },
      dead: {
        frames: generateFramePaths("capybara", "character14", "dead", 60),
        fps: 14,
      },
      stuned: {
        frames: generateFramePaths("capybara", "character14", "stuned"),
        fps: 14,
      },
    },
    price: 900,
    owned: false,
  },
  "capybara-15": {
    id: "capybara-15",
    name: "Friendly Capybara",
    species: "capybara",
    character: "character15",
    thumbnail: "/assets/cartoon-capybaras-assets/Png/Character15/Idle/Characters-Character15-Idle_00.png",
    animations: {
      idle: {
        frames: generateFramePaths("capybara", "character15", "idle", 20),
        fps: 12,
      },
      walk: {
        frames: generateFramePaths("capybara", "character15", "walk", 20),
        fps: 12,
      },
      jump: {
        frames: generateFramePaths("capybara", "character15", "jump", 20),
        fps: 14,
      },
      hit: {
        frames: generateFramePaths("capybara", "character15", "hit", 40),
        fps: 14,
      },
      roll: {
        frames: generateFramePaths("capybara", "character15", "roll", 8),
        fps: 10,
      },
      fly: {
        frames: generateFramePaths("capybara", "character15", "fly", 20),
        fps: 12,
      },
      throwing: {
        frames: generateFramePaths("capybara", "character15", "throwing", 35),
        fps: 14,
      },
      dead: {
        frames: generateFramePaths("capybara", "character15", "dead", 60),
        fps: 14,
      },
      stuned: {
        frames: generateFramePaths("capybara", "character15", "stuned"),
        fps: 14,
      },
    },
    price: 950,
    owned: false,
  },
  "penguin-01": {
    id: "penguin-01",
    name: "Classic Penguin",
    species: "penguin",
    character: "character01",
    thumbnail: "/assets/cartoon-penguins-assets/Png/Character01/Idle/All Characters-Character01-Idle_00.png",
    animations: {
      idle: {
        frames: generateFramePaths("penguin", "character01", "idle", 20),
        fps: 12,
      },
      walk: {
        frames: generateFramePaths("penguin", "character01", "walk", 30),
        fps: 12,
      },
      jump: {
        frames: generateFramePaths("penguin", "character01", "jump", 20),
        fps: 14,
      },
      hit: {
        frames: generateFramePaths("penguin", "character01", "hit", 35),
        fps: 14,
      },
      roll: {
        frames: generateFramePaths("penguin", "character01", "roll", 8),
        fps: 10,
      },
      fly: {
        frames: generateFramePaths("penguin", "character01", "fly", 20),
        fps: 12,
      },
      throwing: {
        frames: generateFramePaths("penguin", "character01", "throwing", 35),
        fps: 14,
      },
      dead: {
        frames: generateFramePaths("penguin", "character01", "dead", 45),
        fps: 14,
      },
      stuned: {
        frames: generateFramePaths("penguin", "character01", "confused"),
        fps: 14,
      },
    },
    price: 150,
    owned: false,
  },
  "penguin-02": {
    id: "penguin-02",
    name: "Cheerful Penguin",
    species: "penguin",
    character: "character02",
    thumbnail: "/assets/cartoon-penguins-assets/Png/Character02/Idle/All Characters-Character02-Idle_00.png",
    animations: {
      idle: {
        frames: generateFramePaths("penguin", "character02", "idle", 20),
        fps: 12,
      },
      walk: {
        frames: generateFramePaths("penguin", "character02", "walk", 30),
        fps: 12,
      },
      jump: {
        frames: generateFramePaths("penguin", "character02", "jump", 20),
        fps: 14,
      },
      hit: {
        frames: generateFramePaths("penguin", "character02", "hit", 35),
        fps: 14,
      },
      roll: {
        frames: generateFramePaths("penguin", "character02", "roll", 8),
        fps: 10,
      },
      fly: {
        frames: generateFramePaths("penguin", "character02", "fly", 20),
        fps: 12,
      },
      throwing: {
        frames: generateFramePaths("penguin", "character02", "throwing", 35),
        fps: 14,
      },
      dead: {
        frames: generateFramePaths("penguin", "character02", "dead", 45),
        fps: 14,
      },
      stuned: {
        frames: generateFramePaths("penguin", "character02", "confused"),
        fps: 14,
      },
    },
    price: 200,
    owned: false,
  },
  "penguin-03": {
    id: "penguin-03",
    name: "Sleepy Penguin",
    species: "penguin",
    character: "character03",
    thumbnail: "/assets/cartoon-penguins-assets/Png/Character03/Idle/All Characters-Character03-Idle_00.png",
    animations: {
      idle: {
        frames: generateFramePaths("penguin", "character03", "idle", 20),
        fps: 12,
      },
      walk: {
        frames: generateFramePaths("penguin", "character03", "walk", 30),
        fps: 12,
      },
      jump: {
        frames: generateFramePaths("penguin", "character03", "jump", 20),
        fps: 14,
      },
      hit: {
        frames: generateFramePaths("penguin", "character03", "hit", 35),
        fps: 14,
      },
      roll: {
        frames: generateFramePaths("penguin", "character03", "roll", 8),
        fps: 10,
      },
      fly: {
        frames: generateFramePaths("penguin", "character03", "fly", 20),
        fps: 12,
      },
      throwing: {
        frames: generateFramePaths("penguin", "character03", "throwing", 35),
        fps: 14,
      },
      dead: {
        frames: generateFramePaths("penguin", "character03", "dead", 45),
        fps: 14,
      },
      stuned: {
        frames: generateFramePaths("penguin", "character03", "confused"),
        fps: 14,
      },
    },
    price: 250,
    owned: false,
  },
  "penguin-04": {
    id: "penguin-04",
    name: "Playful Penguin",
    species: "penguin",
    character: "character04",
    thumbnail: "/assets/cartoon-penguins-assets/Png/Character04/Idle/All Characters-Character04-Idle_00.png",
    animations: {
      idle: {
        frames: generateFramePaths("penguin", "character04", "idle", 20),
        fps: 12,
      },
      walk: {
        frames: generateFramePaths("penguin", "character04", "walk", 30),
        fps: 12,
      },
      jump: {
        frames: generateFramePaths("penguin", "character04", "jump", 20),
        fps: 14,
      },
      hit: {
        frames: generateFramePaths("penguin", "character04", "hit", 35),
        fps: 14,
      },
      roll: {
        frames: generateFramePaths("penguin", "character04", "roll", 8),
        fps: 10,
      },
      fly: {
        frames: generateFramePaths("penguin", "character04", "fly", 20),
        fps: 12,
      },
      throwing: {
        frames: generateFramePaths("penguin", "character04", "throwing", 35),
        fps: 14,
      },
      dead: {
        frames: generateFramePaths("penguin", "character04", "dead", 45),
        fps: 14,
      },
      stuned: {
        frames: generateFramePaths("penguin", "character04", "confused"),
        fps: 14,
      },
    },
    price: 300,
    owned: false,
  },
  "penguin-05": {
    id: "penguin-05",
    name: "Shy Penguin",
    species: "penguin",
    character: "character05",
    thumbnail: "/assets/cartoon-penguins-assets/Png/Character05/Idle/All Characters-Character05-Idle_00.png",
    animations: {
      idle: {
        frames: generateFramePaths("penguin", "character05", "idle", 20),
        fps: 12,
      },
      walk: {
        frames: generateFramePaths("penguin", "character05", "walk", 30),
        fps: 12,
      },
      jump: {
        frames: generateFramePaths("penguin", "character05", "jump", 20),
        fps: 14,
      },
      hit: {
        frames: generateFramePaths("penguin", "character05", "hit", 35),
        fps: 14,
      },
      roll: {
        frames: generateFramePaths("penguin", "character05", "roll", 8),
        fps: 10,
      },
      fly: {
        frames: generateFramePaths("penguin", "character05", "fly", 20),
        fps: 12,
      },
      throwing: {
        frames: generateFramePaths("penguin", "character05", "throwing", 35),
        fps: 14,
      },
      dead: {
        frames: generateFramePaths("penguin", "character05", "dead", 45),
        fps: 14,
      },
      stuned: {
        frames: generateFramePaths("penguin", "character05", "confused"),
        fps: 14,
      },
    },
    price: 350,
    owned: false,
  },
  "penguin-06": {
    id: "penguin-06",
    name: "Energetic Penguin",
    species: "penguin",
    character: "character06",
    thumbnail: "/assets/cartoon-penguins-assets/Png/Character06/Idle/All Characters-Character06-Idle_00.png",
    animations: {
      idle: {
        frames: generateFramePaths("penguin", "character06", "idle", 20),
        fps: 12,
      },
      walk: {
        frames: generateFramePaths("penguin", "character06", "walk", 30),
        fps: 12,
      },
      jump: {
        frames: generateFramePaths("penguin", "character06", "jump", 20),
        fps: 14,
      },
      hit: {
        frames: generateFramePaths("penguin", "character06", "hit", 35),
        fps: 14,
      },
      roll: {
        frames: generateFramePaths("penguin", "character06", "roll", 8),
        fps: 10,
      },
      fly: {
        frames: generateFramePaths("penguin", "character06", "fly", 20),
        fps: 12,
      },
      throwing: {
        frames: generateFramePaths("penguin", "character06", "throwing", 35),
        fps: 14,
      },
      dead: {
        frames: generateFramePaths("penguin", "character06", "dead", 45),
        fps: 14,
      },
      stuned: {
        frames: generateFramePaths("penguin", "character06", "confused"),
        fps: 14,
      },
    },
    price: 400,
    owned: false,
  },
  "penguin-07": {
    id: "penguin-07",
    name: "Gentle Penguin",
    species: "penguin",
    character: "character07",
    thumbnail: "/assets/cartoon-penguins-assets/Png/Character07/Idle/All Characters-Character07-Idle_00.png",
    animations: {
      idle: {
        frames: generateFramePaths("penguin", "character07", "idle", 20),
        fps: 12,
      },
      walk: {
        frames: generateFramePaths("penguin", "character07", "walk", 30),
        fps: 12,
      },
      jump: {
        frames: generateFramePaths("penguin", "character07", "jump", 20),
        fps: 14,
      },
      hit: {
        frames: generateFramePaths("penguin", "character07", "hit", 35),
        fps: 14,
      },
      roll: {
        frames: generateFramePaths("penguin", "character07", "roll", 8),
        fps: 10,
      },
      fly: {
        frames: generateFramePaths("penguin", "character07", "fly", 20),
        fps: 12,
      },
      throwing: {
        frames: generateFramePaths("penguin", "character07", "throwing", 35),
        fps: 14,
      },
      dead: {
        frames: generateFramePaths("penguin", "character07", "dead", 45),
        fps: 14,
      },
      stuned: {
        frames: generateFramePaths("penguin", "character07", "confused"),
        fps: 14,
      },
    },
    price: 450,
    owned: false,
  },
  "penguin-08": {
    id: "penguin-08",
    name: "Curious Penguin",
    species: "penguin",
    character: "character08",
    thumbnail: "/assets/cartoon-penguins-assets/Png/Character08/Idle/All Characters-Character08-Idle_00.png",
    animations: {
      idle: {
        frames: generateFramePaths("penguin", "character08", "idle", 20),
        fps: 12,
      },
      walk: {
        frames: generateFramePaths("penguin", "character08", "walk", 30),
        fps: 12,
      },
      jump: {
        frames: generateFramePaths("penguin", "character08", "jump", 20),
        fps: 14,
      },
      hit: {
        frames: generateFramePaths("penguin", "character08", "hit", 35),
        fps: 14,
      },
      roll: {
        frames: generateFramePaths("penguin", "character08", "roll", 8),
        fps: 10,
      },
      fly: {
        frames: generateFramePaths("penguin", "character08", "fly", 20),
        fps: 12,
      },
      throwing: {
        frames: generateFramePaths("penguin", "character08", "throwing", 35),
        fps: 14,
      },
      dead: {
        frames: generateFramePaths("penguin", "character08", "dead", 45),
        fps: 14,
      },
      stuned: {
        frames: generateFramePaths("penguin", "character08", "confused"),
        fps: 14,
      },
    },
    price: 500,
    owned: false,
  },
  "penguin-09": {
    id: "penguin-09",
    name: "Brave Penguin",
    species: "penguin",
    character: "character09",
    thumbnail: "/assets/cartoon-penguins-assets/Png/Character09/Idle/All Characters-Character09-Idle_00.png",
    animations: {
      idle: {
        frames: generateFramePaths("penguin", "character09", "idle", 20),
        fps: 12,
      },
      walk: {
        frames: generateFramePaths("penguin", "character09", "walk", 30),
        fps: 12,
      },
      jump: {
        frames: generateFramePaths("penguin", "character09", "jump", 20),
        fps: 14,
      },
      hit: {
        frames: generateFramePaths("penguin", "character09", "hit", 35),
        fps: 14,
      },
      roll: {
        frames: generateFramePaths("penguin", "character09", "roll", 8),
        fps: 10,
      },
      fly: {
        frames: generateFramePaths("penguin", "character09", "fly", 20),
        fps: 12,
      },
      throwing: {
        frames: generateFramePaths("penguin", "character09", "throwing", 35),
        fps: 14,
      },
      dead: {
        frames: generateFramePaths("penguin", "character09", "dead", 45),
        fps: 14,
      },
      stuned: {
        frames: generateFramePaths("penguin", "character09", "confused"),
        fps: 14,
      },
    },
    price: 550,
    owned: false,
  },
  "penguin-10": {
    id: "penguin-10",
    name: "Sweet Penguin",
    species: "penguin",
    character: "character10",
    thumbnail: "/assets/cartoon-penguins-assets/Png/Character10/Idle/All Characters-Character10-Idle_00.png",
    animations: {
      idle: {
        frames: generateFramePaths("penguin", "character10", "idle", 20),
        fps: 12,
      },
      walk: {
        frames: generateFramePaths("penguin", "character10", "walk", 30),
        fps: 12,
      },
      jump: {
        frames: generateFramePaths("penguin", "character10", "jump", 20),
        fps: 14,
      },
      hit: {
        frames: generateFramePaths("penguin", "character10", "hit", 35),
        fps: 14,
      },
      roll: {
        frames: generateFramePaths("penguin", "character10", "roll", 8),
        fps: 10,
      },
      fly: {
        frames: generateFramePaths("penguin", "character10", "fly", 20),
        fps: 12,
      },
      throwing: {
        frames: generateFramePaths("penguin", "character10", "throwing", 35),
        fps: 14,
      },
      dead: {
        frames: generateFramePaths("penguin", "character10", "dead", 45),
        fps: 14,
      },
      stuned: {
        frames: generateFramePaths("penguin", "character10", "confused"),
        fps: 14,
      },
    },
    price: 600,
    owned: false,
  },
  "penguin-11": {
    id: "penguin-11",
    name: "Silly Penguin",
    species: "penguin",
    character: "character11",
    thumbnail: "/assets/cartoon-penguins-assets/Png/Character11/Idle/All Characters-Character11-Idle_00.png",
    animations: {
      idle: {
        frames: generateFramePaths("penguin", "character11", "idle", 20),
        fps: 12,
      },
      walk: {
        frames: generateFramePaths("penguin", "character11", "walk", 30),
        fps: 12,
      },
      jump: {
        frames: generateFramePaths("penguin", "character11", "jump", 20),
        fps: 14,
      },
      hit: {
        frames: generateFramePaths("penguin", "character11", "hit", 35),
        fps: 14,
      },
      roll: {
        frames: generateFramePaths("penguin", "character11", "roll", 8),
        fps: 10,
      },
      fly: {
        frames: generateFramePaths("penguin", "character11", "fly", 20),
        fps: 12,
      },
      throwing: {
        frames: generateFramePaths("penguin", "character11", "throwing", 35),
        fps: 14,
      },
      dead: {
        frames: generateFramePaths("penguin", "character11", "dead", 45),
        fps: 14,
      },
      stuned: {
        frames: generateFramePaths("penguin", "character11", "confused"),
        fps: 14,
      },
    },
    price: 650,
    owned: false,
  },
  "penguin-12": {
    id: "penguin-12",
    name: "Wise Penguin",
    species: "penguin",
    character: "character12",
    thumbnail: "/assets/cartoon-penguins-assets/Png/Character12/Idle/All Characters-Character12-Idle_00.png",
    animations: {
      idle: {
        frames: generateFramePaths("penguin", "character12", "idle", 20),
        fps: 12,
      },
      walk: {
        frames: generateFramePaths("penguin", "character12", "walk", 30),
        fps: 12,
      },
      jump: {
        frames: generateFramePaths("penguin", "character12", "jump", 20),
        fps: 14,
      },
      hit: {
        frames: generateFramePaths("penguin", "character12", "hit", 35),
        fps: 14,
      },
      roll: {
        frames: generateFramePaths("penguin", "character12", "roll", 8),
        fps: 10,
      },
      fly: {
        frames: generateFramePaths("penguin", "character12", "fly", 20),
        fps: 12,
      },
      throwing: {
        frames: generateFramePaths("penguin", "character12", "throwing", 35),
        fps: 14,
      },
      dead: {
        frames: generateFramePaths("penguin", "character12", "dead", 45),
        fps: 14,
      },
      stuned: {
        frames: generateFramePaths("penguin", "character12", "confused"),
        fps: 14,
      },
    },
    price: 700,
    owned: false,
  },
  "penguin-13": {
    id: "penguin-13",
    name: "Cool Penguin",
    species: "penguin",
    character: "character13",
    thumbnail: "/assets/cartoon-penguins-assets/Png/Character13/Idle/All Characters-Character13-Idle_00.png",
    animations: {
      idle: {
        frames: generateFramePaths("penguin", "character13", "idle", 20),
        fps: 12,
      },
      walk: {
        frames: generateFramePaths("penguin", "character13", "walk", 30),
        fps: 12,
      },
      jump: {
        frames: generateFramePaths("penguin", "character13", "jump", 20),
        fps: 14,
      },
      hit: {
        frames: generateFramePaths("penguin", "character13", "hit", 35),
        fps: 14,
      },
      roll: {
        frames: generateFramePaths("penguin", "character13", "roll", 8),
        fps: 10,
      },
      fly: {
        frames: generateFramePaths("penguin", "character13", "fly", 20),
        fps: 12,
      },
      throwing: {
        frames: generateFramePaths("penguin", "character13", "throwing", 35),
        fps: 14,
      },
      dead: {
        frames: generateFramePaths("penguin", "character13", "dead", 45),
        fps: 14,
      },
      stuned: {
        frames: generateFramePaths("penguin", "character13", "confused"),
        fps: 14,
      },
    },
    price: 750,
    owned: false,
  },
  "penguin-14": {
    id: "penguin-14",
    name: "Warm Penguin",
    species: "penguin",
    character: "character14",
    thumbnail: "/assets/cartoon-penguins-assets/Png/Character14/Idle/All Characters-Character14-Idle_00.png",
    animations: {
      idle: {
        frames: generateFramePaths("penguin", "character14", "idle", 20),
        fps: 12,
      },
      walk: {
        frames: generateFramePaths("penguin", "character14", "walk", 30),
        fps: 12,
      },
      jump: {
        frames: generateFramePaths("penguin", "character14", "jump", 20),
        fps: 14,
      },
      hit: {
        frames: generateFramePaths("penguin", "character14", "hit", 35),
        fps: 14,
      },
      roll: {
        frames: generateFramePaths("penguin", "character14", "roll", 8),
        fps: 10,
      },
      fly: {
        frames: generateFramePaths("penguin", "character14", "fly", 20),
        fps: 12,
      },
      throwing: {
        frames: generateFramePaths("penguin", "character14", "throwing", 35),
        fps: 14,
      },
      dead: {
        frames: generateFramePaths("penguin", "character14", "dead", 45),
        fps: 14,
      },
      stuned: {
        frames: generateFramePaths("penguin", "character14", "confused"),
        fps: 14,
      },
    },
    price: 800,
    owned: false,
  },
  "penguin-15": {
    id: "penguin-15",
    name: "Friendly Penguin",
    species: "penguin",
    character: "character15",
    thumbnail: "/assets/cartoon-penguins-assets/Png/Character15/Idle/All Characters-Character15-Idle_00.png",
    animations: {
      idle: {
        frames: generateFramePaths("penguin", "character15", "idle", 20),
        fps: 12,
      },
      walk: {
        frames: generateFramePaths("penguin", "character15", "walk", 30),
        fps: 12,
      },
      jump: {
        frames: generateFramePaths("penguin", "character15", "jump", 20),
        fps: 14,
      },
      hit: {
        frames: generateFramePaths("penguin", "character15", "hit", 35),
        fps: 14,
      },
      roll: {
        frames: generateFramePaths("penguin", "character15", "roll", 8),
        fps: 10,
      },
      fly: {
        frames: generateFramePaths("penguin", "character15", "fly", 20),
        fps: 12,
      },
      throwing: {
        frames: generateFramePaths("penguin", "character15", "throwing", 35),
        fps: 14,
      },
      dead: {
        frames: generateFramePaths("penguin", "character15", "dead", 45),
        fps: 14,
      },
      stuned: {
        frames: generateFramePaths("penguin", "character15", "confused"),
        fps: 14,
      },
    },
    price: 850,
    owned: false,
  },
  "duckling-01": {
    id: "duckling-01",
    name: "Classic Duckling",
    species: "duckling",
    character: "character01",
    thumbnail: "/assets/cute-ducklings-assets/Png/Character01/Idle/Characters-Character01-Idle_00.png",
    animations: {
      idle: {
        frames: generateFramePaths("duckling", "character01", "idle", 20),
        fps: 12,
      },
      walk: {
        frames: generateFramePaths("duckling", "character01", "walk", 20),
        fps: 12,
      },
      jump: {
        frames: generateFramePaths("duckling", "character01", "jump", 20),
        fps: 14,
      },
      hit: {
        frames: generateFramePaths("duckling", "character01", "hit", 40),
        fps: 14,
      },
      roll: {
        frames: generateFramePaths("duckling", "character01", "roll", 8),
        fps: 10,
      },
      fly: {
        frames: generateFramePaths("duckling", "character01", "fly", 20),
        fps: 12,
      },
      throwing: {
        frames: generateFramePaths("duckling", "character01", "throwing", 35),
        fps: 14,
      },
      dead: {
        frames: generateFramePaths("duckling", "character01", "dead", 45),
        fps: 14,
      },
      stuned: {
        frames: generateFramePaths("duckling", "character01", "stuned"),
        fps: 14,
      },
    },
    price: 120,
    owned: false,
  },
  "duckling-02": {
    id: "duckling-02",
    name: "Cheerful Duckling",
    species: "duckling",
    character: "character02",
    thumbnail: "/assets/cute-ducklings-assets/Png/Character02/Idle/Characters-Character02-Idle_00.png",
    animations: {
      idle: {
        frames: generateFramePaths("duckling", "character02", "idle", 20),
        fps: 12,
      },
      walk: {
        frames: generateFramePaths("duckling", "character02", "walk", 20),
        fps: 12,
      },
      jump: {
        frames: generateFramePaths("duckling", "character02", "jump", 20),
        fps: 14,
      },
      hit: {
        frames: generateFramePaths("duckling", "character02", "hit", 40),
        fps: 14,
      },
      roll: {
        frames: generateFramePaths("duckling", "character02", "roll", 8),
        fps: 10,
      },
      fly: {
        frames: generateFramePaths("duckling", "character02", "fly", 20),
        fps: 12,
      },
      throwing: {
        frames: generateFramePaths("duckling", "character02", "throwing", 35),
        fps: 14,
      },
      dead: {
        frames: generateFramePaths("duckling", "character02", "dead", 45),
        fps: 14,
      },
      stuned: {
        frames: generateFramePaths("duckling", "character02", "stuned"),
        fps: 14,
      },
    },
    price: 160,
    owned: false,
  },
  "duckling-03": {
    id: "duckling-03",
    name: "Sleepy Duckling",
    species: "duckling",
    character: "character03",
    thumbnail: "/assets/cute-ducklings-assets/Png/Character03/Idle/Characters-Character03-Idle_00.png",
    animations: {
      idle: {
        frames: generateFramePaths("duckling", "character03", "idle", 20),
        fps: 12,
      },
      walk: {
        frames: generateFramePaths("duckling", "character03", "walk", 20),
        fps: 12,
      },
      jump: {
        frames: generateFramePaths("duckling", "character03", "jump", 20),
        fps: 14,
      },
      hit: {
        frames: generateFramePaths("duckling", "character03", "hit", 40),
        fps: 14,
      },
      roll: {
        frames: generateFramePaths("duckling", "character03", "roll", 8),
        fps: 10,
      },
      fly: {
        frames: generateFramePaths("duckling", "character03", "fly", 20),
        fps: 12,
      },
      throwing: {
        frames: generateFramePaths("duckling", "character03", "throwing", 35),
        fps: 14,
      },
      dead: {
        frames: generateFramePaths("duckling", "character03", "dead", 45),
        fps: 14,
      },
      stuned: {
        frames: generateFramePaths("duckling", "character03", "stuned"),
        fps: 14,
      },
    },
    price: 200,
    owned: false,
  },
  "duckling-04": {
    id: "duckling-04",
    name: "Playful Duckling",
    species: "duckling",
    character: "character04",
    thumbnail: "/assets/cute-ducklings-assets/Png/Character04/Idle/Characters-Character04-Idle_00.png",
    animations: {
      idle: {
        frames: generateFramePaths("duckling", "character04", "idle", 20),
        fps: 12,
      },
      walk: {
        frames: generateFramePaths("duckling", "character04", "walk", 20),
        fps: 12,
      },
      jump: {
        frames: generateFramePaths("duckling", "character04", "jump", 20),
        fps: 14,
      },
      hit: {
        frames: generateFramePaths("duckling", "character04", "hit", 40),
        fps: 14,
      },
      roll: {
        frames: generateFramePaths("duckling", "character04", "roll", 8),
        fps: 10,
      },
      fly: {
        frames: generateFramePaths("duckling", "character04", "fly", 20),
        fps: 12,
      },
      throwing: {
        frames: generateFramePaths("duckling", "character04", "throwing", 35),
        fps: 14,
      },
      dead: {
        frames: generateFramePaths("duckling", "character04", "dead", 45),
        fps: 14,
      },
      stuned: {
        frames: generateFramePaths("duckling", "character04", "stuned"),
        fps: 14,
      },
    },
    price: 240,
    owned: false,
  },
  "duckling-05": {
    id: "duckling-05",
    name: "Shy Duckling",
    species: "duckling",
    character: "character05",
    thumbnail: "/assets/cute-ducklings-assets/Png/Character05/Idle/Characters-Character05-Idle_00.png",
    animations: {
      idle: {
        frames: generateFramePaths("duckling", "character05", "idle", 20),
        fps: 12,
      },
      walk: {
        frames: generateFramePaths("duckling", "character05", "walk", 20),
        fps: 12,
      },
      jump: {
        frames: generateFramePaths("duckling", "character05", "jump", 20),
        fps: 14,
      },
      hit: {
        frames: generateFramePaths("duckling", "character05", "hit", 40),
        fps: 14,
      },
      roll: {
        frames: generateFramePaths("duckling", "character05", "roll", 8),
        fps: 10,
      },
      fly: {
        frames: generateFramePaths("duckling", "character05", "fly", 20),
        fps: 12,
      },
      throwing: {
        frames: generateFramePaths("duckling", "character05", "throwing", 35),
        fps: 14,
      },
      dead: {
        frames: generateFramePaths("duckling", "character05", "dead", 45),
        fps: 14,
      },
      stuned: {
        frames: generateFramePaths("duckling", "character05", "stuned"),
        fps: 14,
      },
    },
    price: 280,
    owned: false,
  },
  "duckling-06": {
    id: "duckling-06",
    name: "Energetic Duckling",
    species: "duckling",
    character: "character06",
    thumbnail: "/assets/cute-ducklings-assets/Png/Character06/Idle/Characters-Character06-Idle_00.png",
    animations: {
      idle: {
        frames: generateFramePaths("duckling", "character06", "idle", 20),
        fps: 12,
      },
      walk: {
        frames: generateFramePaths("duckling", "character06", "walk", 20),
        fps: 12,
      },
      jump: {
        frames: generateFramePaths("duckling", "character06", "jump", 20),
        fps: 14,
      },
      hit: {
        frames: generateFramePaths("duckling", "character06", "hit", 40),
        fps: 14,
      },
      roll: {
        frames: generateFramePaths("duckling", "character06", "roll", 8),
        fps: 10,
      },
      fly: {
        frames: generateFramePaths("duckling", "character06", "fly", 20),
        fps: 12,
      },
      throwing: {
        frames: generateFramePaths("duckling", "character06", "throwing", 35),
        fps: 14,
      },
      dead: {
        frames: generateFramePaths("duckling", "character06", "dead", 45),
        fps: 14,
      },
      stuned: {
        frames: generateFramePaths("duckling", "character06", "stuned"),
        fps: 14,
      },
    },
    price: 320,
    owned: false,
  },
  "duckling-07": {
    id: "duckling-07",
    name: "Gentle Duckling",
    species: "duckling",
    character: "character07",
    thumbnail: "/assets/cute-ducklings-assets/Png/Character07/Idle/Characters-Character07-Idle_00.png",
    animations: {
      idle: {
        frames: generateFramePaths("duckling", "character07", "idle", 20),
        fps: 12,
      },
      walk: {
        frames: generateFramePaths("duckling", "character07", "walk", 20),
        fps: 12,
      },
      jump: {
        frames: generateFramePaths("duckling", "character07", "jump", 20),
        fps: 14,
      },
      hit: {
        frames: generateFramePaths("duckling", "character07", "hit", 40),
        fps: 14,
      },
      roll: {
        frames: generateFramePaths("duckling", "character07", "roll", 8),
        fps: 10,
      },
      fly: {
        frames: generateFramePaths("duckling", "character07", "fly", 20),
        fps: 12,
      },
      throwing: {
        frames: generateFramePaths("duckling", "character07", "throwing", 35),
        fps: 14,
      },
      dead: {
        frames: generateFramePaths("duckling", "character07", "dead", 45),
        fps: 14,
      },
      stuned: {
        frames: generateFramePaths("duckling", "character07", "stuned"),
        fps: 14,
      },
    },
    price: 360,
    owned: false,
  },
  "duckling-08": {
    id: "duckling-08",
    name: "Curious Duckling",
    species: "duckling",
    character: "character08",
    thumbnail: "/assets/cute-ducklings-assets/Png/Character08/Idle/Characters-Character08-Idle_00.png",
    animations: {
      idle: {
        frames: generateFramePaths("duckling", "character08", "idle", 20),
        fps: 12,
      },
      walk: {
        frames: generateFramePaths("duckling", "character08", "walk", 20),
        fps: 12,
      },
      jump: {
        frames: generateFramePaths("duckling", "character08", "jump", 20),
        fps: 14,
      },
      hit: {
        frames: generateFramePaths("duckling", "character08", "hit", 40),
        fps: 14,
      },
      roll: {
        frames: generateFramePaths("duckling", "character08", "roll", 8),
        fps: 10,
      },
      fly: {
        frames: generateFramePaths("duckling", "character08", "fly", 20),
        fps: 12,
      },
      throwing: {
        frames: generateFramePaths("duckling", "character08", "throwing", 35),
        fps: 14,
      },
      dead: {
        frames: generateFramePaths("duckling", "character08", "dead", 45),
        fps: 14,
      },
      stuned: {
        frames: generateFramePaths("duckling", "character08", "stuned"),
        fps: 14,
      },
    },
    price: 400,
    owned: false,
  },
  "duckling-09": {
    id: "duckling-09",
    name: "Brave Duckling",
    species: "duckling",
    character: "character09",
    thumbnail: "/assets/cute-ducklings-assets/Png/Character09/Idle/Characters-Character09-Idle_00.png",
    animations: {
      idle: {
        frames: generateFramePaths("duckling", "character09", "idle", 20),
        fps: 12,
      },
      walk: {
        frames: generateFramePaths("duckling", "character09", "walk", 20),
        fps: 12,
      },
      jump: {
        frames: generateFramePaths("duckling", "character09", "jump", 20),
        fps: 14,
      },
      hit: {
        frames: generateFramePaths("duckling", "character09", "hit", 40),
        fps: 14,
      },
      roll: {
        frames: generateFramePaths("duckling", "character09", "roll", 8),
        fps: 10,
      },
      fly: {
        frames: generateFramePaths("duckling", "character09", "fly", 20),
        fps: 12,
      },
      throwing: {
        frames: generateFramePaths("duckling", "character09", "throwing", 35),
        fps: 14,
      },
      dead: {
        frames: generateFramePaths("duckling", "character09", "dead", 45),
        fps: 14,
      },
      stuned: {
        frames: generateFramePaths("duckling", "character09", "stuned"),
        fps: 14,
      },
    },
    price: 440,
    owned: false,
  },
  "duckling-10": {
    id: "duckling-10",
    name: "Sweet Duckling",
    species: "duckling",
    character: "character10",
    thumbnail: "/assets/cute-ducklings-assets/Png/Character10/Idle/Characters-Character10-Idle_00.png",
    animations: {
      idle: {
        frames: generateFramePaths("duckling", "character10", "idle", 20),
        fps: 12,
      },
      walk: {
        frames: generateFramePaths("duckling", "character10", "walk", 20),
        fps: 12,
      },
      jump: {
        frames: generateFramePaths("duckling", "character10", "jump", 20),
        fps: 14,
      },
      hit: {
        frames: generateFramePaths("duckling", "character10", "hit", 40),
        fps: 14,
      },
      roll: {
        frames: generateFramePaths("duckling", "character10", "roll", 8),
        fps: 10,
      },
      fly: {
        frames: generateFramePaths("duckling", "character10", "fly", 20),
        fps: 12,
      },
      throwing: {
        frames: generateFramePaths("duckling", "character10", "throwing", 35),
        fps: 14,
      },
      dead: {
        frames: generateFramePaths("duckling", "character10", "dead", 45),
        fps: 14,
      },
      stuned: {
        frames: generateFramePaths("duckling", "character10", "stuned"),
        fps: 14,
      },
    },
    price: 480,
    owned: false,
  },
  "duckling-11": {
    id: "duckling-11",
    name: "Silly Duckling",
    species: "duckling",
    character: "character11",
    thumbnail: "/assets/cute-ducklings-assets/Png/Character11/Idle/Characters-Character11-Idle_00.png",
    animations: {
      idle: {
        frames: generateFramePaths("duckling", "character11", "idle", 20),
        fps: 12,
      },
      walk: {
        frames: generateFramePaths("duckling", "character11", "walk", 20),
        fps: 12,
      },
      jump: {
        frames: generateFramePaths("duckling", "character11", "jump", 20),
        fps: 14,
      },
      hit: {
        frames: generateFramePaths("duckling", "character11", "hit", 40),
        fps: 14,
      },
      roll: {
        frames: generateFramePaths("duckling", "character11", "roll", 8),
        fps: 10,
      },
      fly: {
        frames: generateFramePaths("duckling", "character11", "fly", 20),
        fps: 12,
      },
      throwing: {
        frames: generateFramePaths("duckling", "character11", "throwing", 35),
        fps: 14,
      },
      dead: {
        frames: generateFramePaths("duckling", "character11", "dead", 45),
        fps: 14,
      },
      stuned: {
        frames: generateFramePaths("duckling", "character11", "stuned"),
        fps: 14,
      },
    },
    price: 520,
    owned: false,
  },
  "duckling-12": {
    id: "duckling-12",
    name: "Wise Duckling",
    species: "duckling",
    character: "character12",
    thumbnail: "/assets/cute-ducklings-assets/Png/Character12/Idle/Characters-Character12-Idle_00.png",
    animations: {
      idle: {
        frames: generateFramePaths("duckling", "character12", "idle", 20),
        fps: 12,
      },
      walk: {
        frames: generateFramePaths("duckling", "character12", "walk", 20),
        fps: 12,
      },
      jump: {
        frames: generateFramePaths("duckling", "character12", "jump", 20),
        fps: 14,
      },
      hit: {
        frames: generateFramePaths("duckling", "character12", "hit", 40),
        fps: 14,
      },
      roll: {
        frames: generateFramePaths("duckling", "character12", "roll", 8),
        fps: 10,
      },
      fly: {
        frames: generateFramePaths("duckling", "character12", "fly", 20),
        fps: 12,
      },
      throwing: {
        frames: generateFramePaths("duckling", "character12", "throwing", 35),
        fps: 14,
      },
      dead: {
        frames: generateFramePaths("duckling", "character12", "dead", 45),
        fps: 14,
      },
      stuned: {
        frames: generateFramePaths("duckling", "character12", "stuned"),
        fps: 14,
      },
    },
    price: 560,
    owned: false,
  },
  "duckling-13": {
    id: "duckling-13",
    name: "Cool Duckling",
    species: "duckling",
    character: "character13",
    thumbnail: "/assets/cute-ducklings-assets/Png/Character13/Idle/Characters-Character13-Idle_00.png",
    animations: {
      idle: {
        frames: generateFramePaths("duckling", "character13", "idle", 20),
        fps: 12,
      },
      walk: {
        frames: generateFramePaths("duckling", "character13", "walk", 20),
        fps: 12,
      },
      jump: {
        frames: generateFramePaths("duckling", "character13", "jump", 20),
        fps: 14,
      },
      hit: {
        frames: generateFramePaths("duckling", "character13", "hit", 40),
        fps: 14,
      },
      roll: {
        frames: generateFramePaths("duckling", "character13", "roll", 8),
        fps: 10,
      },
      fly: {
        frames: generateFramePaths("duckling", "character13", "fly", 20),
        fps: 12,
      },
      throwing: {
        frames: generateFramePaths("duckling", "character13", "throwing", 35),
        fps: 14,
      },
      dead: {
        frames: generateFramePaths("duckling", "character13", "dead", 45),
        fps: 14,
      },
      stuned: {
        frames: generateFramePaths("duckling", "character13", "stuned"),
        fps: 14,
      },
    },
    price: 600,
    owned: false,
  },
  "duckling-14": {
    id: "duckling-14",
    name: "Warm Duckling",
    species: "duckling",
    character: "character14",
    thumbnail: "/assets/cute-ducklings-assets/Png/Character14/Idle/Characters-Character14-Idle_00.png",
    animations: {
      idle: {
        frames: generateFramePaths("duckling", "character14", "idle", 20),
        fps: 12,
      },
      walk: {
        frames: generateFramePaths("duckling", "character14", "walk", 20),
        fps: 12,
      },
      jump: {
        frames: generateFramePaths("duckling", "character14", "jump", 20),
        fps: 14,
      },
      hit: {
        frames: generateFramePaths("duckling", "character14", "hit", 40),
        fps: 14,
      },
      roll: {
        frames: generateFramePaths("duckling", "character14", "roll", 8),
        fps: 10,
      },
      fly: {
        frames: generateFramePaths("duckling", "character14", "fly", 20),
        fps: 12,
      },
      throwing: {
        frames: generateFramePaths("duckling", "character14", "throwing", 35),
        fps: 14,
      },
      dead: {
        frames: generateFramePaths("duckling", "character14", "dead", 45),
        fps: 14,
      },
      stuned: {
        frames: generateFramePaths("duckling", "character14", "stuned"),
        fps: 14,
      },
    },
    price: 640,
    owned: false,
  },
  "duckling-15": {
    id: "duckling-15",
    name: "Friendly Duckling",
    species: "duckling",
    character: "character15",
    thumbnail: "/assets/cute-ducklings-assets/Png/Character15/Idle/Characters-Character15-Idle_00.png",
    animations: {
      idle: {
        frames: generateFramePaths("duckling", "character15", "idle", 20),
        fps: 12,
      },
      walk: {
        frames: generateFramePaths("duckling", "character15", "walk", 20),
        fps: 12,
      },
      jump: {
        frames: generateFramePaths("duckling", "character15", "jump", 20),
        fps: 14,
      },
      hit: {
        frames: generateFramePaths("duckling", "character15", "hit", 40),
        fps: 14,
      },
      roll: {
        frames: generateFramePaths("duckling", "character15", "roll", 8),
        fps: 10,
      },
      fly: {
        frames: generateFramePaths("duckling", "character15", "fly", 20),
        fps: 12,
      },
      throwing: {
        frames: generateFramePaths("duckling", "character15", "throwing", 35),
        fps: 14,
      },
      dead: {
        frames: generateFramePaths("duckling", "character15", "dead", 45),
        fps: 14,
      },
      stuned: {
        frames: generateFramePaths("duckling", "character15", "stuned"),
        fps: 14,
      },
    },
    price: 680,
    owned: false,
  },
  "koala-01": {
    id: "koala-01",
    name: "Classic Koala",
    species: "koala",
    character: "character01",
    thumbnail: "/assets/cute-koalas-assets/Png/Character01/Idle/Characters-Character01-Idle_00.png",
    animations: {
      idle: {
        frames: generateFramePaths("koala", "character01", "idle", 20),
        fps: 12,
      },
      walk: {
        frames: generateFramePaths("koala", "character01", "walk", 30),
        fps: 12,
      },
      jump: {
        frames: generateFramePaths("koala", "character01", "jump", 20),
        fps: 14,
      },
      hit: {
        frames: generateFramePaths("koala", "character01", "hit", 45),
        fps: 14,
      },
      roll: {
        frames: generateFramePaths("koala", "character01", "roll", 8),
        fps: 10,
      },
      fly: {
        frames: generateFramePaths("koala", "character01", "fly", 20),
        fps: 12,
      },
      throwing: {
        frames: generateFramePaths("koala", "character01", "throwing", 35),
        fps: 14,
      },
      dead: {
        frames: generateFramePaths("koala", "character01", "dead", 50),
        fps: 14,
      },
      stuned: {
        frames: generateFramePaths("koala", "character01", "stuned"),
        fps: 14,
      },
    },
    price: 200,
    owned: false,
  },
  "koala-02": {
    id: "koala-02",
    name: "Cheerful Koala",
    species: "koala",
    character: "character02",
    thumbnail: "/assets/cute-koalas-assets/Png/Character02/Idle/Characters-Character02-Idle_00.png",
    animations: {
      idle: {
        frames: generateFramePaths("koala", "character02", "idle", 20),
        fps: 12,
      },
      walk: {
        frames: generateFramePaths("koala", "character02", "walk", 30),
        fps: 12,
      },
      jump: {
        frames: generateFramePaths("koala", "character02", "jump", 20),
        fps: 14,
      },
      hit: {
        frames: generateFramePaths("koala", "character02", "hit", 45),
        fps: 14,
      },
      roll: {
        frames: generateFramePaths("koala", "character02", "roll", 8),
        fps: 10,
      },
      fly: {
        frames: generateFramePaths("koala", "character02", "fly", 20),
        fps: 12,
      },
      throwing: {
        frames: generateFramePaths("koala", "character02", "throwing", 35),
        fps: 14,
      },
      dead: {
        frames: generateFramePaths("koala", "character02", "dead", 50),
        fps: 14,
      },
      stuned: {
        frames: generateFramePaths("koala", "character02", "stuned"),
        fps: 14,
      },
    },
    price: 250,
    owned: false,
  },
  "koala-03": {
    id: "koala-03",
    name: "Sleepy Koala",
    species: "koala",
    character: "character03",
    thumbnail: "/assets/cute-koalas-assets/Png/Character03/Idle/Characters-Character03-Idle_00.png",
    animations: {
      idle: {
        frames: generateFramePaths("koala", "character03", "idle", 20),
        fps: 12,
      },
      walk: {
        frames: generateFramePaths("koala", "character03", "walk", 30),
        fps: 12,
      },
      jump: {
        frames: generateFramePaths("koala", "character03", "jump", 20),
        fps: 14,
      },
      hit: {
        frames: generateFramePaths("koala", "character03", "hit", 45),
        fps: 14,
      },
      roll: {
        frames: generateFramePaths("koala", "character03", "roll", 8),
        fps: 10,
      },
      fly: {
        frames: generateFramePaths("koala", "character03", "fly", 20),
        fps: 12,
      },
      throwing: {
        frames: generateFramePaths("koala", "character03", "throwing", 35),
        fps: 14,
      },
      dead: {
        frames: generateFramePaths("koala", "character03", "dead", 50),
        fps: 14,
      },
      stuned: {
        frames: generateFramePaths("koala", "character03", "stuned"),
        fps: 14,
      },
    },
    price: 300,
    owned: false,
  },
  "koala-04": {
    id: "koala-04",
    name: "Playful Koala",
    species: "koala",
    character: "character04",
    thumbnail: "/assets/cute-koalas-assets/Png/Character04/Idle/Characters-Character04-Idle_00.png",
    animations: {
      idle: {
        frames: generateFramePaths("koala", "character04", "idle", 20),
        fps: 12,
      },
      walk: {
        frames: generateFramePaths("koala", "character04", "walk", 30),
        fps: 12,
      },
      jump: {
        frames: generateFramePaths("koala", "character04", "jump", 20),
        fps: 14,
      },
      hit: {
        frames: generateFramePaths("koala", "character04", "hit", 45),
        fps: 14,
      },
      roll: {
        frames: generateFramePaths("koala", "character04", "roll", 8),
        fps: 10,
      },
      fly: {
        frames: generateFramePaths("koala", "character04", "fly", 20),
        fps: 12,
      },
      throwing: {
        frames: generateFramePaths("koala", "character04", "throwing", 35),
        fps: 14,
      },
      dead: {
        frames: generateFramePaths("koala", "character04", "dead", 50),
        fps: 14,
      },
      stuned: {
        frames: generateFramePaths("koala", "character04", "stuned"),
        fps: 14,
      },
    },
    price: 350,
    owned: false,
  },
  "koala-05": {
    id: "koala-05",
    name: "Shy Koala",
    species: "koala",
    character: "character05",
    thumbnail: "/assets/cute-koalas-assets/Png/Character05/Idle/Characters-Character05-Idle_00.png",
    animations: {
      idle: {
        frames: generateFramePaths("koala", "character05", "idle", 20),
        fps: 12,
      },
      walk: {
        frames: generateFramePaths("koala", "character05", "walk", 30),
        fps: 12,
      },
      jump: {
        frames: generateFramePaths("koala", "character05", "jump", 20),
        fps: 14,
      },
      hit: {
        frames: generateFramePaths("koala", "character05", "hit", 45),
        fps: 14,
      },
      roll: {
        frames: generateFramePaths("koala", "character05", "roll", 8),
        fps: 10,
      },
      fly: {
        frames: generateFramePaths("koala", "character05", "fly", 20),
        fps: 12,
      },
      throwing: {
        frames: generateFramePaths("koala", "character05", "throwing", 35),
        fps: 14,
      },
      dead: {
        frames: generateFramePaths("koala", "character05", "dead", 50),
        fps: 14,
      },
      stuned: {
        frames: generateFramePaths("koala", "character05", "stuned"),
        fps: 14,
      },
    },
    price: 400,
    owned: false,
  },
  "koala-06": {
    id: "koala-06",
    name: "Energetic Koala",
    species: "koala",
    character: "character06",
    thumbnail: "/assets/cute-koalas-assets/Png/Character06/Idle/Characters-Character06-Idle_00.png",
    animations: {
      idle: {
        frames: generateFramePaths("koala", "character06", "idle", 20),
        fps: 12,
      },
      walk: {
        frames: generateFramePaths("koala", "character06", "walk", 30),
        fps: 12,
      },
      jump: {
        frames: generateFramePaths("koala", "character06", "jump", 20),
        fps: 14,
      },
      hit: {
        frames: generateFramePaths("koala", "character06", "hit", 45),
        fps: 14,
      },
      roll: {
        frames: generateFramePaths("koala", "character06", "roll", 8),
        fps: 10,
      },
      fly: {
        frames: generateFramePaths("koala", "character06", "fly", 20),
        fps: 12,
      },
      throwing: {
        frames: generateFramePaths("koala", "character06", "throwing", 35),
        fps: 14,
      },
      dead: {
        frames: generateFramePaths("koala", "character06", "dead", 50),
        fps: 14,
      },
      stuned: {
        frames: generateFramePaths("koala", "character06", "stuned"),
        fps: 14,
      },
    },
    price: 450,
    owned: false,
  },
  "koala-07": {
    id: "koala-07",
    name: "Gentle Koala",
    species: "koala",
    character: "character07",
    thumbnail: "/assets/cute-koalas-assets/Png/Character07/Idle/Characters-Character07-Idle_00.png",
    animations: {
      idle: {
        frames: generateFramePaths("koala", "character07", "idle", 20),
        fps: 12,
      },
      walk: {
        frames: generateFramePaths("koala", "character07", "walk", 30),
        fps: 12,
      },
      jump: {
        frames: generateFramePaths("koala", "character07", "jump", 20),
        fps: 14,
      },
      hit: {
        frames: generateFramePaths("koala", "character07", "hit", 45),
        fps: 14,
      },
      roll: {
        frames: generateFramePaths("koala", "character07", "roll", 8),
        fps: 10,
      },
      fly: {
        frames: generateFramePaths("koala", "character07", "fly", 20),
        fps: 12,
      },
      throwing: {
        frames: generateFramePaths("koala", "character07", "throwing", 35),
        fps: 14,
      },
      dead: {
        frames: generateFramePaths("koala", "character07", "dead", 50),
        fps: 14,
      },
      stuned: {
        frames: generateFramePaths("koala", "character07", "stuned"),
        fps: 14,
      },
    },
    price: 500,
    owned: false,
  },
  "koala-08": {
    id: "koala-08",
    name: "Curious Koala",
    species: "koala",
    character: "character08",
    thumbnail: "/assets/cute-koalas-assets/Png/Character08/Idle/Characters-Character08-Idle_00.png",
    animations: {
      idle: {
        frames: generateFramePaths("koala", "character08", "idle", 20),
        fps: 12,
      },
      walk: {
        frames: generateFramePaths("koala", "character08", "walk", 30),
        fps: 12,
      },
      jump: {
        frames: generateFramePaths("koala", "character08", "jump", 20),
        fps: 14,
      },
      hit: {
        frames: generateFramePaths("koala", "character08", "hit", 45),
        fps: 14,
      },
      roll: {
        frames: generateFramePaths("koala", "character08", "roll", 8),
        fps: 10,
      },
      fly: {
        frames: generateFramePaths("koala", "character08", "fly", 20),
        fps: 12,
      },
      throwing: {
        frames: generateFramePaths("koala", "character08", "throwing", 35),
        fps: 14,
      },
      dead: {
        frames: generateFramePaths("koala", "character08", "dead", 50),
        fps: 14,
      },
      stuned: {
        frames: generateFramePaths("koala", "character08", "stuned"),
        fps: 14,
      },
    },
    price: 550,
    owned: false,
  },
  "koala-09": {
    id: "koala-09",
    name: "Brave Koala",
    species: "koala",
    character: "character09",
    thumbnail: "/assets/cute-koalas-assets/Png/Character09/Idle/Characters-Character09-Idle_00.png",
    animations: {
      idle: {
        frames: generateFramePaths("koala", "character09", "idle", 20),
        fps: 12,
      },
      walk: {
        frames: generateFramePaths("koala", "character09", "walk", 30),
        fps: 12,
      },
      jump: {
        frames: generateFramePaths("koala", "character09", "jump", 20),
        fps: 14,
      },
      hit: {
        frames: generateFramePaths("koala", "character09", "hit", 45),
        fps: 14,
      },
      roll: {
        frames: generateFramePaths("koala", "character09", "roll", 8),
        fps: 10,
      },
      fly: {
        frames: generateFramePaths("koala", "character09", "fly", 20),
        fps: 12,
      },
      throwing: {
        frames: generateFramePaths("koala", "character09", "throwing", 35),
        fps: 14,
      },
      dead: {
        frames: generateFramePaths("koala", "character09", "dead", 50),
        fps: 14,
      },
      stuned: {
        frames: generateFramePaths("koala", "character09", "stuned"),
        fps: 14,
      },
    },
    price: 600,
    owned: false,
  },
  "koala-10": {
    id: "koala-10",
    name: "Sweet Koala",
    species: "koala",
    character: "character10",
    thumbnail: "/assets/cute-koalas-assets/Png/Character10/Idle/Characters-Character10-Idle_00.png",
    animations: {
      idle: {
        frames: generateFramePaths("koala", "character10", "idle", 20),
        fps: 12,
      },
      walk: {
        frames: generateFramePaths("koala", "character10", "walk", 30),
        fps: 12,
      },
      jump: {
        frames: generateFramePaths("koala", "character10", "jump", 20),
        fps: 14,
      },
      hit: {
        frames: generateFramePaths("koala", "character10", "hit", 45),
        fps: 14,
      },
      roll: {
        frames: generateFramePaths("koala", "character10", "roll", 8),
        fps: 10,
      },
      fly: {
        frames: generateFramePaths("koala", "character10", "fly", 20),
        fps: 12,
      },
      throwing: {
        frames: generateFramePaths("koala", "character10", "throwing", 35),
        fps: 14,
      },
      dead: {
        frames: generateFramePaths("koala", "character10", "dead", 50),
        fps: 14,
      },
      stuned: {
        frames: generateFramePaths("koala", "character10", "stuned"),
        fps: 14,
      },
    },
    price: 650,
    owned: false,
  },
  "koala-11": {
    id: "koala-11",
    name: "Silly Koala",
    species: "koala",
    character: "character11",
    thumbnail: "/assets/cute-koalas-assets/Png/Character11/Idle/Characters-Character11-Idle_00.png",
    animations: {
      idle: {
        frames: generateFramePaths("koala", "character11", "idle", 20),
        fps: 12,
      },
      walk: {
        frames: generateFramePaths("koala", "character11", "walk", 30),
        fps: 12,
      },
      jump: {
        frames: generateFramePaths("koala", "character11", "jump", 20),
        fps: 14,
      },
      hit: {
        frames: generateFramePaths("koala", "character11", "hit", 45),
        fps: 14,
      },
      roll: {
        frames: generateFramePaths("koala", "character11", "roll", 8),
        fps: 10,
      },
      fly: {
        frames: generateFramePaths("koala", "character11", "fly", 20),
        fps: 12,
      },
      throwing: {
        frames: generateFramePaths("koala", "character11", "throwing", 35),
        fps: 14,
      },
      dead: {
        frames: generateFramePaths("koala", "character11", "dead", 50),
        fps: 14,
      },
      stuned: {
        frames: generateFramePaths("koala", "character11", "stuned"),
        fps: 14,
      },
    },
    price: 700,
    owned: false,
  },
  "koala-12": {
    id: "koala-12",
    name: "Wise Koala",
    species: "koala",
    character: "character12",
    thumbnail: "/assets/cute-koalas-assets/Png/Character12/Idle/Characters-Character12-Idle_00.png",
    animations: {
      idle: {
        frames: generateFramePaths("koala", "character12", "idle", 20),
        fps: 12,
      },
      walk: {
        frames: generateFramePaths("koala", "character12", "walk", 30),
        fps: 12,
      },
      jump: {
        frames: generateFramePaths("koala", "character12", "jump", 20),
        fps: 14,
      },
      hit: {
        frames: generateFramePaths("koala", "character12", "hit", 45),
        fps: 14,
      },
      roll: {
        frames: generateFramePaths("koala", "character12", "roll", 8),
        fps: 10,
      },
      fly: {
        frames: generateFramePaths("koala", "character12", "fly", 20),
        fps: 12,
      },
      throwing: {
        frames: generateFramePaths("koala", "character12", "throwing", 35),
        fps: 14,
      },
      dead: {
        frames: generateFramePaths("koala", "character12", "dead", 50),
        fps: 14,
      },
      stuned: {
        frames: generateFramePaths("koala", "character12", "stuned"),
        fps: 14,
      },
    },
    price: 750,
    owned: false,
  },
  "koala-13": {
    id: "koala-13",
    name: "Cool Koala",
    species: "koala",
    character: "character13",
    thumbnail: "/assets/cute-koalas-assets/Png/Character13/Idle/Characters-Character13-Idle_00.png",
    animations: {
      idle: {
        frames: generateFramePaths("koala", "character13", "idle", 20),
        fps: 12,
      },
      walk: {
        frames: generateFramePaths("koala", "character13", "walk", 30),
        fps: 12,
      },
      jump: {
        frames: generateFramePaths("koala", "character13", "jump", 20),
        fps: 14,
      },
      hit: {
        frames: generateFramePaths("koala", "character13", "hit", 45),
        fps: 14,
      },
      roll: {
        frames: generateFramePaths("koala", "character13", "roll", 8),
        fps: 10,
      },
      fly: {
        frames: generateFramePaths("koala", "character13", "fly", 20),
        fps: 12,
      },
      throwing: {
        frames: generateFramePaths("koala", "character13", "throwing", 35),
        fps: 14,
      },
      dead: {
        frames: generateFramePaths("koala", "character13", "dead", 50),
        fps: 14,
      },
      stuned: {
        frames: generateFramePaths("koala", "character13", "stuned"),
        fps: 14,
      },
    },
    price: 800,
    owned: false,
  },
  "koala-14": {
    id: "koala-14",
    name: "Warm Koala",
    species: "koala",
    character: "character14",
    thumbnail: "/assets/cute-koalas-assets/Png/Character14/Idle/Characters-Character14-Idle_00.png",
    animations: {
      idle: {
        frames: generateFramePaths("koala", "character14", "idle", 20),
        fps: 12,
      },
      walk: {
        frames: generateFramePaths("koala", "character14", "walk", 30),
        fps: 12,
      },
      jump: {
        frames: generateFramePaths("koala", "character14", "jump", 20),
        fps: 14,
      },
      hit: {
        frames: generateFramePaths("koala", "character14", "hit", 45),
        fps: 14,
      },
      roll: {
        frames: generateFramePaths("koala", "character14", "roll", 8),
        fps: 10,
      },
      fly: {
        frames: generateFramePaths("koala", "character14", "fly", 20),
        fps: 12,
      },
      throwing: {
        frames: generateFramePaths("koala", "character14", "throwing", 35),
        fps: 14,
      },
      dead: {
        frames: generateFramePaths("koala", "character14", "dead", 50),
        fps: 14,
      },
      stuned: {
        frames: generateFramePaths("koala", "character14", "stuned"),
        fps: 14,
      },
    },
    price: 850,
    owned: false,
  },
  "koala-15": {
    id: "koala-15",
    name: "Friendly Koala",
    species: "koala",
    character: "character15",
    thumbnail: "/assets/cute-koalas-assets/Png/Character15/Idle/Characters-Character15-Idle_00.png",
    animations: {
      idle: {
        frames: generateFramePaths("koala", "character15", "idle", 20),
        fps: 12,
      },
      walk: {
        frames: generateFramePaths("koala", "character15", "walk", 30),
        fps: 12,
      },
      jump: {
        frames: generateFramePaths("koala", "character15", "jump", 20),
        fps: 14,
      },
      hit: {
        frames: generateFramePaths("koala", "character15", "hit", 45),
        fps: 14,
      },
      roll: {
        frames: generateFramePaths("koala", "character15", "roll", 8),
        fps: 10,
      },
      fly: {
        frames: generateFramePaths("koala", "character15", "fly", 20),
        fps: 12,
      },
      throwing: {
        frames: generateFramePaths("koala", "character15", "throwing", 35),
        fps: 14,
      },
      dead: {
        frames: generateFramePaths("koala", "character15", "dead", 50),
        fps: 14,
      },
      stuned: {
        frames: generateFramePaths("koala", "character15", "stuned"),
        fps: 14,
      },
    },
    price: 900,
    owned: false,
  },
  "pig-01": {
    id: "pig-01",
    name: "Classic Pig",
    species: "pig",
    character: "character01",
    thumbnail: "/assets/cute-pigs-assets/Png/Character01/Idle/Characters-Character01-Idle_00.png",
    animations: {
      idle: {
        frames: generateFramePaths("pig", "character01", "idle", 20),
        fps: 12,
      },
      walk: {
        frames: generateFramePaths("pig", "character01", "walk", 20),
        fps: 12,
      },
      jump: {
        frames: generateFramePaths("pig", "character01", "jump", 20),
        fps: 14,
      },
      hit: {
        frames: generateFramePaths("pig", "character01", "hit", 40),
        fps: 14,
      },
      roll: {
        frames: generateFramePaths("pig", "character01", "roll", 8),
        fps: 10,
      },
      fly: {
        frames: generateFramePaths("pig", "character01", "fly", 20),
        fps: 12,
      },
      throwing: {
        frames: generateFramePaths("pig", "character01", "throwing", 35),
        fps: 14,
      },
      dead: {
        frames: generateFramePaths("pig", "character01", "dead", 60),
        fps: 14,
      },
      stuned: {
        frames: generateFramePaths("pig", "character01", "stuned"),
        fps: 14,
      },
    },
    price: 130,
    owned: false,
  },
  "pig-02": {
    id: "pig-02",
    name: "Cheerful Pig",
    species: "pig",
    character: "character02",
    thumbnail: "/assets/cute-pigs-assets/Png/Character02/Idle/Characters-Character02-Idle_00.png",
    animations: {
      idle: {
        frames: generateFramePaths("pig", "character02", "idle", 20),
        fps: 12,
      },
      walk: {
        frames: generateFramePaths("pig", "character02", "walk", 20),
        fps: 12,
      },
      jump: {
        frames: generateFramePaths("pig", "character02", "jump", 20),
        fps: 14,
      },
      hit: {
        frames: generateFramePaths("pig", "character02", "hit", 40),
        fps: 14,
      },
      roll: {
        frames: generateFramePaths("pig", "character02", "roll", 8),
        fps: 10,
      },
      fly: {
        frames: generateFramePaths("pig", "character02", "fly", 20),
        fps: 12,
      },
      throwing: {
        frames: generateFramePaths("pig", "character02", "throwing", 35),
        fps: 14,
      },
      dead: {
        frames: generateFramePaths("pig", "character02", "dead", 60),
        fps: 14,
      },
      stuned: {
        frames: generateFramePaths("pig", "character02", "stuned"),
        fps: 14,
      },
    },
    price: 170,
    owned: false,
  },
  "pig-03": {
    id: "pig-03",
    name: "Sleepy Pig",
    species: "pig",
    character: "character03",
    thumbnail: "/assets/cute-pigs-assets/Png/Character03/Idle/Characters-Character03-Idle_00.png",
    animations: {
      idle: {
        frames: generateFramePaths("pig", "character03", "idle", 20),
        fps: 12,
      },
      walk: {
        frames: generateFramePaths("pig", "character03", "walk", 20),
        fps: 12,
      },
      jump: {
        frames: generateFramePaths("pig", "character03", "jump", 20),
        fps: 14,
      },
      hit: {
        frames: generateFramePaths("pig", "character03", "hit", 40),
        fps: 14,
      },
      roll: {
        frames: generateFramePaths("pig", "character03", "roll", 8),
        fps: 10,
      },
      fly: {
        frames: generateFramePaths("pig", "character03", "fly", 20),
        fps: 12,
      },
      throwing: {
        frames: generateFramePaths("pig", "character03", "throwing", 35),
        fps: 14,
      },
      dead: {
        frames: generateFramePaths("pig", "character03", "dead", 60),
        fps: 14,
      },
      stuned: {
        frames: generateFramePaths("pig", "character03", "stuned"),
        fps: 14,
      },
    },
    price: 210,
    owned: false,
  },
  "pig-04": {
    id: "pig-04",
    name: "Playful Pig",
    species: "pig",
    character: "character04",
    thumbnail: "/assets/cute-pigs-assets/Png/Character04/Idle/Characters-Character04-Idle_00.png",
    animations: {
      idle: {
        frames: generateFramePaths("pig", "character04", "idle", 20),
        fps: 12,
      },
      walk: {
        frames: generateFramePaths("pig", "character04", "walk", 20),
        fps: 12,
      },
      jump: {
        frames: generateFramePaths("pig", "character04", "jump", 20),
        fps: 14,
      },
      hit: {
        frames: generateFramePaths("pig", "character04", "hit", 40),
        fps: 14,
      },
      roll: {
        frames: generateFramePaths("pig", "character04", "roll", 8),
        fps: 10,
      },
      fly: {
        frames: generateFramePaths("pig", "character04", "fly", 20),
        fps: 12,
      },
      throwing: {
        frames: generateFramePaths("pig", "character04", "throwing", 35),
        fps: 14,
      },
      dead: {
        frames: generateFramePaths("pig", "character04", "dead", 60),
        fps: 14,
      },
      stuned: {
        frames: generateFramePaths("pig", "character04", "stuned"),
        fps: 14,
      },
    },
    price: 250,
    owned: false,
  },
  "pig-05": {
    id: "pig-05",
    name: "Shy Pig",
    species: "pig",
    character: "character05",
    thumbnail: "/assets/cute-pigs-assets/Png/Character05/Idle/Characters-Character05-Idle_00.png",
    animations: {
      idle: {
        frames: generateFramePaths("pig", "character05", "idle", 20),
        fps: 12,
      },
      walk: {
        frames: generateFramePaths("pig", "character05", "walk", 20),
        fps: 12,
      },
      jump: {
        frames: generateFramePaths("pig", "character05", "jump", 20),
        fps: 14,
      },
      hit: {
        frames: generateFramePaths("pig", "character05", "hit", 40),
        fps: 14,
      },
      roll: {
        frames: generateFramePaths("pig", "character05", "roll", 8),
        fps: 10,
      },
      fly: {
        frames: generateFramePaths("pig", "character05", "fly", 20),
        fps: 12,
      },
      throwing: {
        frames: generateFramePaths("pig", "character05", "throwing", 35),
        fps: 14,
      },
      dead: {
        frames: generateFramePaths("pig", "character05", "dead", 60),
        fps: 14,
      },
      stuned: {
        frames: generateFramePaths("pig", "character05", "stuned"),
        fps: 14,
      },
    },
    price: 290,
    owned: false,
  },
  "pig-06": {
    id: "pig-06",
    name: "Energetic Pig",
    species: "pig",
    character: "character06",
    thumbnail: "/assets/cute-pigs-assets/Png/Character06/Idle/Characters-Character06-Idle_00.png",
    animations: {
      idle: {
        frames: generateFramePaths("pig", "character06", "idle", 20),
        fps: 12,
      },
      walk: {
        frames: generateFramePaths("pig", "character06", "walk", 20),
        fps: 12,
      },
      jump: {
        frames: generateFramePaths("pig", "character06", "jump", 20),
        fps: 14,
      },
      hit: {
        frames: generateFramePaths("pig", "character06", "hit", 40),
        fps: 14,
      },
      roll: {
        frames: generateFramePaths("pig", "character06", "roll", 8),
        fps: 10,
      },
      fly: {
        frames: generateFramePaths("pig", "character06", "fly", 20),
        fps: 12,
      },
      throwing: {
        frames: generateFramePaths("pig", "character06", "throwing", 35),
        fps: 14,
      },
      dead: {
        frames: generateFramePaths("pig", "character06", "dead", 60),
        fps: 14,
      },
      stuned: {
        frames: generateFramePaths("pig", "character06", "stuned"),
        fps: 14,
      },
    },
    price: 330,
    owned: false,
  },
  "pig-07": {
    id: "pig-07",
    name: "Gentle Pig",
    species: "pig",
    character: "character07",
    thumbnail: "/assets/cute-pigs-assets/Png/Character07/Idle/Characters-Character07-Idle_00.png",
    animations: {
      idle: {
        frames: generateFramePaths("pig", "character07", "idle", 20),
        fps: 12,
      },
      walk: {
        frames: generateFramePaths("pig", "character07", "walk", 20),
        fps: 12,
      },
      jump: {
        frames: generateFramePaths("pig", "character07", "jump", 20),
        fps: 14,
      },
      hit: {
        frames: generateFramePaths("pig", "character07", "hit", 40),
        fps: 14,
      },
      roll: {
        frames: generateFramePaths("pig", "character07", "roll", 8),
        fps: 10,
      },
      fly: {
        frames: generateFramePaths("pig", "character07", "fly", 20),
        fps: 12,
      },
      throwing: {
        frames: generateFramePaths("pig", "character07", "throwing", 35),
        fps: 14,
      },
      dead: {
        frames: generateFramePaths("pig", "character07", "dead", 60),
        fps: 14,
      },
      stuned: {
        frames: generateFramePaths("pig", "character07", "stuned"),
        fps: 14,
      },
    },
    price: 370,
    owned: false,
  },
  "pig-08": {
    id: "pig-08",
    name: "Curious Pig",
    species: "pig",
    character: "character08",
    thumbnail: "/assets/cute-pigs-assets/Png/Character08/Idle/Characters-Character08-Idle_00.png",
    animations: {
      idle: {
        frames: generateFramePaths("pig", "character08", "idle", 20),
        fps: 12,
      },
      walk: {
        frames: generateFramePaths("pig", "character08", "walk", 20),
        fps: 12,
      },
      jump: {
        frames: generateFramePaths("pig", "character08", "jump", 20),
        fps: 14,
      },
      hit: {
        frames: generateFramePaths("pig", "character08", "hit", 40),
        fps: 14,
      },
      roll: {
        frames: generateFramePaths("pig", "character08", "roll", 8),
        fps: 10,
      },
      fly: {
        frames: generateFramePaths("pig", "character08", "fly", 20),
        fps: 12,
      },
      throwing: {
        frames: generateFramePaths("pig", "character08", "throwing", 35),
        fps: 14,
      },
      dead: {
        frames: generateFramePaths("pig", "character08", "dead", 60),
        fps: 14,
      },
      stuned: {
        frames: generateFramePaths("pig", "character08", "stuned"),
        fps: 14,
      },
    },
    price: 410,
    owned: false,
  },
  "pig-09": {
    id: "pig-09",
    name: "Brave Pig",
    species: "pig",
    character: "character09",
    thumbnail: "/assets/cute-pigs-assets/Png/Character09/Idle/Characters-Character09-Idle_00.png",
    animations: {
      idle: {
        frames: generateFramePaths("pig", "character09", "idle", 20),
        fps: 12,
      },
      walk: {
        frames: generateFramePaths("pig", "character09", "walk", 20),
        fps: 12,
      },
      jump: {
        frames: generateFramePaths("pig", "character09", "jump", 20),
        fps: 14,
      },
      hit: {
        frames: generateFramePaths("pig", "character09", "hit", 40),
        fps: 14,
      },
      roll: {
        frames: generateFramePaths("pig", "character09", "roll", 8),
        fps: 10,
      },
      fly: {
        frames: generateFramePaths("pig", "character09", "fly", 20),
        fps: 12,
      },
      throwing: {
        frames: generateFramePaths("pig", "character09", "throwing", 35),
        fps: 14,
      },
      dead: {
        frames: generateFramePaths("pig", "character09", "dead", 60),
        fps: 14,
      },
      stuned: {
        frames: generateFramePaths("pig", "character09", "stuned"),
        fps: 14,
      },
    },
    price: 450,
    owned: false,
  },
  "pig-10": {
    id: "pig-10",
    name: "Sweet Pig",
    species: "pig",
    character: "character10",
    thumbnail: "/assets/cute-pigs-assets/Png/Character10/Idle/Characters-Character10-Idle_00.png",
    animations: {
      idle: {
        frames: generateFramePaths("pig", "character10", "idle", 20),
        fps: 12,
      },
      walk: {
        frames: generateFramePaths("pig", "character10", "walk", 20),
        fps: 12,
      },
      jump: {
        frames: generateFramePaths("pig", "character10", "jump", 20),
        fps: 14,
      },
      hit: {
        frames: generateFramePaths("pig", "character10", "hit", 40),
        fps: 14,
      },
      roll: {
        frames: generateFramePaths("pig", "character10", "roll", 8),
        fps: 10,
      },
      fly: {
        frames: generateFramePaths("pig", "character10", "fly", 20),
        fps: 12,
      },
      throwing: {
        frames: generateFramePaths("pig", "character10", "throwing", 35),
        fps: 14,
      },
      dead: {
        frames: generateFramePaths("pig", "character10", "dead", 60),
        fps: 14,
      },
      stuned: {
        frames: generateFramePaths("pig", "character10", "stuned"),
        fps: 14,
      },
    },
    price: 490,
    owned: false,
  },
  "pig-11": {
    id: "pig-11",
    name: "Silly Pig",
    species: "pig",
    character: "character11",
    thumbnail: "/assets/cute-pigs-assets/Png/Character11/Idle/Characters-Character11-Idle_00.png",
    animations: {
      idle: {
        frames: generateFramePaths("pig", "character11", "idle", 20),
        fps: 12,
      },
      walk: {
        frames: generateFramePaths("pig", "character11", "walk", 20),
        fps: 12,
      },
      jump: {
        frames: generateFramePaths("pig", "character11", "jump", 20),
        fps: 14,
      },
      hit: {
        frames: generateFramePaths("pig", "character11", "hit", 40),
        fps: 14,
      },
      roll: {
        frames: generateFramePaths("pig", "character11", "roll", 8),
        fps: 10,
      },
      fly: {
        frames: generateFramePaths("pig", "character11", "fly", 20),
        fps: 12,
      },
      throwing: {
        frames: generateFramePaths("pig", "character11", "throwing", 35),
        fps: 14,
      },
      dead: {
        frames: generateFramePaths("pig", "character11", "dead", 60),
        fps: 14,
      },
      stuned: {
        frames: generateFramePaths("pig", "character11", "stuned"),
        fps: 14,
      },
    },
    price: 530,
    owned: false,
  },
  "pig-12": {
    id: "pig-12",
    name: "Wise Pig",
    species: "pig",
    character: "character12",
    thumbnail: "/assets/cute-pigs-assets/Png/Character12/Idle/Characters-Character12-Idle_00.png",
    animations: {
      idle: {
        frames: generateFramePaths("pig", "character12", "idle", 20),
        fps: 12,
      },
      walk: {
        frames: generateFramePaths("pig", "character12", "walk", 20),
        fps: 12,
      },
      jump: {
        frames: generateFramePaths("pig", "character12", "jump", 20),
        fps: 14,
      },
      hit: {
        frames: generateFramePaths("pig", "character12", "hit", 40),
        fps: 14,
      },
      roll: {
        frames: generateFramePaths("pig", "character12", "roll", 8),
        fps: 10,
      },
      fly: {
        frames: generateFramePaths("pig", "character12", "fly", 20),
        fps: 12,
      },
      throwing: {
        frames: generateFramePaths("pig", "character12", "throwing", 35),
        fps: 14,
      },
      dead: {
        frames: generateFramePaths("pig", "character12", "dead", 60),
        fps: 14,
      },
      stuned: {
        frames: generateFramePaths("pig", "character12", "stuned"),
        fps: 14,
      },
    },
    price: 570,
    owned: false,
  },
  "pig-13": {
    id: "pig-13",
    name: "Cool Pig",
    species: "pig",
    character: "character13",
    thumbnail: "/assets/cute-pigs-assets/Png/Character13/Idle/Characters-Character13-Idle_00.png",
    animations: {
      idle: {
        frames: generateFramePaths("pig", "character13", "idle", 20),
        fps: 12,
      },
      walk: {
        frames: generateFramePaths("pig", "character13", "walk", 20),
        fps: 12,
      },
      jump: {
        frames: generateFramePaths("pig", "character13", "jump", 20),
        fps: 14,
      },
      hit: {
        frames: generateFramePaths("pig", "character13", "hit", 40),
        fps: 14,
      },
      roll: {
        frames: generateFramePaths("pig", "character13", "roll", 8),
        fps: 10,
      },
      fly: {
        frames: generateFramePaths("pig", "character13", "fly", 20),
        fps: 12,
      },
      throwing: {
        frames: generateFramePaths("pig", "character13", "throwing", 35),
        fps: 14,
      },
      dead: {
        frames: generateFramePaths("pig", "character13", "dead", 60),
        fps: 14,
      },
      stuned: {
        frames: generateFramePaths("pig", "character13", "stuned"),
        fps: 14,
      },
    },
    price: 610,
    owned: false,
  },
  "pig-14": {
    id: "pig-14",
    name: "Warm Pig",
    species: "pig",
    character: "character14",
    thumbnail: "/assets/cute-pigs-assets/Png/Character14/Idle/Characters-Character14-Idle_00.png",
    animations: {
      idle: {
        frames: generateFramePaths("pig", "character14", "idle", 20),
        fps: 12,
      },
      walk: {
        frames: generateFramePaths("pig", "character14", "walk", 20),
        fps: 12,
      },
      jump: {
        frames: generateFramePaths("pig", "character14", "jump", 20),
        fps: 14,
      },
      hit: {
        frames: generateFramePaths("pig", "character14", "hit", 40),
        fps: 14,
      },
      roll: {
        frames: generateFramePaths("pig", "character14", "roll", 8),
        fps: 10,
      },
      fly: {
        frames: generateFramePaths("pig", "character14", "fly", 20),
        fps: 12,
      },
      throwing: {
        frames: generateFramePaths("pig", "character14", "throwing", 35),
        fps: 14,
      },
      dead: {
        frames: generateFramePaths("pig", "character14", "dead", 60),
        fps: 14,
      },
      stuned: {
        frames: generateFramePaths("pig", "character14", "stuned"),
        fps: 14,
      },
    },
    price: 650,
    owned: false,
  },
  "pig-15": {
    id: "pig-15",
    name: "Friendly Pig",
    species: "pig",
    character: "character15",
    thumbnail: "/assets/cute-pigs-assets/Png/Character15/Idle/Characters-Character15-Idle_00.png",
    animations: {
      idle: {
        frames: generateFramePaths("pig", "character15", "idle", 20),
        fps: 12,
      },
      walk: {
        frames: generateFramePaths("pig", "character15", "walk", 20),
        fps: 12,
      },
      jump: {
        frames: generateFramePaths("pig", "character15", "jump", 20),
        fps: 14,
      },
      hit: {
        frames: generateFramePaths("pig", "character15", "hit", 40),
        fps: 14,
      },
      roll: {
        frames: generateFramePaths("pig", "character15", "roll", 8),
        fps: 10,
      },
      fly: {
        frames: generateFramePaths("pig", "character15", "fly", 20),
        fps: 12,
      },
      throwing: {
        frames: generateFramePaths("pig", "character15", "throwing", 35),
        fps: 14,
      },
      dead: {
        frames: generateFramePaths("pig", "character15", "dead", 60),
        fps: 14,
      },
      stuned: {
        frames: generateFramePaths("pig", "character15", "stuned"),
        fps: 14,
      },
    },
    price: 690,
    owned: false,
  },
  "raccoon-01": {
    id: "raccoon-01",
    name: "Classic Raccoon",
    species: "raccoon",
    character: "character01",
    thumbnail: "/assets/cute-raccoons-assets/Png/Character01/Idle/Characters-Character01-Idle_00.png",
    animations: {
      idle: {
        frames: generateFramePaths("raccoon", "character01", "idle", 20),
        fps: 12,
      },
      walk: {
        frames: generateFramePaths("raccoon", "character01", "walk", 20),
        fps: 12,
      },
      jump: {
        frames: generateFramePaths("raccoon", "character01", "jump", 20),
        fps: 14,
      },
      hit: {
        frames: generateFramePaths("raccoon", "character01", "hit", 50),
        fps: 14,
      },
      roll: {
        frames: generateFramePaths("raccoon", "character01", "roll", 8),
        fps: 10,
      },
      fly: {
        frames: generateFramePaths("raccoon", "character01", "fly", 20),
        fps: 12,
      },
      throwing: {
        frames: generateFramePaths("raccoon", "character01", "throwing", 40),
        fps: 14,
      },
      dead: {
        frames: generateFramePaths("raccoon", "character01", "dead", 45),
        fps: 14,
      },
      stuned: {
        frames: generateFramePaths("raccoon", "character01", "stuned"),
        fps: 14,
      },
    },
    price: 180,
    owned: false,
  },
  "raccoon-02": {
    id: "raccoon-02",
    name: "Cheerful Raccoon",
    species: "raccoon",
    character: "character02",
    thumbnail: "/assets/cute-raccoons-assets/Png/Character02/Idle/Characters-Character02-Idle_00.png",
    animations: {
      idle: {
        frames: generateFramePaths("raccoon", "character02", "idle", 20),
        fps: 12,
      },
      walk: {
        frames: generateFramePaths("raccoon", "character02", "walk", 20),
        fps: 12,
      },
      jump: {
        frames: generateFramePaths("raccoon", "character02", "jump", 20),
        fps: 14,
      },
      hit: {
        frames: generateFramePaths("raccoon", "character02", "hit", 50),
        fps: 14,
      },
      roll: {
        frames: generateFramePaths("raccoon", "character02", "roll", 8),
        fps: 10,
      },
      fly: {
        frames: generateFramePaths("raccoon", "character02", "fly", 20),
        fps: 12,
      },
      throwing: {
        frames: generateFramePaths("raccoon", "character02", "throwing", 40),
        fps: 14,
      },
      dead: {
        frames: generateFramePaths("raccoon", "character02", "dead", 45),
        fps: 14,
      },
      stuned: {
        frames: generateFramePaths("raccoon", "character02", "stuned"),
        fps: 14,
      },
    },
    price: 230,
    owned: false,
  },
  "raccoon-03": {
    id: "raccoon-03",
    name: "Sleepy Raccoon",
    species: "raccoon",
    character: "character03",
    thumbnail: "/assets/cute-raccoons-assets/Png/Character03/Idle/Characters-Character03-Idle_00.png",
    animations: {
      idle: {
        frames: generateFramePaths("raccoon", "character03", "idle", 20),
        fps: 12,
      },
      walk: {
        frames: generateFramePaths("raccoon", "character03", "walk", 20),
        fps: 12,
      },
      jump: {
        frames: generateFramePaths("raccoon", "character03", "jump", 20),
        fps: 14,
      },
      hit: {
        frames: generateFramePaths("raccoon", "character03", "hit", 50),
        fps: 14,
      },
      roll: {
        frames: generateFramePaths("raccoon", "character03", "roll", 8),
        fps: 10,
      },
      fly: {
        frames: generateFramePaths("raccoon", "character03", "fly", 20),
        fps: 12,
      },
      throwing: {
        frames: generateFramePaths("raccoon", "character03", "throwing", 40),
        fps: 14,
      },
      dead: {
        frames: generateFramePaths("raccoon", "character03", "dead", 45),
        fps: 14,
      },
      stuned: {
        frames: generateFramePaths("raccoon", "character03", "stuned"),
        fps: 14,
      },
    },
    price: 280,
    owned: false,
  },
  "raccoon-04": {
    id: "raccoon-04",
    name: "Playful Raccoon",
    species: "raccoon",
    character: "character04",
    thumbnail: "/assets/cute-raccoons-assets/Png/Character04/Idle/Characters-Character04-Idle_00.png",
    animations: {
      idle: {
        frames: generateFramePaths("raccoon", "character04", "idle", 20),
        fps: 12,
      },
      walk: {
        frames: generateFramePaths("raccoon", "character04", "walk", 20),
        fps: 12,
      },
      jump: {
        frames: generateFramePaths("raccoon", "character04", "jump", 20),
        fps: 14,
      },
      hit: {
        frames: generateFramePaths("raccoon", "character04", "hit", 50),
        fps: 14,
      },
      roll: {
        frames: generateFramePaths("raccoon", "character04", "roll", 8),
        fps: 10,
      },
      fly: {
        frames: generateFramePaths("raccoon", "character04", "fly", 20),
        fps: 12,
      },
      throwing: {
        frames: generateFramePaths("raccoon", "character04", "throwing", 40),
        fps: 14,
      },
      dead: {
        frames: generateFramePaths("raccoon", "character04", "dead", 45),
        fps: 14,
      },
      stuned: {
        frames: generateFramePaths("raccoon", "character04", "stuned"),
        fps: 14,
      },
    },
    price: 330,
    owned: false,
  },
  "raccoon-05": {
    id: "raccoon-05",
    name: "Shy Raccoon",
    species: "raccoon",
    character: "character05",
    thumbnail: "/assets/cute-raccoons-assets/Png/Character05/Idle/Characters-Character05-Idle_00.png",
    animations: {
      idle: {
        frames: generateFramePaths("raccoon", "character05", "idle", 20),
        fps: 12,
      },
      walk: {
        frames: generateFramePaths("raccoon", "character05", "walk", 20),
        fps: 12,
      },
      jump: {
        frames: generateFramePaths("raccoon", "character05", "jump", 20),
        fps: 14,
      },
      hit: {
        frames: generateFramePaths("raccoon", "character05", "hit", 50),
        fps: 14,
      },
      roll: {
        frames: generateFramePaths("raccoon", "character05", "roll", 8),
        fps: 10,
      },
      fly: {
        frames: generateFramePaths("raccoon", "character05", "fly", 20),
        fps: 12,
      },
      throwing: {
        frames: generateFramePaths("raccoon", "character05", "throwing", 40),
        fps: 14,
      },
      dead: {
        frames: generateFramePaths("raccoon", "character05", "dead", 45),
        fps: 14,
      },
      stuned: {
        frames: generateFramePaths("raccoon", "character05", "stuned"),
        fps: 14,
      },
    },
    price: 380,
    owned: false,
  },
  "raccoon-06": {
    id: "raccoon-06",
    name: "Energetic Raccoon",
    species: "raccoon",
    character: "character06",
    thumbnail: "/assets/cute-raccoons-assets/Png/Character06/Idle/Characters-Character06-Idle_00.png",
    animations: {
      idle: {
        frames: generateFramePaths("raccoon", "character06", "idle", 20),
        fps: 12,
      },
      walk: {
        frames: generateFramePaths("raccoon", "character06", "walk", 20),
        fps: 12,
      },
      jump: {
        frames: generateFramePaths("raccoon", "character06", "jump", 20),
        fps: 14,
      },
      hit: {
        frames: generateFramePaths("raccoon", "character06", "hit", 50),
        fps: 14,
      },
      roll: {
        frames: generateFramePaths("raccoon", "character06", "roll", 8),
        fps: 10,
      },
      fly: {
        frames: generateFramePaths("raccoon", "character06", "fly", 20),
        fps: 12,
      },
      throwing: {
        frames: generateFramePaths("raccoon", "character06", "throwing", 40),
        fps: 14,
      },
      dead: {
        frames: generateFramePaths("raccoon", "character06", "dead", 45),
        fps: 14,
      },
      stuned: {
        frames: generateFramePaths("raccoon", "character06", "stuned"),
        fps: 14,
      },
    },
    price: 430,
    owned: false,
  },
  "raccoon-07": {
    id: "raccoon-07",
    name: "Gentle Raccoon",
    species: "raccoon",
    character: "character07",
    thumbnail: "/assets/cute-raccoons-assets/Png/Character07/Idle/Characters-Character07-Idle_00.png",
    animations: {
      idle: {
        frames: generateFramePaths("raccoon", "character07", "idle", 20),
        fps: 12,
      },
      walk: {
        frames: generateFramePaths("raccoon", "character07", "walk", 20),
        fps: 12,
      },
      jump: {
        frames: generateFramePaths("raccoon", "character07", "jump", 20),
        fps: 14,
      },
      hit: {
        frames: generateFramePaths("raccoon", "character07", "hit", 50),
        fps: 14,
      },
      roll: {
        frames: generateFramePaths("raccoon", "character07", "roll", 8),
        fps: 10,
      },
      fly: {
        frames: generateFramePaths("raccoon", "character07", "fly", 20),
        fps: 12,
      },
      throwing: {
        frames: generateFramePaths("raccoon", "character07", "throwing", 40),
        fps: 14,
      },
      dead: {
        frames: generateFramePaths("raccoon", "character07", "dead", 45),
        fps: 14,
      },
      stuned: {
        frames: generateFramePaths("raccoon", "character07", "stuned"),
        fps: 14,
      },
    },
    price: 480,
    owned: false,
  },
  "raccoon-08": {
    id: "raccoon-08",
    name: "Curious Raccoon",
    species: "raccoon",
    character: "character08",
    thumbnail: "/assets/cute-raccoons-assets/Png/Character08/Idle/Characters-Character08-Idle_00.png",
    animations: {
      idle: {
        frames: generateFramePaths("raccoon", "character08", "idle", 20),
        fps: 12,
      },
      walk: {
        frames: generateFramePaths("raccoon", "character08", "walk", 20),
        fps: 12,
      },
      jump: {
        frames: generateFramePaths("raccoon", "character08", "jump", 20),
        fps: 14,
      },
      hit: {
        frames: generateFramePaths("raccoon", "character08", "hit", 50),
        fps: 14,
      },
      roll: {
        frames: generateFramePaths("raccoon", "character08", "roll", 8),
        fps: 10,
      },
      fly: {
        frames: generateFramePaths("raccoon", "character08", "fly", 20),
        fps: 12,
      },
      throwing: {
        frames: generateFramePaths("raccoon", "character08", "throwing", 40),
        fps: 14,
      },
      dead: {
        frames: generateFramePaths("raccoon", "character08", "dead", 45),
        fps: 14,
      },
      stuned: {
        frames: generateFramePaths("raccoon", "character08", "stuned"),
        fps: 14,
      },
    },
    price: 530,
    owned: false,
  },
  "raccoon-09": {
    id: "raccoon-09",
    name: "Brave Raccoon",
    species: "raccoon",
    character: "character09",
    thumbnail: "/assets/cute-raccoons-assets/Png/Character09/Idle/Characters-Character09-Idle_00.png",
    animations: {
      idle: {
        frames: generateFramePaths("raccoon", "character09", "idle", 20),
        fps: 12,
      },
      walk: {
        frames: generateFramePaths("raccoon", "character09", "walk", 20),
        fps: 12,
      },
      jump: {
        frames: generateFramePaths("raccoon", "character09", "jump", 20),
        fps: 14,
      },
      hit: {
        frames: generateFramePaths("raccoon", "character09", "hit", 50),
        fps: 14,
      },
      roll: {
        frames: generateFramePaths("raccoon", "character09", "roll", 8),
        fps: 10,
      },
      fly: {
        frames: generateFramePaths("raccoon", "character09", "fly", 20),
        fps: 12,
      },
      throwing: {
        frames: generateFramePaths("raccoon", "character09", "throwing", 40),
        fps: 14,
      },
      dead: {
        frames: generateFramePaths("raccoon", "character09", "dead", 45),
        fps: 14,
      },
      stuned: {
        frames: generateFramePaths("raccoon", "character09", "stuned"),
        fps: 14,
      },
    },
    price: 580,
    owned: false,
  },
  "raccoon-10": {
    id: "raccoon-10",
    name: "Sweet Raccoon",
    species: "raccoon",
    character: "character10",
    thumbnail: "/assets/cute-raccoons-assets/Png/Character10/Idle/Characters-Character10-Idle_00.png",
    animations: {
      idle: {
        frames: generateFramePaths("raccoon", "character10", "idle", 20),
        fps: 12,
      },
      walk: {
        frames: generateFramePaths("raccoon", "character10", "walk", 20),
        fps: 12,
      },
      jump: {
        frames: generateFramePaths("raccoon", "character10", "jump", 20),
        fps: 14,
      },
      hit: {
        frames: generateFramePaths("raccoon", "character10", "hit", 50),
        fps: 14,
      },
      roll: {
        frames: generateFramePaths("raccoon", "character10", "roll", 8),
        fps: 10,
      },
      fly: {
        frames: generateFramePaths("raccoon", "character10", "fly", 20),
        fps: 12,
      },
      throwing: {
        frames: generateFramePaths("raccoon", "character10", "throwing", 40),
        fps: 14,
      },
      dead: {
        frames: generateFramePaths("raccoon", "character10", "dead", 45),
        fps: 14,
      },
      stuned: {
        frames: generateFramePaths("raccoon", "character10", "stuned"),
        fps: 14,
      },
    },
    price: 630,
    owned: false,
  },
  "raccoon-11": {
    id: "raccoon-11",
    name: "Silly Raccoon",
    species: "raccoon",
    character: "character11",
    thumbnail: "/assets/cute-raccoons-assets/Png/Character11/Idle/Characters-Character11-Idle_00.png",
    animations: {
      idle: {
        frames: generateFramePaths("raccoon", "character11", "idle", 20),
        fps: 12,
      },
      walk: {
        frames: generateFramePaths("raccoon", "character11", "walk", 20),
        fps: 12,
      },
      jump: {
        frames: generateFramePaths("raccoon", "character11", "jump", 20),
        fps: 14,
      },
      hit: {
        frames: generateFramePaths("raccoon", "character11", "hit", 50),
        fps: 14,
      },
      roll: {
        frames: generateFramePaths("raccoon", "character11", "roll", 8),
        fps: 10,
      },
      fly: {
        frames: generateFramePaths("raccoon", "character11", "fly", 20),
        fps: 12,
      },
      throwing: {
        frames: generateFramePaths("raccoon", "character11", "throwing", 40),
        fps: 14,
      },
      dead: {
        frames: generateFramePaths("raccoon", "character11", "dead", 45),
        fps: 14,
      },
      stuned: {
        frames: generateFramePaths("raccoon", "character11", "stuned"),
        fps: 14,
      },
    },
    price: 680,
    owned: false,
  },
  "raccoon-12": {
    id: "raccoon-12",
    name: "Wise Raccoon",
    species: "raccoon",
    character: "character12",
    thumbnail: "/assets/cute-raccoons-assets/Png/Character12/Idle/Characters-Character12-Idle_00.png",
    animations: {
      idle: {
        frames: generateFramePaths("raccoon", "character12", "idle", 20),
        fps: 12,
      },
      walk: {
        frames: generateFramePaths("raccoon", "character12", "walk", 20),
        fps: 12,
      },
      jump: {
        frames: generateFramePaths("raccoon", "character12", "jump", 20),
        fps: 14,
      },
      hit: {
        frames: generateFramePaths("raccoon", "character12", "hit", 50),
        fps: 14,
      },
      roll: {
        frames: generateFramePaths("raccoon", "character12", "roll", 8),
        fps: 10,
      },
      fly: {
        frames: generateFramePaths("raccoon", "character12", "fly", 20),
        fps: 12,
      },
      throwing: {
        frames: generateFramePaths("raccoon", "character12", "throwing", 40),
        fps: 14,
      },
      dead: {
        frames: generateFramePaths("raccoon", "character12", "dead", 45),
        fps: 14,
      },
      stuned: {
        frames: generateFramePaths("raccoon", "character12", "stuned"),
        fps: 14,
      },
    },
    price: 730,
    owned: false,
  },
  "raccoon-13": {
    id: "raccoon-13",
    name: "Cool Raccoon",
    species: "raccoon",
    character: "character13",
    thumbnail: "/assets/cute-raccoons-assets/Png/Character13/Idle/Characters-Character13-Idle_00.png",
    animations: {
      idle: {
        frames: generateFramePaths("raccoon", "character13", "idle", 20),
        fps: 12,
      },
      walk: {
        frames: generateFramePaths("raccoon", "character13", "walk", 20),
        fps: 12,
      },
      jump: {
        frames: generateFramePaths("raccoon", "character13", "jump", 20),
        fps: 14,
      },
      hit: {
        frames: generateFramePaths("raccoon", "character13", "hit", 50),
        fps: 14,
      },
      roll: {
        frames: generateFramePaths("raccoon", "character13", "roll", 8),
        fps: 10,
      },
      fly: {
        frames: generateFramePaths("raccoon", "character13", "fly", 20),
        fps: 12,
      },
      throwing: {
        frames: generateFramePaths("raccoon", "character13", "throwing", 40),
        fps: 14,
      },
      dead: {
        frames: generateFramePaths("raccoon", "character13", "dead", 45),
        fps: 14,
      },
      stuned: {
        frames: generateFramePaths("raccoon", "character13", "stuned"),
        fps: 14,
      },
    },
    price: 780,
    owned: false,
  },
  "raccoon-14": {
    id: "raccoon-14",
    name: "Warm Raccoon",
    species: "raccoon",
    character: "character14",
    thumbnail: "/assets/cute-raccoons-assets/Png/Character14/Idle/Characters-Character14-Idle_00.png",
    animations: {
      idle: {
        frames: generateFramePaths("raccoon", "character14", "idle", 20),
        fps: 12,
      },
      walk: {
        frames: generateFramePaths("raccoon", "character14", "walk", 20),
        fps: 12,
      },
      jump: {
        frames: generateFramePaths("raccoon", "character14", "jump", 20),
        fps: 14,
      },
      hit: {
        frames: generateFramePaths("raccoon", "character14", "hit", 50),
        fps: 14,
      },
      roll: {
        frames: generateFramePaths("raccoon", "character14", "roll", 8),
        fps: 10,
      },
      fly: {
        frames: generateFramePaths("raccoon", "character14", "fly", 20),
        fps: 12,
      },
      throwing: {
        frames: generateFramePaths("raccoon", "character14", "throwing", 40),
        fps: 14,
      },
      dead: {
        frames: generateFramePaths("raccoon", "character14", "dead", 45),
        fps: 14,
      },
      stuned: {
        frames: generateFramePaths("raccoon", "character14", "stuned"),
        fps: 14,
      },
    },
    price: 830,
    owned: false,
  },
  "raccoon-15": {
    id: "raccoon-15",
    name: "Friendly Raccoon",
    species: "raccoon",
    character: "character15",
    thumbnail: "/assets/cute-raccoons-assets/Png/Character15/Idle/Characters-Character15-Idle_00.png",
    animations: {
      idle: {
        frames: generateFramePaths("raccoon", "character15", "idle", 20),
        fps: 12,
      },
      walk: {
        frames: generateFramePaths("raccoon", "character15", "walk", 20),
        fps: 12,
      },
      jump: {
        frames: generateFramePaths("raccoon", "character15", "jump", 20),
        fps: 14,
      },
      hit: {
        frames: generateFramePaths("raccoon", "character15", "hit", 50),
        fps: 14,
      },
      roll: {
        frames: generateFramePaths("raccoon", "character15", "roll", 8),
        fps: 10,
      },
      fly: {
        frames: generateFramePaths("raccoon", "character15", "fly", 20),
        fps: 12,
      },
      throwing: {
        frames: generateFramePaths("raccoon", "character15", "throwing", 40),
        fps: 14,
      },
      dead: {
        frames: generateFramePaths("raccoon", "character15", "dead", 45),
        fps: 14,
      },
      stuned: {
        frames: generateFramePaths("raccoon", "character15", "stuned"),
        fps: 14,
      },
    },
    price: 880,
    owned: false,
  },
  "beaver-01": {
    id: "beaver-01",
    name: "Classic Beaver",
    species: "beaver",
    character: "character01",
    thumbnail: "/assets/funny-beavers-assets/Png/Character01/Idle/Characters-Character01-Idle_00.png",
    animations: {
      idle: {
        frames: generateFramePaths("beaver", "character01", "idle", 20),
        fps: 12,
      },
      walk: {
        frames: generateFramePaths("beaver", "character01", "walk", 20),
        fps: 12,
      },
      jump: {
        frames: generateFramePaths("beaver", "character01", "jump", 20),
        fps: 14,
      },
      hit: {
        frames: generateFramePaths("beaver", "character01", "hit", 40),
        fps: 14,
      },
      roll: {
        frames: generateFramePaths("beaver", "character01", "roll", 8),
        fps: 10,
      },
      fly: {
        frames: generateFramePaths("beaver", "character01", "fly", 20),
        fps: 12,
      },
      throwing: {
        frames: generateFramePaths("beaver", "character01", "throwing", 35),
        fps: 14,
      },
      dead: {
        frames: generateFramePaths("beaver", "character01", "dead", 60),
        fps: 14,
      },
      stuned: {
        frames: generateFramePaths("beaver", "character01", "stuned"),
        fps: 14,
      },
    },
    price: 140,
    owned: false,
  },
  "beaver-02": {
    id: "beaver-02",
    name: "Cheerful Beaver",
    species: "beaver",
    character: "character02",
    thumbnail: "/assets/funny-beavers-assets/Png/Character02/Idle/Characters-Character02-Idle_00.png",
    animations: {
      idle: {
        frames: generateFramePaths("beaver", "character02", "idle", 20),
        fps: 12,
      },
      walk: {
        frames: generateFramePaths("beaver", "character02", "walk", 20),
        fps: 12,
      },
      jump: {
        frames: generateFramePaths("beaver", "character02", "jump", 20),
        fps: 14,
      },
      hit: {
        frames: generateFramePaths("beaver", "character02", "hit", 40),
        fps: 14,
      },
      roll: {
        frames: generateFramePaths("beaver", "character02", "roll", 8),
        fps: 10,
      },
      fly: {
        frames: generateFramePaths("beaver", "character02", "fly", 20),
        fps: 12,
      },
      throwing: {
        frames: generateFramePaths("beaver", "character02", "throwing", 35),
        fps: 14,
      },
      dead: {
        frames: generateFramePaths("beaver", "character02", "dead", 60),
        fps: 14,
      },
      stuned: {
        frames: generateFramePaths("beaver", "character02", "stuned"),
        fps: 14,
      },
    },
    price: 185,
    owned: false,
  },
  "beaver-03": {
    id: "beaver-03",
    name: "Sleepy Beaver",
    species: "beaver",
    character: "character03",
    thumbnail: "/assets/funny-beavers-assets/Png/Character03/Idle/Characters-Character03-Idle_00.png",
    animations: {
      idle: {
        frames: generateFramePaths("beaver", "character03", "idle", 20),
        fps: 12,
      },
      walk: {
        frames: generateFramePaths("beaver", "character03", "walk", 20),
        fps: 12,
      },
      jump: {
        frames: generateFramePaths("beaver", "character03", "jump", 20),
        fps: 14,
      },
      hit: {
        frames: generateFramePaths("beaver", "character03", "hit", 40),
        fps: 14,
      },
      roll: {
        frames: generateFramePaths("beaver", "character03", "roll", 8),
        fps: 10,
      },
      fly: {
        frames: generateFramePaths("beaver", "character03", "fly", 20),
        fps: 12,
      },
      throwing: {
        frames: generateFramePaths("beaver", "character03", "throwing", 35),
        fps: 14,
      },
      dead: {
        frames: generateFramePaths("beaver", "character03", "dead", 60),
        fps: 14,
      },
      stuned: {
        frames: generateFramePaths("beaver", "character03", "stuned"),
        fps: 14,
      },
    },
    price: 230,
    owned: false,
  },
  "beaver-04": {
    id: "beaver-04",
    name: "Playful Beaver",
    species: "beaver",
    character: "character04",
    thumbnail: "/assets/funny-beavers-assets/Png/Character04/Idle/Characters-Character04-Idle_00.png",
    animations: {
      idle: {
        frames: generateFramePaths("beaver", "character04", "idle", 20),
        fps: 12,
      },
      walk: {
        frames: generateFramePaths("beaver", "character04", "walk", 20),
        fps: 12,
      },
      jump: {
        frames: generateFramePaths("beaver", "character04", "jump", 20),
        fps: 14,
      },
      hit: {
        frames: generateFramePaths("beaver", "character04", "hit", 40),
        fps: 14,
      },
      roll: {
        frames: generateFramePaths("beaver", "character04", "roll", 8),
        fps: 10,
      },
      fly: {
        frames: generateFramePaths("beaver", "character04", "fly", 20),
        fps: 12,
      },
      throwing: {
        frames: generateFramePaths("beaver", "character04", "throwing", 35),
        fps: 14,
      },
      dead: {
        frames: generateFramePaths("beaver", "character04", "dead", 60),
        fps: 14,
      },
      stuned: {
        frames: generateFramePaths("beaver", "character04", "stuned"),
        fps: 14,
      },
    },
    price: 275,
    owned: false,
  },
  "beaver-05": {
    id: "beaver-05",
    name: "Shy Beaver",
    species: "beaver",
    character: "character05",
    thumbnail: "/assets/funny-beavers-assets/Png/Character05/Idle/Characters-Character05-Idle_00.png",
    animations: {
      idle: {
        frames: generateFramePaths("beaver", "character05", "idle", 20),
        fps: 12,
      },
      walk: {
        frames: generateFramePaths("beaver", "character05", "walk", 20),
        fps: 12,
      },
      jump: {
        frames: generateFramePaths("beaver", "character05", "jump", 20),
        fps: 14,
      },
      hit: {
        frames: generateFramePaths("beaver", "character05", "hit", 40),
        fps: 14,
      },
      roll: {
        frames: generateFramePaths("beaver", "character05", "roll", 8),
        fps: 10,
      },
      fly: {
        frames: generateFramePaths("beaver", "character05", "fly", 20),
        fps: 12,
      },
      throwing: {
        frames: generateFramePaths("beaver", "character05", "throwing", 35),
        fps: 14,
      },
      dead: {
        frames: generateFramePaths("beaver", "character05", "dead", 60),
        fps: 14,
      },
      stuned: {
        frames: generateFramePaths("beaver", "character05", "stuned"),
        fps: 14,
      },
    },
    price: 320,
    owned: false,
  },
  "beaver-06": {
    id: "beaver-06",
    name: "Energetic Beaver",
    species: "beaver",
    character: "character06",
    thumbnail: "/assets/funny-beavers-assets/Png/Character06/Idle/Characters-Character06-Idle_00.png",
    animations: {
      idle: {
        frames: generateFramePaths("beaver", "character06", "idle", 20),
        fps: 12,
      },
      walk: {
        frames: generateFramePaths("beaver", "character06", "walk", 20),
        fps: 12,
      },
      jump: {
        frames: generateFramePaths("beaver", "character06", "jump", 20),
        fps: 14,
      },
      hit: {
        frames: generateFramePaths("beaver", "character06", "hit", 40),
        fps: 14,
      },
      roll: {
        frames: generateFramePaths("beaver", "character06", "roll", 8),
        fps: 10,
      },
      fly: {
        frames: generateFramePaths("beaver", "character06", "fly", 20),
        fps: 12,
      },
      throwing: {
        frames: generateFramePaths("beaver", "character06", "throwing", 35),
        fps: 14,
      },
      dead: {
        frames: generateFramePaths("beaver", "character06", "dead", 60),
        fps: 14,
      },
      stuned: {
        frames: generateFramePaths("beaver", "character06", "stuned"),
        fps: 14,
      },
    },
    price: 365,
    owned: false,
  },
  "beaver-07": {
    id: "beaver-07",
    name: "Gentle Beaver",
    species: "beaver",
    character: "character07",
    thumbnail: "/assets/funny-beavers-assets/Png/Character07/Idle/Characters-Character07-Idle_00.png",
    animations: {
      idle: {
        frames: generateFramePaths("beaver", "character07", "idle", 20),
        fps: 12,
      },
      walk: {
        frames: generateFramePaths("beaver", "character07", "walk", 20),
        fps: 12,
      },
      jump: {
        frames: generateFramePaths("beaver", "character07", "jump", 20),
        fps: 14,
      },
      hit: {
        frames: generateFramePaths("beaver", "character07", "hit", 40),
        fps: 14,
      },
      roll: {
        frames: generateFramePaths("beaver", "character07", "roll", 8),
        fps: 10,
      },
      fly: {
        frames: generateFramePaths("beaver", "character07", "fly", 20),
        fps: 12,
      },
      throwing: {
        frames: generateFramePaths("beaver", "character07", "throwing", 35),
        fps: 14,
      },
      dead: {
        frames: generateFramePaths("beaver", "character07", "dead", 60),
        fps: 14,
      },
      stuned: {
        frames: generateFramePaths("beaver", "character07", "stuned"),
        fps: 14,
      },
    },
    price: 410,
    owned: false,
  },
  "beaver-08": {
    id: "beaver-08",
    name: "Curious Beaver",
    species: "beaver",
    character: "character08",
    thumbnail: "/assets/funny-beavers-assets/Png/Character08/Idle/Characters-Character08-Idle_00.png",
    animations: {
      idle: {
        frames: generateFramePaths("beaver", "character08", "idle", 20),
        fps: 12,
      },
      walk: {
        frames: generateFramePaths("beaver", "character08", "walk", 20),
        fps: 12,
      },
      jump: {
        frames: generateFramePaths("beaver", "character08", "jump", 20),
        fps: 14,
      },
      hit: {
        frames: generateFramePaths("beaver", "character08", "hit", 40),
        fps: 14,
      },
      roll: {
        frames: generateFramePaths("beaver", "character08", "roll", 8),
        fps: 10,
      },
      fly: {
        frames: generateFramePaths("beaver", "character08", "fly", 20),
        fps: 12,
      },
      throwing: {
        frames: generateFramePaths("beaver", "character08", "throwing", 35),
        fps: 14,
      },
      dead: {
        frames: generateFramePaths("beaver", "character08", "dead", 60),
        fps: 14,
      },
      stuned: {
        frames: generateFramePaths("beaver", "character08", "stuned"),
        fps: 14,
      },
    },
    price: 455,
    owned: false,
  },
  "beaver-09": {
    id: "beaver-09",
    name: "Brave Beaver",
    species: "beaver",
    character: "character09",
    thumbnail: "/assets/funny-beavers-assets/Png/Character09/Idle/Characters-Character09-Idle_00.png",
    animations: {
      idle: {
        frames: generateFramePaths("beaver", "character09", "idle", 20),
        fps: 12,
      },
      walk: {
        frames: generateFramePaths("beaver", "character09", "walk", 20),
        fps: 12,
      },
      jump: {
        frames: generateFramePaths("beaver", "character09", "jump", 20),
        fps: 14,
      },
      hit: {
        frames: generateFramePaths("beaver", "character09", "hit", 40),
        fps: 14,
      },
      roll: {
        frames: generateFramePaths("beaver", "character09", "roll", 8),
        fps: 10,
      },
      fly: {
        frames: generateFramePaths("beaver", "character09", "fly", 20),
        fps: 12,
      },
      throwing: {
        frames: generateFramePaths("beaver", "character09", "throwing", 35),
        fps: 14,
      },
      dead: {
        frames: generateFramePaths("beaver", "character09", "dead", 60),
        fps: 14,
      },
      stuned: {
        frames: generateFramePaths("beaver", "character09", "stuned"),
        fps: 14,
      },
    },
    price: 500,
    owned: false,
  },
  "beaver-10": {
    id: "beaver-10",
    name: "Sweet Beaver",
    species: "beaver",
    character: "character10",
    thumbnail: "/assets/funny-beavers-assets/Png/Character10/Idle/Characters-Character10-Idle_00.png",
    animations: {
      idle: {
        frames: generateFramePaths("beaver", "character10", "idle", 20),
        fps: 12,
      },
      walk: {
        frames: generateFramePaths("beaver", "character10", "walk", 20),
        fps: 12,
      },
      jump: {
        frames: generateFramePaths("beaver", "character10", "jump", 20),
        fps: 14,
      },
      hit: {
        frames: generateFramePaths("beaver", "character10", "hit", 40),
        fps: 14,
      },
      roll: {
        frames: generateFramePaths("beaver", "character10", "roll", 8),
        fps: 10,
      },
      fly: {
        frames: generateFramePaths("beaver", "character10", "fly", 20),
        fps: 12,
      },
      throwing: {
        frames: generateFramePaths("beaver", "character10", "throwing", 35),
        fps: 14,
      },
      dead: {
        frames: generateFramePaths("beaver", "character10", "dead", 60),
        fps: 14,
      },
      stuned: {
        frames: generateFramePaths("beaver", "character10", "stuned"),
        fps: 14,
      },
    },
    price: 545,
    owned: false,
  },
  "beaver-11": {
    id: "beaver-11",
    name: "Silly Beaver",
    species: "beaver",
    character: "character11",
    thumbnail: "/assets/funny-beavers-assets/Png/Character11/Idle/Characters-Character11-Idle_00.png",
    animations: {
      idle: {
        frames: generateFramePaths("beaver", "character11", "idle", 20),
        fps: 12,
      },
      walk: {
        frames: generateFramePaths("beaver", "character11", "walk", 20),
        fps: 12,
      },
      jump: {
        frames: generateFramePaths("beaver", "character11", "jump", 20),
        fps: 14,
      },
      hit: {
        frames: generateFramePaths("beaver", "character11", "hit", 40),
        fps: 14,
      },
      roll: {
        frames: generateFramePaths("beaver", "character11", "roll", 8),
        fps: 10,
      },
      fly: {
        frames: generateFramePaths("beaver", "character11", "fly", 20),
        fps: 12,
      },
      throwing: {
        frames: generateFramePaths("beaver", "character11", "throwing", 35),
        fps: 14,
      },
      dead: {
        frames: generateFramePaths("beaver", "character11", "dead", 60),
        fps: 14,
      },
      stuned: {
        frames: generateFramePaths("beaver", "character11", "stuned"),
        fps: 14,
      },
    },
    price: 590,
    owned: false,
  },
  "beaver-12": {
    id: "beaver-12",
    name: "Wise Beaver",
    species: "beaver",
    character: "character12",
    thumbnail: "/assets/funny-beavers-assets/Png/Character12/Idle/Characters-Character12-Idle_00.png",
    animations: {
      idle: {
        frames: generateFramePaths("beaver", "character12", "idle", 20),
        fps: 12,
      },
      walk: {
        frames: generateFramePaths("beaver", "character12", "walk", 20),
        fps: 12,
      },
      jump: {
        frames: generateFramePaths("beaver", "character12", "jump", 20),
        fps: 14,
      },
      hit: {
        frames: generateFramePaths("beaver", "character12", "hit", 40),
        fps: 14,
      },
      roll: {
        frames: generateFramePaths("beaver", "character12", "roll", 8),
        fps: 10,
      },
      fly: {
        frames: generateFramePaths("beaver", "character12", "fly", 20),
        fps: 12,
      },
      throwing: {
        frames: generateFramePaths("beaver", "character12", "throwing", 35),
        fps: 14,
      },
      dead: {
        frames: generateFramePaths("beaver", "character12", "dead", 60),
        fps: 14,
      },
      stuned: {
        frames: generateFramePaths("beaver", "character12", "stuned"),
        fps: 14,
      },
    },
    price: 635,
    owned: false,
  },
  "beaver-13": {
    id: "beaver-13",
    name: "Cool Beaver",
    species: "beaver",
    character: "character13",
    thumbnail: "/assets/funny-beavers-assets/Png/Character13/Idle/Characters-Character13-Idle_00.png",
    animations: {
      idle: {
        frames: generateFramePaths("beaver", "character13", "idle", 20),
        fps: 12,
      },
      walk: {
        frames: generateFramePaths("beaver", "character13", "walk", 20),
        fps: 12,
      },
      jump: {
        frames: generateFramePaths("beaver", "character13", "jump", 20),
        fps: 14,
      },
      hit: {
        frames: generateFramePaths("beaver", "character13", "hit", 40),
        fps: 14,
      },
      roll: {
        frames: generateFramePaths("beaver", "character13", "roll", 8),
        fps: 10,
      },
      fly: {
        frames: generateFramePaths("beaver", "character13", "fly", 20),
        fps: 12,
      },
      throwing: {
        frames: generateFramePaths("beaver", "character13", "throwing", 35),
        fps: 14,
      },
      dead: {
        frames: generateFramePaths("beaver", "character13", "dead", 60),
        fps: 14,
      },
      stuned: {
        frames: generateFramePaths("beaver", "character13", "stuned"),
        fps: 14,
      },
    },
    price: 680,
    owned: false,
  },
  "beaver-14": {
    id: "beaver-14",
    name: "Warm Beaver",
    species: "beaver",
    character: "character14",
    thumbnail: "/assets/funny-beavers-assets/Png/Character14/Idle/Characters-Character14-Idle_00.png",
    animations: {
      idle: {
        frames: generateFramePaths("beaver", "character14", "idle", 20),
        fps: 12,
      },
      walk: {
        frames: generateFramePaths("beaver", "character14", "walk", 20),
        fps: 12,
      },
      jump: {
        frames: generateFramePaths("beaver", "character14", "jump", 20),
        fps: 14,
      },
      hit: {
        frames: generateFramePaths("beaver", "character14", "hit", 40),
        fps: 14,
      },
      roll: {
        frames: generateFramePaths("beaver", "character14", "roll", 8),
        fps: 10,
      },
      fly: {
        frames: generateFramePaths("beaver", "character14", "fly", 20),
        fps: 12,
      },
      throwing: {
        frames: generateFramePaths("beaver", "character14", "throwing", 35),
        fps: 14,
      },
      dead: {
        frames: generateFramePaths("beaver", "character14", "dead", 60),
        fps: 14,
      },
      stuned: {
        frames: generateFramePaths("beaver", "character14", "stuned"),
        fps: 14,
      },
    },
    price: 725,
    owned: false,
  },
  "beaver-15": {
    id: "beaver-15",
    name: "Friendly Beaver",
    species: "beaver",
    character: "character15",
    thumbnail: "/assets/funny-beavers-assets/Png/Character15/Idle/Characters-Character15-Idle_00.png",
    animations: {
      idle: {
        frames: generateFramePaths("beaver", "character15", "idle", 20),
        fps: 12,
      },
      walk: {
        frames: generateFramePaths("beaver", "character15", "walk", 20),
        fps: 12,
      },
      jump: {
        frames: generateFramePaths("beaver", "character15", "jump", 20),
        fps: 14,
      },
      hit: {
        frames: generateFramePaths("beaver", "character15", "hit", 40),
        fps: 14,
      },
      roll: {
        frames: generateFramePaths("beaver", "character15", "roll", 8),
        fps: 10,
      },
      fly: {
        frames: generateFramePaths("beaver", "character15", "fly", 20),
        fps: 12,
      },
      throwing: {
        frames: generateFramePaths("beaver", "character15", "throwing", 35),
        fps: 14,
      },
      dead: {
        frames: generateFramePaths("beaver", "character15", "dead", 60),
        fps: 14,
      },
      stuned: {
        frames: generateFramePaths("beaver", "character15", "stuned"),
        fps: 14,
      },
    },
    price: 770,
    owned: false,
  },
  "redpanda-01": {
    id: "redpanda-01",
    name: "Classic Red Panda",
    species: "redpanda",
    character: "character01",
    thumbnail: "/assets/red-pandas-assets/Png/Character01/Idle/Characters-Character01-Idle_00.png",
    animations: {
      idle: {
        frames: generateFramePaths("redpanda", "character01", "idle", 20),
        fps: 12,
      },
      walk: {
        frames: generateFramePaths("redpanda", "character01", "walk", 20),
        fps: 12,
      },
      jump: {
        frames: generateFramePaths("redpanda", "character01", "jump", 20),
        fps: 14,
      },
      hit: {
        frames: generateFramePaths("redpanda", "character01", "hit", 40),
        fps: 14,
      },
      roll: {
        frames: generateFramePaths("redpanda", "character01", "roll", 8),
        fps: 10,
      },
      fly: {
        frames: generateFramePaths("redpanda", "character01", "fly", 20),
        fps: 12,
      },
      throwing: {
        frames: generateFramePaths("redpanda", "character01", "throwing", 35),
        fps: 14,
      },
      dead: {
        frames: generateFramePaths("redpanda", "character01", "dead", 60),
        fps: 14,
      },
      stuned: {
        frames: generateFramePaths("redpanda", "character01", "stuned"),
        fps: 14,
      },
      stuned: {
        frames: generateFramePaths("panda", "character01", "stuned"),
        fps: 14,
      },
    },
    price: 220,
    owned: false,
  },
  "redpanda-02": {
    id: "redpanda-02",
    name: "Cheerful Red Panda",
    species: "redpanda",
    character: "character02",
    thumbnail: "/assets/red-pandas-assets/Png/Character02/Idle/Characters-Character02-Idle_00.png",
    animations: {
      idle: {
        frames: generateFramePaths("redpanda", "character02", "idle", 20),
        fps: 12,
      },
      walk: {
        frames: generateFramePaths("redpanda", "character02", "walk", 20),
        fps: 12,
      },
      jump: {
        frames: generateFramePaths("redpanda", "character02", "jump", 20),
        fps: 14,
      },
      hit: {
        frames: generateFramePaths("redpanda", "character02", "hit", 40),
        fps: 14,
      },
      roll: {
        frames: generateFramePaths("redpanda", "character02", "roll", 8),
        fps: 10,
      },
      fly: {
        frames: generateFramePaths("redpanda", "character02", "fly", 20),
        fps: 12,
      },
      throwing: {
        frames: generateFramePaths("redpanda", "character02", "throwing", 35),
        fps: 14,
      },
      dead: {
        frames: generateFramePaths("redpanda", "character02", "dead", 60),
        fps: 14,
      },
      stuned: {
        frames: generateFramePaths("redpanda", "character02", "stuned"),
        fps: 14,
      },
      stuned: {
        frames: generateFramePaths("panda", "character02", "stuned"),
        fps: 14,
      },
    },
    price: 270,
    owned: false,
  },
  "redpanda-03": {
    id: "redpanda-03",
    name: "Sleepy Red Panda",
    species: "redpanda",
    character: "character03",
    thumbnail: "/assets/red-pandas-assets/Png/Character03/Idle/Characters-Character03-Idle_00.png",
    animations: {
      idle: {
        frames: generateFramePaths("redpanda", "character03", "idle", 20),
        fps: 12,
      },
      walk: {
        frames: generateFramePaths("redpanda", "character03", "walk", 20),
        fps: 12,
      },
      jump: {
        frames: generateFramePaths("redpanda", "character03", "jump", 20),
        fps: 14,
      },
      hit: {
        frames: generateFramePaths("redpanda", "character03", "hit", 40),
        fps: 14,
      },
      roll: {
        frames: generateFramePaths("redpanda", "character03", "roll", 8),
        fps: 10,
      },
      fly: {
        frames: generateFramePaths("redpanda", "character03", "fly", 20),
        fps: 12,
      },
      throwing: {
        frames: generateFramePaths("redpanda", "character03", "throwing", 35),
        fps: 14,
      },
      dead: {
        frames: generateFramePaths("redpanda", "character03", "dead", 60),
        fps: 14,
      },
      stuned: {
        frames: generateFramePaths("redpanda", "character03", "stuned"),
        fps: 14,
      },
      stuned: {
        frames: generateFramePaths("panda", "character03", "stuned"),
        fps: 14,
      },
    },
    price: 320,
    owned: false,
  },
  "redpanda-04": {
    id: "redpanda-04",
    name: "Playful Red Panda",
    species: "redpanda",
    character: "character04",
    thumbnail: "/assets/red-pandas-assets/Png/Character04/Idle/Characters-Character04-Idle_00.png",
    animations: {
      idle: {
        frames: generateFramePaths("redpanda", "character04", "idle", 20),
        fps: 12,
      },
      walk: {
        frames: generateFramePaths("redpanda", "character04", "walk", 20),
        fps: 12,
      },
      jump: {
        frames: generateFramePaths("redpanda", "character04", "jump", 20),
        fps: 14,
      },
      hit: {
        frames: generateFramePaths("redpanda", "character04", "hit", 40),
        fps: 14,
      },
      roll: {
        frames: generateFramePaths("redpanda", "character04", "roll", 8),
        fps: 10,
      },
      fly: {
        frames: generateFramePaths("redpanda", "character04", "fly", 20),
        fps: 12,
      },
      throwing: {
        frames: generateFramePaths("redpanda", "character04", "throwing", 35),
        fps: 14,
      },
      dead: {
        frames: generateFramePaths("redpanda", "character04", "dead", 60),
        fps: 14,
      },
      stuned: {
        frames: generateFramePaths("redpanda", "character04", "stuned"),
        fps: 14,
      },
      stuned: {
        frames: generateFramePaths("panda", "character04", "stuned"),
        fps: 14,
      },
    },
    price: 370,
    owned: false,
  },
  "redpanda-05": {
    id: "redpanda-05",
    name: "Shy Red Panda",
    species: "redpanda",
    character: "character05",
    thumbnail: "/assets/red-pandas-assets/Png/Character05/Idle/Characters-Character05-Idle_00.png",
    animations: {
      idle: {
        frames: generateFramePaths("redpanda", "character05", "idle", 20),
        fps: 12,
      },
      walk: {
        frames: generateFramePaths("redpanda", "character05", "walk", 20),
        fps: 12,
      },
      jump: {
        frames: generateFramePaths("redpanda", "character05", "jump", 20),
        fps: 14,
      },
      hit: {
        frames: generateFramePaths("redpanda", "character05", "hit", 40),
        fps: 14,
      },
      roll: {
        frames: generateFramePaths("redpanda", "character05", "roll", 8),
        fps: 10,
      },
      fly: {
        frames: generateFramePaths("redpanda", "character05", "fly", 20),
        fps: 12,
      },
      throwing: {
        frames: generateFramePaths("redpanda", "character05", "throwing", 35),
        fps: 14,
      },
      dead: {
        frames: generateFramePaths("redpanda", "character05", "dead", 60),
        fps: 14,
      },
      stuned: {
        frames: generateFramePaths("redpanda", "character05", "stuned"),
        fps: 14,
      },
      stuned: {
        frames: generateFramePaths("panda", "character05", "stuned"),
        fps: 14,
      },
    },
    price: 420,
    owned: false,
  },
  "redpanda-06": {
    id: "redpanda-06",
    name: "Energetic Red Panda",
    species: "redpanda",
    character: "character06",
    thumbnail: "/assets/red-pandas-assets/Png/Character06/Idle/Characters-Character06-Idle_00.png",
    animations: {
      idle: {
        frames: generateFramePaths("redpanda", "character06", "idle", 20),
        fps: 12,
      },
      walk: {
        frames: generateFramePaths("redpanda", "character06", "walk", 20),
        fps: 12,
      },
      jump: {
        frames: generateFramePaths("redpanda", "character06", "jump", 20),
        fps: 14,
      },
      hit: {
        frames: generateFramePaths("redpanda", "character06", "hit", 40),
        fps: 14,
      },
      roll: {
        frames: generateFramePaths("redpanda", "character06", "roll", 8),
        fps: 10,
      },
      fly: {
        frames: generateFramePaths("redpanda", "character06", "fly", 20),
        fps: 12,
      },
      throwing: {
        frames: generateFramePaths("redpanda", "character06", "throwing", 35),
        fps: 14,
      },
      dead: {
        frames: generateFramePaths("redpanda", "character06", "dead", 60),
        fps: 14,
      },
      stuned: {
        frames: generateFramePaths("redpanda", "character06", "stuned"),
        fps: 14,
      },
      stuned: {
        frames: generateFramePaths("panda", "character06", "stuned"),
        fps: 14,
      },
    },
    price: 470,
    owned: false,
  },
  "redpanda-07": {
    id: "redpanda-07",
    name: "Gentle Red Panda",
    species: "redpanda",
    character: "character07",
    thumbnail: "/assets/red-pandas-assets/Png/Character07/Idle/Characters-Character07-Idle_00.png",
    animations: {
      idle: {
        frames: generateFramePaths("redpanda", "character07", "idle", 20),
        fps: 12,
      },
      walk: {
        frames: generateFramePaths("redpanda", "character07", "walk", 20),
        fps: 12,
      },
      jump: {
        frames: generateFramePaths("redpanda", "character07", "jump", 20),
        fps: 14,
      },
      hit: {
        frames: generateFramePaths("redpanda", "character07", "hit", 40),
        fps: 14,
      },
      roll: {
        frames: generateFramePaths("redpanda", "character07", "roll", 8),
        fps: 10,
      },
      fly: {
        frames: generateFramePaths("redpanda", "character07", "fly", 20),
        fps: 12,
      },
      throwing: {
        frames: generateFramePaths("redpanda", "character07", "throwing", 35),
        fps: 14,
      },
      dead: {
        frames: generateFramePaths("redpanda", "character07", "dead", 60),
        fps: 14,
      },
      stuned: {
        frames: generateFramePaths("redpanda", "character07", "stuned"),
        fps: 14,
      },
      stuned: {
        frames: generateFramePaths("panda", "character07", "stuned"),
        fps: 14,
      },
    },
    price: 520,
    owned: false,
  },
  "redpanda-08": {
    id: "redpanda-08",
    name: "Curious Red Panda",
    species: "redpanda",
    character: "character08",
    thumbnail: "/assets/red-pandas-assets/Png/Character08/Idle/Characters-Character08-Idle_00.png",
    animations: {
      idle: {
        frames: generateFramePaths("redpanda", "character08", "idle", 20),
        fps: 12,
      },
      walk: {
        frames: generateFramePaths("redpanda", "character08", "walk", 20),
        fps: 12,
      },
      jump: {
        frames: generateFramePaths("redpanda", "character08", "jump", 20),
        fps: 14,
      },
      hit: {
        frames: generateFramePaths("redpanda", "character08", "hit", 40),
        fps: 14,
      },
      roll: {
        frames: generateFramePaths("redpanda", "character08", "roll", 8),
        fps: 10,
      },
      fly: {
        frames: generateFramePaths("redpanda", "character08", "fly", 20),
        fps: 12,
      },
      throwing: {
        frames: generateFramePaths("redpanda", "character08", "throwing", 35),
        fps: 14,
      },
      dead: {
        frames: generateFramePaths("redpanda", "character08", "dead", 60),
        fps: 14,
      },
      stuned: {
        frames: generateFramePaths("redpanda", "character08", "stuned"),
        fps: 14,
      },
      stuned: {
        frames: generateFramePaths("panda", "character08", "stuned"),
        fps: 14,
      },
    },
    price: 570,
    owned: false,
  },
  "redpanda-09": {
    id: "redpanda-09",
    name: "Brave Red Panda",
    species: "redpanda",
    character: "character09",
    thumbnail: "/assets/red-pandas-assets/Png/Character09/Idle/Characters-Character09-Idle_00.png",
    animations: {
      idle: {
        frames: generateFramePaths("redpanda", "character09", "idle", 20),
        fps: 12,
      },
      walk: {
        frames: generateFramePaths("redpanda", "character09", "walk", 20),
        fps: 12,
      },
      jump: {
        frames: generateFramePaths("redpanda", "character09", "jump", 20),
        fps: 14,
      },
      hit: {
        frames: generateFramePaths("redpanda", "character09", "hit", 40),
        fps: 14,
      },
      roll: {
        frames: generateFramePaths("redpanda", "character09", "roll", 8),
        fps: 10,
      },
      fly: {
        frames: generateFramePaths("redpanda", "character09", "fly", 20),
        fps: 12,
      },
      throwing: {
        frames: generateFramePaths("redpanda", "character09", "throwing", 35),
        fps: 14,
      },
      dead: {
        frames: generateFramePaths("redpanda", "character09", "dead", 60),
        fps: 14,
      },
      stuned: {
        frames: generateFramePaths("redpanda", "character09", "stuned"),
        fps: 14,
      },
      stuned: {
        frames: generateFramePaths("panda", "character09", "stuned"),
        fps: 14,
      },
    },
    price: 620,
    owned: false,
  },
  "redpanda-10": {
    id: "redpanda-10",
    name: "Sweet Red Panda",
    species: "redpanda",
    character: "character10",
    thumbnail: "/assets/red-pandas-assets/Png/Character10/Idle/Characters-Character10-Idle_00.png",
    animations: {
      idle: {
        frames: generateFramePaths("redpanda", "character10", "idle", 20),
        fps: 12,
      },
      walk: {
        frames: generateFramePaths("redpanda", "character10", "walk", 20),
        fps: 12,
      },
      jump: {
        frames: generateFramePaths("redpanda", "character10", "jump", 20),
        fps: 14,
      },
      hit: {
        frames: generateFramePaths("redpanda", "character10", "hit", 40),
        fps: 14,
      },
      roll: {
        frames: generateFramePaths("redpanda", "character10", "roll", 8),
        fps: 10,
      },
      fly: {
        frames: generateFramePaths("redpanda", "character10", "fly", 20),
        fps: 12,
      },
      throwing: {
        frames: generateFramePaths("redpanda", "character10", "throwing", 35),
        fps: 14,
      },
      dead: {
        frames: generateFramePaths("redpanda", "character10", "dead", 60),
        fps: 14,
      },
      stuned: {
        frames: generateFramePaths("redpanda", "character10", "stuned"),
        fps: 14,
      },
      stuned: {
        frames: generateFramePaths("panda", "character10", "stuned"),
        fps: 14,
      },
    },
    price: 670,
    owned: false,
  },
  "redpanda-11": {
    id: "redpanda-11",
    name: "Silly Red Panda",
    species: "redpanda",
    character: "character11",
    thumbnail: "/assets/red-pandas-assets/Png/Character11/Idle/Characters-Character11-Idle_00.png",
    animations: {
      idle: {
        frames: generateFramePaths("redpanda", "character11", "idle", 20),
        fps: 12,
      },
      walk: {
        frames: generateFramePaths("redpanda", "character11", "walk", 20),
        fps: 12,
      },
      jump: {
        frames: generateFramePaths("redpanda", "character11", "jump", 20),
        fps: 14,
      },
      hit: {
        frames: generateFramePaths("redpanda", "character11", "hit", 40),
        fps: 14,
      },
      roll: {
        frames: generateFramePaths("redpanda", "character11", "roll", 8),
        fps: 10,
      },
      fly: {
        frames: generateFramePaths("redpanda", "character11", "fly", 20),
        fps: 12,
      },
      throwing: {
        frames: generateFramePaths("redpanda", "character11", "throwing", 35),
        fps: 14,
      },
      dead: {
        frames: generateFramePaths("redpanda", "character11", "dead", 60),
        fps: 14,
      },
      stuned: {
        frames: generateFramePaths("redpanda", "character11", "stuned"),
        fps: 14,
      },
      stuned: {
        frames: generateFramePaths("panda", "character11", "stuned"),
        fps: 14,
      },
    },
    price: 720,
    owned: false,
  },
  "redpanda-12": {
    id: "redpanda-12",
    name: "Wise Red Panda",
    species: "redpanda",
    character: "character12",
    thumbnail: "/assets/red-pandas-assets/Png/Character12/Idle/Characters-Character12-Idle_00.png",
    animations: {
      idle: {
        frames: generateFramePaths("redpanda", "character12", "idle", 20),
        fps: 12,
      },
      walk: {
        frames: generateFramePaths("redpanda", "character12", "walk", 20),
        fps: 12,
      },
      jump: {
        frames: generateFramePaths("redpanda", "character12", "jump", 20),
        fps: 14,
      },
      hit: {
        frames: generateFramePaths("redpanda", "character12", "hit", 40),
        fps: 14,
      },
      roll: {
        frames: generateFramePaths("redpanda", "character12", "roll", 8),
        fps: 10,
      },
      fly: {
        frames: generateFramePaths("redpanda", "character12", "fly", 20),
        fps: 12,
      },
      throwing: {
        frames: generateFramePaths("redpanda", "character12", "throwing", 35),
        fps: 14,
      },
      dead: {
        frames: generateFramePaths("redpanda", "character12", "dead", 60),
        fps: 14,
      },
      stuned: {
        frames: generateFramePaths("redpanda", "character12", "stuned"),
        fps: 14,
      },
      stuned: {
        frames: generateFramePaths("panda", "character12", "stuned"),
        fps: 14,
      },
    },
    price: 770,
    owned: false,
  },
  "redpanda-13": {
    id: "redpanda-13",
    name: "Cool Red Panda",
    species: "redpanda",
    character: "character13",
    thumbnail: "/assets/red-pandas-assets/Png/Character13/Idle/Characters-Character13-Idle_00.png",
    animations: {
      idle: {
        frames: generateFramePaths("redpanda", "character13", "idle", 20),
        fps: 12,
      },
      walk: {
        frames: generateFramePaths("redpanda", "character13", "walk", 20),
        fps: 12,
      },
      jump: {
        frames: generateFramePaths("redpanda", "character13", "jump", 20),
        fps: 14,
      },
      hit: {
        frames: generateFramePaths("redpanda", "character13", "hit", 40),
        fps: 14,
      },
      roll: {
        frames: generateFramePaths("redpanda", "character13", "roll", 8),
        fps: 10,
      },
      fly: {
        frames: generateFramePaths("redpanda", "character13", "fly", 20),
        fps: 12,
      },
      throwing: {
        frames: generateFramePaths("redpanda", "character13", "throwing", 35),
        fps: 14,
      },
      dead: {
        frames: generateFramePaths("redpanda", "character13", "dead", 60),
        fps: 14,
      },
      stuned: {
        frames: generateFramePaths("redpanda", "character13", "stuned"),
        fps: 14,
      },
      stuned: {
        frames: generateFramePaths("panda", "character13", "stuned"),
        fps: 14,
      },
    },
    price: 820,
    owned: false,
  },
  "redpanda-14": {
    id: "redpanda-14",
    name: "Warm Red Panda",
    species: "redpanda",
    character: "character14",
    thumbnail: "/assets/red-pandas-assets/Png/Character14/Idle/Characters-Character14-Idle_00.png",
    animations: {
      idle: {
        frames: generateFramePaths("redpanda", "character14", "idle", 20),
        fps: 12,
      },
      walk: {
        frames: generateFramePaths("redpanda", "character14", "walk", 20),
        fps: 12,
      },
      jump: {
        frames: generateFramePaths("redpanda", "character14", "jump", 20),
        fps: 14,
      },
      hit: {
        frames: generateFramePaths("redpanda", "character14", "hit", 40),
        fps: 14,
      },
      roll: {
        frames: generateFramePaths("redpanda", "character14", "roll", 8),
        fps: 10,
      },
      fly: {
        frames: generateFramePaths("redpanda", "character14", "fly", 20),
        fps: 12,
      },
      throwing: {
        frames: generateFramePaths("redpanda", "character14", "throwing", 35),
        fps: 14,
      },
      dead: {
        frames: generateFramePaths("redpanda", "character14", "dead", 60),
        fps: 14,
      },
      stuned: {
        frames: generateFramePaths("redpanda", "character14", "stuned"),
        fps: 14,
      },
      stuned: {
        frames: generateFramePaths("panda", "character14", "stuned"),
        fps: 14,
      },
    },
    price: 870,
    owned: false,
  },
  "redpanda-15": {
    id: "redpanda-15",
    name: "Friendly Red Panda",
    species: "redpanda",
    character: "character15",
    thumbnail: "/assets/red-pandas-assets/Png/Character15/Idle/Characters-Character15-Idle_00.png",
    animations: {
      idle: {
        frames: generateFramePaths("redpanda", "character15", "idle", 20),
        fps: 12,
      },
      walk: {
        frames: generateFramePaths("redpanda", "character15", "walk", 20),
        fps: 12,
      },
      jump: {
        frames: generateFramePaths("redpanda", "character15", "jump", 20),
        fps: 14,
      },
      hit: {
        frames: generateFramePaths("redpanda", "character15", "hit", 40),
        fps: 14,
      },
      roll: {
        frames: generateFramePaths("redpanda", "character15", "roll", 8),
        fps: 10,
      },
      fly: {
        frames: generateFramePaths("redpanda", "character15", "fly", 20),
        fps: 12,
      },
      throwing: {
        frames: generateFramePaths("redpanda", "character15", "throwing", 35),
        fps: 14,
      },
      dead: {
        frames: generateFramePaths("redpanda", "character15", "dead", 60),
        fps: 14,
      },
      stuned: {
        frames: generateFramePaths("redpanda", "character15", "stuned"),
        fps: 14,
      },
      stuned: {
        frames: generateFramePaths("panda", "character15", "stuned"),
        fps: 14,
      },
    },
    price: 920,
    owned: false,
  },
};

// Animation packs (idle animations that can be purchased) - ALL OWNED FOR TESTING
export const animationPacks = {
  "idle-pack": {
    id: "idle-pack",
    key: "idle",
    name: "Idle",
    description: "Your pet resting state",
    price: 0,
    owned: true,
    compatible: "all",
  },
  "walk-pack": {
    id: "walk-pack",
    key: "walk",
    name: "Walk Cycle",
    description: "Watch your pet take a stroll",
    price: 50,
    compatible: "all",
  },
  "roll-pack": {
    id: "roll-pack",
    key: "roll",
    name: "Roll Animation",
    description: "Your pet does a playful roll",
    price: 75,
    compatible: "all",
  },
  "fly-pack": {
    id: "fly-pack",
    key: "fly",
    name: "Fly Animation",
    description: "Watch your pet soar through the air",
    price: 100,
    compatible: "all",
  },
  "jump-pack": {
    id: "jump-pack",
    key: "jump",
    name: "Jump Celebration",
    description: "Your pet jumps for joy (task completion reaction)",
    price: 0,
    compatible: "all",
  },
  "throwing-pack": {
    id: "throwing-pack",
    key: "throwing",
    name: "Throwing Animation",
    description: "Your pet throws something",
    price: 80,
    compatible: "all",
  },
  "hit-pack": {
    id: "hit-pack",
    key: "hit",
    name: "Hit/Hurt Reaction",
    description: "Your pet shows concern",
    price: 60,
    compatible: "all",
  },
  "dead-pack": {
    id: "dead-pack",
    key: "dead",
    name: "Sleep/Rest Animation",
    description: "Your pet takes a rest",
    price: 90,
    compatible: "all",
  },
};

// Helper functions
export function getPet(petId) {
  return petRegistry[petId];
}

export function getAllPets() {
  return Object.values(petRegistry);
}

export function getPetsBySpecies(species) {
  return Object.values(petRegistry).filter((pet) => pet.species === species);
}

export function getAllAnimationPacks() {
  // Filter out jump animation (used only for task completion reactions)
  return Object.values(animationPacks).filter(pack => pack.key !== 'jump');
}

export function getAnimationPack(packId) {
  return animationPacks[packId];
}
