import NumberFlow from '@number-flow/react';
import clsx from 'clsx';
import { forwardRef, useLayoutEffect, useRef } from 'react';

interface FullWidthTitleProps {
  children?: React.ReactNode;
  className?: string;
  classChildren?: string;
  isNumberFlow?: boolean;
  value?: number;
  finalValue?: number;
}

const FullWidthTitle = forwardRef<HTMLDivElement, FullWidthTitleProps>(
  ({ children, className, classChildren, isNumberFlow = false, value, finalValue }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const measureRef = useRef<HTMLDivElement>(null);
    const baseFontSizeRef = useRef<number | null>(null);

    // Logique simple pour le mode normal (sans NumberFlow)
    const adjustTextSizeNormal = () => {
      if (typeof window === 'undefined') return;

      const container = containerRef.current;
      const text = textRef.current;

      if (!container || !text) return;

      const containerWidth = container.offsetWidth;
      if (containerWidth === 0) return;

      if (baseFontSizeRef.current === null) {
        text.style.fontSize = '';
        baseFontSizeRef.current = parseFloat(window.getComputedStyle(text).fontSize) || 16;
      }

      text.style.fontSize = `${baseFontSizeRef.current}px`;

      const textWidth = text.scrollWidth;
      if (textWidth === 0) return;

      const fontSize = (containerWidth / textWidth) * baseFontSizeRef.current;
      text.style.fontSize = `${fontSize}px`;
    };

    // Logique complexe pour le mode NumberFlow
    const adjustTextSizeNumberFlow = () => {
      if (typeof window === 'undefined') return;

      const container = containerRef.current;
      const text = textRef.current;
      const measure = measureRef.current;

      if (!container || !text || !measure) return;

      const containerWidth = container.offsetWidth;
      if (containerWidth === 0) return;

      // Étape 1 : Appliquer la logique FullWidthTitle normale à measureRef pour obtenir sa font-size optimale
      if (baseFontSizeRef.current === null) {
        measure.style.fontSize = '';
        baseFontSizeRef.current = parseFloat(window.getComputedStyle(measure).fontSize) || 16;
      }

      measure.style.fontSize = `${baseFontSizeRef.current}px`;
      const measureWidth = measure.scrollWidth;
      if (measureWidth === 0) return;

      // Étape 2 : Calculer la font-size optimale basée sur la largeur finale
      const optimalFontSize = (containerWidth / measureWidth) * baseFontSizeRef.current;

      // Étape 3 : Appliquer cette font-size fixe à textRef (qui contient le NumberFlow animé)
      text.style.fontSize = `${optimalFontSize}px`;
    };

    // Fonction qui appelle la bonne logique selon le mode
    const adjustTextSize = () => {
      if (isNumberFlow) {
        adjustTextSizeNumberFlow();
      } else {
        adjustTextSizeNormal();
      }
    };

    useLayoutEffect(() => {
      if (typeof window === 'undefined') return;

      baseFontSizeRef.current = null;
      adjustTextSize();

      const ResizeObs = (
        window as unknown as {
          ResizeObserver?: new (callback: () => void) => {
            observe: (target: Element) => void;
            disconnect: () => void;
          };
        }
      ).ResizeObserver;
      if (!ResizeObs) return;

      const resizeObserver = new ResizeObs(() => {
        adjustTextSize();
      });

      if (containerRef.current) {
        resizeObserver.observe(containerRef.current);
      }

      return () => {
        resizeObserver.disconnect();
      };
    }, [children, isNumberFlow, value, finalValue]);

    const setTextRef = (node: HTMLDivElement | null) => {
      textRef.current = node;
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    };

    const currentValue = typeof value === 'number' ? value : (finalValue ?? 0);

    if (isNumberFlow) {
      return (
        <div
          ref={containerRef}
          className={clsx('flex w-full items-center justify-center overflow-hidden', className)}
        >
          <div
            ref={measureRef}
            aria-hidden="true"
            className="font-impact pointer-events-none invisible absolute leading-none whitespace-nowrap"
          >
            <NumberFlow value={finalValue ?? 0} />
            {children}
          </div>

          <div
            ref={setTextRef}
            className={clsx(
              'font-impact flex w-full items-center justify-end leading-none whitespace-nowrap',
              classChildren,
            )}
          >
            <NumberFlow value={currentValue} />
            {children}
          </div>
        </div>
      );
    }

    return (
      <div
        ref={containerRef}
        className={clsx('flex w-full items-center justify-center overflow-hidden', className)}
      >
        <div
          ref={setTextRef}
          className={clsx('font-impact leading-none whitespace-nowrap', classChildren)}
          id="title-text"
        >
          {children}
        </div>
      </div>
    );
  },
);

FullWidthTitle.displayName = 'FullWidthTitle';

export default FullWidthTitle;
