import { useState, ChangeEvent, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import FileUpload from '../common/FileUpload';
import WritingModalTop from './WriteModalTop';
import WriteDropdown from './WriteDropdown';
import { writeFormCustomStyles } from '../common/styled/ModalLayout';
import { useParams } from 'react-router-dom';
import { IcPen } from '../../assets/icons';
import Swal from 'sweetalert2';
import { SLogsSubmitBtn } from '../common/styled/SLogsSubmitBtn';
import ReactModal from 'react-modal';
import { getClassLogDetailData } from '../../utils/lib/api';

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

const SType = styled.div`
  margin-bottom: 20px;
  display: flex;
`;
const STypeBtn = styled.button<{ selected: boolean }>`
  padding: 20px 30px;
  ${({ theme }) => theme.fonts.caption3}
  color: ${(props) => (props.selected ? '#632CFA' : '#000000')};
  border-bottom: ${(props) =>
    props.selected ? '2.5px solid #632CFA' : '2.5px solid #0000004d'};
`;
const SBorderBottom = styled.div`
  padding-top: 20px;
  padding-left: 166.5px;
  border-bottom: 2.5px solid #0000004d;
`;
const SContentWrap = styled.div`
  padding-left: 20px;
  padding-right: 20px;
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

interface SaveContents {
  학습계획: string;
  수업내용: string;
  제출과제: string;
  진도표: string;
}

export interface CustomModalProps {
  isOpen: boolean;
  onClose: () => void;
  handleClickOpenModal: (option: string) => void;
  logId: number;
}
const ClassLogModal = ({
  isOpen,
  onClose,
  handleClickOpenModal,
  logId,
}: CustomModalProps) => {
  const formData = new FormData();
  const { scheduleId } = useParams();
  const [title, setTitle] = useState<string>('');
  const [parentsIsAllDay, setParentsIsAllDay] = useState<boolean>(false);
  const [imgUrl, setImgUrl] = useState<File[]>([]);
  const [fileName, setFileName] = useState<string[]>([]);

  const [contentType, setContentType] =
    useState<keyof SaveContents>('학습계획');

  const [saveContents, setSaveContents] = useState<SaveContents>({
    학습계획: '',
    수업내용: '',
    제출과제: '',
    진도표: '',
  });
  const [date, setDate] = useState({
    startDate: '',
    endDate: '',
  });
  const isFormValid =
    title && date.startDate && date.endDate && saveContents[contentType];

  const handleModalClose = () => {
    onClose();
  };

  const handleContentTypeChange = (type: keyof SaveContents) => {
    setContentType(type);
  };

  const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const content = e.target.value;
    if (content.length <= 3000) {
      setSaveContents((prevSaveContents) => ({
        ...prevSaveContents,
        [contentType]: content,
      }));
    }
  };

  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
  };

  const dateValue = (startDate: any, endDate: any, isAllDay: boolean) => {
    console.log(1, startDate.toISOString());

    startDate = new Date(
      startDate.getTime() - startDate.getTimezoneOffset() * 60000,
    ); // 시작 날짜의 시간대 오프셋 적용
    endDate = new Date(endDate.getTime() - endDate.getTimezoneOffset() * 60000); // 종료 날짜의 시간대 오프셋 적용

    setDate((prevDate) => ({
      ...prevDate,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
    }));
    setParentsIsAllDay(isAllDay);
  };

  const handleChangeImg = (e: any) => {
    const files = e.target.files;
    const newFiles: File[] = [];
    const newFileNames: string[] = [];
    if (files) {
      for (let i = 0; i < files.length; i++) {
        newFiles.push(files[i]);
        newFileNames.push(files[i].name);
        formData.append('classLogImages', files[i]);
      }
      setImgUrl((prevFiles) => [...prevFiles, ...newFiles]);
      setFileName((prevFileNames) => [...prevFileNames, ...newFileNames]);
    }
  };

  const handleClickSubmit = async () => {
    if (scheduleId) {
      try {
        const logData = {
          title: title,
          startDate: date.startDate,
          endDate: date.endDate,
          plan: saveContents.학습계획,
          classContents: saveContents.수업내용,
          submission: saveContents.제출과제,
          magnitude: saveContents.진도표,
          isAllDay: parentsIsAllDay,
        };

        const jsonDataTypeValue = new Blob([JSON.stringify(logData)], {
          type: 'application/json',
        });
        formData.append('classLogRequestDto', jsonDataTypeValue);

        const accessToken = localStorage.getItem('accessToken');

        await axios.post(
          `https://j9972.kr/tnote/classLog/${scheduleId}`,
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
        handleModalClose();
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
  // 수정이 필요한 부분
  useEffect(() => {
    if (logId) {
      getClassLogDetailData(String(logId))
        .then((response) => {
          console.log(2, response.data);
          const data = response.data;
          setTitle(data.title);
          setDate((prevDate) => ({
            ...prevDate,
            startDate: data.startDate,
            endDate: data.endDate,
          }));
          setSaveContents({
            학습계획: data.plan,
            수업내용: data.classContents,
            제출과제: data.submission,
            진도표: data.magnitude,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [logId]);

  return (
    <ReactModal
      isOpen={isOpen}
      ariaHideApp={false}
      style={writeFormCustomStyles}
    >
      <>
        <WriteDropdown
          label="학급일지"
          options={['업무일지', '상담기록', '학생 관찰 일지']}
          onClickDropdownOpenModal={handleClickOpenModal}
          closeWriteModal={handleModalClose}
        />
        <WritingModalTop
          titleLabel={'제목'}
          dateLabel={'기간'}
          onTitleChange={handleTitleChange}
          onStartDateChange={dateValue}
        />
        <SContentWrap>
          <SType>
            <STypeBtn
              selected={contentType === '학습계획'}
              onClick={() => handleContentTypeChange('학습계획')}
            >
              학습계획
            </STypeBtn>
            <STypeBtn
              selected={contentType === '수업내용'}
              onClick={() => handleContentTypeChange('수업내용')}
            >
              수업내용
            </STypeBtn>
            <STypeBtn
              selected={contentType === '제출과제'}
              onClick={() => handleContentTypeChange('제출과제')}
            >
              제출과제
            </STypeBtn>
            <STypeBtn
              selected={contentType === '진도표'}
              onClick={() => handleContentTypeChange('진도표')}
            >
              진도표
            </STypeBtn>
            <SBorderBottom></SBorderBottom>
          </SType>
          <SContentLine>
            <SContentIc>
              <IcPen />
              <SContent>
                내용
                <span>*</span>
              </SContent>
            </SContentIc>
            <SContentLength>
              ({saveContents[contentType].length} / 3000)
            </SContentLength>
          </SContentLine>
          <STextarea
            placeholder="텍스트를 입력해주세요"
            value={saveContents[contentType]}
            onChange={handleContentChange}
          />
        </SContentWrap>
        <FileUpload
          fileName={fileName}
          handleChangeImg={handleChangeImg}
          inputId="file"
        />
        <SLogsSubmitBtn onClick={handleClickSubmit} disabled={!isFormValid}>
          등록
        </SLogsSubmitBtn>
      </>
    </ReactModal>
  );
};

export default ClassLogModal;
