import FullWidthTitle from '@/components/shared/full-width-title';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import SplitText from 'gsap/dist/SplitText';
import Image from 'next/image';
import { useRef } from 'react';

export default function JoinTheDrift() {
  const { contextSafe } = useGSAP();
  const refs = {
    sectionRef: useRef<HTMLDivElement>(null),
    title1Ref: useRef<HTMLDivElement>(null),
    title2Ref: useRef<HTMLDivElement>(null),
    joinTheDriftRef: useRef<HTMLDivElement>(null),
    mainImage: useRef(null),
    secondaryImage: useRef(null),
    textRef: useRef<HTMLDivElement>(null),
  };

  const revealAnimation = contextSafe(() => {
    if (!refs.sectionRef.current) return;

    const splitText = SplitText.create(refs.textRef.current, {
      type: 'words,lines',
      mask: 'lines',
      aria: 'none',
    });

    gsap
      .timeline({
        scrollTrigger: {
          trigger: refs.sectionRef.current,
          start: 'top 30%',
          // markers: true,
        },
      })
      .from([refs.title1Ref.current, refs.title2Ref.current, refs.joinTheDriftRef.current], {
        yPercent: 100,
        duration: 1,
        ease: 'power2.out',
        stagger: 0.05,
      })
      .from(
        [refs.mainImage.current, refs.secondaryImage.current],
        {
          clipPath: 'inset(0 0 100% 0)',
          duration: 1.8,
          ease: 'power4.inOut',
          stagger: 0.05,
        },
        '<',
      )
      .from(
        splitText.lines,
        {
          yPercent: 100,
          duration: 1.8,
          ease: 'power2.out',
          stagger: 0.05,
        },
        '<+=0.5',
      );
  });

  useGSAP(() => {
    revealAnimation();
  }, []);

  return (
    <div
      ref={refs.sectionRef}
      className="min-h-fit w-full bg-black px-4 py-16 lg:px-8"
      id="join-us"
    >
      <div className="relative mx-auto flex max-w-[1440px] flex-col items-end justify-between lg:h-full lg:items-start">
        <div className="absolute top-0 left-0 z-5 grid w-full grid-cols-2 lg:grid-cols-[1fr_1fr_auto] lg:gap-8 lg:pl-32">
          <FullWidthTitle ref={refs.title1Ref} className="col-span-1 text-white">
            JOIN THE
          </FullWidthTitle>
          <FullWidthTitle
            ref={refs.title2Ref}
            className="col-span-1 col-start-2 row-start-2 text-white"
          >
            DRIFT /
          </FullWidthTitle>
          <div className="col-start-3 row-start-2 hidden items-end overflow-hidden lg:flex">
            <p
              ref={refs.joinTheDriftRef}
              className="group flex cursor-pointer items-center gap-3 pb-4 text-xs whitespace-nowrap text-white"
            >
              <span className="transition-transform duration-300 group-hover:translate-x-1">[</span>
              JOIN THE DRIFT
              <span className="transition-transform duration-300 group-hover:-translate-x-1">
                ]
              </span>
            </p>
          </div>
        </div>
        <div className="flex-1">
          <p className="text-white">CONTACT</p>
        </div>
        <div className="grid h-[calc(100%-24px)] w-full grid-cols-2 gap-16 lg:grid-cols-[300px_1fr_350px] lg:items-end">
          <Image
            ref={refs.mainImage}
            alt="Join the Drift"
            className="row-start-2 h-full object-cover lg:h-2/3"
            height={1600}
            src="/images/join-the-drift/little.webp"
            width={2000}
            preload
          />
          <Image
            ref={refs.secondaryImage}
            alt="Join the Drift"
            className="col-span-2 max-h-140 w-full object-cover lg:col-span-1 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:max-h-max"
            height={2062}
            src="/images/join-the-drift/main.webp"
            width={1536}
            preload
          />
          <div className="flex flex-col justify-between lg:col-start-3 lg:row-start-2">
            <p ref={refs.textRef} className="w-full text-xs text-white lg:w-2/3">
              STEP INTO THE MOMENT - JOIN THE RUNS, FEEL THE ENERGY, LIVE THE DRIFT.
            </p>
            <p className="group flex cursor-pointer items-center gap-3 text-xs whitespace-nowrap text-white lg:hidden">
              <span className="transition-transform duration-300 group-hover:translate-x-1">[</span>
              JOIN THE DRIFT
              <span className="transition-transform duration-300 group-hover:-translate-x-1">
                ]
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
