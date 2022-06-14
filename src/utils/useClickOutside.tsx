import { RefObject, useEffect } from "react";

const useClickOutside = (
  ref: RefObject<HTMLElement>,
  callback: () => void
) => {
  useEffect(() => {
    const onClickOutside = (event: MouseEvent) => {
      if (ref.current !== null && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.body.addEventListener("click", onClickOutside);

    return () => document.body.removeEventListener("click", onClickOutside);

  }, [ref]);
};

export default useClickOutside;
