import { useEffect, useEffectEvent, useRef } from 'react';

export const useIntersectionObserver = <T extends HTMLElement>(
  onIntersect: () => void,
  enabled: boolean,
) => {
  const targetRef = useRef<T>(null);
  const handleIntersect = useEffectEvent(onIntersect);

  useEffect(() => {
    const target = targetRef.current;
    if (!target || !enabled) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          handleIntersect();
        }
      },
      { rootMargin: '200px' },
    );

    observer.observe(target);

    return () => observer.disconnect();
  }, [enabled]);

  return targetRef;
};