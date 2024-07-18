import React, { useEffect, useState } from "react";
const useOutsideClick = <T extends HTMLElement = HTMLElement>(
  ref: React.RefObject<T>,
  callback: (event?: CustomEvent<MouseEvent>) => void,
) => {
  // 드래그 한 다음 밖을 클릭하게 되면 모달창이 꺼지는 현상 방지
  const [isDragging, setIsDragging] = useState(true);
  useEffect(() => {
    const listener = (event: CustomEvent<MouseEvent>) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        if (isDragging) return;
        callback(event);
      }
    };
    const listener1 = (event: CustomEvent<MouseEvent>) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsDragging(false);
      } else {
        setIsDragging(true);
      }
    };
    document.addEventListener("mouseup", listener as EventListener);
    document.addEventListener("mousedown", listener1 as EventListener);
    return () => {
      document.removeEventListener("mouseup", listener as EventListener);
      document.addEventListener("mousedown", listener1 as EventListener);
    };
  }, [callback, isDragging, ref]);
};

export default useOutsideClick;
