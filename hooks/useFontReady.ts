import { useEffect, useState } from 'react';

export function useFontReadyHook() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    document.fonts.load('1rem "Impact"').then(() => {
      document.fonts.load('1rem "Bounded"').then(() => {
        setReady(true);
      });
    });
  }, []);

  return ready;
}
