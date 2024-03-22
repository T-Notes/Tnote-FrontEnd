import axios from 'axios';
import { ChangeEvent, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import { IcClip, IcPen, IcSmallDatePicker, IcTitle } from '../../assets/icons';
import { createConsultationRecords } from '../../utils/lib/api';
import ModalPortal from '../../utils/ModalPortal';
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
`;
const SCounselingResult = styled.div`
  border: none;
  padding-top: 30px;
  border-top: 1px solid #d5d5d5;
`;
const ConsultationRecordsModal = ({
  closeWriteModal,
  handleClickModal,
  setReload,
}: CloseProps) => {
  const { scheduleId } = useParams();

  const [title, setTitle] = useState<string>(''); //제목 상태
  const [counselingContent, setCounselingContent] = useState<string>('');
  const [counselingResult, setCounselingResult] = useState<string>('');
  const [date, setDate] = useState({
    startDate: '',
    endDate: '',
  });
  const [selectedCounselingButton, setSelectedCounselingButton] =
    useState<string>('');
  const [selectedTargetButton, setSelectedTargetButton] = useState<string>('');
  const [parentsIsAllDay, setParentsIsAllDay] = useState<boolean>(false);
  const [imgUrl, setImgUrl] = useState<File>();
  const formData = new FormData();

  const handleChangeContentImg = (e: any) => {
    const file = e.target.files[0];

    setImgUrl(file);
    formData.append('consultationImages', file);
  };
  // consutationImages
  // consultationImages
  const handleChangeValueImg = (e: any) => {
    const file = e.target.files[0];

    setImgUrl(file);
    formData.append('consultationImages', file);
  };

  const handleCounselingButtonClick = (buttonName: string) => {
    console.log(1, buttonName); // 영어로 값이 들어옴

    setSelectedCounselingButton(buttonName);
  };

  const handleTargetButtonClick = (buttonName: string) => {
    setSelectedTargetButton(buttonName);
  };
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
  const handleCounselingContentChange = (
    e: ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setCounselingContent(e.target.value);
  };
  const handleCounselingResultChange = (
    e: ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setCounselingResult(e.target.value);
  };

  const handleClickSubmit = async () => {
    try {
      const logData = {
        studentName: title,
        startDate: date.startDate,
        endDate: date.endDate,
        counselingField: selectedCounselingButton,
        counselingType: selectedTargetButton,
        consultationContents: counselingContent,
        consultationResult: counselingResult,
        isAllDay: parentsIsAllDay, // 종일 버튼 로직 추가하기
      };

      if (!logData.counselingField || !logData.counselingType) {
        Swal.fire({
          title: '입력 에러',
          text: '상담 분야와 상담 대상을 선택해주세요.',
        });
      }
      const jsonDataTypeValue = new Blob([JSON.stringify(logData)], {
        type: 'application/json',
      });
      formData.append('requestDto', jsonDataTypeValue);

      if (imgUrl) {
        formData.append('consultationImages', imgUrl);
      }

      const accessToken = localStorage.getItem('accessToken');

      await axios.post(
        `http://j9972.kr/tnote/consultation/${scheduleId}`,
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
  };
  return (
    <ModalPortal>
      <ModalNoBlackBackground>
        <SModalLayout>
          <WriteDropdown
            label="상담기록"
            options={['학급일지', '업무일지', '학생 관찰 일지']}
            handleClickModal={handleClickModal}
            closeWriteModal={closeWriteModal}
          />
          <WritingModalTop
            titleLabel={'학생 이름'}
            dateLabel={'상담 날짜'}
            onTitleChange={handleTitleChange}
            onStartDateChange={dateValue}
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
              <SContentLength>
                ( {counselingContent.length}/ 3000)
              </SContentLength>
            </SContentLine>

            <STextarea
              placeholder="텍스트를 입력해주세요"
              value={counselingContent}
              onChange={handleCounselingContentChange}
            />
            <SFileWrapper>
              <IcClip />
              <SFileText>파일 첨부</SFileText>

              <SFileUploadInput
                placeholder="2MB 이하의 jpg, png 파일 업로드 가능합니다."
                type="file"
                onChange={handleChangeContentImg}
              />
              <SUploadBtn>업로드</SUploadBtn>
            </SFileWrapper>
            <SCounselingResult>
              <SContentLine>
                <SContentIc>
                  <IcPen />
                  <SContent>
                    상담 결과
                    <span>*</span>
                  </SContent>
                </SContentIc>
                <SContentLength>
                  ({counselingResult.length} / 3000)
                </SContentLength>
              </SContentLine>

              <STextarea
                placeholder="텍스트를 입력해주세요"
                value={counselingResult}
                onChange={handleCounselingResultChange}
              />
              <SFileWrapper>
                <IcClip />
                <SFileText>파일 첨부</SFileText>

                <SFileUploadInput
                  placeholder="2MB 이하의 jpg, png 파일 업로드 가능합니다."
                  type="file"
                  onChange={handleChangeValueImg}
                />
                <SUploadBtn>업로드</SUploadBtn>
              </SFileWrapper>
            </SCounselingResult>

            <SSubmit onClick={handleClickSubmit}>등록</SSubmit>
          </SScroll>
        </SModalLayout>
      </ModalNoBlackBackground>
    </ModalPortal>
  );
};

export default ConsultationRecordsModal;
