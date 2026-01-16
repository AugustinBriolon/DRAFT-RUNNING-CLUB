import { ReactNode } from 'react';
import { PerformanceProvider } from './performance.provider';
import { SmoothScrollProvider } from './smooth-scroll.provider';
import { ScreenLoaderProvider } from './screen-loader.provider';
import { FontReadyProvider } from './font-ready.provider';

export const AppProvider = ({ children }: { children: ReactNode }) => {
  return (
    <PerformanceProvider>
      <ScreenLoaderProvider>
        <FontReadyProvider>
          <SmoothScrollProvider>{children}</SmoothScrollProvider>
        </FontReadyProvider>
      </ScreenLoaderProvider>
    </PerformanceProvider>
  );
};
