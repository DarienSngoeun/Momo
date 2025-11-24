import { useState, useMemo } from "react";
import { Container } from "../components/layout/Container";
import { ShopTabs } from "../components/shop/ShopTabs";
import { PetCard } from "../components/shop/PetCard";
import { AnimationCard } from "../components/shop/AnimationCard";
import { ThemeCard } from "../components/shop/ThemeCard";
import { SpeciesFilter } from "../components/shop/SpeciesFilter";
import { ThemedPetDisplay } from "../components/pet/ThemedPetDisplay";
import { PurchaseModal } from "../components/shop/PurchaseModal";
import { CoinsBadge } from "../components/progress/CoinsBadge";
import { Toast, useToast } from "../components/ui/Toast";
import { usePetStore } from "../store/usePetStore";
import { getAllPets, getAllAnimationPacks } from "../utils/petRegistry";
import { getAllThemes } from "../utils/themeRegistry";

function Shop() {
  const [purchaseModal, setPurchaseModal] = useState({
    isOpen: false,
    item: null,
    type: null,
  });
  const [selectedSpecies, setSelectedSpecies] = useState("all");

  // Preview state - what's currently being previewed (not purchased yet)
  const activePetId = usePetStore((state) => state.activePetId);
  const activeThemeId = usePetStore((state) => state.activeThemeId);
  const activeIdleKey = usePetStore((state) => state.activeIdleKey);

  const [previewPetId, setPreviewPetId] = useState(activePetId);
  const [previewThemeId, setPreviewThemeId] = useState(activeThemeId);
  const [previewAnimation, setPreviewAnimation] = useState(activeIdleKey);

  const { toast, showToast } = useToast();

  const purchasePet = usePetStore((state) => state.purchasePet);
  const purchaseAnimation = usePetStore((state) => state.purchaseAnimation);
  const purchaseTheme = usePetStore((state) => state.purchaseTheme);

  const allPets = getAllPets();
  const allAnimations = getAllAnimationPacks();
  const allThemes = getAllThemes();

  // Filter pets by selected species
  const filteredPets = useMemo(() => {
    if (selectedSpecies === "all") {
      return allPets;
    }
    return allPets.filter((pet) => pet.species === selectedSpecies);
  }, [allPets, selectedSpecies]);

  const handleSelectPet = (pet) => {
    setPurchaseModal({ isOpen: true, item: pet, type: "pet" });
  };

  const handleSelectAnimation = (animation) => {
    setPurchaseModal({ isOpen: true, item: animation, type: "animation" });
  };

  const handleSelectTheme = (theme) => {
    setPurchaseModal({ isOpen: true, item: theme, type: "theme" });
  };

  // Preview handlers - instantly show on Momo display
  const handlePreviewPet = (pet) => {
    setPreviewPetId(pet.id);
  };

  const handlePreviewTheme = (theme) => {
    setPreviewThemeId(theme.id);
  };

  const handlePreviewAnimation = (animation) => {
    setPreviewAnimation(animation.key);
  };

  const handleConfirmPurchase = () => {
    const { item, type } = purchaseModal;

    let result;
    if (type === "pet") {
      result = purchasePet(item.id, item.price);
    } else if (type === "animation") {
      result = purchaseAnimation(item.key, item.price);
    } else if (type === "theme") {
      result = purchaseTheme(item.id, item.price);
    }

    if (result.success) {
      showToast(`${item.name} purchased!`, "success");
      setPurchaseModal({ isOpen: false, item: null, type: null });
    } else {
      if (result.reason === "already-owned") {
        showToast("You already own this item!", "info");
      } else if (result.reason === "insufficient-coins") {
        showToast("Not enough coins!", "info");
      }
      setPurchaseModal({ isOpen: false, item: null, type: null });
    }
  };

  const handleCloseModal = () => {
    setPurchaseModal({ isOpen: false, item: null, type: null });
  };

  return (
    <>
      <Container className="pt-12 pb-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-900">Shop</h1>
          <CoinsBadge />
        </div>

        {/* Live Momo Preview - Sticky */}
        <div className="sticky top-12 z-20 bg-gray-50 pt-4 pb-4 mb-4 -mx-4 px-4">
          <ThemedPetDisplay
            petId={previewPetId}
            animationKey={previewAnimation}
            size="xl"
            className="shadow-lg"
            previewThemeId={previewThemeId}
          />
          <p className="text-center text-sm text-gray-600 mt-2">
            Tap items below to preview
          </p>
        </div>

        {/* Shop Tabs */}
        <ShopTabs>
          {({ activeTab }) => (
            <>
              {activeTab === "Pets" && (
                <>
                  <SpeciesFilter
                    selectedSpecies={selectedSpecies}
                    onSpeciesChange={setSelectedSpecies}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    {filteredPets.map((pet) => (
                      <PetCard
                        key={pet.id}
                        pet={pet}
                        onPurchase={handleSelectPet}
                        onPreview={handlePreviewPet}
                        isActive={previewPetId === pet.id}
                      />
                    ))}
                  </div>

                  {filteredPets.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      No pets found for this species.
                    </div>
                  )}
                </>
              )}

              {activeTab === "Animations" && (
                <div className="space-y-3">
                  {allAnimations.map((animation) => (
                    <AnimationCard
                      key={animation.id}
                      animation={animation}
                      onPurchase={handleSelectAnimation}
                      onPreview={handlePreviewAnimation}
                      isActive={previewAnimation === animation.key}
                    />
                  ))}
                </div>
              )}

              {activeTab === "Themes" && (
                <div className="grid grid-cols-2 gap-3">
                  {allThemes.map((theme) => (
                    <ThemeCard
                      key={theme.id}
                      theme={theme}
                      onPurchase={handleSelectTheme}
                      onPreview={handlePreviewTheme}
                      isActive={previewThemeId === theme.id}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </ShopTabs>
      </Container>

      {/* Purchase Modal */}
      <PurchaseModal
        isOpen={purchaseModal.isOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmPurchase}
        item={purchaseModal.item}
        type={purchaseModal.type}
      />

      {/* Toast notifications */}
      <Toast {...toast} />
    </>
  );
}

export default Shop;
