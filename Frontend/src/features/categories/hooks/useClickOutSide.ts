"use client";
import { useEffect, RefObject } from "react";

export function useClickOutside<T extends HTMLElement>(
  ref: RefObject<T>,
  handler: (event: MouseEvent) => void,
  active = true
) {
  useEffect(() => {
    if (!active) return;

    const listener = (event: MouseEvent) => {
      const el = ref?.current;
      if (!el || el.contains(event.target as Node)) return;
      handler(event);
    };

    document.addEventListener("mousedown", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
    };
  }, [ref, handler, active]);
}
