import { Check } from 'lucide-react';
import { usePetStore } from '../../store/usePetStore';

const availableIdleAnimations = [
  { key: 'idle', name: 'Idle', description: 'Standing still' },
  { key: 'walk', name: 'Walk', description: 'Walking around' },
];

export function IdleAnimList({ onSelectAnimation }) {
  const activeIdleKey = usePetStore((state) => state.activeIdleKey);
  const ownedAnimations = usePetStore((state) => state.ownedAnimations);

  const ownedIdleAnims = availableIdleAnimations.filter((anim) =>
    ownedAnimations.includes(anim.key)
  );

  if (ownedIdleAnims.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No animations owned yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {ownedIdleAnims.map((anim) => {
        const isActive = anim.key === activeIdleKey;
        
        return (
          <button
            key={anim.key}
            onClick={() => onSelectAnimation(anim)}
            className={`
              w-full p-4 rounded-lg border-2 transition-all text-left
              ${isActive 
                ? 'border-accent-warm bg-accent-warm bg-opacity-10' 
                : 'border-gray-200 hover:border-gray-300'
              }
            `}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">{anim.name}</h4>
                <p className="text-sm text-gray-600">{anim.description}</p>
              </div>
              {isActive && (
                <div className="ml-3 w-8 h-8 bg-accent-warm rounded-full flex items-center justify-center shrink-0">
                  <Check size={16} className="text-white" />
                </div>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}

