import styled from 'styled-components';
import React, { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { modalState } from '../recoil/atoms/modalState';
import ModalPortal from '../helpers/ModalPortal';
import { ReactComponent as ImgDropdownOpen } from '../assets/imgDropdownOpen.svg';
import { ReactComponent as ImgDropdownClose } from '../assets/imgDropdownClose.svg';
import { ReactComponent as ImgCloseBtn } from '../assets/imgCloseBtn.svg';
import ClassLogModal from './ClassLogModal';
import ConsultationRecordsModal from './ConsultationRecordsModal';
import StudentRecordsModal from './StudentRecordsModal';
import WritingModalTop from '../components/WritingModalTop';

//** styled **/
const SWorkLogModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;
const SWorkLogModal = styled.div`
  border: 1px solid var(--Black-Black50, #d5d5d5);
  background-color: #fff;
  padding: 20px;
  border-radius: 20px;
  width: 1100px;
  height: 800px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);

  .modalTop {
    display: flex;
    margin-left: 10%;
    margin-top: 20px;
  }
`;
const WorkLogModal = () => {
  const [modal, setModal] = useRecoilState(modalState);
  const [dropdown, setDropdown] = useState<boolean>(false);
  //장소 content 저장
  const [place, setPlace] = useState<string>('');

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

  //장소 input value 받기 함수
  const handlePlaceInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlace(e.target.value);
  };
  return (
    <ModalPortal>
      <SWorkLogModalBackground>
        <SWorkLogModal>
          <div className="modalTop">
            <ImgCloseBtn onClick={handleCloseModal} />
            <div>업무일지</div>
            <div onClick={handleClickDropdown}>
              {dropdown ? <ImgDropdownClose /> : <ImgDropdownOpen />}
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
          {/* 글쓰기 모달 제목/시간 공통 컴포넌트 */}
          <WritingModalTop />
          <div>
            <div>회의록</div>
            <div>
              <label>장소</label>
              <input
                type="text"
                name="place"
                aria-labelledby="place"
                placeholder="장소를 입력하세요"
                onChange={handlePlaceInputChange}
              />
              ({place.length} / 30)
            </div>
            <div>내용</div>
          </div>
        </SWorkLogModal>
      </SWorkLogModalBackground>
    </ModalPortal>
  );
};

export default WorkLogModal;
