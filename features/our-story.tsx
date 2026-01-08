import { IconPlus } from '@/components/ui/icons';
import React, { useRef } from 'react';
import NextEvents from '../components/layout/next-events';

export default function OurStory() {
  const refs = {
    ourStoryRef: useRef<HTMLDivElement>(null),
  };
  return (
    <div ref={refs.ourStoryRef} className="h-fit min-h-screen w-full px-4 py-16 md:px-8">
      <div className="mx-auto flex h-full max-w-[1440px] flex-col items-center justify-start gap-8 md:gap-16">
        <p className="font-light text-white">OUR STORY</p>
        <p className="font-impact! max-w-xl text-center text-4xl text-white">
          RUNNING HAS ALWAYS BEEN MORE THAN SPORT. FROM ANCIENT MESSENGERS RACING BETWEEN CITIES,{' '}
          <span className="text-gray">
            {' '}
            TO LONE JOGGERS CHASING SILENCE IN CENTRAL PARK — EVERY STRIDE CONNECTS US TO SOMETHING
            TIMELESS.
          </span>
        </p>
        <div className="hidden w-full md:block">
          <div className="float-right flex w-1/2 flex-1 items-start gap-2">
            <IconPlus className="text-red h-6 w-6 shrink-0 rotate-45" />
            <p className="text-white">
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
              alt="Our Story"
              className="h-1/3 w-1/3 object-cover md:w-1/2"
              src="/images/our-story/story2.jpg"
            />

            <div className="flex w-full flex-1 items-start gap-2 md:hidden">
              <IconPlus className="text-red h-6 w-6 shrink-0 rotate-45" />
              <p className="text-white">
                FOR CENTURIES, PEOPLE HAVE RUN TO DELIVER MESSAGES, TO SURVIVE, TO PRAY, TO FEEL
                ALIVE. THE RHYTHM OF FOOTSTEPS HAS ALWAYS BEEN A LANGUAGE OF ITS OWN - ONE THAT
                SPEAKS OF FREEDOM, RESILIENCE, AND CONNECTION. DRIFT IS OUR MODERN ECHO OF THAT
                STORY, WRITTEN ON THE RESTLESS STREETS OF NEW YORK.
              </p>
            </div>
          </div>
          <div className="col-span-1 row-start-1">
            <img
              alt="Our Story"
              className="aspect-square h-full w-full object-cover"
              src="/images/our-story/story1.jpg"
            />
          </div>
        </div>
        <NextEvents />
      </div>
    </div>
  );
}
