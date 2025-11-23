import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';

export function EquipConfirm({ isOpen, onClose, onConfirm, item, type = 'pet' }) {
  if (!item) return null;

  const itemName = item.name;
  let message;
  
  if (type === 'pet') {
    message = `Equip ${itemName} as your active pet?`;
  } else if (type === 'animation') {
    message = `Equip ${itemName} animation?`;
  } else if (type === 'theme') {
    message = `Equip ${itemName} as your background theme?`;
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Confirm">
      <div className="py-4">
        <p className="text-gray-700 mb-6 text-center">{message}</p>
        
        <div className="flex gap-3">
          <Button variant="secondary" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          <Button variant="primary" onClick={onConfirm} className="flex-1">
            Equip
          </Button>
        </div>
      </div>
    </Modal>
  );
}

