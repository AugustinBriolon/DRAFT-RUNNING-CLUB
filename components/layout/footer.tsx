import { useRef } from 'react';
import FullWidthTitle from '../shared/full-width-title';
import { IconRunTrace } from '../ui/icons';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Link from 'next/link';

const Footer = () => {
  const { contextSafe } = useGSAP();
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
              <Link className="block" href="#about">
                About
              </Link>
            </div>
            <div className="overflow-hidden">
              <Link className="block" href="#runs">
                Runs
              </Link>
            </div>
            <div className="overflow-hidden">
              <Link className="block" href="#community">
                Community
              </Link>
            </div>
            <div className="overflow-hidden">
              <Link className="block" href="#our-story">
                Our Story
              </Link>
            </div>
            <div className="overflow-hidden">
              <Link className="block" href="#gallery">
                Gallery
              </Link>
            </div>
            <div className="overflow-hidden">
              <Link className="block" href="#faq">
                FAQ
              </Link>
            </div>
            <div className="overflow-hidden">
              <Link className="block" href="#join-us">
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
