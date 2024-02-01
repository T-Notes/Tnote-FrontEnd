import { useState } from 'react';

export const useToggle = (init = false) => {
  const [isToggle, setIsToggle] = useState<boolean>(init);

  const handleChangeToggle = () => {
    setIsToggle(!isToggle);
  };
  return { isToggle, setIsToggle, handleChangeToggle };
};
