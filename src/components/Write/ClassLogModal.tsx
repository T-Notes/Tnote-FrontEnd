import { useState, ChangeEvent } from 'react';
import styled from 'styled-components';
import { useRecoilState, useRecoilValue } from 'recoil';
import { logModalState } from '../../utils/lib/atom';
import WritingModalTop from './WriteModalTop';
import WriteDropdown from './WriteDropdown';
import { useWriteModal } from '../../utils/useHooks/useModal';
import ModalPortal from '../../utils/ModalPortal';
import { ModalBackground, ModalLayout } from '../common/styled/ModalLayout';
import { Button } from '../common/styled/Button';
import { createClassLog } from '../../utils/lib/api';
import { useParams } from 'react-router-dom';
import { IcClose, IcPen } from '../../assets/icons';

// styled //

const SModalLayout = styled(ModalLayout)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 50%;
  max-width: 1100px;
  max-height: 80vh;
  height: 100%;
  padding: 30px 40px;
`;

const STextarea = styled.textarea`
  max-height: 340px;
  overflow-y: scroll;
  padding: 20px 0px 20px 20px;
  justify-content: flex-end;
  align-items: flex-start;
  gap: 10px;
  border-radius: 8px;
  border: 1px solid var(--Black-Black_60, #a6a6a6);
  background: #fff;
  height: 300px;
  width: 30rem;
`;
const SContentLine = styled.div`
  display: flex;
`;

const SSubmit = styled(Button)`
  width: 270px;
  height: 60px;
  padding: 18px 20px;
  background-color: ${({ theme }) => theme.colors.purple100};
  color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.fonts.button1};
`;

const SType = styled.div`
  /* border-bottom: 3px solid #0000004d; */
`;

const STypeBtn = styled.button`
  padding: 20px 30px;
  border-bottom: 3px solid #0000004d;
`;
const SContentWrap = styled.div`
  padding-left: 30px;
`;

// interface //
interface SaveContents {
  학습계획: string;
  수업내용: string;
  제출과제: string;
  진도표: string;
}

interface CloseProps {
  closeModal: () => void;
}
const ClassLogModal = ({ closeModal }: CloseProps) => {
  const { scheduleId } = useParams();
  const [title, setTitle] = useState<string>(''); //제목 상태
  const { writeModal, handleClickModal } = useWriteModal(closeModal);

  const [contentType, setContentType] =
    useState<keyof SaveContents>('학습계획'); //현재 모달에서 어떤 종류의 탭을 입력하고 있는지를 나타낸다.
  const [saveContents, setSaveContents] = useState<SaveContents>({
    학습계획: '',
    수업내용: '',
    제출과제: '',
    진도표: '',
  }); //각 탭의 타입에 따른 입력된 내용을 저장하는 객체

  //   const [dropdown, setDropdown] = useState<boolean>(false);
  const [date, setDate] = useState({
    startDate: '',
    endDate: '',
  });

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
  // 자식 컴포넌트에게서 기간 값 가져오기
  const dateValue = (startDate: any, endDate: any) => {
    setDate((prevDate) => ({
      ...prevDate,
      startDate: startDate,
      endDate: endDate,
    }));
  };

  const handleClickSubmit = async () => {
    try {
      const logData = {
        title,
        startDate: date.startDate,
        endDate: date.endDate,
        plan: saveContents.학습계획,
        classContents: saveContents.수업내용,
        submission: saveContents.제출과제,
        magnitude: saveContents.진도표,
        // isAllDay: false // 종일 버튼 로직 추가하기
      };
      await createClassLog(scheduleId, logData);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ModalPortal>
      <ModalBackground>
        <SModalLayout>
          <WriteDropdown
            label="학급일지"
            options={['업무일지', '상담기록', '학생 관찰 일지']}
            handleChangeOption={handleClickModal}
            closeModal={closeModal}
          />
          <WritingModalTop
            onTitleChange={handleTitleChange}
            onStartDateChange={dateValue}
          />
          <SContentWrap>
            <SType>
              <STypeBtn onClick={() => handleContentTypeChange('학습계획')}>
                학습계획
              </STypeBtn>
              <STypeBtn onClick={() => handleContentTypeChange('수업내용')}>
                수업내용
              </STypeBtn>
              <STypeBtn onClick={() => handleContentTypeChange('제출과제')}>
                제출과제
              </STypeBtn>
              <STypeBtn onClick={() => handleContentTypeChange('진도표')}>
                진도표
              </STypeBtn>
            </SType>
            {contentType && (
              <>
                <SContentLine>
                  <IcPen />
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
          </SContentWrap>

          <SSubmit onClick={handleClickSubmit}>등록</SSubmit>
          {writeModal.isOpen && writeModal.content}
        </SModalLayout>
      </ModalBackground>
    </ModalPortal>
  );
};

export default ClassLogModal;
