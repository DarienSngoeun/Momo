import { PetDisplay } from "./PetDisplay";
import { usePetStore } from "../../store/usePetStore";
import { getTheme } from "../../utils/themeRegistry";

export function ThemedPetDisplay({
  petId,
  animationKey,
  size = "md",
  className = "",
  previewThemeId = null,
}) {
  const activeThemeId = usePetStore((state) => state.activeThemeId);
  // Use preview theme if provided, otherwise use active theme
  const themeId = previewThemeId || activeThemeId;
  const theme = getTheme(themeId);

  return (
    <div
      className={`relative rounded-xl overflow-hidden ${className}`}
      style={{
        backgroundImage: theme ? `url(${theme.background})` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex items-center justify-center min-h-[300px]">
        <PetDisplay petId={petId} animationKey={animationKey} size={size} />
      </div>
    </div>
  );
}
