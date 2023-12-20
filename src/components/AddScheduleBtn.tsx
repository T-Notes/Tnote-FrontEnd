import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { modalState } from '../recoil/atoms/modalState';
import AddScheduleFormArea from './AddScheduleFormArea';

const AddScheduleBtn = () => {
  const [modal, setModal] = useRecoilState(modalState);
  const [clickWriting, setClickWriting] = useState<boolean>(false);
  const handleClickWriting = () => {
    setClickWriting(!clickWriting);
  };
  //Recoil을 통한 모달 관리 방법
  //   const handleOpenModal = () => {
  //     setModal({ isOpen: true, content: <AddScheduleFormArea /> });
  //   };
  return (
    <div>
      <button onClick={handleClickWriting}>글쓰기</button>
      {clickWriting ? <AddScheduleFormArea /> : null}
      {/* {modal.isOpen && modal.content} */}
    </div>
  );
};

export default AddScheduleBtn;
