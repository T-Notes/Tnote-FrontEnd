import styled from 'styled-components';
import React, { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { modalState } from '../recoil/atoms/modalState';
import ModalPortal from '../helpers/ModalPortal';
import { ReactComponent as ImgDropdownOpen } from '../assets/images/imgDropdownOpen.svg';
import { ReactComponent as ImgDropdownClose } from '../assets/images/imgDropdownClose.svg';
import { ReactComponent as ImgCloseBtn } from '../assets/images/imgCloseBtn.svg';
import { ReactComponent as ImgPlaceLogo } from '../assets/images/imgPlaceLogo.svg';
import { ReactComponent as ImgContentLogo } from '../assets/images/imgContentLogo.svg';
import { ReactComponent as ImgInsert } from '../assets/images/imgInsert.svg';
import ClassLogModal from './ClassLogModal';
import ConsultationRecordsModal from './ConsultationRecordsModal';
import StudentRecordsModal from './StudentRecordsModal';
import WritingModalTop from '../components/WritingModalTop';
import SubmitBtn from '../components/SubmitBtn';
import instanceAxios from '../api/InstanceAxios';

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
  .contentTextarea {
    width: 940px;
    height: 220px;
    resize: none;
    padding: 20px 0px 20px 20px; //상 우 하 좌
  }
`;
const WorkLogModal = () => {
  const [modal, setModal] = useRecoilState(modalState);
  const [dropdown, setDropdown] = useState<boolean>(false);
  //장소, 내용 입력값 저장
  const [place, setPlace] = useState<string>('');
  const [content, setContent] = useState<string>('');

  // modalTop 컴포넌트 상태
  const [title, setTitle] = useState<string>('');
  const [date, setDate] = useState<string>('');

  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
  };

  const handleDateChange = (newDate: string) => {
    setDate(newDate);
  };

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

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleSubmit = () => {
    instanceAxios.post('');
    handleCloseModal(); //현재 모달 닫기
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
          <WritingModalTop
            onTitleChange={handleTitleChange}
            onDateChange={handleDateChange}
          />
          <div>
            <div>회의록</div>
            <div>
              <ImgPlaceLogo />
              <label>장소</label>
              <input
                type="text"
                name="place"
                aria-labelledby="place"
                placeholder="장소를 입력하세요"
                maxLength={30}
                onChange={handlePlaceInputChange}
              />
              ({place.length} / 30)
            </div>
            <div>
              <ImgContentLogo />
              <label>내용*</label>
              <textarea
                className="contentTextarea"
                name="content"
                placeholder="텍스트를 입력하세요."
                maxLength={3000}
                onChange={handleContentChange}
              />
              ({content.length}/3000)
            </div>
            <div>
              <ImgInsert />
              <label>파일첨부</label>
              <input
                placeholder="2MB 이하의 jpg,gif 파일 업로드 가능합니다."
                readOnly
              ></input>
              <button>업로드</button>
            </div>
            <div>
              <SubmitBtn onClick={handleSubmit} label={'등록'} />
            </div>
          </div>
        </SWorkLogModal>
      </SWorkLogModalBackground>
    </ModalPortal>
  );
};

export default WorkLogModal;
