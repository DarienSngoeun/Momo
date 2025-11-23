import { motion } from 'framer-motion';

export function ProgressBar({ current, total, label, className = '' }) {
  const percentage = total > 0 ? (current / total) * 100 : 0;

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>{label}</span>
          <span>
            {current}/{total}
          </span>
        </div>
      )}
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="h-full bg-accent-warm rounded-full"
        />
      </div>
    </div>
  );
}

