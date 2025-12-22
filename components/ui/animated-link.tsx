import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Link from 'next/link';
import { useRef } from 'react';

interface AnimatedLinkProps {
  href: string;
  children: string;
  className?: string;
  isJoinUs?: boolean;
}

const AnimatedLink = ({ href, children, className = '', isJoinUs = false }: AnimatedLinkProps) => {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const pathRef = useRef(null);
  const { contextSafe } = useGSAP();

  const ARROW_PATH = 'm9 18 6-6-6-6';
  const PLUS_PATH = 'M5 12h14M12 5v14';

  const handleMouseEnter = contextSafe(() => {
    if (pathRef.current && isJoinUs) {
      gsap.to(pathRef.current, {
        morphSVG: PLUS_PATH,
        duration: 0.3,
        ease: 'power2.inOut',
      });
    }
  });

  const handleMouseLeave = contextSafe(() => {
    if (pathRef.current && isJoinUs) {
      gsap.to(pathRef.current, {
        morphSVG: ARROW_PATH,
        duration: 0.3,
        ease: 'power2.inOut',
      });
    }
  });

  return (
    <Link
      ref={linkRef}
      className={`${className} relative inline-flex items-center overflow-hidden`}
      href={href}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children.split('').map((char, index) => (
        <span key={index}>{char}</span>
      ))}
      <span className="hidden">
        {children.split('').map((char, index) => (
          <span key={index}>{char}</span>
        ))}
      </span>
      {isJoinUs && (
        <svg
          className="h-5 w-5"
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

export default AnimatedLink;
