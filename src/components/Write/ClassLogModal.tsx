import { useState, ChangeEvent } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import FileUpload from '../common/FileUpload';
import WritingModalTop from './WriteModalTop';
import WriteDropdown from './WriteDropdown';
import ModalPortal from '../../utils/ModalPortal';
import {
  ModalLayout,
  ModalNoBlackBackground,
} from '../common/styled/ModalLayout';
import { Button } from '../common/styled/Button';
import { useParams } from 'react-router-dom';
import { IcPen } from '../../assets/icons';
import Swal from 'sweetalert2';
import { css } from 'styled-components';
import { SLogsSubmitBtn } from '../common/styled/SLogsSubmitBtn';

// styled //
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
interface CloseProps {
  closeWriteModal: () => void;
  handleClickModal: (openModalContent: string) => void;
  setReload: React.Dispatch<React.SetStateAction<boolean>>;
}
const ClassLogModal = ({
  closeWriteModal,
  handleClickModal,
  setReload,
}: CloseProps) => {
  const formData = new FormData();
  const { scheduleId } = useParams();
  const [title, setTitle] = useState<string>('');
  const [parentsIsAllDay, setParentsIsAllDay] = useState<boolean>(false);
  const [imgUrl, setImgUrl] = useState<File[]>([]);
  const [fileName, setFileName] = useState<string[]>([]);

  const [contentType, setContentType] =
    useState<keyof SaveContents>('학습계획'); //현재 모달에서 어떤 종류의 탭을 입력하고 있는지를 나타낸다.
  const [saveContents, setSaveContents] = useState<SaveContents>({
    학습계획: '',
    수업내용: '',
    제출과제: '',
    진도표: '',
  }); //각 탭의 타입에 따른 입력된 내용을 저장하는 객체
  const [date, setDate] = useState({
    startDate: '',
    endDate: '',
  });

  const handleContentTypeChange = (type: keyof SaveContents) => {
    setContentType(type);
  };

  const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setSaveContents((prevSaveContents) => ({
      ...prevSaveContents,
      [contentType]: e.target.value,
    }));
  };

  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
  };

  const dateValue = (startDate: any, endDate: any, isAllDay: boolean) => {
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
  console.log(2, fileName);
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

        // if (imgUrl) {
        //   formData.append('classLogImages', imgUrl);
        // }

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
        setReload((prev) => !prev);
        closeWriteModal();
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
    title && date.startDate && date.endDate && saveContents[contentType];

  return (
    <ModalPortal>
      <ModalNoBlackBackground>
        <SModalLayout>
          <WriteDropdown
            label="학급일지"
            options={['업무일지', '상담기록', '학생 관찰 일지']}
            handleClickModal={handleClickModal}
            closeWriteModal={closeWriteModal}
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
            {contentType && (
              <>
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
              </>
            )}
          </SContentWrap>
          <FileUpload
            fileName={fileName}
            handleChangeImg={handleChangeImg}
            inputId="file"
          />
          <SLogsSubmitBtn onClick={handleClickSubmit} disabled={!isFormValid}>
            등록
          </SLogsSubmitBtn>
        </SModalLayout>
      </ModalNoBlackBackground>
    </ModalPortal>
  );
};

export default ClassLogModal;
