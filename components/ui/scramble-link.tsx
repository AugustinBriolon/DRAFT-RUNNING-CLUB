import { scrollTo } from '@/utils/scroll-to.utils';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useLenis } from 'lenis/react';
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
  const pathRef = useRef<SVGPathElement>(null);
  const { contextSafe } = useGSAP();
  const lenis = useLenis();

  const ARROW_PATH = 'm9 18 6-6-6-6';
  const PLUS_PATH = 'M5 12h14M12 5v14';

  const words = children.trim().split(/\s+/);

  const scrambleWords = contextSafe(() => {
    if (!linkRef.current) return;

    const wordEls = linkRef.current.querySelectorAll<HTMLElement>('.scramble-word');
    const tl = gsap.timeline();

    wordEls.forEach((el, index) => {
      const { text } = el.dataset;
      if (text) {
        tl.to(
          el,
          {
            duration: 1,
            scrambleText: {
              text,
              tweenLength: false,
              chars: 'XO',
              speed: 0.5,
            },
          },
          index * 0.05,
        );
      }
    });

    return tl;
  });

  const handleMouseEnter = contextSafe(() => {
    const tl = gsap.timeline();

    if (pathRef.current && isJoinUs) {
      tl.to(pathRef.current, {
        morphSVG: PLUS_PATH,
        duration: 0.3,
        ease: 'power2.inOut',
      });
    }

    const scrambleTween = scrambleWords();
    if (scrambleTween) {
      tl.add(scrambleTween, '<');
    }
  });

  const handleMouseLeave = contextSafe(() => {
    if (!linkRef.current) return;

    const wordEls = linkRef.current.querySelectorAll<HTMLSpanElement>('.scramble-word');

    const tl = gsap.timeline();

    if (pathRef.current && isJoinUs) {
      tl.to(pathRef.current, {
        morphSVG: ARROW_PATH,
        duration: 0.3,
        ease: 'power2.inOut',
      });
    }

    tl.set(wordEls, {
      textContent: (_: number, el: HTMLElement) => el.dataset.text!,
    });
  });

  return (
    <Link
      className={`${className} relative inline-flex items-center justify-start overflow-hidden whitespace-nowrap`}
      href={href}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={
        href ? (e) => scrollTo(e, lenis, href, href === '#gallery' ? -100 : undefined) : undefined
      }
    >
      <span ref={linkRef} className={`${isJoinUs ? 'w-18 overflow-hidden' : ''} inline-flex`}>
        {words.map((word, i) => (
          <span key={i} className="inline-flex">
            <span className="scramble-word" data-text={word}>
              {word}
            </span>

            {i < words.length - 1 && <span className="mx-[0.25em]" />}
          </span>
        ))}
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
          <path ref={pathRef} d={ARROW_PATH} />
        </svg>
      )}
    </Link>
  );
};

export default ScrambleLink;
