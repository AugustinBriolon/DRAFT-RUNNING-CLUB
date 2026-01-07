import { isTouchDevice } from '@/hooks/useTouchDevice';
import { useGSAP } from '@gsap/react';
import clsx from 'clsx';
import gsap from 'gsap';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';

enum CURSOR_STATE {
  DEFAULT = 'DEFAULT',
  POINTER = 'POINTER',
}

const Cursor = () => {
  const { contextSafe } = useGSAP();
  const pathname = usePathname();
  const pointerRefs = {
    primary: useRef<HTMLDivElement>(null),
    secondary: useRef<HTMLDivElement>(null),
  };
  const observerRef = useRef<MutationObserver | null>(null);

  const [cursorState, setCursorState] = useState(CURSOR_STATE.DEFAULT);
  const [isActive, setIsActive] = useState(false);

  const cursorStateHandlers = {
    changeToButton: useCallback(() => setCursorState(CURSOR_STATE.POINTER), []),
    changeToDefault: useCallback(() => setCursorState(CURSOR_STATE.DEFAULT), []),
  };

  const cursorHandlers = {
    moveCursor: contextSafe((e: MouseEvent) => {
      if (!pointerRefs.primary.current || !pointerRefs.secondary.current) return;
      pointerRefs.primary.current.style.opacity = '1';
      pointerRefs.secondary.current.style.opacity = '1';
      // Point central suit immédiatement
      gsap.to(pointerRefs.primary.current, {
        duration: 0.15,
        x: e.clientX,
        y: e.clientY,
        ease: 'power2.out',
      });
      // Halo suit avec un léger délai pour un effet de traînée
      gsap.to(pointerRefs.secondary.current, {
        duration: 0.4,
        x: e.clientX,
        y: e.clientY,
        ease: 'power2.out',
      });
    }),
    handleMouseDown: useCallback(() => {
      setIsActive(true);
    }, []),
    handleMouseUp: useCallback(() => {
      setIsActive(false);
    }, []),
  };

  const manageCursorEvents = useCallback(
    (event: 'addEventListener' | 'removeEventListener') => {
      const elements = {
        button: document.querySelectorAll('.cursor-pointer'),
      };

      Object.entries({
        button: cursorStateHandlers.changeToButton,
      }).forEach(([key, handler]) => {
        elements[key as keyof typeof elements].forEach((el) => {
          el[event]('mouseover', handler);
          el[event]('mouseleave', cursorStateHandlers.changeToDefault);
        });
      });
    },
    [cursorStateHandlers],
  );

  useEffect(() => {
    // Ne pas ajouter les event listeners sur les appareils tactiles
    if (isTouchDevice()) return;

    observerRef.current = new MutationObserver(() => {
      manageCursorEvents('removeEventListener');
      manageCursorEvents('addEventListener');
    });

    const { moveCursor, handleMouseDown, handleMouseUp } = cursorHandlers;

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    manageCursorEvents('addEventListener');
    observerRef.current.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      manageCursorEvents('removeEventListener');
      observerRef.current?.disconnect();
    };
  }, [cursorHandlers, manageCursorEvents, isTouchDevice]);

  useEffect(() => {
    setTimeout(() => {
      setCursorState(CURSOR_STATE.DEFAULT);
    }, 500);
  }, [pathname]);

  if (isTouchDevice()) return null;

  return (
    <>
      {/* Point central - suit directement la souris */}
      <div
        ref={pointerRefs.primary}
        className={clsx(
          'pointer-events-none fixed top-0 left-0 z-9999 hidden h-6 w-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center md:flex',
        )}
      >
        <div
          className={clsx(
            'h-1 w-1 rounded-full bg-black transition-all duration-300 ease-out',
            isActive && 'scale-150 bg-white',
            cursorState === CURSOR_STATE.POINTER && 'scale-200 bg-black',
          )}
        />
      </div>
      {/* Halo externe - suit avec un léger délai */}
      <div
        ref={pointerRefs.secondary}
        className={clsx(
          'pointer-events-none fixed top-0 left-0 z-9999 hidden h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center md:flex',
        )}
      >
        <div
          className={clsx(
            'rounded-full border border-black transition-all duration-500 ease-out',
            cursorState === CURSOR_STATE.DEFAULT && 'border-opacity-30 h-8 w-8',
            cursorState === CURSOR_STATE.POINTER && 'h-16 w-16 border-2 opacity-100',
            isActive && 'border-opacity-50 scale-75',
          )}
        />
      </div>
    </>
  );
};

export default Cursor;
