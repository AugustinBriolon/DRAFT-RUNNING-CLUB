import RunCard from '@/components/ui/run-card';

const runCard = [
  {
    index: 1,
    img: '/images/runs/run-1.webp',
    title: 'TUESDAY',
    description: 'NIGHT SHIFT',
  },
  {
    index: 2,
    img: '/images/runs/run-2.webp',
    title: 'SATURDAY',
    description: 'LONG RUN',
  },
  {
    index: 3,
    img: '/images/runs/run-3.webp',
    title: 'FREE DRIFT',
    description: 'RUNS',
  },
];

const Runs = () => {
  return (
    <div className="mx-auto min-h-dvh w-full max-w-[1440px] px-4 py-16" id="runs">
      <div className="text-white">
        <p className="font-impact! text-7xl">WE RUNTHE CITY - FROM</p>
        <div className="flex items-end gap-2">
          <p className="font-impact! text-7xl text-pretty lg:min-w-fit">SUNRISE TO MIDNIGHT./</p>
          <p className="font-bounded max-w-xs translate-y-20 text-xs text-balance md:translate-y-0">
            WEEKLY RUNS WEAVING BRIDGES, RIVERSIDES, CORNERS OF NEW YORK. AND THROUGH HIDDEN
          </p>
        </div>
      </div>
      <div className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="col-span-1 flex items-end justify-start">
          <p className="text-red text-md flex items-center justify-center gap-3 font-medium">
            <span>[</span>
            UPCOMING RUN
            <span>]</span>
          </p>
        </div>
        {runCard.map((card) => (
          <RunCard key={card.index} {...card} />
        ))}
      </div>
    </div>
  );
};

export default Runs;
