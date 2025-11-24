import { HandCoins } from 'lucide-react';
import { useUserStore } from '../../store/useUserStore';

export function CoinsBadge({ className = '' }) {
  const coins = useUserStore((state) => state.coins);

  return (
    <div className={`flex items-center gap-2 px-3 py-2 bg-accent-soft bg-opacity-20 rounded-lg ${className}`}>
      <HandCoins size={18} className="text-accent-cozy" />
      <span className="font-semibold text-gray-900">{coins}</span>
    </div>
  );
}

