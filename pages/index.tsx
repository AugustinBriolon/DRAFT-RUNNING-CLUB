import About from '@/features/about';
import Community from '@/features/community';
import Hero from '@/features/hero';
import OurStory from '@/features/our-story';
import Runs from '@/features/runs';

export default function Page() {
  return (
    <>
      <div className="fixed inset-0 -z-1">
        <div className="bg-noise bg-black"></div>
      </div>
      <Hero />
      <About />
      <Runs />
      <Community />
      <OurStory />
    </>
  );
}
