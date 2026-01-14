import Image from 'next/image';
import Link from 'next/link';
import BurgerMenu from '../ui/burger-menu';
import ScrambleLink from '../ui/scramble-link';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 z-10 w-full">
      <div className="relative mx-auto max-w-[1440px] p-4">
        <div className="flex items-center justify-between">
          <Link className="cursor-pointer" href="/">
            <Image
              alt="Logo"
              className="h-8 w-auto select-none"
              height={396}
              src="/images/logo.png"
              width={820}
            />
          </Link>
          <div className="hidden md:flex">
            <div className="flex items-center justify-center backdrop-blur-xl">
              <ScrambleLink
                className="w-23 cursor-pointer px-5 py-2 text-xs text-white"
                href="#about"
              >
                ABOUT
              </ScrambleLink>
              <div className="h-3 w-px bg-white" />
              <ScrambleLink
                className="w-20 cursor-pointer px-5 py-2 text-xs text-white"
                href="#runs"
              >
                RUNS
              </ScrambleLink>
              <div className="h-3 w-px bg-white" />
              <ScrambleLink
                className="w-34 cursor-pointer px-5 py-2 text-xs text-white"
                href="#community"
              >
                COMMUNITY
              </ScrambleLink>
              <div className="h-3 w-px bg-white" />
              <ScrambleLink
                className="w-31 cursor-pointer px-5 py-2 text-xs text-white"
                href="#our-story"
              >
                OUR STORY
              </ScrambleLink>
              <div className="h-3 w-px bg-white" />
              <ScrambleLink
                className="w-27 cursor-pointer px-5 py-2 text-xs text-white"
                href="#gallery"
              >
                GALLERY
              </ScrambleLink>
              <div className="h-3 w-px bg-white" />
              <ScrambleLink
                className="w-17 cursor-pointer px-5 py-2 text-xs text-white"
                href="#faq"
              >
                FAQ
              </ScrambleLink>
            </div>
            <ScrambleLink
              className="w-30 bg-white px-5 py-2 text-xs text-black"
              href="#join-us"
              isJoinUs
            >
              JOIN US
            </ScrambleLink>
          </div>
          <BurgerMenu />
        </div>
      </div>
    </header>
  );
};

export default Header;
