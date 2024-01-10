import styled from 'styled-components';
import React, { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { modalState } from '../../recoil/atoms/modalState';
import { ReactComponent as ImgPlaceLogo } from '../../assets/images/imgPlaceLogo.svg';
import { ReactComponent as ImgContentLogo } from '../../assets/images/imgContentLogo.svg';
import { ReactComponent as ImgInsert } from '../../assets/images/imgInsert.svg';
import ClassLogModal from './ClassLogModal';
import ConsultationRecordsModal from './ConsultationRecordsModal';
import StudentRecordsModal from './StudentRecordsModal';
import WritingModalTop from '../WritingModalTop';
import SubmitBtn from '../SubmitBtn';
import instanceAxios from '../../api/InstanceAxios';
import { startDateState, endDateState } from '../../recoil/atoms/dateState';
import MainModal from './MainModal';
import WritingContent from '../WritingContent';
import { workDiaryContents } from '../../recoil/atoms/contentState';

//** styled **/

const WorkLogModal = () => {
  const [modal, setModal] = useRecoilState(modalState);
  const [dropdown, setDropdown] = useState<boolean>(false);
  //장소, 내용 입력값 저장
  const [place, setPlace] = useState<string>('');
  const [content, setContent] = useRecoilState(workDiaryContents);
  const [contentCount, setContentCount] = useState<number>(0);
  const [title, setTitle] = useState<string>('');

  const startDate = useRecoilValue(startDateState);
  const endDate = useRecoilValue(endDateState);

  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
  };

  const handleCloseModal = () => {
    setModal({ isOpen: false, content: null });
  };
  //드롭다운 클릭한 모달을 열리게 하는 함수
  const handleDropdownChange = (dropdown: string) => {
    const modalContentMap: Record<string, JSX.Element> = {
      학급일지: <ClassLogModal />,
      상담기록: <ConsultationRecordsModal />,
      '학생 관찰 일지': <StudentRecordsModal />,
    };
    setModal({ isOpen: true, content: modalContentMap[dropdown] });
  };

  //장소 input value 받기 함수
  const handlePlaceInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlace(e.target.value);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setContent({ content: newContent });
    setContentCount(newContent.length);
  };

  const handleSubmit = async () => {
    try {
      await instanceAxios.post('', {
        title,
        startDate,
        endDate,
        place,
        content: workDiaryContents,
      });
      handleCloseModal(); //현재 모달 닫기
    } catch (err) {
      console.log('err:', err);
    }
  };
  return (
    <MainModal
      label="업무일지"
      options={['학급일지', '상담기록', '학생 관찰 일지']}
      handleDropdownChange={handleDropdownChange}
    >
      {/* 글쓰기 모달 제목/시간 공통 컴포넌트 */}
      <WritingModalTop
        onTitleChange={handleTitleChange}
        // onDateChange={handleDateChange}
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
        <WritingContent
          size="large"
          name="내용"
          onChange={handleContentChange}
          characterCount={contentCount}
        />
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
          <SubmitBtn
            background="purple"
            color="white"
            size="small"
            onClick={handleSubmit}
            label={'등록'}
          />
        </div>
      </div>
    </MainModal>
  );
};

export default WorkLogModal;
