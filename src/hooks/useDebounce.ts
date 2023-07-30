import { useEffect, useState } from 'react';

export function useDebounce<T>(value: T, debounceEffect: () => void, delay?: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);

      debounceEffect();
    }, delay || 240);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}
