import { useState } from 'react';

export const useToggle = (initialState = false) => {
  const [isOpen, setIsOpen] = useState(initialState);

  const toggle = () => {
    setIsOpen((prev) => !prev);
  };

  return { isOpen, toggle };
};
