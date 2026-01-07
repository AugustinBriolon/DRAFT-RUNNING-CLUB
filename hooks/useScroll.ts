import { useLenis } from 'lenis/react';
import { useCallback, useEffect, useState } from 'react';

const globalScrollState = {
  isLocked: false,
  listeners: new Set<() => void>(),
};

const notifyListeners = () => {
  globalScrollState.listeners.forEach((listener) => listener());
};

const updateScrollState = (isLocked: boolean) => {
  globalScrollState.isLocked = isLocked;
  notifyListeners();
};

const lockNativeScroll = (shouldLock: boolean) => {
  if (typeof document === 'undefined') return;

  if (shouldLock) {
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
  }
};

const preventScroll = (e: Event) => {
  e.preventDefault();
  e.stopPropagation();
};

let scrollEventListeners: {
  wheel: (e: WheelEvent) => void;
  touchmove: (e: TouchEvent) => void;
} | null = null;

const lockScrollEvents = (shouldLock: boolean) => {
  if (typeof document === 'undefined') return;

  if (shouldLock) {
    if (!scrollEventListeners) {
      scrollEventListeners = {
        wheel: preventScroll as (e: WheelEvent) => void,
        touchmove: preventScroll as (e: TouchEvent) => void,
      };
      document.addEventListener('wheel', scrollEventListeners.wheel, { passive: false });
      document.addEventListener('touchmove', scrollEventListeners.touchmove, { passive: false });
    }
  } else {
    if (scrollEventListeners) {
      document.removeEventListener('wheel', scrollEventListeners.wheel);
      document.removeEventListener('touchmove', scrollEventListeners.touchmove);
      scrollEventListeners = null;
    }
  }
};

export const useScroll = () => {
  const [isLocked, setIsLocked] = useState(globalScrollState.isLocked);
  const lenis = useLenis();

  useEffect(() => {
    const listener = () => setIsLocked(globalScrollState.isLocked);
    globalScrollState.listeners.add(listener);
    return () => {
      globalScrollState.listeners.delete(listener);
    };
  }, []);

  useEffect(() => {
    lockNativeScroll(globalScrollState.isLocked);
    lockScrollEvents(globalScrollState.isLocked);

    if (lenis) {
      if (globalScrollState.isLocked) {
        lenis.stop();
        lenis.scrollTo(0, { immediate: true });
      } else {
        lenis.start();
      }
    }
  }, [lenis, isLocked]);

  const lockScroll = useCallback(
    (shouldLock: boolean) => {
      updateScrollState(shouldLock);
      lockNativeScroll(shouldLock);
      lockScrollEvents(shouldLock);
      if (lenis) {
        if (shouldLock) {
          lenis.stop();
          lenis.scrollTo(0, { immediate: true });
        } else {
          lenis.start();
        }
      }
    },
    [lenis],
  );

  return { isLocked, lockScroll };
};
