import { Flame } from 'lucide-react';
import { useUserStore } from '../../store/useUserStore';

export function StreakBadge({ showLongest = false, className = '' }) {
  const streak = useUserStore((state) => state.streak);

  return (
    <div className={`flex items-center gap-2 px-3 py-2 bg-orange-100 rounded-lg ${className}`}>
      <Flame size={18} className="text-orange-500" />
      <div className="text-sm">
        <span className="font-semibold text-gray-900">{streak.current}</span>
        <span className="text-gray-600 ml-1">day{streak.current !== 1 ? 's' : ''}</span>
        {showLongest && streak.longest > streak.current && (
          <span className="text-xs text-gray-500 ml-2">(Best: {streak.longest})</span>
        )}
      </div>
    </div>
  );
}

