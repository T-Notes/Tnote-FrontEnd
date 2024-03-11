import { ChangeEvent, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { IcClip, IcPen } from '../../assets/icons';
import { createStudentObservation } from '../../utils/lib/api';
import ModalPortal from '../../utils/ModalPortal';
// import { useWriteModal } from '../../utils/useHooks/useModal';
import { Button } from '../common/styled/Button';
import {
  ModalLayout,
  ModalNoBlackBackground,
} from '../common/styled/ModalLayout';
import { CloseProps } from './WorkLogModal';
import WriteDropdown from './WriteDropdown';
import WritingModalTop from './WriteModalTop';

const SLabel = styled.p`
  padding-left: 10px;
  padding-right: 20px;
  flex-shrink: 0;
  ${({ theme }) => theme.fonts.caption3}
`;
const SPointText = styled.span`
  color: #632cfa;
`;
const SModalLayout = styled(ModalLayout)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 670px;
  height: 600px;
`;

const STextarea = styled.textarea`
  height: 180px;
  width: 100%;
  overflow-y: scroll;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #a6a6a6;
  background: #ffff;
  margin-bottom: 15px;
`;
const SContentLine = styled.div`
  display: flex;
  padding-bottom: 10px;
`;

const SSubmit = styled(Button)`
  display: flex;
  margin-left: 40%;
  width: 150px;
  height: 40px;
  padding: 18px 20px;
  background-color: ${({ theme }) => theme.colors.purple100};
  color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.fonts.caption3};
`;

const SContentIc = styled.div`
  display: flex;
  padding-left: 10px;
  align-items: center;
`;
const SContent = styled.div`
  ${({ theme }) => theme.fonts.caption3}
  padding-left: 5px;
  > span {
    color: #632cfa;
  }
`;

const SContentLength = styled.div`
  margin-left: auto;
  padding-right: 5px;
  ${({ theme }) => theme.fonts.caption4};
  color: ${({ theme }) => theme.colors.gray100};
`;
const SFileUploadInput = styled.input`
  ${({ theme }) => theme.fonts.caption3}
  margin-left: 20px;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #e8e8e8;
  width: 400px;
  &::placeholder {
    color: #a6a6a6; /* placeholder의 색상 변경 */
  }
  cursor: pointer;
`;
const SFileWrapper = styled.div`
  display: flex;
  align-items: center;
  padding-left: 20px;
  padding-right: 20px;
  margin-bottom: 25px;
`;
const SFileText = styled.p`
  ${({ theme }) => theme.fonts.caption3}
  padding-left: 5px;
`;
const SUploadBtn = styled(Button)`
  border-radius: 8px;
  width: 80px;
  height: 38px;
  margin-left: auto;
  background-color: ${({ theme }) => theme.colors.gray200};
  ${({ theme }) => theme.fonts.caption3}
`;
const SScroll = styled.div`
  overflow-y: scroll;
  margin-top: 15px;
`;
const STeachingPlan = styled.div`
  border: none;
  padding-top: 30px;
  border-top: 1px solid #d5d5d5;
`;

const StudentRecordsModal = ({
  closeWriteModal,
  handleClickModal,
}: CloseProps) => {
  const { scheduleId } = useParams();
  // const { writeModal, handleClickModal } = useWriteModal();
  const [title, setTitle] = useState<string>(''); //제목 상태
  const [observationContent, setObservationContent] = useState<string>('');
  const [teachingPlan, setTeachingPlan] = useState<string>('');
  const [date, setDate] = useState({
    startDate: '',
    endDate: '',
  });
  const [parentsIsAllDay, setParentsIsAllDay] = useState<boolean>(false);

  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
  };
  // 자식 컴포넌트에게서 기간 값 가져오기
  const dateValue = (startDate: any, endDate: any, isAllDay: boolean) => {
    setDate((prevDate) => ({
      ...prevDate,
      startDate: startDate,
      endDate: endDate,
    }));
    setParentsIsAllDay(isAllDay);
  };
  const handleObservationContentChange = (
    e: ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setObservationContent(e.target.value);
  };
  const handleTeachingPlanChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTeachingPlan(e.target.value);
  };

  const handleClickSubmit = async () => {
    try {
      const logData = {
        studentName: title,
        startDate: date.startDate,
        endDate: date.endDate,
        observationContents: observationContent,
        guidance: teachingPlan,
        isAllDay: parentsIsAllDay, // 종일 버튼 로직 추가하기
      };
      await createStudentObservation(scheduleId, logData);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <ModalPortal>
      <ModalNoBlackBackground>
        <SModalLayout>
          <WriteDropdown
            label="학생 관찰 일지"
            options={['학급일지', '업무일지', '상담기록']}
            handleClickModal={handleClickModal}
            closeWriteModal={closeWriteModal}
          />
          <WritingModalTop
            titleLabel={'학생 이름'}
            dateLabel={'날짜'}
            onTitleChange={handleTitleChange}
            onStartDateChange={dateValue}
          />
          <SScroll>
            <SContentLine>
              <SContentIc>
                <IcPen />
                <SContent>
                  관찰 내용
                  <span>*</span>
                </SContent>
              </SContentIc>
              <SContentLength>
                ( {observationContent.length}/ 3000)
              </SContentLength>
            </SContentLine>

            <STextarea
              placeholder="텍스트를 입력해주세요"
              value={observationContent}
              onChange={handleObservationContentChange}
            />
            <SFileWrapper>
              <IcClip />
              <SFileText>파일 첨부</SFileText>

              <SFileUploadInput placeholder="2MB 이하의 jpg, png 파일 업로드 가능합니다." />
              <SUploadBtn>업로드</SUploadBtn>
            </SFileWrapper>
            <STeachingPlan>
              <SContentLine>
                <SContentIc>
                  <IcPen />
                  <SContent>
                    해석 및 지도방안
                    <span>*</span>
                  </SContent>
                </SContentIc>
                <SContentLength>({teachingPlan.length} / 3000)</SContentLength>
              </SContentLine>

              <STextarea
                placeholder="텍스트를 입력해주세요"
                value={teachingPlan}
                onChange={handleTeachingPlanChange}
              />
              <SFileWrapper>
                <IcClip />
                <SFileText>파일 첨부</SFileText>

                <SFileUploadInput placeholder="2MB 이하의 jpg, png 파일 업로드 가능합니다." />
                <SUploadBtn>업로드</SUploadBtn>
              </SFileWrapper>
            </STeachingPlan>

            <SSubmit onClick={handleClickSubmit}>등록</SSubmit>
          </SScroll>
          {/* {writeModal.isOpen && writeModal.content} */}
        </SModalLayout>
      </ModalNoBlackBackground>
    </ModalPortal>
  );
};

export default StudentRecordsModal;
