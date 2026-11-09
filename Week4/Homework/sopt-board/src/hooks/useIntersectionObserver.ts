import { useEffect, useRef } from 'react';

interface UseIntersectionObserverProps {
  onIntersect: () => void;
  enabled: boolean;
}

export const useIntersectionObserver = <T extends Element>({
  onIntersect,
  enabled,
}: UseIntersectionObserverProps) => {
  const targetRef = useRef<T>(null);

  useEffect(() => {
    const target = targetRef.current;
    if (!target || !enabled) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) onIntersect();
      },
      { rootMargin: '100px' },
    );

    observer.observe(target);

    return () => observer.disconnect();
  }, [onIntersect, enabled]);

  return targetRef;
};