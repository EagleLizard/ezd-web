
import {
  ForwardedRef,
  MutableRefObject,
  RefCallback,
} from 'react';

/*
  https://github.com/gregberge/react-merge-refs/blob/main/src/index.tsx
*/

export function mergeRefs<T>(
  refs: (MutableRefObject<T | null> | RefCallback<T> | ForwardedRef<T>)[]
): RefCallback<T> {
  return (value) => {
    refs.forEach((ref) => {
      if((typeof ref) === 'function') {
        (ref as RefCallback<T>)(value);
      } else if(ref !== null) {
        (ref as MutableRefObject<T | null>).current = value;
      }
    });
  };
}
