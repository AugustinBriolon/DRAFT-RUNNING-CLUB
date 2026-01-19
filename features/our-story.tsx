import { IconPlus } from '@/components/ui/icons';
import { useRef } from 'react';
import NextEvents from '../components/layout/next-events';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import SplitText from 'gsap/dist/SplitText';
import { usePerformance } from '@/providers/performance.provider';
import { PERFORMANCE_LEVEL } from '@/hooks/usePerformance';

export default function OurStory() {
  const refs = {
    ourStoryRef: useRef(null),
    subtitleRef: useRef(null),
    iconRef: useRef(null),
    textRef: useRef(null),
    iconMobileRef: useRef(null),
    textMobileRef: useRef(null),
    img1Ref: useRef(null),
    img2Ref: useRef(null),
  };
  const { contextSafe } = useGSAP();
  const { performanceLevel } = usePerformance();

  const revealAnimation = contextSafe(() => {
    if (!refs.subtitleRef.current) return;

    const splitSubtitle = SplitText.create(refs.subtitleRef.current, {
      type: 'lines, words',
      mask: 'lines',
      aria: 'none',
    });

    const splitText = SplitText.create(refs.textRef.current, {
      type: 'lines',
      mask: 'lines',
      aria: 'none',
    });

    const splitTextMobile = SplitText.create(refs.textMobileRef.current, {
      type: 'lines',
      mask: 'lines',
      aria: 'none',
    });

    gsap
      .timeline({
        scrollTrigger: {
          trigger: refs.ourStoryRef.current,
          start: 'top 30%',
          // markers: true,
        },
      })
      .from(
        splitSubtitle.lines,
        {
          yPercent: 100,
          stagger: 0.03,
          duration: 0.8,
          ease: 'power3.out',
        },
        '<',
      );

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: refs.ourStoryRef.current,
        start: 'top 10%',
        // markers: true,
      },
    });

    if (refs.textRef.current) {
      tl.from(refs.iconRef.current, {
        scale: 0,
        duration: 0.5,
        ease: 'power4.out',
      }).from(
        splitText.lines,
        {
          yPercent: 100,
          stagger: 0.03,
          duration: 0.8,
          ease: 'power3.out',
        },
        '<',
      );
    }

    if (refs.textMobileRef.current) {
      tl.from(refs.iconMobileRef.current, {
        scale: 0,
        delay: 0.5,
        duration: 0.5,
      }).from(
        splitTextMobile.lines,
        {
          yPercent: 100,
          stagger: 0.03,
          duration: 0.8,
          ease: 'power3.out',
        },
        '<',
      );
    }

    const tlImage = gsap.timeline({
      scrollTrigger: {
        trigger: refs.ourStoryRef.current,
        start: 'top 20%',
        end: 'bottom bottom',
        scrub: true,
        // markers: true,
      },
    });

    tlImage.from([refs.img1Ref.current, refs.img2Ref.current], {
      clipPath: 'inset(0 0 100% 0)',
      duration: 1.5,
      ease: 'power2.out',
    });
  });

  useGSAP(() => {
    revealAnimation();
  }, []);

  return (
    <div
      ref={refs.ourStoryRef}
      className="h-fit min-h-screen w-full px-4 py-16 md:px-8"
      id="our-story"
    >
      <div className="mx-auto flex h-full max-w-[1440px] flex-col items-center justify-start gap-8 md:gap-16">
        <p className="font-light text-white">OUR STORY</p>
        <p ref={refs.subtitleRef} className="font-impact! max-w-xl text-center text-4xl text-white">
          RUNNING HAS ALWAYS BEEN MORE THAN SPORT. FROM ANCIENT MESSENGERS RACING BETWEEN CITIES,{' '}
          <span className="text-gray">
            {' '}
            TO LONE JOGGERS CHASING SILENCE IN CENTRAL PARK — EVERY STRIDE CONNECTS US TO SOMETHING
            TIMELESS.
          </span>
        </p>
        <div className="hidden w-full md:block">
          <div className="float-right flex w-1/2 flex-1 items-start gap-2">
            <IconPlus ref={refs.iconRef} className="text-red h-6 w-6 shrink-0 rotate-45" />
            <p ref={refs.textRef} className="font-medium text-white">
              FOR CENTURIES, PEOPLE HAVE RUN TO DELIVER MESSAGES, TO SURVIVE, TO PRAY, TO FEEL
              ALIVE. THE RHYTHM OF FOOTSTEPS HAS ALWAYS BEEN A LANGUAGE OF ITS OWN - ONE THAT SPEAKS
              OF FREEDOM, RESILIENCE, AND CONNECTION. DRIFT IS OUR MODERN ECHO OF THAT STORY,
              WRITTEN ON THE RESTLESS STREETS OF NEW YORK.
            </p>
          </div>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          <div className="col-span-1 row-start-2 flex items-start justify-center gap-2 md:row-start-1 md:items-center">
            <img
              ref={refs.img1Ref}
              alt="Our Story"
              className="h-1/3 w-1/3 object-cover md:w-1/2"
              src="/images/our-story/story2.webp"
            />

            <div className="flex w-full flex-1 items-start gap-2 md:hidden">
              <IconPlus ref={refs.iconMobileRef} className="text-red h-6 w-6 shrink-0 rotate-45" />
              <p ref={refs.textMobileRef} className="text-white">
                FOR CENTURIES, PEOPLE HAVE RUN TO DELIVER MESSAGES, TO SURVIVE, TO PRAY, TO FEEL
                ALIVE. THE RHYTHM OF FOOTSTEPS HAS ALWAYS BEEN A LANGUAGE OF ITS OWN - ONE THAT
                SPEAKS OF FREEDOM, RESILIENCE, AND CONNECTION. DRIFT IS OUR MODERN ECHO OF THAT
                STORY, WRITTEN ON THE RESTLESS STREETS OF NEW YORK.
              </p>
            </div>
          </div>
          <div className="col-span-1 row-start-1">
            <img
              ref={refs.img2Ref}
              alt="Our Story"
              className="aspect-square h-full w-full object-cover"
              src="/images/our-story/story1.webp"
            />
          </div>
        </div>
        <NextEvents />
      </div>
    </div>
  );
}
