import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Link from 'next/link';
import { useRef } from 'react';

interface ScrambleLinkProps {
  href: string;
  children: string;
  className?: string;
  isJoinUs?: boolean;
}

const ScrambleLink = ({ href, children, className = '', isJoinUs = false }: ScrambleLinkProps) => {
  const linkRef = useRef<HTMLSpanElement>(null);
  const pathRef = useRef(null);
  const { contextSafe } = useGSAP();

  const ARROW_PATH = 'm9 18 6-6-6-6';
  const PLUS_PATH = 'M5 12h14M12 5v14';

  const handleMouseEnter = contextSafe(() => {
    if (!linkRef.current) return;

    const tl = gsap.timeline();

    if (pathRef.current && isJoinUs) {
      tl.to(pathRef.current, {
        morphSVG: PLUS_PATH,
        duration: 0.3,
        ease: 'power2.inOut',
      });
    }
    tl.to(
      linkRef.current,
      {
        duration: 1,
        scrambleText: {
          text: children,
          tweenLength: false,
          // chars: '!@#$%^&*()-_=+<>?/[]{}',
          chars: 'XO',
          speed: 0.5,
        },
      },
      '<',
    );
  });

  const handleMouseLeave = contextSafe(() => {
    if (!linkRef.current) return;

    const tl = gsap.timeline();

    if (pathRef.current && isJoinUs) {
      tl.to(pathRef.current, {
        morphSVG: ARROW_PATH,
        duration: 0.3,
        ease: 'power2.inOut',
      });
    }

    tl.to(
      linkRef.current,
      {
        duration: 1,
        scrambleText: {
          text: children,
          tweenLength: false,
          // chars: '!@#$%^&*()-_=+<>?/[]{}',
          chars: 'XO',
          speed: 0.5,
        },
      },
      '<',
    );
  });

  return (
    <Link
      className={`${className} relative inline-flex items-center justify-start overflow-hidden whitespace-nowrap`}
      href={href}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <span ref={linkRef} className={`${isJoinUs ? 'w-18 overflow-hidden' : ''} inline-flex`}>
        {children}
      </span>
      {isJoinUs && (
        <svg
          className="h-5 min-w-5"
          fill="none"
          height="24"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
          width="24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path ref={pathRef} d={ARROW_PATH} id="arrow" />
        </svg>
      )}
    </Link>
  );
};

export default ScrambleLink;
