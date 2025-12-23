import Image from 'next/image';
import Link from 'next/link';
import AnimatedLink from '../ui/animated-link';
import BurgerMenu from '../ui/burger-menu';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 z-10 w-full">
      <div className="relative mx-auto max-w-[1440px] p-4">
        <div className="flex items-center justify-between">
          <Link className="cursor-pointer" href="/">
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
              <AnimatedLink className="cursor-pointer px-5 py-2 text-xs text-white" href="#about">
                ABOUT
              </AnimatedLink>
              <div className="h-3 w-px bg-white" />
              <AnimatedLink className="cursor-pointer px-5 py-2 text-xs text-white" href="#runs">
                RUNS
              </AnimatedLink>
              <div className="h-3 w-px bg-white" />
              <AnimatedLink
                className="cursor-pointer px-5 py-2 text-xs text-white"
                href="#community"
              >
                COMMUNITY
              </AnimatedLink>
              <div className="h-3 w-px bg-white" />
              <AnimatedLink
                className="cursor-pointer px-5 py-2 text-xs text-white"
                href="#our-story"
              >
                OUR STORY
              </AnimatedLink>
              <div className="h-3 w-px bg-white" />
              <AnimatedLink className="cursor-pointer px-5 py-2 text-xs text-white" href="#gallery">
                GALLERY
              </AnimatedLink>
              <div className="h-3 w-px bg-white" />
              <AnimatedLink className="cursor-pointer px-5 py-2 text-xs text-white" href="#faq">
                FAQ
              </AnimatedLink>
            </div>
            <AnimatedLink
              className="flex cursor-pointer items-center gap-px bg-white px-5 py-2 text-xs text-nowrap text-black"
              href="#join-us"
              isJoinUs
            >
              JOIN US
            </AnimatedLink>
          </div>
          <BurgerMenu />
        </div>
      </div>
    </header>
  );
};

export default Header;
