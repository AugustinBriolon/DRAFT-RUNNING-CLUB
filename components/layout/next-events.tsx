import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import SplitText from 'gsap/dist/SplitText';
import Image from 'next/image';
import { useRef } from 'react';

const eventCard = [
  {
    index: 1,
    img: '/images/next-events/event1.jpg',
    title: "MAY'26",
    description: 'BROOKLYN 10K',
  },
  {
    index: 2,
    img: '/images/next-events/event2.jpg',
    title: "AUG'26",
    description: 'MANHATTAN 12K',
  },
  {
    index: 3,
    img: '/images/next-events/event3.jpg',
    title: "OCT'26",
    description: 'QUEENS 15K',
  },
  {
    index: 4,
    img: '/images/next-events/event4.jpg',
    title: "DEC'26",
    description: 'EAST RIVER 8K',
  },
];

export default function NextEvents() {
  const { contextSafe } = useGSAP();
  const refs = {
    nextEventsRef: useRef<HTMLDivElement>(null),
    eventsRefs: useRef<(HTMLDivElement | null)[]>([]),
    titleRef: useRef<HTMLDivElement>(null),
  };

  const revealAnimation = contextSafe(() => {
    if (!refs.eventsRefs.current.length) return;

    const imagesTableRefs = refs.eventsRefs.current.map((ref) =>
      ref?.querySelector('.event-image'),
    );
    const textTableRefs = refs.eventsRefs.current.map((ref) => ref?.querySelector('.event-title'));
    const descriptionTableRefs = refs.eventsRefs.current.map((ref) =>
      ref?.querySelector('.event-description'),
    );

    const splitTitle = SplitText.create(refs.titleRef.current, {
      type: 'words, chars',
      mask: 'words',
    });

    gsap
      .timeline({
        scrollTrigger: {
          trigger: refs.nextEventsRef.current,
          start: 'top 65%',
        },
      })
      .from(imagesTableRefs, {
        clipPath: 'inset(100% 0 0 0)',
        stagger: 0.03,
        duration: 1.5,
        ease: 'power2.out',
      })
      .from(
        [textTableRefs, descriptionTableRefs],
        {
          opacity: 0,
          y: 10,
          stagger: 0.05,
          duration: 0.6,
          ease: 'power2.out',
        },
        '<0.2',
      )
      .from(
        splitTitle.words,
        {
          yPercent: 100,
          stagger: 0.02,
          duration: 1.2,
          ease: 'power2.out',
        },
        '<',
      );
  });

  useGSAP(() => {
    revealAnimation();
  }, []);

  return (
    <div
      ref={refs.nextEventsRef}
      className="mt-32 grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5"
    >
      {eventCard.map((event) => (
        <div
          key={event.index}
          ref={(el) => {
            if (el) {
              refs.eventsRefs.current[event.index - 1] = el;
            }
          }}
          className="col-span-1 flex flex-col gap-2"
        >
          <Image
            alt="Next Event"
            className="event-image h-80 w-full object-cover"
            height={1200}
            src={event.img}
            width={708}
          />
          <div className="text-gray text-sm">
            <p className="event-title">{event.title}</p>
            <p className="event-description inline-flex items-center gap-2">
              <span className="bg-gray block h-px w-5"></span> {event.description}
            </p>
          </div>
        </div>
      ))}
      <div
        ref={refs.titleRef}
        className="col-span-1 row-start-1 flex items-end justify-between gap-2 text-white md:col-start-2 md:row-start-1 md:h-80 md:flex-col md:items-start"
      >
        <p className="font-impact! w-3/4 text-7xl md:w-auto">RYTHM OF OUR RUNS</p>
        <p className="text-justify-last w-1/4 text-nowrap md:w-auto">
          [ <span>SEE ALL</span> ]
        </p>
      </div>
    </div>
  );
}
