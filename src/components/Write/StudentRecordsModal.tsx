import axios from 'axios';
import { ChangeEvent, useState } from 'react';
import ReactModal from 'react-modal';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import { IcPen } from '../../assets/icons';
import ModalPortal from '../../utils/ModalPortal';
import FileUpload from '../common/FileUpload';
import {
  ModalLayout,
  ModalNoBlackBackground,
  writeFormCustomStyles,
} from '../common/styled/ModalLayout';
import { SLogsSubmitBtn } from '../common/styled/SLogsSubmitBtn';
import { CustomModalProps } from './ClassLogModal';
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
  isOpen,
  onClose,
  handleClickOpenModal,
}: CustomModalProps) => {
  const { scheduleId } = useParams();

  const [title, setTitle] = useState<string>(''); //제목 상태
  const [observationContent, setObservationContent] = useState<string>('');
  const [teachingPlan, setTeachingPlan] = useState<string>('');
  const [date, setDate] = useState({
    startDate: '',
    endDate: '',
  });
  const [parentsIsAllDay, setParentsIsAllDay] = useState<boolean>(false);
  const [valueImgUrl, setValueImgUrl] = useState<File[]>([]);
  const [valueFileName, setValueFileName] = useState<string[]>([]);
  const formData = new FormData();

  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
  };
  // 자식 컴포넌트에게서 기간 값 가져오기
  const dateValue = (startDate: any, endDate: any, isAllDay: boolean) => {
    startDate = new Date(
      startDate.getTime() - startDate.getTimezoneOffset() * 60000,
    ); // 시작 날짜의 시간대 오프셋 적용
    endDate = new Date(endDate.getTime() - endDate.getTimezoneOffset() * 60000); // 종료 날짜의 시간대 오프셋 적용
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
    const content = e.target.value;
    if (content.length <= 3000) {
      setObservationContent(content);
    }
  };
  const handleTeachingPlanChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const content = e.target.value;
    if (content.length <= 3000) {
      setTeachingPlan(content);
    }
  };

  const handleChangeValueImg = (e: any) => {
    const files = e.target.files;
    const newFiles: File[] = [];
    const newFileNames: string[] = [];
    if (files) {
      for (let i = 0; i < files.length; i++) {
        newFiles.push(files[i]);
        newFileNames.push(files[i].name);
        formData.append('observationImages', files[i]);
      }
      setValueImgUrl((prevFiles) => [...prevFiles, ...newFiles]);
      setValueFileName((prevFileNames) => [...prevFileNames, ...newFileNames]);
    }
  };

  const handleClickSubmit = async () => {
    if (scheduleId) {
      try {
        const logData = {
          studentName: title,
          startDate: date.startDate,
          endDate: date.endDate,
          observationContents: observationContent,
          guidance: teachingPlan,
          isAllDay: parentsIsAllDay, // 종일 버튼 로직 추가하기
        };
        const jsonDataTypeValue = new Blob([JSON.stringify(logData)], {
          type: 'application/json',
        });
        formData.append('observationRequestDto', jsonDataTypeValue);

        const accessToken = localStorage.getItem('accessToken');

        await axios.post(
          `https://j9972.kr/tnote/observation/${scheduleId}`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${accessToken}`,
              accept: 'application/json',
            },
          },
        );
        window.location.reload();
        onClose();
      } catch (err) {
        console.log(err);
      }
    } else {
      Swal.fire({
        title: '학기가 있어야 합니다.',
        text: '학기 추가 혹은 학기 선택을 먼저 해주십시오.',
      });
    }
  };
  const isFormValid =
    title && date.startDate && date.endDate && observationContent;

  return (
    <ReactModal
      isOpen={isOpen}
      ariaHideApp={false}
      style={writeFormCustomStyles}
    >
      <WriteDropdown
        label="학생 관찰 일지"
        options={['학급일지', '업무일지', '상담기록']}
        onClickDropdownOpenModal={handleClickOpenModal}
        closeWriteModal={onClose}
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
          <SContentLength>( {observationContent.length}/ 3000)</SContentLength>
        </SContentLine>

        <STextarea
          placeholder="텍스트를 입력해주세요"
          value={observationContent}
          onChange={handleObservationContentChange}
        />
        <STeachingPlan>
          <SContentLine>
            <SContentIc>
              <IcPen />
              <SContent>해석 및 지도방안</SContent>
            </SContentIc>
            <SContentLength>({teachingPlan.length} / 3000)</SContentLength>
          </SContentLine>

          <STextarea
            placeholder="텍스트를 입력해주세요"
            value={teachingPlan}
            onChange={handleTeachingPlanChange}
          />
          <FileUpload
            fileName={valueFileName}
            handleChangeImg={handleChangeValueImg}
            inputId="valueFile"
          />
        </STeachingPlan>

        <SLogsSubmitBtn onClick={handleClickSubmit} disabled={!isFormValid}>
          등록
        </SLogsSubmitBtn>
      </SScroll>
    </ReactModal>
  );
};

export default StudentRecordsModal;
