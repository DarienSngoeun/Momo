import { Modal } from "./Modal";
import { Button } from "./Button";

export function ConfirmModal({ isOpen, onClose, onConfirm, title, message }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title || "Confirm Action"}>
      <div className="space-y-6">
        <p className="text-gray-700">{message}</p>

        <div className="flex gap-3">
          <Button variant="secondary" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="flex-1 bg-red-500 hover:bg-red-600"
          >
            Remove
          </Button>
        </div>
      </div>
    </Modal>
  );
}
