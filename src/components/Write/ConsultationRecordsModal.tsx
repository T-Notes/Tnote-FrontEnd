import axios from 'axios';
import { ChangeEvent, useEffect, useState } from 'react';
import ReactModal from 'react-modal';

import styled from 'styled-components';
import Swal from 'sweetalert2';
import { IcPen, IcSmallDatePicker, IcTitle } from '../../assets/icons';
import { convertUrlToFile } from '../../utils/convertUrlToFile';
import handleChangeLogImgFileUpload from '../../utils/handleChangeLogImgFileUpload';

import { getConsultationDetailData } from '../../utils/lib/api';
import useRandomColor from '../../utils/useHooks/useRandomColor';

import FileUpload from '../common/FileUpload';
import { Button } from '../common/styled/Button';
import { writeFormCustomStyles } from '../common/styled/ModalLayout';
import { SLogsSubmitBtn } from '../common/styled/SLogsSubmitBtn';
import { CustomModalProps, DateProps } from './ClassLogModal';

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

const SCounseling = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  width: 100%;
`;
const SCounselingTarget = styled.div`
  padding-left: 10px;
  padding-top: 10px;
`;

const SCounselingCategory = styled(Button)<{ selected: boolean }>`
  background-color: ${(props) => (props.selected ? '#7F51FC' : '#ffff')};
  color: ${(props) => (props.selected ? '#ffff' : '#A6A6A6')};
  border-radius: 35px;
  border: 1px solid #a6a6a6;
  padding-top: 7px;
  padding-bottom: 7px;
  padding-left: 10px;
  padding-right: 10px;
  margin-right: 10px;
`;

const STargetCategory = styled(Button)<{ selected: boolean }>`
  background-color: ${(props) => (props.selected ? '#7F51FC' : '#ffff')};
  color: ${(props) => (props.selected ? '#ffff' : '#A6A6A6')};
  border-radius: 35px;
  border: 1px solid #a6a6a6;
  padding-top: 7px;
  padding-bottom: 7px;
  padding-left: 10px;
  padding-right: 10px;
  margin-right: 10px;
`;

const SCounselingCategoryBox = styled.div`
  display: flex;
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
  border-bottom: 2.5px solid #0000004d;
  margin-bottom: 20px;
`;

const STypeBtn = styled.button`
  padding: 20px 30px;
  ${({ theme }) => theme.fonts.caption3}
`;
const SContentWrap = styled.div`
  padding-left: 20px;
  padding-right: 20px;
  /* border: 1px solid red; */
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
`;
const SCounselingResult = styled.div`
  border: none;
  padding-top: 30px;
  border-top: 1px solid #d5d5d5;
`;
const ConsultationRecordsModal = ({
  isOpen,
  onClose,
  handleClickOpenModal,
  logId,
  scheduleId,
  isEdit,
}: CustomModalProps) => {
  const [title, setTitle] = useState<string>('');
  const [counselingContent, setCounselingContent] = useState<string>('');
  const [counselingResult, setCounselingResult] = useState<string>('');
  const [date, setDate] = useState<DateProps>({
    startDate: new Date(),
    endDate: new Date(),
  });
  const [selectedCounselingButton, setSelectedCounselingButton] =
    useState<string>('');
  const [selectedTargetButton, setSelectedTargetButton] = useState<string>('');
  const [parentsIsAllDay, setParentsIsAllDay] = useState<boolean>(false);
  const [imgUrl, setImgUrl] = useState<File[]>([]);
  const [fileName, setFileName] = useState<string[]>([]);
  const formData = new FormData();
  const getRandomColor = useRandomColor();

  const handleCounselingButtonClick = (buttonName: string) => {
    setSelectedCounselingButton(buttonName);
  };

  const handleTargetButtonClick = (buttonName: string) => {
    setSelectedTargetButton(buttonName);
  };
  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  // 자식 컴포넌트에게서 기간 값 가져오기
  const handleDate = (startDate: Date, endDate: Date, isAllDay: boolean) => {
    setDate({
      startDate: startDate,
      endDate: endDate,
    });
    setParentsIsAllDay(isAllDay);
  };
  const handleCounselingContentChange = (
    e: ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const content = e.target.value;
    if (content.length <= 3000) {
      setCounselingContent(content);
    }
  };
  const handleCounselingResultChange = (
    e: ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const content = e.target.value;
    if (content.length <= 3000) {
      setCounselingResult(content);
    }
  };

  const handleClickSubmit = async () => {
    if (scheduleId) {
      if (isEdit) {
        try {
          const editData = {
            studentName: title,
            startDate: new Date(
              date.startDate.getTime() -
                date.startDate.getTimezoneOffset() * 60000,
            ),
            endDate: new Date(
              date.endDate.getTime() - date.endDate.getTimezoneOffset() * 60000,
            ),
            counselingField: selectedCounselingButton,
            counselingType: selectedTargetButton,
            consultationContents: counselingContent,
            consultationResult: counselingResult,
            isAllDay: parentsIsAllDay,
          };

          // 이미지 파일
          if (imgUrl.length >= 1) {
            for (let i = 0; i < imgUrl.length; i++) {
              formData.append('consultationImages', imgUrl[i]);
            }
          }

          const jsonDataTypeValue = new Blob([JSON.stringify(editData)], {
            type: 'application/json',
          });
          formData.append('requestDto', jsonDataTypeValue);

          const accessToken = localStorage.getItem('accessToken');

          await axios.patch(
            `https://j9972.kr/tnote/consultation/${logId}`,
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
          if ((err = 'Consultation date must be within the schedule dates')) {
            window.alert('학기에 해당하는 날짜만 선택할 수 있습니다.');
          }
        }
      } else {
        try {
          const logData = {
            studentName: title,
            startDate: new Date(
              date.startDate.getTime() -
                date.startDate.getTimezoneOffset() * 60000,
            ),
            endDate: new Date(
              date.endDate.getTime() - date.endDate.getTimezoneOffset() * 60000,
            ),
            counselingField: selectedCounselingButton,
            counselingType: selectedTargetButton,
            consultationContents: counselingContent,
            consultationResult: counselingResult,
            isAllDay: parentsIsAllDay,
            color: getRandomColor(),
          };

          if (!logData.counselingField || !logData.counselingType) {
            Swal.fire({
              title: '입력 에러',
              text: '상담 분야와 상담 대상을 선택해주세요.',
            });
          }

          // 이미지 파일
          if (imgUrl.length >= 1) {
            for (let i = 0; i < imgUrl.length; i++) {
              formData.append('consultationImages', imgUrl[i]);
            }
          }

          const jsonDataTypeValue = new Blob([JSON.stringify(logData)], {
            type: 'application/json',
          });
          formData.append('requestDto', jsonDataTypeValue);

          const accessToken = localStorage.getItem('accessToken');

          await axios.post(
            `https://j9972.kr/tnote/consultation/${scheduleId}`,
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
          if ((err = 'Consultation date must be within the schedule dates')) {
            window.alert('학기에 해당하는 날짜만 선택할 수 있습니다.');
          }
        }
      }
    } else {
      Swal.fire({
        title: '학기가 있어야 합니다.',
        text: '학기 추가 혹은 학기 선택을 먼저 해주십시오.',
      });
    }
  };

  const isFormValid =
    title &&
    date.startDate &&
    date.endDate &&
    selectedCounselingButton &&
    selectedTargetButton &&
    counselingContent;

  useEffect(() => {
    if (logId && isEdit) {
      getConsultationDetailData(String(logId))
        .then((response) => {
          const data = response.data;
          setTitle(data.studentName);
          setImgUrl(data.images);
          setCounselingContent(data.consultationContents);
          setCounselingResult(data.consultationResult);
          setSelectedCounselingButton(data.counselingField);
          setSelectedTargetButton(data.counselingType);
          setDate({
            startDate: new Date(data.startDate),
            endDate: new Date(data.endDate),
          });

          const imagePromises = data.images.map((image: any) => {
            return convertUrlToFile(image.url, image.originalFileName);
          });

          Promise.all(imagePromises)
            .then((files) => {
              setImgUrl((prevFiles) => [...prevFiles, ...files]);
            })
            .catch((error) => {
              console.error('Failed to convert image URLs to files:', error);
            });
        })
        .catch((error) => {
          console.error('Failed to fetch consultation detail:', error);
        });
    }
  }, [logId, isEdit]);

  return (
    <ReactModal
      isOpen={isOpen}
      ariaHideApp={false}
      style={writeFormCustomStyles}
    >
      <WriteDropdown
        label="상담기록"
        options={['학급일지', '업무일지', '학생 관찰 일지']}
        onClickDropdownOpenModal={handleClickOpenModal}
        onClose={onClose}
        isEdit={isEdit}
      />
      <WritingModalTop
        titleLabel={'학생 이름'}
        dateLabel={'상담 날짜'}
        onTitleChange={handleTitleChange}
        onStartDateChange={handleDate}
        title={title}
        onStartDate={date.startDate}
        onEndDate={date.endDate}
      />
      {/* 스크롤 내용 */}
      <SScroll>
        <SCounselingTarget>
          <SCounseling>
            <IcSmallDatePicker />
            <SLabel>
              상담분야
              <SPointText>*</SPointText>
            </SLabel>
            <SCounselingCategoryBox>
              <SCounselingCategory
                selected={selectedCounselingButton === 'FRIENDSHIP'}
                onClick={() => handleCounselingButtonClick('FRIENDSHIP')}
              >
                교우관계
              </SCounselingCategory>
              <SCounselingCategory
                selected={selectedCounselingButton === 'GRADE'}
                onClick={() => handleCounselingButtonClick('GRADE')}
              >
                성적
              </SCounselingCategory>
              <SCounselingCategory
                selected={selectedCounselingButton === 'HOME'}
                onClick={() => handleCounselingButtonClick('HOME')}
              >
                가정
              </SCounselingCategory>
              <SCounselingCategory
                selected={selectedCounselingButton === 'HEALTH'}
                onClick={() => handleCounselingButtonClick('HEALTH')}
              >
                건강
              </SCounselingCategory>
              <SCounselingCategory
                selected={selectedCounselingButton === 'ETC'}
                onClick={() => handleCounselingButtonClick('ETC')}
              >
                기타
              </SCounselingCategory>
            </SCounselingCategoryBox>
          </SCounseling>
          <SCounseling>
            <IcTitle />
            <SLabel>
              대상
              <SPointText>*</SPointText>
            </SLabel>
            <SCounselingCategoryBox>
              <STargetCategory
                selected={selectedTargetButton === 'STUDENT'}
                onClick={() => handleTargetButtonClick('STUDENT')}
              >
                학생
              </STargetCategory>
              <STargetCategory
                selected={selectedTargetButton === 'PATENTS'}
                onClick={() => handleTargetButtonClick('PATENTS')}
              >
                학부모
              </STargetCategory>
            </SCounselingCategoryBox>
          </SCounseling>
        </SCounselingTarget>
        <SContentLine>
          <SContentIc>
            <IcPen />
            <SContent>
              상담 내용
              <span>*</span>
            </SContent>
          </SContentIc>
          <SContentLength>( {counselingContent.length}/ 3000)</SContentLength>
        </SContentLine>

        <STextarea
          placeholder="텍스트를 입력해주세요"
          value={counselingContent}
          onChange={handleCounselingContentChange}
        />
        <SCounselingResult>
          <SContentLine>
            <SContentIc>
              <IcPen />
              <SContent>상담 결과</SContent>
            </SContentIc>
            <SContentLength>({counselingResult.length} / 3000)</SContentLength>
          </SContentLine>

          <STextarea
            placeholder="텍스트를 입력해주세요"
            value={counselingResult}
            onChange={handleCounselingResultChange}
          />
          <FileUpload imgUrl={imgUrl} setImgUrl={setImgUrl} />
        </SCounselingResult>

        <SLogsSubmitBtn onClick={handleClickSubmit} disabled={!isFormValid}>
          등록
        </SLogsSubmitBtn>
      </SScroll>
    </ReactModal>
  );
};

export default ConsultationRecordsModal;
