import Image from 'next/image';
import Link from 'next/link';
import { IconArrowRight } from '../ui/icons';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 z-50 w-full">
      <div className="mx-auto max-w-[1440px] p-4">
        <div className="flex items-center justify-between">
          <Link href="/">
            <Image
              alt="Logo"
              className="h-8 w-auto"
              height={396}
              src="/images/logo.png"
              width={820}
            />
          </Link>
          <div className="hidden md:flex">
            <div className="flex items-center justify-center backdrop-blur-xl">
              <Link className="px-5 py-2.5 text-xs text-white" href="/about">
                ABOUT
              </Link>
              <div className="h-3 w-px bg-white" />
              <Link className="px-5 py-2.5 text-xs text-white" href="/runs">
                RUNS
              </Link>
              <div className="h-3 w-px bg-white" />
              <Link className="px-5 py-2.5 text-xs text-white" href="/community">
                COMMUNITY
              </Link>
              <div className="h-3 w-px bg-white" />
              <Link className="px-5 py-2.5 text-xs text-white" href="/our-story">
                OUR STORY
              </Link>
              <div className="h-3 w-px bg-white" />
              <Link className="px-5 py-2.5 text-xs text-white" href="/gallery">
                GALLERY
              </Link>
              <div className="h-3 w-px bg-white" />
              <Link className="px-5 py-2.5 text-xs text-white" href="/faq">
                FAQ
              </Link>
            </div>
            <Link
              className="flex items-center gap-px bg-white px-5 py-2.5 text-xs text-nowrap text-black"
              href="/join-us"
            >
              JOIN US <IconArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <Link
            className="flex items-center gap-px bg-white px-5 py-2.5 text-xs text-black md:hidden"
            href="/join-us"
          >
            MENU
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
