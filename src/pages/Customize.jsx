import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { Container } from "../components/layout/Container";
import { LivePreview } from "../components/customize/LivePreview";
import { OwnedPetsGrid } from "../components/customize/OwnedPetsGrid";
import { IdleAnimList } from "../components/customize/IdleAnimList";
import { OwnedThemesGrid } from "../components/customize/OwnedThemesGrid";
import { CoinsBadge } from "../components/progress/CoinsBadge";
import { usePetStore } from "../store/usePetStore";

function Customize() {
  const setActivePet = usePetStore((state) => state.setActivePet);
  const setActiveIdle = usePetStore((state) => state.setActiveIdle);
  const setActiveTheme = usePetStore((state) => state.setActiveTheme);

  // Instant equip - no confirmation needed
  const handleSelectPet = (pet) => {
    setActivePet(pet.id);
  };

  const handleSelectAnimation = (anim) => {
    setActiveIdle(anim.key);
  };

  const handleSelectTheme = (theme) => {
    setActiveTheme(theme.id);
  };

  return (
    <Container className="pt-12 pb-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Customize</h1>
        <div className="flex flex-col gap-2 items-end">
          <CoinsBadge />
          <Link
            to="/shop"
            className="p-2 rounded-lg bg-accent-warm text-white hover:bg-accent-cozy transition-colors shadow-sm flex items-center gap-2"
            aria-label="Shop"
          >
            <ShoppingCart size={20} />
            <span className="text-sm font-medium">Shop</span>
          </Link>
        </div>
      </div>

      {/* Live Preview - Sticky */}
      <div className="sticky top-0 z-20 bg-gray-50 pb-4 mb-4">
        <LivePreview />
      </div>

      {/* Owned Pets */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Your Pets</h2>
        <OwnedPetsGrid onSelectPet={handleSelectPet} />
      </section>

      {/* Idle Animations */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Idle Animations
        </h2>
        <IdleAnimList onSelectAnimation={handleSelectAnimation} />
      </section>

      {/* Background Themes */}
      <section>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Background Themes
        </h2>
        <OwnedThemesGrid onSelectTheme={handleSelectTheme} />
      </section>
    </Container>
  );
}

export default Customize;
