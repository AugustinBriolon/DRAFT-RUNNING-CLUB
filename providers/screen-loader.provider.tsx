import { createContext, ReactNode, useContext, useMemo, useState } from 'react';

interface ScreenLoaderContextType {
  isComplete: boolean;
  setIsComplete: (value: boolean) => void;
}

const ScreenLoaderContext = createContext<ScreenLoaderContextType | null>(null);

export const ScreenLoaderProvider = ({ children }: { children: ReactNode }) => {
  const [isComplete, setIsComplete] = useState(false);

  const value = useMemo(
    () => ({
      isComplete,
      setIsComplete,
    }),
    [isComplete],
  );

  return <ScreenLoaderContext.Provider value={value}>{children}</ScreenLoaderContext.Provider>;
};

export const useScreenLoader = () => {
  const ctx = useContext(ScreenLoaderContext);
  if (!ctx) throw new Error('useScreenLoader must be used within a ScreenLoaderProvider');
  return ctx;
};
