import { useRef, useState, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { modalState } from '../recoil/atoms/modalState';
import ClassLogModal from './ClassLogModal';
import ConsultationRecordsModal from './ConsultationRecordsModal';
import StudentRecordsModal from './StudentRecordsModal';
import WorkLogModal from './WorkLogModal';

const AddScheduleFormArea = () => {
  const [modal, setModal] = useRecoilState(modalState);

  const [clickedButton, setClickedButton] = useState<string | null>(null);
  //3. 버튼 클릭시 일어날 행동
  const handleClickModal = (buttonType: string) => {
    let modalContent = null;
    if (buttonType === '학급일지') {
      modalContent = <ClassLogModal />;
    } else if (buttonType === '업무일지') {
      modalContent = <WorkLogModal />;
    } else if (buttonType === '상담기록') {
      modalContent = <ConsultationRecordsModal />;
    } else if (buttonType === '학생 관찰 기록') {
      modalContent = <StudentRecordsModal />;
    }
    //모달 상태 업데이트
    setModal({ isOpen: true, content: modalContent });
    // 클릭된 버튼 정보 저장
    setClickedButton(buttonType);
  };

  return (
    <div>
      {/* 클릭된 버튼이 없을 때만 버튼 렌더링 */}
      {!clickedButton && (
        <>
          <button onClick={() => handleClickModal('학급일지')}>학급일지</button>
          <button onClick={() => handleClickModal('업무일지')}>업무일지</button>
          <button onClick={() => handleClickModal('상담기록')}>상담기록</button>
          <button onClick={() => handleClickModal('학생 관찰 기록')}>
            학생 관찰 기록
          </button>
        </>
      )}
      {modal.isOpen && modal.content}
    </div>
  );
};

export default AddScheduleFormArea;
