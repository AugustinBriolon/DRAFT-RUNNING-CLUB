import Image from 'next/image';

export default function NextEvents() {
  return (
    <div className="mt-32 grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
      <div className="col-span-1 flex flex-col gap-2">
        <Image
          alt="Next Event"
          className="h-80 w-full object-cover"
          height={1200}
          src="/images/next-events/event1.jpg"
          width={708}
        />
        <div className="space-y-2 text-sm text-white/60">
          <p>MAY'26</p>
          <p className="inline-flex items-center gap-2">
            <span className="block h-px w-5 bg-white/60"></span> BROOKLYN 10K
          </p>
        </div>
      </div>
      <div className="col-span-1 row-start-1 flex items-end justify-between gap-2 text-white md:row-start-auto md:h-80 md:flex-col md:items-start">
        <p className="font-impact! w-3/4 text-7xl md:w-auto">RYTHM OF OUR RUNS</p>
        <p className="text-justify-last w-1/4 text-nowrap md:w-auto">
          [ <span>SEE ALL</span> ]
        </p>
      </div>
      <div className="col-span-1 flex flex-col gap-2">
        <Image
          alt="Next Event"
          className="h-80 w-full object-cover"
          height={783}
          src="/images/next-events/event2.jpg"
          width={736}
        />
        <div className="space-y-2 text-sm text-white/60">
          <p>AUG'26</p>
          <p className="inline-flex items-center gap-2">
            <span className="block h-px w-5 bg-white/60"></span> MANHATTAN 12K
          </p>
        </div>
      </div>
      <div className="col-span-1 flex flex-col gap-2">
        <Image
          alt="Next Event"
          className="h-80 w-full object-cover"
          height={901}
          src="/images/next-events/event3.jpg"
          width={736}
        />
        <div className="space-y-2 text-sm text-white/60">
          <p>OCT'26</p>
          <p className="inline-flex items-center gap-2">
            <span className="block h-px w-5 bg-white/60"></span> QUEENS 15K
          </p>
        </div>
      </div>
      <div className="col-span-1 flex flex-col gap-2">
        <Image
          alt="Next Event"
          className="h-80 w-full object-cover"
          height={920}
          src="/images/next-events/event4.jpg"
          width={736}
        />
        <div className="space-y-2 text-sm text-white/60">
          <p>DEC'26</p>
          <p className="inline-flex items-center gap-2">
            <span className="block h-px w-5 bg-white/60"></span> EAST RIVER 8K
          </p>
        </div>
      </div>
    </div>
  );
}
