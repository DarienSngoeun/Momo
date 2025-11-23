import { useState, useEffect, useRef, memo } from 'react';

function SpritePlayerComponent({ frames, fps = 12, loop = true, onComplete, className = '' }) {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const frameIndexRef = useRef(0);
  const preloadedImagesRef = useRef([]);

  // Preload all frames
  useEffect(() => {
    if (!frames || frames.length === 0) return;

    let loadedCount = 0;
    const images = [];

    frames.forEach((frameSrc, index) => {
      const img = new Image();
      img.src = frameSrc;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === frames.length) {
          setIsLoaded(true);
        }
      };
      img.onerror = () => {
        console.warn(`Failed to load frame: ${frameSrc}`);
        loadedCount++;
        if (loadedCount === frames.length) {
          setIsLoaded(true);
        }
      };
      images[index] = img;
    });

    preloadedImagesRef.current = images;

    return () => {
      preloadedImagesRef.current = [];
    };
  }, [frames]);

  // Animation loop
  useEffect(() => {
    if (!isLoaded || !frames || frames.length === 0) return;

    const intervalMs = 1000 / fps;
    const interval = setInterval(() => {
      frameIndexRef.current++;

      if (frameIndexRef.current >= frames.length) {
        if (loop) {
          frameIndexRef.current = 0;
        } else {
          clearInterval(interval);
          if (onComplete) onComplete();
          return;
        }
      }

      setCurrentFrame(frameIndexRef.current);
    }, intervalMs);

    return () => clearInterval(interval);
  }, [frames, fps, loop, isLoaded, onComplete]);

  if (!frames || frames.length === 0) {
    return <div className={`${className} flex items-center justify-center`}>No animation</div>;
  }

  if (!isLoaded) {
    return (
      <div className={`${className} flex items-center justify-center`}>
        <div className="animate-pulse text-gray-400">Loading...</div>
      </div>
    );
  }

  return (
    <img
      src={frames[currentFrame]}
      alt=""
      className={`${className} select-none`}
      draggable={false}
    />
  );
}

// Memoize to prevent unnecessary re-renders
export const SpritePlayer = memo(SpritePlayerComponent);

