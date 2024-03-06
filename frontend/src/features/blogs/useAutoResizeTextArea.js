import { useEffect, useRef } from 'react';

export default function useAutoResizeTextArea() {
  const ref = useRef();

  function autoResize() {
    this.style.height = 'auto';
    this.style.height = this.scrollHeight + 'px';
  }

  useEffect(() => {
    if (!ref || !ref.current) return;
    const el = ref.current;
    el.addEventListener('input', autoResize, false);

    return () => {
      el.removeEventListener('input', autoResize, false);
    };
  }, []);

  return ref;
}
