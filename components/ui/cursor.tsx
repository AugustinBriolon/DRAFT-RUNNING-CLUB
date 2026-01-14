import { isTouchDevice } from '@/hooks/useTouchDevice';
import { useCallback, useEffect, useRef, useState } from 'react';

interface TrailPoint {
  x: number;
  y: number;
  id: number;
}

const MAX_TRAIL_LENGTH = 15;
const TRAIL_INTERVAL = 20;

const Cursor = () => {
  const observerRef = useRef<MutationObserver | null>(null);
  const lastTrailTimeRef = useRef<number>(0);

  const [trail, setTrail] = useState<TrailPoint[]>([]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const now = Date.now();
    if (now - lastTrailTimeRef.current < TRAIL_INTERVAL) return;
    lastTrailTimeRef.current = now;

    setTrail((prev) => {
      const newTrail = [...prev, { x: e.clientX, y: e.clientY, id: now }];
      if (newTrail.length > MAX_TRAIL_LENGTH) {
        return newTrail.slice(-MAX_TRAIL_LENGTH);
      }

      return newTrail;
    });
  }, []);

  useEffect(() => {
    if (isTouchDevice()) return;

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      observerRef.current?.disconnect();
    };
  }, [handleMouseMove]);

  if (isTouchDevice()) return null;

  return (
    <>
      {trail.map((point, i) => {
        const isOldest = i === 0 && trail.length === MAX_TRAIL_LENGTH;
        const opacity = (i + 1) / trail.length;
        const scale = isOldest ? 0 : 1;

        return (
          <div
            key={point.id}
            className="bg-red pointer-events-none fixed z-9998 h-1 w-1 rounded-full"
            style={{
              left: `${point.x}px`,
              top: `${point.y}px`,
              transform: `translate(-50%, -50%) scale(${scale})`,
              opacity: opacity,
              transition: 'opacity 0.2s ease-out, transform 0.2s ease-out',
            }}
          />
        );
      })}
    </>
  );
};

export default Cursor;
