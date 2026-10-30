import { useEffect, useRef } from 'react';

export const useIntersectionObserver = <T extends HTMLElement>(
  onIntersect: () => void,
  enabled: boolean,
) => {
  const targetRef = useRef<T>(null);
  const callbackRef = useRef(onIntersect);

  useEffect(() => {
    callbackRef.current = onIntersect;
  }, [onIntersect]);

  useEffect(() => {
    const target = targetRef.current;
    if (!target || !enabled) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          callbackRef.current();
        }
      },
      { rootMargin: '200px' },
    );

    observer.observe(target);

    return () => observer.disconnect();
  }, [enabled]);

  return targetRef;
};