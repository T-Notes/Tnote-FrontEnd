import { useState, ChangeEvent, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import FileUpload from '../common/FileUpload';
import WritingModalTop from './WriteModalTop';
import WriteDropdown from './WriteDropdown';
import { writeFormCustomStyles } from '../common/styled/ModalLayout';
import { IcPen } from '../../assets/icons';
import Swal from 'sweetalert2';
import { SLogsSubmitBtn } from '../common/styled/SLogsSubmitBtn';
import ReactModal from 'react-modal';
import { getClassLogDetailData, patchClassLog } from '../../utils/lib/api';
import handleChangeLogImgFileUpload from '../../utils/handleChangeLogImgFileUpload';
import useRandomColor from '../../utils/useHooks/useRandomColor';

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
  scheduleId: number;
  isEdit: boolean;
}
export interface DateProps {
  startDate: Date;
  endDate: Date;
}
const ClassLogModal = ({
  isOpen,
  onClose,
  handleClickOpenModal,
  logId,
  scheduleId,
  isEdit,
}: CustomModalProps) => {
  const formData = new FormData();
  const [title, setTitle] = useState<string>('');
  const [parentsIsAllDay, setParentsIsAllDay] = useState<boolean>(false);
  const [imgUrl, setImgUrl] = useState<File[]>([]);
  const [fileName, setFileName] = useState<string[]>([]);
  const getRandomColor = useRandomColor();
  const [contentType, setContentType] =
    useState<keyof SaveContents>('학습계획');

  const [saveContents, setSaveContents] = useState<SaveContents>({
    학습계획: '',
    수업내용: '',
    제출과제: '',
    진도표: '',
  });
  const [date, setDate] = useState<DateProps>({
    startDate: new Date(),
    endDate: new Date(),
  });
  const isFormValid =
    title && date.startDate && date.endDate && saveContents[contentType];

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

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleDate = (startDate: Date, endDate: Date, isAllDay: boolean) => {
    setDate({
      startDate: startDate,
      endDate: endDate,
    });

    setParentsIsAllDay(isAllDay);
  };

  const handleClickSubmit = async () => {
    if (scheduleId) {
      if (isEdit) {
        const editData = {
          title: title,
          startDate: new Date(
            date.startDate.getTime() -
              date.startDate.getTimezoneOffset() * 60000,
          ),
          endDate: new Date(
            date.endDate.getTime() - date.endDate.getTimezoneOffset() * 60000,
          ),
          plan: saveContents.학습계획,
          classContents: saveContents.수업내용,
          submission: saveContents.제출과제,
          magnitude: saveContents.진도표,
          isAllDay: parentsIsAllDay,
        };

        if (imgUrl.length >= 1) {
          for (let i = 0; i < imgUrl.length; i++) {
            formData.append('classLogImages', imgUrl[i]);
          }
        }

        const jsonDataTypeValue = new Blob([JSON.stringify(editData)], {
          type: 'application/json',
        });
        formData.append('classLogUpdateRequestDto', jsonDataTypeValue);

        const accessToken = localStorage.getItem('accessToken');

        await axios.patch(
          `https://j9972.kr/tnote/classLog/${logId}`,
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
      } else {
        try {
          const logData = {
            title: title,
            startDate: new Date(
              date.startDate.getTime() -
                date.startDate.getTimezoneOffset() * 60000,
            ),
            endDate: new Date(
              date.endDate.getTime() - date.endDate.getTimezoneOffset() * 60000,
            ),
            plan: saveContents.학습계획,
            classContents: saveContents.수업내용,
            submission: saveContents.제출과제,
            magnitude: saveContents.진도표,
            isAllDay: parentsIsAllDay,
            color: getRandomColor(),
          };

          // 이미지 파일
          if (imgUrl.length >= 1) {
            for (let i = 0; i < imgUrl.length; i++) {
              formData.append('classLogImages', imgUrl[i]);
            }
          }

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
          onClose();
        } catch (err) {
          console.log(err);
        }
      }
    } else {
      Swal.fire({
        title: '학기가 있어야 합니다.',
        text: '학기 추가 혹은 학기 선택을 먼저 해주십시오.',
      });
    }
  };

  useEffect(() => {
    if (logId) {
      getClassLogDetailData(String(logId))
        .then((response) => {
          const data = response.data;

          setTitle(data.title);

          setDate({
            startDate: new Date(data.startDate),
            endDate: new Date(data.endDate),
          });
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
          onClose={onClose}
          isEdit={isEdit}
        />
        <WritingModalTop
          titleLabel={'제목'}
          title={title}
          dateLabel={'기간'}
          onTitleChange={handleTitleChange}
          onStartDateChange={handleDate}
          onStartDate={date.startDate}
          onEndDate={date.endDate}
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
          handleChangeImg={(e: ChangeEvent<HTMLInputElement>) =>
            handleChangeLogImgFileUpload(e, setImgUrl, setFileName)
          }
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
