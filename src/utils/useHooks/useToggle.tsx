import { useState } from 'react';

export const useToggle = (init = false) => {
  const [isOpenToggle, setIsOpenToggle] = useState<boolean>(init);

  const handleToggle = () => {
    setIsOpenToggle(!isOpenToggle);
  };
  return { isOpenToggle, handleToggle };
};
