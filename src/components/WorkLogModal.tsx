import styled from 'styled-components';
import { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { modalState } from '../recoil/atoms/modalState';
import { ReactComponent as DropdownOpen } from '../image/dropdownOpen.svg';
import { ReactComponent as DropdownClose } from '../image/dropdownClose.svg';
import { ReactComponent as CloseBtn } from '../image/closeBtn.svg';
import ClassLogModal from './ClassLogModal';
import ConsultationRecordsModal from './ConsultationRecordsModal';
import StudentRecordsModal from './StudentRecordsModal';
import WritingModalTop from '../components/WritingModalTop';

//** styled **/
const SWorkLogModalBackground = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.6);
`;
const SWorkLogModal = styled.div`
  border-radius: 20px;
  border: 1px solid var(--Black-Black50, #d5d5d5);
  background-color: #fff;
  width: 1100px;
  height: 800px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  .modalTop {
    display: flex;
    margin-left: 10%;
    margin-top: 20px;
  }
`;
const WorkLogModal = () => {
  const [modal, setModal] = useRecoilState(modalState);
  const [dropdown, setDropdown] = useState<boolean>(false);

  const handleClickDropdown = () => {
    setDropdown(!dropdown);
  };

  const handleCloseModal = () => {
    setModal({ isOpen: false, content: null });
  };
  //드롭다운 클릭한 모달을 열리게 하는 함수
  const handleDropdownChange = (dropdown: string) => {
    setDropdown(false); // 드롭다운 목록 클릭시 지금 모달 닫기
    let modalContent = null;
    if (dropdown === '학급일지') {
      modalContent = <ClassLogModal />;
    } else if (dropdown === '상담기록') {
      modalContent = <ConsultationRecordsModal />;
    } else if (dropdown === '학생 관찰 일지') {
      modalContent = <StudentRecordsModal />;
    }
    setModal({ isOpen: true, content: modalContent });
  };
  return (
    <SWorkLogModalBackground>
      <SWorkLogModal>
        <div className="modalTop">
          <CloseBtn onClick={handleCloseModal} />
          <div>업무일지</div>
          <div onClick={handleClickDropdown}>
            {dropdown ? <DropdownClose /> : <DropdownOpen />}
          </div>
        </div>
        {dropdown ? (
          <ul className="listStyleNone">
            <li onClick={() => handleDropdownChange('학급일지')}>학급일지</li>
            <li onClick={() => handleDropdownChange('상담기록')}>상담기록</li>
            <li onClick={() => handleDropdownChange('학생 관찰 일지')}>
              학생 관찰 일지
            </li>
          </ul>
        ) : null}
        <WritingModalTop />
      </SWorkLogModal>
    </SWorkLogModalBackground>
  );
};

export default WorkLogModal;
