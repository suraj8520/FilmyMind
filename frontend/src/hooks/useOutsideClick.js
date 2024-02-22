import { useEffect, useRef } from 'react';

export default function useOutsideClick(handler) {
  const ref = useRef();

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current?.contains(e.target)) {
        handler?.();
      }
    }
    document.addEventListener('click', handleClick); // you can have another argument true which will basically make it so that it listen's while capturing
    // that would have been more appropriate if i wasn't using global context
    return () => document.removeEventListener('click', handleClick);
  }, [handler]);
  return { ref };
}
