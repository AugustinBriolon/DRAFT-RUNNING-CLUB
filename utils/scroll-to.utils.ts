import Lenis from 'lenis';

export const scrollTo = (
  e: React.MouseEvent<HTMLAnchorElement>,
  lenis: Lenis | undefined,
  id: string,
  offset?: number,
) => {
  e.preventDefault();
  scrollToSection(lenis, id, offset);
};

const scrollToSection = (lenis: Lenis | undefined, id: string, offset?: number) => {
  if (!lenis) return;

  lenis?.scrollTo(id, {
    duration: 1.2,
    lerp: 0.08,
    easing: (t: number) => -(Math.cos(Math.PI * t) - 1) / 2,
    lock: true,
    offset: offset,
  });
};
