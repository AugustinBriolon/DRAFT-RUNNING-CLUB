import { useRef } from 'react';
import FullWidthTitle from '../shared/full-width-title';
import { IconRunTrace } from '../ui/icons';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Link from 'next/link';
import { scrollTo } from '@/utils/scroll-to.utils';
import { useLenis } from 'lenis/react';

const Footer = () => {
  const { contextSafe } = useGSAP();
  const lenis = useLenis();
  const refs = {
    sectionRef: useRef<HTMLDivElement>(null),
    runTraceRef: useRef<SVGSVGElement>(null),
    title1Ref: useRef(null),
    title2Ref: useRef(null),
    copyrightRef: useRef<HTMLDivElement>(null),
    linksContainerRef: useRef<HTMLDivElement>(null),
  };
  const path = refs.runTraceRef.current?.querySelector('#path') as SVGPathElement | null;

  const runTraceAnimation = contextSafe(() => {
    if (!refs.sectionRef.current || !refs.runTraceRef.current || !path) return;

    const pathLength = path.getTotalLength();
    path.style.strokeDasharray = `${pathLength}`;
    path.style.strokeDashoffset = `-${pathLength}`;

    gsap
      .timeline({
        scrollTrigger: {
          trigger: refs.sectionRef.current,
          start: 'top 80%',
          // markers: true,
        },
      })
      .to(path, {
        strokeDashoffset: 0,
        duration: 2,
        ease: 'none',
      })
      .from(
        [refs.title1Ref.current, refs.title2Ref.current],
        {
          yPercent: 100,
          duration: 0.8,
          ease: 'power3.out',
        },
        '<+=0.5',
      )
      .from(
        refs.copyrightRef.current?.querySelectorAll<HTMLElement>('p') || [],
        {
          yPercent: 100,
          stagger: 0.05,
          duration: 0.8,
          ease: 'power3.out',
        },
        '<+=0.5',
      )
      .from(
        refs.linksContainerRef.current?.querySelectorAll<HTMLElement>('a') || [],
        {
          yPercent: 100,
          stagger: 0.05,
          duration: 0.8,
          ease: 'power3.out',
        },
        '<',
      );
  });

  useGSAP(() => {
    runTraceAnimation();
  }, [path]);

  return (
    <footer ref={refs.sectionRef} className="w-full px-4 py-16 lg:px-8">
      <div className="relative mx-auto flex h-full max-w-[1440px] flex-col items-center justify-center gap-16">
        <FullWidthTitle
          classChildren="flex flex-col items-center justify-center"
          className="text-white"
        >
          <div className="overflow-hidden">
            <span ref={refs.title1Ref} className="block">
              DRIFT RUNNING
            </span>
          </div>
          <div className="overflow-hidden">
            <span ref={refs.title2Ref} className="block">
              CLUB
            </span>
          </div>
        </FullWidthTitle>
        <div className="grid w-full gap-8 text-white md:grid-cols-2">
          <div
            ref={refs.copyrightRef}
            className="col-span-1 row-start-2 flex flex-col justify-end gap-1 text-xs md:row-start-1"
          >
            <div className="overflow-hidden">
              <p>© Concept project for demonstration purposes only.</p>
            </div>
            <div className="overflow-hidden">
              <p>Not affiliated with any brand.</p>
            </div>
            <div className="overflow-hidden">
              <p>
                All rights to original designs and trademarks belong to their respective owners.
              </p>
            </div>
          </div>
          <div
            ref={refs.linksContainerRef}
            className="flex flex-col items-center justify-center gap-4 text-xs md:items-end md:justify-end"
          >
            <div className="overflow-hidden">
              <Link
                className="group flex items-center justify-center"
                href="#about"
                onClick={(e) => scrollTo(e, lenis, '#about')}
              >
                <div className="mr-2 h-1.5 w-1.5 scale-0 rounded-full bg-white transition-transform duration-300 group-hover:scale-100"></div>
                About
              </Link>
            </div>
            <div className="overflow-hidden">
              <Link
                className="group flex items-center justify-center"
                href="#runs"
                onClick={(e) => scrollTo(e, lenis, '#runs')}
              >
                <div className="mr-2 h-1.5 w-1.5 scale-0 rounded-full bg-white transition-transform duration-300 group-hover:scale-100"></div>
                Runs
              </Link>
            </div>
            <div className="overflow-hidden">
              <Link
                className="group flex items-center justify-center"
                href="#community"
                onClick={(e) => scrollTo(e, lenis, '#community')}
              >
                <div className="mr-2 h-1.5 w-1.5 scale-0 rounded-full bg-white transition-transform duration-300 group-hover:scale-100"></div>
                Community
              </Link>
            </div>
            <div className="overflow-hidden">
              <Link
                className="group flex items-center justify-center"
                href="#our-story"
                onClick={(e) => scrollTo(e, lenis, '#our-story')}
              >
                <div className="mr-2 h-1.5 w-1.5 scale-0 rounded-full bg-white transition-transform duration-300 group-hover:scale-100"></div>
                Our Story
              </Link>
            </div>
            <div className="overflow-hidden">
              <Link
                className="group flex items-center justify-center"
                href="#gallery"
                onClick={(e) => scrollTo(e, lenis, '#gallery', -100)}
              >
                <div className="mr-2 h-1.5 w-1.5 scale-0 rounded-full bg-white transition-transform duration-300 group-hover:scale-100"></div>
                Gallery
              </Link>
            </div>
            <div className="overflow-hidden">
              <Link
                className="group flex items-center justify-center"
                href="#faq"
                onClick={(e) => scrollTo(e, lenis, '#faq')}
              >
                <div className="mr-2 h-1.5 w-1.5 scale-0 rounded-full bg-white transition-transform duration-300 group-hover:scale-100"></div>
                FAQ
              </Link>
            </div>
            <div className="overflow-hidden">
              <Link
                className="group flex items-center justify-center"
                href="#join-us"
                onClick={(e) => scrollTo(e, lenis, '#join-us')}
              >
                <div className="mr-2 h-1.5 w-1.5 scale-0 rounded-full bg-white transition-transform duration-300 group-hover:scale-100"></div>
                Join Us
              </Link>
            </div>
          </div>
        </div>
        <IconRunTrace ref={refs.runTraceRef} className="absolute inset-0 -z-1 h-full w-full" />
      </div>
    </footer>
  );
};

export default Footer;
