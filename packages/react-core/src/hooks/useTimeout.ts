import React from 'react';
import { isFunction } from '@aws-amplify/ui';

export default function useTimeout(
  callback: () => void,
  delay: number | undefined
): void {
  const storedCallback = React.useRef(callback);

  React.useLayoutEffect(() => {
    storedCallback.current = callback;
  }, [callback]);

  React.useEffect(() => {
    const isInvalidDelay = !delay && delay !== 0;
    if (isInvalidDelay || !isFunction(storedCallback.current)) {
      return;
    }

    const timeoutId = setTimeout(() => {
      storedCallback.current();
    }, delay);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [delay]);
}
