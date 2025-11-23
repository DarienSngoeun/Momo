import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Info } from "lucide-react";

const icons = {
  success: CheckCircle,
  info: Info,
};

export function Toast({ message, type = "info", isVisible }) {
  const Icon = icons[type];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.15 }}
          className="absolute bottom-24 right-4 z-50"
        >
          <div
            role="status"
            className="bg-white shadow-lg rounded-lg px-4 py-3 flex items-center gap-2 max-w-sm"
          >
            <Icon
              size={20}
              className={
                type === "success" ? "text-green-500" : "text-blue-500"
              }
            />
            <p className="text-sm font-medium text-gray-900">{message}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Hook for managing toast state
export function useToast() {
  const [toast, setToast] = useState({
    message: "",
    type: "info",
    isVisible: false,
  });

  const showToast = (message, type = "info", duration = 3000) => {
    setToast({ message, type, isVisible: true });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, isVisible: false }));
    }, duration);
  };

  return { toast, showToast };
}
