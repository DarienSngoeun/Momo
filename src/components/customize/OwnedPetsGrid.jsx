import { Check } from 'lucide-react';
import { usePetStore } from '../../store/usePetStore';
import { getAllPets } from '../../utils/petRegistry';

export function OwnedPetsGrid({ onSelectPet }) {
  const ownedPets = usePetStore((state) => state.ownedPets);
  const activePetId = usePetStore((state) => state.activePetId);
  
  const allPets = getAllPets();
  const ownedPetsList = allPets.filter((pet) => ownedPets.includes(pet.id));

  if (ownedPetsList.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No pets owned yet. Visit the shop to get more!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-3">
      {ownedPetsList.map((pet) => {
        const isActive = pet.id === activePetId;
        
        return (
          <button
            key={pet.id}
            onClick={() => onSelectPet(pet)}
            className={`
              relative p-3 rounded-xl border-2 transition-all card-hover
              ${isActive 
                ? 'border-accent-warm bg-accent-warm bg-opacity-10' 
                : 'border-gray-200 hover:border-gray-300'
              }
            `}
          >
            {isActive && (
              <div className="absolute top-1 right-1 w-6 h-6 bg-accent-warm rounded-full flex items-center justify-center">
                <Check size={14} className="text-white" />
              </div>
            )}
            
            <img
              src={pet.thumbnail}
              alt={pet.name}
              className="w-full h-20 object-contain mb-2"
            />
            
            <p className="text-xs font-medium text-gray-900 text-center truncate">
              {pet.name}
            </p>
          </button>
        );
      })}
    </div>
  );
}

