import { ThemedPetDisplay } from '../pet/ThemedPetDisplay';
import { usePetStore } from '../../store/usePetStore';
import { getPet } from '../../utils/petRegistry';

export function LivePreview({ className = '' }) {
  const activePetId = usePetStore((state) => state.activePetId);
  const activeIdleKey = usePetStore((state) => state.activeIdleKey);
  const activeThemeId = usePetStore((state) => state.activeThemeId);
  const pet = getPet(activePetId);

  return (
    <div className={className}>
      <div className="text-center mb-3">
        <h3 className="text-lg font-semibold text-gray-900">
          {pet?.name || 'Your Pet'}
        </h3>
        <p className="text-sm text-gray-600 capitalize">{activeIdleKey} Animation</p>
      </div>
      
      <ThemedPetDisplay
        petId={activePetId}
        animationKey={activeIdleKey}
        size="xl"
        className="shadow-lg"
      />
    </div>
  );
}

