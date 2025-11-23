import { motion } from "framer-motion";
import { SpritePlayer } from "./SpritePlayer";
import { getPet } from "../../utils/petRegistry";

const reactionAnimations = {
  happy: "jump",
  sad: "hit",
  stunned: "stuned", // Most species use "stuned", penguins use "confused"
};

export function PetReaction({ type, petId, message, onComplete }) {
  const pet = getPet(petId);
  let animationKey = reactionAnimations[type];

  if (!pet || !animationKey) {
    onComplete?.();
    return null;
  }

  // For "stuned" animation: penguins use "confused", others use "stuned"
  let animation = pet.animations[animationKey];
  if (!animation && animationKey === "stuned") {
    // Try penguin's "confused" animation
    animation = pet.animations["confused"] || pet.animations["hit"];
  }

  if (!animation) {
    onComplete?.();
    return null;
  }

  return (
    <motion.div
      initial={{ scale: 0.3, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
      className="absolute inset-0 z-50 flex items-center justify-center bg-black bg-opacity-20 pointer-events-none"
    >
      <div className="flex flex-col items-center pointer-events-none">
        {/* Speech bubble message */}
        {message && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.3 }}
            className="bg-white rounded-2xl px-6 py-3 shadow-xl relative mb-2"
          >
            <p className="text-lg font-semibold text-gray-900 whitespace-nowrap">
              {message}
            </p>
            {/* Speech bubble arrow pointing down to Momo */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white rotate-45" />
          </motion.div>
        )}

        {/* Momo animation */}
        <div className="w-64 h-64 pointer-events-none">
          <SpritePlayer
            frames={animation.frames}
            fps={animation.fps}
            loop={false}
            onComplete={onComplete}
            className="w-full h-full object-contain drop-shadow-2xl"
          />
        </div>
      </div>
    </motion.div>
  );
}
