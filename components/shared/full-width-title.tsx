import clsx from 'clsx';
import { forwardRef, useLayoutEffect, useRef } from 'react';

interface FullWidthTitleProps {
  children: React.ReactNode;
  className?: string;
}

const FullWidthTitle = forwardRef<HTMLDivElement, FullWidthTitleProps>(
  ({ children, className }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const baseFontSizeRef = useRef<number | null>(null);

    const adjustTextSize = () => {
      const container = containerRef.current;
      const text = textRef.current;

      if (!container || !text) return;

      const containerWidth = container.offsetWidth;
      if (containerWidth === 0) return;

      if (baseFontSizeRef.current === null) {
        text.style.fontSize = '';
        baseFontSizeRef.current = parseFloat(getComputedStyle(text).fontSize) || 16;
      }

      text.style.fontSize = `${baseFontSizeRef.current}px`;

      const textWidth = text.scrollWidth;
      if (textWidth === 0) return;

      const fontSize = (containerWidth / textWidth) * baseFontSizeRef.current;
      text.style.fontSize = `${fontSize}px`;
    };

    useLayoutEffect(() => {
      baseFontSizeRef.current = null;
      adjustTextSize();

      const resizeObserver = new ResizeObserver(() => {
        adjustTextSize();
      });

      if (containerRef.current) {
        resizeObserver.observe(containerRef.current);
      }

      return () => {
        resizeObserver.disconnect();
      };
    }, [children]);

    const setTextRef = (node: HTMLDivElement | null) => {
      textRef.current = node;
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    };

    return (
      <div
        ref={containerRef}
        className={clsx('flex w-full items-center justify-center overflow-hidden', className)}
      >
        <div ref={setTextRef} className="font-bebas-neue leading-none whitespace-nowrap">
          {children}
        </div>
      </div>
    );
  },
);

FullWidthTitle.displayName = 'FullWidthTitle';

export default FullWidthTitle;
