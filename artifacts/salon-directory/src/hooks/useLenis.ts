import { useEffect } from 'react';

export function useLenis() {
  useEffect(() => {
    // Smooth scroll will be handled by CSS scroll-behavior: smooth
    // Lenis would require installation which is blocked
    // Graceful degradation to native smooth scroll
    return () => {};
  }, []);
}
