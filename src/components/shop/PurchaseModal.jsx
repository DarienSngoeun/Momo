import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Coins } from 'lucide-react';
import { useUserStore } from '../../store/useUserStore';

export function PurchaseModal({ isOpen, onClose, onConfirm, item, type = 'pet' }) {
  const coins = useUserStore((state) => state.coins);

  if (!item) return null;

  const itemName = item.name;
  const price = item.price;
  const canAfford = coins >= price;
  const remainingCoins = coins - price;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Confirm Purchase">
      <div className="py-4">
        {type === 'pet' && item.thumbnail && (
          <div className="flex justify-center mb-4">
            <img
              src={item.thumbnail}
              alt={itemName}
              className="w-32 h-32 object-contain"
            />
          </div>
        )}

        <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">
          {itemName}
        </h3>
        
        <div className="bg-gray-50 rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-gray-600">Price:</span>
            <div className="flex items-center gap-1 font-semibold text-gray-900">
              <Coins size={16} className="text-accent-cozy" />
              {price}
            </div>
          </div>
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-gray-600">Your balance:</span>
            <div className="flex items-center gap-1 font-semibold text-gray-900">
              <Coins size={16} className="text-accent-cozy" />
              {coins}
            </div>
          </div>
          <div className="border-t border-gray-200 pt-2 mt-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">After purchase:</span>
              <div className={`flex items-center gap-1 font-semibold ${canAfford ? 'text-green-600' : 'text-red-600'}`}>
                <Coins size={16} className="text-accent-cozy" />
                {remainingCoins}
              </div>
            </div>
          </div>
        </div>

        {!canAfford && (
          <p className="text-sm text-red-600 text-center mb-4">
            Not enough coins! Complete more tasks to earn coins.
          </p>
        )}
        
        <div className="flex gap-3">
          <Button variant="secondary" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          <Button 
            variant="primary" 
            onClick={onConfirm} 
            disabled={!canAfford}
            className="flex-1"
          >
            Buy Now
          </Button>
        </div>
      </div>
    </Modal>
  );
}

