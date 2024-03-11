import { useState, ChangeEvent, useEffect } from 'react';
import styled from 'styled-components';
import { useRecoilState, useRecoilValue } from 'recoil';
import { logModalState } from '../../utils/lib/atom';
import WritingModalTop from './WriteModalTop';
import WriteDropdown from './WriteDropdown';
import ModalPortal from '../../utils/ModalPortal';
import {
  ModalBackground,
  ModalLayout,
  ModalNoBlackBackground,
} from '../common/styled/ModalLayout';
import { Button } from '../common/styled/Button';
import { createClassLog } from '../../utils/lib/api';
import { useParams } from 'react-router-dom';
import { IcClip, IcClose, IcPen } from '../../assets/icons';
import axios from 'axios';
// styled //
const SModalLayout = styled(ModalLayout)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 670px;
  /* max-width: 1100px;
  max-height: 80vh; */
  height: 600px;
  /* padding: 30px 40px; */
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
// interface //
interface SaveContents {
  학습계획: string;
  수업내용: string;
  제출과제: string;
  진도표: string;
}
interface CloseProps {
  closeWriteModal: () => void;
  handleClickModal: (openModalContent: string) => void;
}
const ClassLogModal = ({ closeWriteModal, handleClickModal }: CloseProps) => {
  const formData = new FormData();
  const { scheduleId } = useParams();
  const [title, setTitle] = useState<string>(''); //제목 상태
  const [parentsIsAllDay, setParentsIsAllDay] = useState<boolean>(false);
  const [imgUrl, setImgUrl] = useState<File>();

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
    const file = e.target.files[0];
    console.log('file', file);
    setImgUrl(file);
    formData.append('classLogImages', file);
  };

  const handleClickSubmit = async () => {
    try {
      const logData = {
        title: title,
        startDate: date.startDate,
        endDate: date.endDate,
        plan: saveContents.학습계획,
        classContents: saveContents.수업내용,
        submission: saveContents.제출과제,
        magnitude: saveContents.진도표,
        isAllDay: parentsIsAllDay, // 종일 버튼 로직 추가하기
      };

      // formData.append('classLogRequestDto', JSON.stringify(logData));
      const jsonDataTypeValue = new Blob([JSON.stringify(logData)], {
        type: 'application/json',
      });
      formData.append('classLogRequestDto', jsonDataTypeValue);

      if (imgUrl) {
        console.log('imgUrl', imgUrl.name);

        formData.append('classLogImages', imgUrl);
      }

      const accessToken = localStorage.getItem('accessToken');
      console.log('formData:', formData);

      await axios.post(
        `http://j9972.kr/tnote/classLog/${scheduleId}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${accessToken}`,
            accept: 'application/json',
          },
        },
      );
    } catch (err) {
      console.log(err);
    }
  };

  // useEffect(() => {
  //   setYouWantedClose(true);
  // }, []);

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
          <SFileWrapper>
            <IcClip />
            <SFileText>파일 첨부</SFileText>
            <SFileUploadInput
              placeholder="2MB 이하의 jpg, png 파일 업로드 가능합니다."
              type="file"
              // accept="image/*"
              onChange={handleChangeImg}
            />
            <SUploadBtn>업로드</SUploadBtn>
          </SFileWrapper>
          <SSubmit onClick={handleClickSubmit}>등록</SSubmit>
        </SModalLayout>
      </ModalNoBlackBackground>
    </ModalPortal>
  );
};

export default ClassLogModal;
