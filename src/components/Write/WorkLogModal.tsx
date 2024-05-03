import axios from 'axios';
import { ChangeEvent, useEffect, useState } from 'react';
import ReactModal from 'react-modal';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import { IcMap, IcPen } from '../../assets/icons';
import handleDateTimeOffset from '../../utils/handleDateTimeOffset';

import ModalPortal from '../../utils/ModalPortal';
import FileUpload from '../common/FileUpload';
import { Button } from '../common/styled/Button';
import {
  ModalLayout,
  ModalNoBlackBackground,
  writeFormCustomStyles,
} from '../common/styled/ModalLayout';
import { SLogsSubmitBtn } from '../common/styled/SLogsSubmitBtn';
import { CustomModalProps, DateProps } from './ClassLogModal';
import WriteDropdown from './WriteDropdown';
import WritingModalTop from './WriteModalTop';
import { getProceedingDetailData } from '../../utils/lib/api';

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
  margin-bottom: 30px;
`;
const SPlaceContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const SType = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

const STypeBtn = styled.button`
  padding: 20px 30px;
  border-bottom: 2.5px solid #632cfa;
  color: #632cfa;
  ${({ theme }) => theme.fonts.caption3}
`;

const SBorderBottom = styled.div`
  padding-left: 483.7px;
  border-bottom: 2.5px solid #0000004d;
`;
const SContentWrap = styled.div`
  padding-left: 20px;
  padding-right: 20px;
`;
const SContentIc = styled.div`
  display: flex;
  padding-left: 5px;
  align-items: center;
`;
const SContent = styled.div`
  ${({ theme }) => theme.fonts.caption3}
  padding-left: 5px;
  padding-right: 10px;
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

const SPlaceInput = styled.input`
  ${({ theme }) => theme.fonts.caption3}
  border: none;
  border-bottom: 1px solid #e8e8e8;
  width: 450px;
  &::placeholder {
    color: #a6a6a6;
  }
  cursor: pointer;
  &:focus {
    border-bottom: 1px solid #632cfa;
  }
`;
const SPlaceLength = styled.div`
  padding-left: 10px;
  padding-right: 10px;
  flex-shrink: 0;
  ${({ theme }) => theme.fonts.caption4}
  color: #A6A6A6;
  ${SPlaceInput}:focus-within + & {
    color: #632cfa;
  }
`;
const SPlaceContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`;
const SPlace = styled.div`
  padding-left: 5px;
  padding-right: 10px;

  flex-shrink: 0;
  ${({ theme }) => theme.fonts.caption3}

  > span {
    color: #632cfa;
  }
`;

const SScroll = styled.div`
  overflow-y: scroll;
`;
export interface CloseProps {
  closeWriteModal: () => void;
  handleClickDropdownModalOpen: (option: string) => void;
  logId: number;
}
const WorkLogModal = ({
  isOpen,
  onClose,
  handleClickOpenModal,
  logId,
}: CustomModalProps) => {
  const { scheduleId } = useParams();

  const [title, setTitle] = useState<string>('');
  const [place, setPlace] = useState<string>('');
  const [date, setDate] = useState<DateProps>({
    startDate: '',
    endDate: '',
  });
  const [workContents, setWorkContents] = useState<string>('');
  const [parentsIsAllDay, setParentsIsAllDay] = useState<boolean>(false);
  const [imgUrl, setImgUrl] = useState<File[]>([]);
  const [fileName, setFileName] = useState<string[]>([]);

  const formData = new FormData();

  const handleChangeImg = (e: any) => {
    const files = e.target.files;
    const newFiles: File[] = [];
    const newFileNames: string[] = [];
    if (files) {
      for (let i = 0; i < files.length; i++) {
        newFiles.push(files[i]);
        newFileNames.push(files[i].name);
        formData.append('proceedingImages', files[i]);
      }
      setImgUrl((prevFiles) => [...prevFiles, ...newFiles]);
      setFileName((prevFileNames) => [...prevFileNames, ...newFileNames]);
    }
  };
  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleDate = (startDate: Date, endDate: Date, isAllDay: boolean) => {
    const { ISOStartDate, ISOEndDate } = handleDateTimeOffset(
      startDate,
      endDate,
      isAllDay,
    );
    setDate({
      startDate: ISOStartDate,
      endDate: ISOEndDate,
    });
    setParentsIsAllDay(isAllDay);
  };

  const handlePlaceInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setPlace(newTitle);
  };

  const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const content = e.target.value;
    if (content.length <= 3000) {
      setWorkContents(content);
    }
  };

  const handleClickSubmit = async () => {
    if (scheduleId) {
      try {
        const logData = {
          title,
          startDate: date.startDate,
          endDate: date.endDate,
          location: place,
          workContents: workContents,
          isAllDay: parentsIsAllDay,
        };
        const jsonDataTypeValue = new Blob([JSON.stringify(logData)], {
          type: 'application/json',
        });
        formData.append('proceedingRequestDto', jsonDataTypeValue);

        const accessToken = localStorage.getItem('accessToken');

        await axios.post(
          `https://j9972.kr/tnote/proceeding/${scheduleId}`,
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
  const isFormValid = title && date.startDate && date.endDate && workContents;

  useEffect(() => {
    if (logId) {
      getProceedingDetailData(String(logId))
        .then((response) => {
          console.log(2, response.data);
          const data = response.data;
          setTitle(data.title);
          setPlace(data.location);
          setWorkContents(data.workContents);
          setDate({
            startDate: new Date(data.startDate),
            endDate: new Date(data.endDate),
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
        <>
          <WriteDropdown
            label="업무일지"
            options={['학급일지', '상담기록', '학생 관찰 일지']}
            onClickDropdownOpenModal={handleClickOpenModal}
            closeWriteModal={onClose}
          />
          <WritingModalTop
            titleLabel={'제목'}
            dateLabel={'기간'}
            onTitleChange={handleTitleChange}
            onStartDateChange={handleDate}
            title={title}
            onStartDate={date.startDate}
            onEndDate={date.endDate}
          />
          <SScroll>
            <SContentWrap>
              <SType>
                <STypeBtn>회의록</STypeBtn>
                <SBorderBottom></SBorderBottom>
              </SType>
              <SPlaceContentWrapper>
                <SPlaceContent>
                  <SContentIc>
                    <IcMap />
                    <SPlace>장소</SPlace>
                  </SContentIc>
                  <SPlaceInput
                    type="text"
                    maxLength={30}
                    placeholder="장소를 입력하세요"
                    onChange={handlePlaceInputChange}
                  ></SPlaceInput>
                  <SPlaceLength>({place.length} / 30)</SPlaceLength>
                </SPlaceContent>
                <SPlaceContent>
                  <SContentIc>
                    <IcPen />
                    <SContent>
                      내용
                      <span>*</span>
                    </SContent>
                  </SContentIc>
                  <SContentLength>
                    ({workContents.length} / 3000)
                  </SContentLength>
                </SPlaceContent>
              </SPlaceContentWrapper>

              <STextarea
                placeholder="텍스트를 입력해주세요"
                value={workContents}
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
          </SScroll>
        </>
      </>
    </ReactModal>
  );
};

export default WorkLogModal;
