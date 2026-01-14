import { useGSAP } from '@gsap/react';
import clsx from 'clsx';
import gsap from 'gsap';
import { Fragment, useRef, useState } from 'react';

const faqItems = [
  {
    index: 1,
    title: 'DO I NEED TO BE FAST TO JOIN DRIFT ?',
    description:
      "NOT AT ALL DRIFTISNT ABOUT PACE IT'SABOUT MOVEMENT, MUSIC,AND COMMUNITY.WHETHER YOU'RE CHASINGA MARATHON PROR YOUR VERY FIRST MILE, YOU BELONG HERE.",
  },
  {
    index: 2,
    title: 'HOW DO I JOIN A RUN?',
    description:
      'EASY! JUST SHOW UP AT THE START LINE, WE HAVE RUNS EVERY DAY OF THE WEEK. IF YOU WANT TO MAKE SURE YOU GET A SPOT, YOU CAN JOIN OUR DISCORD AND GET UPDATES ON THE NEXT RUN.',
  },
  {
    index: 3,
    title: 'WHERE DO YOU USUALLY RUN?',
    description:
      'WE RUN ALL OVER THE CITY, BUT WE USUALLY MEET AT THE BROOKLYN BRIDGE OR THE STATUE OF LIBERTY. IF YOU WANT TO KNOW EXACTLY WHERE WE ARE RUNNING, YOU CAN JOIN OUR DISCORD AND GET UPDATES ON THE NEXT RUN.',
  },
  {
    index: 4,
    title: 'WHAT SHOULD I BRING?',
    description:
      "RUNNING SHOES, GOOD VIBES, AND MAYBE A FRIEND. WE'LL TAKE CARE OF THEREST - ROUTES, MUSIC, AND THE ENERGY TO KEEP YOUMOVING.",
  },
  {
    index: 5,
    title: 'DO YOU ONLY RUN IN NEW YORK?',
    description:
      'NO, WE RUN ALL OVER THE WORLD. WE HAVE RUNS IN LONDON, PARIS, TOKYO, AND MORE. IF YOU WANT TO KNOW EXACTLY WHERE WE ARE RUNNING, YOU CAN JOIN OUR DISCORD AND GET UPDATES ON THE NEXT RUN.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const refs = {
    faqRef: useRef<HTMLDivElement>(null),
    titleRef: useRef<HTMLDivElement>(null),
    subtitleRef: useRef<HTMLDivElement>(null),
    itemRefs: useRef<HTMLDivElement>(null),
    pathRefs: useRef<Record<number, SVGPathElement | null>>({}),
  };
  const { contextSafe } = useGSAP();

  const ARROW_PATH = 'M1 1H13M13 1V13M13 1L1 13';
  const CROSS_PATH = 'M13 1L1 13M1 1L13 13';

  const handleItemClick = contextSafe((index: number) => {
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
    if (!refs.faqRef.current) return;

    const numbers = refs.faqRef.current?.querySelectorAll('.number-faq');
    const titles = refs.faqRef.current?.querySelectorAll('.title-faq');
    const logos = refs.faqRef.current?.querySelectorAll('.logo-faq');
    const dividers = refs.faqRef.current?.querySelectorAll('.divider-faq');

    gsap
      .timeline({
        scrollTrigger: {
          trigger: refs.faqRef.current,
          start: 'top 50%',
          // markers: true,
        },
      })
      .from(numbers, {
        opacity: 0,
        scale: 0.6,
        duration: 1,
        stagger: 0.2,
        ease: 'power2.inOut',
      })
      .from(
        titles,
        {
          yPercent: 100,
          duration: 1,
          stagger: 0.2,
          ease: 'power2.inOut',
        },
        '<',
      )
      .from(
        logos,
        {
          opacity: 0,
          scale: 0.6,
          duration: 1,
          stagger: 0.2,
          ease: 'power2.inOut',
        },
        '<',
      )
      .from(
        dividers,
        {
          width: '0%',
          duration: 1.5,
          stagger: 0.2,
          ease: 'power2.inOut',
        },
        '<',
      );
  });

  useGSAP(() => {
    revealAnimation();
  }, []);

  return (
    <div ref={refs.faqRef} className="h-fit w-full px-4 py-16 md:px-8">
      <div className="mx-auto flex h-full max-w-[1440px] flex-col justify-start">
        <p className="font-impact! w-3/4 text-7xl text-white md:w-auto">FAQ /</p>
        <div ref={refs.itemRefs} className="mt-16 flex min-h-0 shrink flex-col">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <Fragment key={item.index}>
                <div
                  className="group/card-question group w-full py-4 md:py-6"
                  onClick={() => handleItemClick(index)}
                >
                  <div className="grid w-full grid-cols-[30px_1fr_30px] items-center gap-16 text-left md:pointer-events-none">
                    <div className="overflow-hidden">
                      <span className="number-faq font-bounded text-left font-semibold text-white">
                        0{item.index}
                      </span>
                    </div>
                    <div className="overflow-hidden">
                      <p className="title-faq text-left font-semibold text-white md:text-center">
                        {item.title}
                      </p>
                    </div>

                    <div className="overflow-hidden">
                      <svg
                        className="logo-faq h-5 w-5 text-white"
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
                          d={ARROW_PATH}
                        />
                      </svg>
                    </div>
                  </div>
                  <div
                    className={clsx(
                      'overflow-hidden transition-[height,padding] duration-300 ease-in-out',
                      isOpen ? 'h-26 pt-4 md:h-20' : 'h-0 pt-0',
                    )}
                  >
                    <p className="font-bounded mx-auto px-12 text-center text-xs text-white/60 md:max-w-2xl md:px-24">
                      {item.description}
                    </p>
                  </div>
                </div>
                <div className="divider-faq h-px w-full bg-white/10" />
              </Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
}
