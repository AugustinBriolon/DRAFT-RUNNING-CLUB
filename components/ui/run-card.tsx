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
    <div className="group relative flex h-[300px] w-full items-end justify-start md:h-[500px]">
      <div className="absolute inset-0 -z-1 overflow-hidden">
        <Image
          alt={title}
          className="h-full w-full object-cover grayscale-100 transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0"
          height={1080}
          src={img}
          width={1350}
        />
      </div>
      <div className="pointer-events-none absolute top-1 right-1 block md:hidden">
        <IconArrowUpRight className="text-white" />
      </div>
      <div className="w-full px-3 py-4 text-4xl">
        <p className="font-impact! text-left text-white">
          <span className="mr-2">{index.toString().padStart(2, '0')}.</span>
          {title}
        </p>
        <p className="font-impact! text-white md:text-right">{description}</p>
      </div>
    </div>
  );
}
