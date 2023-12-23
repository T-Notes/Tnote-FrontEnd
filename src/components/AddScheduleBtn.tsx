import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { modalState, toggleModalState } from '../recoil/atoms/modalState';

import AddScheduleFormArea from './AddScheduleFormArea';

const AddScheduleBtn = () => {
  const [isOpen, setIsOpen] = useRecoilState(toggleModalState);

  const handleToggleBtn = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button onClick={handleToggleBtn}>글쓰기</button>
      {isOpen ? <AddScheduleFormArea /> : null}
    </div>
  );
};

export default AddScheduleBtn;
