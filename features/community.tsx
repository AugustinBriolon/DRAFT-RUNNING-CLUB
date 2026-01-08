import FullWidthTitle from '@/components/shared/full-width-title';
import { BREAKPOINTS } from '@/constants';
import { useMatchMedia } from '@/hooks/useMatchMedia';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import clsx from 'clsx';
import { Fragment, useRef, useState } from 'react';
import SplitText from 'gsap/dist/SplitText';
import { useFontReady } from '@/hooks/useFontReady';

const communityItems = [
  {
    index: 1,
    title: 'POST-RUN HANDHOUTS',
    description:
      'BECAUSE THE BEST MILES END WITH STORIES, FOOD, AND LAUGHS THAT LAST LONGER THAN THE RUN ITSELF.',
  },
  {
    index: 2,
    title: 'RACE SUPPORT',
    description: 'FROM CHEERING ON MARATHONS TO PACING FIRST 5KS - DRIFT SHOWS UP, LOUDAND PROUD.',
  },
  {
    index: 3,
    title: 'CITY ADVENTURES',
    description:
      'EXPLORING NEW BOROUGHS, HIDDEN STREETS, AND SECRET PATHS THAT ONLY RUNNING CAN REVEAL',
  },
  {
    index: 4,
    title: 'TRAVEL & RACES ABROAD',
    description: 'CHASING NEW ROUTES, NEW CULTURES, AND NEW MEMORIES TOGETHER.',
  },
  {
    index: 5,
    title: 'TRAINING & GROWTH',
    description:
      'WORKOUTS, TIPS, AND SHARED WISDOM FROM RUNNERS OF EVERY LEVEL HELPING EACH OTHER GET STRONGER.',
  },
];

export default function Community() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const refs = {
    communityRef: useRef<HTMLDivElement>(null),
    titleRef: useRef<HTMLDivElement>(null),
    subtitleRef: useRef<HTMLDivElement>(null),
    itemRefs: useRef<HTMLDivElement>(null),
    pathRefs: useRef<Record<number, SVGPathElement | null>>({}),
  };
  const { contextSafe } = useGSAP();
  const isMobile = useMatchMedia(BREAKPOINTS.MD);
  const fontReady = useFontReady();

  const ARROW_PATH = 'M1 1H13M13 1V13M13 1L1 13';
  const CROSS_PATH = 'M13 1L1 13M1 1L13 13';

  const handleItemClick = contextSafe((index: number) => {
    if (!isMobile) return;

    const newOpenIndex = index === openIndex ? null : index;
    setOpenIndex(newOpenIndex);

    Object.keys(refs.pathRefs.current).forEach((key) => {
      const pathIndex = Number(key);
      const pathRef = refs.pathRefs.current[pathIndex];
      if (!pathRef) return;

      const shouldBeOpen = newOpenIndex === pathIndex;
      gsap.to(pathRef, {
        morphSVG: shouldBeOpen ? CROSS_PATH : ARROW_PATH,
        duration: 0.3,
        ease: 'power2.inOut',
      });
    });
  });

  const revealAnimation = contextSafe(() => {
    if (!refs.titleRef.current || !refs.subtitleRef.current) return;

    const splitTitle = SplitText.create(refs.titleRef.current, {
      type: 'words, chars',
      mask: 'chars',
    });
    const splitSubtitle = SplitText.create(refs.subtitleRef.current, {
      type: 'lines',
      mask: 'lines',
    });

    gsap
      .timeline({
        scrollTrigger: {
          trigger: refs.communityRef.current,
          toggleActions: 'play reverse play reverse',
          start: 'top 30%',
          // markers: true,
        },
      })
      .from(
        splitTitle.chars,
        {
          yPercent: 100,
          duration: 0.8,
          stagger: 0.01,
          ease: 'power4.out',
        },
        '<',
      )
      .from(
        splitSubtitle.lines,
        {
          yPercent: 100,
          duration: 0.8,
          ease: 'power2.inOut',
        },
        '<',
      )
      .from(
        Array.from(refs.itemRefs.current?.children || []),
        {
          yPercent: 30,
          opacity: 0,
          duration: 0.8,
          ease: 'power2.inOut',
          stagger: 0.05,
        },
        '<+=0.5',
      );
  });

  useGSAP(() => {
    if (!fontReady) return;
    revealAnimation();
  }, [fontReady]);

  return (
    <div
      ref={refs.communityRef}
      className="h-screen min-h-screen w-full bg-[url('/images/community.webp')] bg-cover bg-top px-4 py-16 md:px-8"
    >
      <div className="mx-auto flex h-full max-w-[1440px] flex-col justify-between">
        <div className="flex flex-col items-start gap-4">
          <FullWidthTitle ref={refs.titleRef} className="text-white">
            COMMUNITY
          </FullWidthTitle>
          <p ref={refs.subtitleRef} className="text-red text-md max-w-[350px]">
            IT'S WHERE STRANGERS MEET, MOVE, AND NEVER QUITE LET GO.
          </p>
        </div>
        <div ref={refs.itemRefs} className="flex min-h-0 shrink flex-col">
          {communityItems.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <Fragment key={item.index}>
                <div
                  className="group/card-question group w-full py-4 md:py-6"
                  onClick={() => handleItemClick(index)}
                >
                  <div className="grid w-full grid-cols-[30px_1fr_30px] items-center gap-16 text-left md:pointer-events-none md:grid-cols-[1fr_1fr_300px]">
                    <span className="number-text font-bounded text-left font-semibold text-white">
                      0{item.index}
                    </span>
                    <p className="title-text text-left font-semibold text-white">{item.title}</p>
                    <span className="description-text font-bounded hidden text-xs text-white/60 md:block">
                      {item.description}
                    </span>
                    <svg
                      className="h-5 w-5 text-white md:hidden"
                      fill="none"
                      height="24"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2.5"
                      viewBox="0 0 24 24"
                      width="24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        ref={(el) => {
                          refs.pathRefs.current[index] = el;
                        }}
                        d={index === 0 ? CROSS_PATH : ARROW_PATH}
                      />
                    </svg>
                  </div>
                  <div
                    className={clsx(
                      'overflow-hidden transition-[height,padding] duration-300 ease-in-out md:hidden',
                      isOpen ? 'h-12 pt-4' : 'h-0 pt-0',
                    )}
                  >
                    <p className="font-bounded pb-4 pl-24 text-xs text-white/60">
                      {item.description}
                    </p>
                  </div>
                </div>
                <div className="h-px w-full bg-white/10" />
              </Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
}
