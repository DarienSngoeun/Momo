import { Check, Lock } from 'lucide-react';
import { Button } from '../ui/Button';
import { useUserStore } from '../../store/useUserStore';
import { usePetStore } from '../../store/usePetStore';

export function AnimationCard({ animation, onPurchase, onPreview, isActive }) {
  const coins = useUserStore((state) => state.coins);
  const isAnimationOwned = usePetStore((state) => state.isAnimationOwned(animation.id));
  
  const canAfford = coins >= animation.price;
  const isOwned = isAnimationOwned;

  return (
    <div
      className={`bg-white rounded-xl border border-gray-200 p-4 shadow-sm cursor-pointer card-hover
        ${isActive ? 'border-accent-warm ring-2 ring-accent-warm' : ''}
      `}
      onClick={() => onPreview(animation)} // Click to preview
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 mb-1">{animation.name}</h3>
          <p className="text-sm text-gray-600">{animation.description}</p>
        </div>
        {isOwned && (
          <div className="ml-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 shrink-0">
            <Check size={12} />
            Owned
          </div>
        )}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 text-accent-cozy font-semibold">
          <span>{animation.price}</span>
          <span className="text-xs">coins</span>
        </div>

        <Button
          variant={isOwned ? 'secondary' : 'primary'}
          size="sm"
          onClick={(e) => {
            e.stopPropagation(); // Prevent preview trigger
            onPurchase(animation);
          }}
          disabled={isOwned || !canAfford}
          className="flex items-center gap-1"
        >
          {isOwned ? (
            <>
              <Check size={14} />
              Owned
            </>
          ) : !canAfford ? (
            <>
              <Lock size={14} />
              Locked
            </>
          ) : (
            'Buy'
          )}
        </Button>
      </div>
    </div>
  );
}

