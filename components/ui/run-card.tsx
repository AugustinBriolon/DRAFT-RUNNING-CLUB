import Image from 'next/image';
import { IconArrowUpRight } from './icons';

interface RunCardProps {
  index: number;
  img: string;
  title: string;
  description: string;
}

export default function RunCard({ index, img, title, description }: RunCardProps) {
  return (
    <div className="group card-run relative flex h-[300px] w-full items-end justify-start md:h-[500px]">
      <div className="absolute inset-0 -z-1 overflow-hidden">
        <Image
          alt={title}
          className="card-img h-full w-full object-cover grayscale-100 group-hover:grayscale-0"
          height={1080}
          loading="eager"
          src={img}
          width={1350}
          preload
        />
      </div>
      <div className="pointer-events-none absolute top-1 right-1 block md:hidden">
        <IconArrowUpRight className="text-white" />
      </div>
      <div className="w-full p-4 text-4xl">
        <p className="font-impact! text-left text-white">
          <span className="mr-2">{index.toString().padStart(2, '0')}.</span>
          {title}
        </p>
        <p className="font-impact! text-white md:text-right">{description}</p>
      </div>
    </div>
  );
}
