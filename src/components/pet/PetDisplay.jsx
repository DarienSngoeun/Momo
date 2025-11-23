import { SpritePlayer } from "./SpritePlayer";
import { getPet } from "../../utils/petRegistry";

const sizes = {
  sm: "w-24 h-24",
  md: "w-32 h-32",
  lg: "w-48 h-48",
  xl: "w-64 h-64",
};

export function PetDisplay({
  petId,
  animationKey = "idle",
  size = "md",
  className = "",
}) {
  const pet = getPet(petId);

  if (!pet) {
    return (
      <div
        className={`${sizes[size]} ${className} flex items-center justify-center bg-gray-100 rounded-lg`}
      >
        <p className="text-sm text-gray-400">Pet not found</p>
      </div>
    );
  }

  const animation = pet.animations[animationKey];

  if (!animation) {
    return (
      <div
        className={`${sizes[size]} ${className} flex items-center justify-center bg-gray-100 rounded-lg`}
      >
        <p className="text-sm text-gray-400">Animation not found</p>
      </div>
    );
  }

  return (
    <div
      className={`${sizes[size]} ${className} flex items-center justify-center`}
    >
      <SpritePlayer
        frames={animation.frames}
        fps={animation.fps}
        loop={true}
        className="w-full h-full object-contain"
      />
    </div>
  );
}
