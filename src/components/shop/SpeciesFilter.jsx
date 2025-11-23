import { useState } from 'react';

const species = [
  { id: 'all', name: 'All', emoji: '🌟' },
  { id: 'cat', name: 'Cats', emoji: '🐱' },
  { id: 'bear', name: 'Bears', emoji: '🐻' },
  { id: 'panda', name: 'Pandas', emoji: '🐼' },
  { id: 'bunny', name: 'Bunnies', emoji: '🐰' },
  { id: 'capybara', name: 'Capybaras', emoji: '🦫' },
  { id: 'penguin', name: 'Penguins', emoji: '🐧' },
  { id: 'duckling', name: 'Ducklings', emoji: '🦆' },
  { id: 'koala', name: 'Koalas', emoji: '🐨' },
  { id: 'pig', name: 'Pigs', emoji: '🐷' },
  { id: 'raccoon', name: 'Raccoons', emoji: '🦝' },
  { id: 'beaver', name: 'Beavers', emoji: '🦫' },
  { id: 'redpanda', name: 'Red Pandas', emoji: '🦊' },
];

export function SpeciesFilter({ selectedSpecies, onSpeciesChange }) {
  return (
    <div className="mb-4">
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {species.map((spec) => (
          <button
            key={spec.id}
            onClick={() => onSpeciesChange(spec.id)}
            className={`
              flex items-center gap-1 px-3 py-2 rounded-lg font-medium whitespace-nowrap
              transition-all touch-target flex-shrink-0
              ${
                selectedSpecies === spec.id
                  ? 'bg-accent-warm text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }
            `}
          >
            <span>{spec.emoji}</span>
            <span className="text-sm">{spec.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

