import axios from 'axios';
import { ChangeEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { IcClip, IcMap, IcPen } from '../../assets/icons';
import { createWorkLog, getProceedingDetailData } from '../../utils/lib/api';
import ModalPortal from '../../utils/ModalPortal';
import { Button } from '../common/styled/Button';
import {
  ModalBackground,
  ModalLayout,
  ModalNoBlackBackground,
} from '../common/styled/ModalLayout';
import WriteDatePicker from '../Write/WriteDatePicker';
import WritingModalTop from '../Write/WriteModalTop';
import EditModalTitleAndDate from './EditModalTitleAndDate';
import EditWriteModalHeader from './EditWriteModalHeader';

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
  margin-bottom: 30px;
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

const SPlaceInput = styled.input`
  ${({ theme }) => theme.fonts.caption3}
  border: none;
  /* padding-left: 10px; */
  border-bottom: 1px solid #e8e8e8;
  width: 450px;
  &::placeholder {
    color: #a6a6a6; /* placeholder의 색상 변경 */
  }

  cursor: pointer;
  &:focus {
    border-bottom: 1px solid #632cfa; /* 포커스가 있을 때 보라색으로 변경 */
  }
`;
const SPlaceLength = styled.div`
  padding-left: 10px;
  padding-right: 10px;
  flex-shrink: 0;
  ${({ theme }) => theme.fonts.caption4}
  color: #A6A6A6;
  /* 포커스가 있을 때 색상 변경 */
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
  /* height: 300px; */
  overflow-y: scroll;
`;
interface Edit {
  onClose: () => void;
  logId: string | undefined;
  setReload: React.Dispatch<React.SetStateAction<boolean>>;
}
interface Proceeding {
  title: string;
  workContents: string;
  startDate: string;
  endDate: string;
  location: string;
  proceedingImageUrls: string[];
}
const EditProceedingModal = ({ onClose, logId, setReload }: Edit) => {
  const [parentsIsAllDay, setParentsIsAllDay] = useState<boolean>(false);
  const [imgUrl, setImgUrl] = useState<File>();
  const formData = new FormData();
  const [proceedingData, setProceedingData] = useState<Proceeding>({
    title: '',
    workContents: '',
    startDate: '',
    endDate: '',
    location: '',
    proceedingImageUrls: [],
  });

  const handleChangeImg = (e: any) => {
    const file = e.target.files[0];
    console.log('file', file);
    setImgUrl(file);
    formData.append('classLogImages', file);
  };

  const handleTitleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setProceedingData((prev) => ({ ...prev, title: newTitle }));
  };
  // 자식 컴포넌트에게서 기간 값 가져오기
  const dateValue = (startDate: any, endDate: any, isAllDay: boolean) => {
    setProceedingData((prev) => ({
      ...prev,
      startDate: startDate,
      endDate: endDate,
    }));
    setParentsIsAllDay(isAllDay);
  };

  const handlePlaceInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setProceedingData((prev) => ({ ...prev, location: newTitle }));
  };

  const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setProceedingData((prev) => ({ ...prev, workContents: e.target.value }));
  };

  const handleClickEdit = async () => {
    try {
      const updateLogData = {
        title: proceedingData.title,
        startDate: proceedingData.startDate,
        endDate: proceedingData.endDate,
        location: proceedingData.location,
        workContents: proceedingData.workContents,
        isAllDay: parentsIsAllDay, // 종일 버튼 로직 추가하기
      };
      const jsonDataTypeValue = new Blob([JSON.stringify(updateLogData)], {
        type: 'application/json',
      });
      formData.append('updateRequestDto', jsonDataTypeValue);

      if (imgUrl) {
        formData.append('proceedingImages', imgUrl);
      }

      const accessToken = localStorage.getItem('accessToken');

      await axios.patch(`http://j9972.kr/tnote/proceeding/${logId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${accessToken}`,
          accept: 'application/json',
        },
      });
      setReload((prev) => !prev);
      onClose();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const getData = async () => {
      const res = await getProceedingDetailData(logId);
      console.log(res.data);

      setProceedingData({
        title: res.data.title,
        workContents: res.data.workContents,
        startDate: res.data.startDate.slice(0, 10),
        endDate: res.data.endDate.slice(0, 10),
        location: res.data.location,
        proceedingImageUrls: res.data.proceedingImageUrls,
      });
    };
    getData();
  }, []);

  return (
    <ModalBackground>
      <SModalLayout>
        <EditWriteModalHeader label="업무일지" onClose={onClose} />
        <EditModalTitleAndDate
          titleLabel="제목"
          dateLabel="기간"
          onTitleInputChange={handleTitleInputChange}
          title={proceedingData.title.length}
          value={proceedingData.title}
          onDateChange={dateValue}
        />
        <SScroll>
          <SContentWrap>
            <SType>
              <STypeBtn>회의록</STypeBtn>
            </SType>
            <SPlaceContentWrapper>
              <SPlaceContent>
                <SContentIc>
                  <IcMap />
                  <SPlace>
                    장소
                    <span>*</span>
                  </SPlace>
                </SContentIc>
                <SPlaceInput
                  type="text"
                  maxLength={30}
                  placeholder="장소를 입력하세요"
                  value={proceedingData.location}
                  onChange={handlePlaceInputChange}
                ></SPlaceInput>
                <SPlaceLength>
                  ({proceedingData.location.length} / 30)
                </SPlaceLength>
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
                  ({proceedingData.workContents.length} / 3000)
                </SContentLength>
              </SPlaceContent>
            </SPlaceContentWrapper>

            <STextarea
              placeholder="텍스트를 입력해주세요"
              value={proceedingData.workContents}
              onChange={handleContentChange}
            />
          </SContentWrap>
          <SFileWrapper>
            <IcClip />
            <SFileText>파일 첨부</SFileText>

            <SFileUploadInput
              placeholder="2MB 이하의 jpg, png 파일 업로드 가능합니다."
              type="file"
              onChange={handleChangeImg}
            />
            <SUploadBtn>업로드</SUploadBtn>
          </SFileWrapper>
          <SSubmit onClick={handleClickEdit}>등록</SSubmit>
        </SScroll>
      </SModalLayout>
    </ModalBackground>
  );
};

export default EditProceedingModal;
