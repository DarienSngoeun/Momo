import { Check } from 'lucide-react';
import { usePetStore } from '../../store/usePetStore';
import { getAllThemes } from '../../utils/themeRegistry';

export function OwnedThemesGrid({ onSelectTheme }) {
  const ownedThemes = usePetStore((state) => state.ownedThemes);
  const activeThemeId = usePetStore((state) => state.activeThemeId);
  
  const allThemes = getAllThemes();
  const ownedThemesList = allThemes.filter((theme) => ownedThemes.includes(theme.id));

  if (ownedThemesList.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No themes owned yet. Visit the shop to get more!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3">
      {ownedThemesList.map((theme) => {
        const isActive = theme.id === activeThemeId;
        
        return (
          <button
            key={theme.id}
            onClick={() => onSelectTheme(theme)}
            className={`
              relative rounded-xl border-2 transition-all card-hover overflow-hidden
              ${isActive 
                ? 'border-accent-warm ring-2 ring-accent-warm ring-opacity-50' 
                : 'border-gray-200 hover:border-gray-300'
              }
            `}
          >
            {isActive && (
              <div className="absolute top-2 right-2 w-6 h-6 bg-accent-warm rounded-full flex items-center justify-center z-10">
                <Check size={14} className="text-white" />
              </div>
            )}
            
            <div className="relative h-32">
              <img
                src={theme.preview}
                alt={theme.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-2">
                <p className="text-xs font-medium text-white truncate">{theme.name}</p>
                <p className="text-xs text-gray-300">{theme.category}</p>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}

