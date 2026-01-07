import { ReactNode } from 'react';
import { PerformanceProvider } from './performance.provider';
import { SmoothScrollProvider } from './smooth-scroll.provider';
import { ScreenLoaderProvider } from './screen-loader.provider';

export const AppProvider = ({ children }: { children: ReactNode }) => {
  return (
    <PerformanceProvider>
      <ScreenLoaderProvider>
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </ScreenLoaderProvider>
    </PerformanceProvider>
  );
};
