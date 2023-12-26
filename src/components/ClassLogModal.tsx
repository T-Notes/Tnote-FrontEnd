import React, { useState, ChangeEvent } from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { modalState } from '../recoil/atoms/modalState';
import DateSelector from './DateSelector';
import ConsultationRecordsModal from './ConsultationRecordsModal';
import StudentRecordsModal from './StudentRecordsModal';
import WorkLogModal from './WorkLogModal';

const SClassLogBackground = styled.div`
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

const SClassLogContent = styled.div`
  border: 1px solid black;
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 50%;
  height: 50%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
`;

const SClassLogHeader = styled.div``;

const SClassLogTop = styled.div`
  display: flex;
  flex-direction: column;
`;

interface SaveContents {
  학습계획: string;
  수업내용: string;
  제출과제: string;
  진도표: string;
}

const ClassLogModal = () => {
  const [modal, setModal] = useRecoilState(modalState);
  const [selectedOption, setSelectedOption] = useState<string>(''); // 드롭다운에서 선택된 옵션(학급일지, 업무일지, 상담기록, 학생 관찰 일지)을 저장
  const [contentType, setContentType] =
    useState<keyof SaveContents>('학습계획'); //현재 모달에서 어떤 종류의 탭을 입력하고 있는지를 나타낸다.
  const [saveContents, setSaveContents] = useState<SaveContents>({
    학습계획: '',
    수업내용: '',
    제출과제: '',
    진도표: '',
  }); //각 탭의 타입에 따른 입력된 내용을 저장하는 객체

  // 닫기 버튼 클릭 시 모달 창 닫기
  const handleCloseBtn = () => {
    setModal({ isOpen: false, content: null });
  };

  // 드롭다운 값이 변경될 때 호출, 선택된 값에 따라 모달 컨텐츠를 업데이트
  const handleDropdownChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    let modalContent = null;
    if (selectedValue === '업무일지') {
      modalContent = <WorkLogModal />;
    } else if (selectedValue === '상담기록') {
      modalContent = <ConsultationRecordsModal />;
    } else if (selectedValue === '학생 관찰 일지') {
      modalContent = <StudentRecordsModal />;
    }

    setModal({ isOpen: true, content: modalContent });
    //선택된 옵션 상태 업데이트
    setSelectedOption(selectedValue);
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

  return (
    <SClassLogBackground>
      <SClassLogContent>
        <SClassLogHeader>
          <button onClick={handleCloseBtn}>&times;</button>
          <select onChange={handleDropdownChange} value={selectedOption}>
            <option disabled value="">
              학급일지
            </option>
            <option value="업무일지">업무일지</option>
            <option value="상담기록">상담기록</option>
            <option value="학생 관찰 일지">학생 관찰 일지</option>
          </select>
        </SClassLogHeader>
        <SClassLogTop>
          <div className="title">
            <label htmlFor="title">
              제목
              <input
                type="text"
                id="title"
                placeholder="제목을 입력하세요."
                maxLength={30}
              ></input>
            </label>
          </div>
          <div className="date">
            <DateSelector />
          </div>
        </SClassLogTop>

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
            <div>내용</div>
            <textarea
              placeholder={`${
                contentType === '학습계획'
                  ? '학습계획'
                  : contentType === '수업내용'
                    ? '수업내용'
                    : contentType === '제출과제'
                      ? '제출과제'
                      : '진도표'
              }을(를) 입력하세요`}
              value={saveContents[contentType]}
              onChange={handleContentChange}
            />
          </>
        )}

        <button>등록</button>
      </SClassLogContent>
    </SClassLogBackground>
  );
};

export default ClassLogModal;
