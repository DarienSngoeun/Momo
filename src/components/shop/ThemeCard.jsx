import { Check, Lock } from 'lucide-react';
import { Button } from '../ui/Button';
import { useUserStore } from '../../store/useUserStore';
import { usePetStore } from '../../store/usePetStore';

export function ThemeCard({ theme, onPurchase, onPreview, isActive }) {
  const coins = useUserStore((state) => state.coins);
  const isThemeOwned = usePetStore((state) => state.isThemeOwned(theme.id));
  
  const canAfford = coins >= theme.price;
  const isOwned = isThemeOwned;

  return (
    <div 
      className={`
        bg-white rounded-xl border-2 shadow-sm overflow-hidden cursor-pointer transition-all
        ${isActive 
          ? 'border-accent-warm ring-2 ring-accent-warm ring-opacity-50' 
          : 'border-gray-200 hover:border-gray-300'
        }
      `}
      onClick={() => onPreview?.(theme)}
    >
      <div className="relative h-40">
        <img
          src={theme.preview}
          alt={theme.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
          {theme.category}
        </div>
      </div>

      <div className="p-3">
        <h3 className="font-semibold text-gray-900 mb-2 truncate">{theme.name}</h3>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-accent-cozy font-semibold">
            <span>{theme.price}</span>
            <span className="text-xs">coins</span>
          </div>

        <Button
          variant={isOwned ? 'secondary' : 'primary'}
          size="sm"
          onClick={(e) => {
            e.stopPropagation(); // Prevent preview trigger
            onPurchase(theme);
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
    </div>
  );
}

