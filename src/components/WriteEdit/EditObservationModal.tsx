import axios from 'axios';
import { ChangeEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { IcClip, IcMap, IcPen } from '../../assets/icons';
import { createWorkLog, getObservationDetailData } from '../../utils/lib/api';
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
const SLabel = styled.p`
  padding-left: 10px;
  padding-right: 20px;
  flex-shrink: 0;
  ${({ theme }) => theme.fonts.caption3}
`;
const SPointText = styled.span`
  color: #632cfa;
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

interface Edit {
  onClose: () => void;
  logId: string | undefined;
  setReload: React.Dispatch<React.SetStateAction<boolean>>;
}
interface Observation {
  studentName: string;
  guidance: string;
  observationContents: string;
  startDate: string;
  endDate: string;
  observationImageUrls: string[];
}
const EditObservationModal = ({ onClose, logId, setReload }: Edit) => {
  const [parentsIsAllDay, setParentsIsAllDay] = useState<boolean>(false);
  const [imgUrl, setImgUrl] = useState<File>();
  const formData = new FormData();
  const [observationData, setObservationData] = useState<Observation>({
    studentName: '',
    guidance: '',
    observationContents: '',
    startDate: '',
    endDate: '',

    observationImageUrls: [],
  });
  const handleTitleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setObservationData((prev) => ({ ...prev, studentName: newTitle }));
  };

  const handleChangeValueImg = (e: any) => {
    const file = e.target.files[0];
    setImgUrl(file);
    formData.append('classLogImages', file);
  };
  const handleChangeContentImg = (e: any) => {
    const file = e.target.files[0];
    setImgUrl(file);
    formData.append('classLogImages', file);
  };

  // 자식 컴포넌트에게서 기간 값 가져오기
  const dateValue = (startDate: any, endDate: any, isAllDay: boolean) => {
    setObservationData((prev) => ({
      ...prev,
      startDate: startDate,
      endDate: endDate,
    }));
    setParentsIsAllDay(isAllDay);
  };

  const handleObservationContentChange = (
    e: ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setObservationData((prev) => ({
      ...prev,
      observationContents: e.target.value,
    }));
  };
  const handleTeachingPlanChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setObservationData((prev) => ({ ...prev, guidance: e.target.value }));
  };
  const handleClickEdit = async () => {
    try {
      const updateLogData = {
        studentName: observationData.studentName,
        startDate: observationData.startDate,
        endDate: observationData.endDate,
        observationContents: observationData.observationContents,
        guidance: observationData.guidance,
        isAllDay: parentsIsAllDay, // 종일 버튼 로직 추가하기
      };
      const jsonDataTypeValue = new Blob([JSON.stringify(updateLogData)], {
        type: 'application/json',
      });
      formData.append('observationUpdateRequestDto', jsonDataTypeValue);

      if (imgUrl) {
        formData.append('observationImages', imgUrl);
      }

      const accessToken = localStorage.getItem('accessToken');

      await axios.patch(
        `http://j9972.kr/tnote/observation/${logId}`,
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
      onClose();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const getData = async () => {
      const res = await getObservationDetailData(logId);
      console.log(res.data);

      setObservationData({
        studentName: res.data.studentName,
        observationContents: res.data.observationContents,
        startDate: res.data.startDate.slice(0, 10),
        endDate: res.data.endDate.slice(0, 10),
        guidance: res.data.guidance,
        observationImageUrls: res.data.observationImageUrls,
      });
    };
    getData();
  }, []);
  return (
    <ModalBackground>
      <SModalLayout>
        <EditWriteModalHeader label="학생 관찰 기록" onClose={onClose} />
        <EditModalTitleAndDate
          titleLabel="학생이름"
          dateLabel="날짜"
          onTitleInputChange={handleTitleInputChange}
          title={observationData.studentName.length}
          value={observationData.studentName}
          onDateChange={dateValue}
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
              ( {observationData.observationContents.length}/ 3000)
            </SContentLength>
          </SContentLine>

          <STextarea
            placeholder="텍스트를 입력해주세요"
            value={observationData.observationContents}
            onChange={handleObservationContentChange}
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
          <STeachingPlan>
            <SContentLine>
              <SContentIc>
                <IcPen />
                <SContent>
                  해석 및 지도방안
                  <span>*</span>
                </SContent>
              </SContentIc>
              <SContentLength>
                ({observationData.guidance.length} / 3000)
              </SContentLength>
            </SContentLine>

            <STextarea
              placeholder="텍스트를 입력해주세요"
              value={observationData.guidance}
              onChange={handleTeachingPlanChange}
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
          </STeachingPlan>

          <SSubmit onClick={handleClickEdit}>등록</SSubmit>
        </SScroll>
      </SModalLayout>
    </ModalBackground>
  );
};

export default EditObservationModal;
