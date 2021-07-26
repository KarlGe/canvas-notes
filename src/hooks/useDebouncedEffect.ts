import { useEffect, useRef, useState } from 'react';

export const useDebouncedEffect = (
  effect: () => void,
  deps: any[],
  delay: number,
  skipInitialRender: boolean = true
) => {
  const isInitialRender = useRef(true);
  useEffect(() => {
    let handler;
    if (!isInitialRender.current && skipInitialRender) {
      handler = setTimeout(() => effect(), delay);
    } else {
      isInitialRender.current = false;
    }
    return () => {
      clearTimeout(handler);
    };
  }, [...(deps || []), delay]);
};
