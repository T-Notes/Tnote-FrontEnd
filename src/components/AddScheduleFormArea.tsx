import { useRef, useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { modalState } from '../recoil/atoms/modalState';
const AddScheduleFormArea = () => {
  const [modal, setModal] = useRecoilState(modalState);

  const handleCloseModal = () => {
    //Recoil을 통한 모달 관리 방법
    // setModal({ isOpen: false, content: null });
  };
  return (
    <div>
      <button>학급일지</button>
      <button>업무일지</button>
      <button>상담기록</button>
      <button>학생 관찰 기록</button>
    </div>
  );
  // return modal.isOpen ? (
  //   <div>
  //     <div>
  //       <button>학급일지</button>
  //       <button>업무일지</button>
  //       <button>상담기록</button>
  //       <button>학생 관찰 기록</button>
  //     </div>
  //     <button onClick={handleCloseModal}>Close Modal</button>
  //   </div>
  // ) : null;
};

export default AddScheduleFormArea;
