import { Check, Lock } from 'lucide-react';
import { Button } from '../ui/Button';
import { useUserStore } from '../../store/useUserStore';
import { usePetStore } from '../../store/usePetStore';

export function PetCard({ pet, onPurchase, onPreview, isActive }) {
  const coins = useUserStore((state) => state.coins);
  const isPetOwned = usePetStore((state) => state.isPetOwned(pet.id));
  
  const canAfford = coins >= pet.price;
  const isOwned = isPetOwned;

  return (
    <div 
      className={`
        bg-white rounded-xl border-2 p-4 shadow-sm cursor-pointer transition-all
        ${isActive 
          ? 'border-accent-warm ring-2 ring-accent-warm ring-opacity-50' 
          : 'border-gray-200 hover:border-gray-300'
        }
      `}
      onClick={() => onPreview?.(pet)}
    >
      <div className="relative mb-3">
        <img
          src={pet.thumbnail}
          alt={pet.name}
          className="w-full h-32 object-contain"
        />
        {isOwned && (
          <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
            <Check size={12} />
            Owned
          </div>
        )}
      </div>

      <h3 className="font-semibold text-gray-900 mb-1">{pet.name}</h3>
      <p className="text-sm text-gray-600 capitalize mb-3">{pet.species}</p>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 text-accent-cozy font-semibold">
          <span>{pet.price}</span>
          <span className="text-xs">coins</span>
        </div>

        <Button
          variant={isOwned ? 'secondary' : 'primary'}
          size="sm"
          onClick={(e) => {
            e.stopPropagation(); // Prevent preview trigger
            onPurchase(pet);
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

