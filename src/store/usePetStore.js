import { create } from 'zustand';
import { persist } from './middleware';
import { seedPets } from '../data/sampleData';
import { useUserStore } from './useUserStore';

const initialState = {
  activePetId: seedPets.activePetId,
  activeIdleKey: seedPets.activeIdleKey,
  activeThemeId: 'beach-1', // Default theme
  ownedPets: seedPets.ownedPets,
  ownedAnimations: seedPets.ownedAnimations,
  ownedThemes: ['beach-1'], // Default theme owned
};

export const usePetStore = create(
  persist(
    (set, get) => ({
      ...initialState,

    setActivePet: (petId) => {
      set({ activePetId: petId });
    },

    setActiveIdle: (animationKey) => {
      set({ activeIdleKey: animationKey });
    },

    setActiveTheme: (themeId) => {
      set({ activeThemeId: themeId });
    },

    purchasePet: (petId, cost) => {
      const { ownedPets } = get();
      
      // Check if already owned
      if (ownedPets.includes(petId)) {
        return { success: false, reason: 'already-owned' };
      }

      // Check if user has enough coins
      const userStore = useUserStore.getState();
      if (userStore.coins < cost) {
        return { success: false, reason: 'insufficient-coins' };
      }

      // Deduct coins and add pet to owned
      userStore.deductCoins(cost);
      set((state) => ({
        ownedPets: [...state.ownedPets, petId],
      }));

      return { success: true };
    },

    purchaseAnimation: (animationKey, cost) => {
      const { ownedAnimations } = get();
      
      // Check if already owned
      if (ownedAnimations.includes(animationKey)) {
        return { success: false, reason: 'already-owned' };
      }

      // Check if user has enough coins
      const userStore = useUserStore.getState();
      if (userStore.coins < cost) {
        return { success: false, reason: 'insufficient-coins' };
      }

      // Deduct coins and add animation to owned
      userStore.deductCoins(cost);
      set((state) => ({
        ownedAnimations: [...state.ownedAnimations, animationKey],
      }));

      return { success: true };
    },

    purchaseTheme: (themeId, cost) => {
      const { ownedThemes } = get();
      
      // Check if already owned
      if (ownedThemes.includes(themeId)) {
        return { success: false, reason: 'already-owned' };
      }

      // Check if user has enough coins
      const userStore = useUserStore.getState();
      if (userStore.coins < cost) {
        return { success: false, reason: 'insufficient-coins' };
      }

      // Deduct coins and add theme to owned
      userStore.deductCoins(cost);
      set((state) => ({
        ownedThemes: [...state.ownedThemes, themeId],
      }));

      return { success: true };
    },

    isPetOwned: (petId) => {
      return get().ownedPets.includes(petId);
    },

    isAnimationOwned: (animationKey) => {
      return get().ownedAnimations.includes(animationKey);
    },

    isThemeOwned: (themeId) => {
      return get().ownedThemes.includes(themeId);
    },

    getActivePet: () => get().activePetId,
    getActiveIdle: () => get().activeIdleKey,
    getActiveTheme: () => get().activeThemeId,
    getOwnedPets: () => get().ownedPets,
    getOwnedAnimations: () => get().ownedAnimations,
    getOwnedThemes: () => get().ownedThemes,
    }),
    {
      name: 'momo-pets',
    }
  )
);

