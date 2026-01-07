import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';
import Cursor from '@/components/ui/cursor';
import PerformanceIndicator from '@/components/ui/performance-indicator';
import SEO from '@/components/ui/SEO';
import { useEnvironment } from '@/hooks/useEnvironment';
import { useScreenLoader } from '@/providers/screen-loader.provider';
import { useScroll } from '@/hooks/useScroll';
import { usePerformance } from '@/providers/performance.provider';
import { gsap } from 'gsap';
import MorphSVGPlugin from 'gsap/dist/MorphSVGPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { ReactNode, useEffect } from 'react';

gsap.registerPlugin(ScrollTrigger, SplitText, MorphSVGPlugin);

const Layout = ({ children }: { children: ReactNode }) => {
  const { isProd } = useEnvironment();
  const { isLoading } = usePerformance();
  const { lockScroll } = useScroll();
  const { isComplete } = useScreenLoader();


  useEffect(() => {
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
  }, [isLoading]);

  useEffect(() => {
    if (isComplete) {
      lockScroll(false);
    } else {
      lockScroll(true);
    }
  }, [isComplete, lockScroll]);

  return (
    <>
      <Cursor />
      <SEO />

      <Header />
      <main className="min-h-screen w-screen overflow-hidden">{children}</main>
      <Footer />

      {!isProd && <PerformanceIndicator />}
    </>
  );
};

export default Layout;
