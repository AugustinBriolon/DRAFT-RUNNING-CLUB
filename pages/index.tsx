import About from '@/features/shared/about';
import Community from '@/features/shared/community';
import Hero from '@/features/shared/hero';
import Runs from '@/features/shared/runs';

export default function Page() {
  return (
    <>
      <Hero />
      {/* <div className="bg-noise bg-black">
        <About />
        <Runs />
      </div> */}
      <Community />
    </>
  );
}
