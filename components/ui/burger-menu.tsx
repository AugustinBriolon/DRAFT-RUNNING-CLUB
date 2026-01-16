import { scrollTo } from '@/utils/scroll-to.utils';
import { useGSAP } from '@gsap/react';
import clsx from 'clsx';
import gsap from 'gsap';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { useLenis } from 'lenis/react';

const links = [
  { title: 'ABOUT', href: '#about' },
  { title: 'RUNS', href: '#runs' },
  { title: 'COMMUNITY', href: '#community' },
  { title: 'OUR STORY', href: '#our-story' },
  { title: 'GALLERY', href: '#gallery' },
  { title: 'FAQ', href: '#faq' },
  { title: 'JOIN US', href: '#join-us' },
];

export default function BurgerMenu() {
  const menuRef = useRef<HTMLDivElement>(null);
  const menuBouttonRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [isActive, setIsActive] = useState(false);
  const { contextSafe } = useGSAP();
  const lenis = useLenis();

  const getText = (text: string, isTop = false) => {
    return text.split('').map((char, index) => (
      <span key={index} className={isTop ? 'textFromTop' : 'textFromBottom'}>
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  const handleToggleMenu = contextSafe(() => {
    if (!menuRef.current || !navRef.current || !menuBouttonRef.current) return;

    const topLetters = menuBouttonRef.current.querySelectorAll('.textFromTop');
    const bottomLetters = menuBouttonRef.current.querySelectorAll('.textFromBottom');
    const tl = gsap.timeline();

    if (isActive) {
      // Fermeture du menu
      tl.to(
        bottomLetters,
        {
          yPercent: 100,
          stagger: 0.008,
          duration: 0.3,
          ease: 'power2.inOut',
        },
        '<',
      )
        .to(
          topLetters,
          {
            yPercent: 0,
            stagger: 0.008,
            duration: 0.3,
            ease: 'power2.inOut',
          },
          '<',
        )
        .to(
          linkRefs.current,
          {
            rotateX: 90,
            y: 80,
            x: -20,
            duration: 0.3,
            stagger: 0.01,
            ease: 'power3.inOut',
          },
          '<',
        )
        .to(
          menuRef.current,
          {
            width: '88px',
            height: '32px',
            duration: 0.75,
            delay: 0.25,
            ease: 'power2.inOut',
          },
          '<',
        );
      setIsActive(false);
    } else {
      // Ouverture du menu
      tl.to(bottomLetters, {
        yPercent: 0,
        stagger: 0.008,
        duration: 0.3,
        ease: 'power2.inOut',
      })
        .to(
          topLetters,
          {
            yPercent: -100,
            stagger: 0.008,
            duration: 0.3,
            ease: 'power2.inOut',
          },
          '<',
        )
        .to(
          menuRef.current,
          {
            width: '335px',
            height: '425px',
            duration: 0.75,
            ease: 'power2.inOut',
          },
          '<',
        )
        .to(
          linkRefs.current,
          {
            rotateX: 0,
            y: 0,
            x: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.02,
            ease: 'power3.inOut',
          },
          '-=0.3',
        );
      setIsActive(true);
    }
  });

  useGSAP(() => {
    if (!menuRef.current || !menuBouttonRef.current) return;
    const bottomLetters = menuBouttonRef.current.querySelectorAll('.textFromBottom');
    gsap.set(bottomLetters, { yPercent: 100 });

    gsap.set(menuRef.current, {
      width: '88px',
      height: '32px',
    });

    linkRefs.current.forEach((link) => {
      if (link) {
        gsap.set(link, {
          opacity: 0,
          rotateX: 90,
          y: 80,
          x: -20,
        });
      }
    });
  }, []);

  return (
    <div className="relative md:hidden">
      <div
        className={clsx(
          'relative z-9 flex px-5 py-2 transition-all duration-300',
          isActive ? 'bg-black' : 'bg-white',
        )}
        onClick={handleToggleMenu}
      >
        <span
          ref={menuBouttonRef}
          className="font-bounded relative inline-flex w-12 justify-center overflow-hidden"
        >
          <span className="inline-flex overflow-hidden text-xs text-white mix-blend-difference">
            {getText('MENU', true)}
          </span>
          <span className="absolute inset-0 inline-flex cursor-pointer overflow-hidden text-xs text-white mix-blend-difference">
            {getText('CLOSE', false)}
          </span>
        </span>
      </div>

      <div
        ref={menuRef}
        className="will-change absolute top-0 right-0 z-8 origin-top-right overflow-hidden bg-white"
        style={{ perspective: '120px', perspectiveOrigin: 'bottom' }}
      >
        <div
          ref={navRef}
          className="flex h-full flex-col items-start justify-start gap-5 overflow-hidden bg-white px-4 pt-12 pb-2"
        >
          {links.map((link, i) => (
            <div key={i} className="overflow-hidden">
              <div
                ref={(el) => {
                  linkRefs.current[i] = el;
                }}
              >
                <Link
                  className="text-2xl text-nowrap"
                  href={link.href}
                  onClick={(e) => {
                    scrollTo(e, lenis, link.href, link.href === '#gallery' ? -100 : undefined);
                    handleToggleMenu();
                  }}
                >
                  {link.title}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
