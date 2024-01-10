import { useState, ChangeEvent } from 'react';
import styled from 'styled-components';
import { useRecoilState, useRecoilValue } from 'recoil';
import { modalState } from '../../recoil/atoms/modalState';
import { startDateState, endDateState } from '../../recoil/atoms/dateState';
import ConsultationRecordsModal from './ConsultationRecordsModal';
import StudentRecordsModal from './StudentRecordsModal';
import WorkLogModal from './WorkLogModal';
import instanceAxios from '../../api/InstanceAxios';
import WritingModalTop from '../WritingModalTop';
import MainModal from './MainModal';
import { ReactComponent as ImgContentLogo } from '../../assets/images/imgContentLogo.svg';
import SubmitBtn from '../SubmitBtn';

// styled //
const STextarea = styled.textarea`
  max-height: 160px;
  overflow-y: scroll;
  padding: 20px 0px 20px 20px;
  justify-content: flex-end;
  align-items: flex-start;
  gap: 10px;
  border-radius: 8px;
  border: 1px solid var(--Black-Black_60, #a6a6a6);
  background: #fff;
  height: 260px;
  width: 940px;
`;
const SContentLine = styled.div`
  display: flex;
`;

// interface //
interface SaveContents {
  학습계획: string;
  수업내용: string;
  제출과제: string;
  진도표: string;
}

const ClassLogModal = () => {
  const [modal, setModal] = useRecoilState(modalState); // isOpen, content 값이 있는 모달 전역상태
  const [title, setTitle] = useState<string>(''); //제목 상태

  const [contentType, setContentType] =
    useState<keyof SaveContents>('학습계획'); //현재 모달에서 어떤 종류의 탭을 입력하고 있는지를 나타낸다.
  const [saveContents, setSaveContents] = useState<SaveContents>({
    학습계획: '',
    수업내용: '',
    제출과제: '',
    진도표: '',
  }); //각 탭의 타입에 따른 입력된 내용을 저장하는 객체

  const [dropdown, setDropdown] = useState<boolean>(false);

  const startDate = useRecoilValue(startDateState); // 첫시작일
  const endDate = useRecoilValue(endDateState); //마지막일

  // 드롭다운 값이 변경될 때 호출, 선택된 값에 따라 모달 컨텐츠를 업데이트
  const handleDropdownChange = (dropdown: string) => {
    const modalContentMap: Record<string, JSX.Element> = {
      업무일지: <WorkLogModal />,
      상담기록: <ConsultationRecordsModal />,
      '학생 관찰 일지': <StudentRecordsModal />,
    };

    setModal({ isOpen: true, content: modalContentMap[dropdown] });
  };

  // 모달의 컨텐츠 타입이 변경될 때 호출
  const handleContentTypeChange = (type: keyof SaveContents) => {
    setContentType(type);
  };
  // 탭 내용 업데이트, 이전 상태 유지
  const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setSaveContents((prevSaveContents) => ({
      ...prevSaveContents,
      [contentType]: e.target.value,
    }));
  };

  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
  };

  const handleClickSubmit = async () => {
    try {
      await instanceAxios.post('/api/endpoint', {
        title,
        startDate: startDate, //recoil 상태활용
        endDate: endDate, //recoil 상태활용
        saveContents,
      });
    } catch (err) {
      console.log('err:', err);
    }
  };

  return (
    <MainModal
      label="학급일지"
      options={['업무일지', '상담기록', '학생 관찰 일지']}
      handleDropdownChange={handleDropdownChange}
    >
      {/* 글쓰기 모달 제목/시간 공통 컴포넌트 */}
      <WritingModalTop
        onTitleChange={handleTitleChange}
        // onDateChange={handleDateChange}
      />

      <div>
        <button onClick={() => handleContentTypeChange('학습계획')}>
          학습계획
        </button>
        <button onClick={() => handleContentTypeChange('수업내용')}>
          수업내용
        </button>
        <button onClick={() => handleContentTypeChange('제출과제')}>
          제출과제
        </button>
        <button onClick={() => handleContentTypeChange('진도표')}>
          진도표
        </button>
      </div>

      {contentType && (
        <>
          <SContentLine>
            <ImgContentLogo />
            <div>내용</div>
            <div>({saveContents[contentType].length} / 3000)</div>
          </SContentLine>

          <STextarea
            placeholder="텍스트를 입력해주세요"
            value={saveContents[contentType]}
            onChange={handleContentChange}
          />
        </>
      )}
      <SubmitBtn
        background="purple"
        color="white"
        size="small"
        onClick={handleClickSubmit}
        label={'등록'}
      />
    </MainModal>
  );
};

export default ClassLogModal;
