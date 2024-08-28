import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import { convertUrlToFile } from '../../utils/convertUrlToFile';
import {
  getProceedingDetailData,
  getClassLogDetailData,
  getConsultationDetailData,
  getObservationDetailData,
  getPlanDetailData,
} from '../../utils/lib/api';
import { formatDate } from '../../utils/formatDate';
import { IcGrayMap, IcImageClip } from '../../assets/icons';
import { downloadFile } from '../../utils/downloadFile';
import { Textarea } from '../common/styled/Textarea';
import { useModals } from '../../utils/useHooks/useModals';
import ClassLogModal from '../Write/ClassLogModal';
import { useParams } from 'react-router-dom';
import WorkLogModal from '../Write/WorkLogModal';
import ConsultationRecordsModal from '../Write/ConsultationRecordsModal';
import StudentRecordsModal from '../Write/StudentRecordsModal';
import ScheduleLogModal from '../Write/ScheduleLogModal';

const STitleAndDate = styled.div`
  margin-top: 20px;
  margin-bottom: 40px;
  display: flex;
  align-items: center;

  @media (min-width: 1024px) and (max-width: 1200px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;
const STitle = styled.p`
  display: flex;
  align-items: center;
  font-family: Pretendard;
  font-size: 28px;
  font-weight: 600;
  line-height: 38px;
  text-align: left;

  @media (max-width: 1023px) {
    font-size: 22px;
  }
  @media (max-width: 767px) {
    font-size: 20px;
  }
`;
const SDate = styled.p`
  margin-left: auto;
  font-family: Pretendard;
  font-size: 20px;
  font-weight: 500;
  line-height: 23.87px;
  text-align: left;

  @media (max-width: 1023px) {
    font-size: 16px;
  }
  @media (max-width: 767px) {
    font-size: 14px;
  }

  @media (min-width: 1024px) and (max-width: 1200px) {
    flex-direction: column;
    align-items: flex-start;
    margin-left: 0px;
    margin-top: 16px;
  }
`;
const SLabel = styled.label`
  font-family: Pretendard;
  font-size: 22px;
  font-weight: 600;
  line-height: 28.64px;
  text-align: left;

  @media (max-width: 1023px) {
    font-size: 20px;
  }
  @media (max-width: 767px) {
    font-size: 16px;
  }
`;
const SFileBox = styled.div`
  display: flex;
  min-height: 73px;
  width: 100%;
  flex-wrap: wrap;
  color: #a6a6a6;
  padding-top: 17px;
  padding-bottom: 17px;
  padding-left: 10px;
  border-radius: 8px;
  border: 1px solid #a6a6a6;
  background: #ffff;
  margin-top: 16px;
  margin-bottom: 30px;
  font-size: 14px;
  gap: 10px;

  & > div {
    max-width: calc(33.33% - 10px);
    flex: 1 1 auto;
  }
`;
const SInput = styled.input`
  display: flex;
  min-height: 73px;
  width: 100%;
  flex-wrap: wrap;
  color: #a6a6a6;
  padding-top: 17px;
  padding-bottom: 17px;
  padding-left: 10px;
  border-radius: 8px;
  border: 1px solid #a6a6a6;
  background: #ffff;
  margin-top: 16px;
  margin-bottom: 30px;
  font-size: 14px;
  gap: 10px;
`;
const SLocation = styled.div`
  //styleName: Font/Caption;
  font-family: Pretendard;
  font-size: 15px;
  font-weight: 500;
  line-height: 17.9px;
  text-align: left;

  display: flex;
  align-items: center;
  min-height: 73px;
  width: 100%;
  flex-wrap: wrap;
  color: #a6a6a6;
  padding-top: 17px;
  padding-bottom: 17px;
  padding-left: 10px;
  border-radius: 8px;
  border: 1px solid #a6a6a6;
  background: #ffff;
  margin-top: 16px;
  margin-bottom: 30px;
  font-size: 14px;
  gap: 10px;
  > p {
  }
`;
const SLocationItem = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 10px 8px 10px;
  gap: 10px;
  border-radius: 50px;
  opacity: 0px;
  background-color: #e8e8e8;
`;
const SParticipants = styled(SLocation)`
  //styleName: Font/Web_Title_3;
  font-family: Pretendard;
  font-size: 20px;
  font-weight: 500;
  line-height: 23.87px;
  text-align: left;

  color: #000000;
`;
const SImage = styled.div`
  display: flex;

  text-overflow: ellipsis;
  overflow: hidden;
  white-space: normal;
  align-items: center;
  padding: 10px;
  border-radius: 50px;
  background-color: #e8e8e8;
  color: #a6a6a6;
`;
const SClipIcon = styled.div`
  margin-right: 5px;
`;
const SLogContentContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const SEdit = styled.button`
  width: 110px;
  margin-left: auto;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 18px;
  padding-bottom: 18px;
  background-color: #632cfa;
  color: white;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 60px;
`;

interface LogTypeProps {
  id: string | undefined;
  type: string;
}
interface Proceeding {
  title: string;
  workContents: string;
  startDate: string;
  endDate: string;
  proceedingImageUrls: File[];
}

export default function ArchiveLog({ type, id }: LogTypeProps) {
  const { scheduleId, logId } = useParams();
  const [imgUrl, setImgUrl] = useState<File[]>([]);
  const { openModal } = useModals();
  const queryFn = (() => {
    switch (type) {
      case 'CLASS_LOG':
        return getClassLogDetailData;
      case 'PROCEEDING':
        return getProceedingDetailData;
      case 'CONSULTATION':
        return getConsultationDetailData;
      case 'OBSERVATION':
        return getObservationDetailData;
      case 'PLAN':
        return getPlanDetailData;
      default:
        throw new Error('Unknown type');
    }
  })();

  const { data } = useQuery({
    queryKey: [type, id || ''],
    queryFn,
  });
  useEffect(() => {
    if (data) {
      if (type === 'PLAN') {
        const imagePromises = data?.planImageList.map((image: any) => {
          return convertUrlToFile(image.planImageUrl, image.name);
        });

        Promise.all(imagePromises).then((files) => {
          setImgUrl((prevFiles: File[]) => [...prevFiles, ...files]);
        });
      }
      if (type === 'CLASS_LOG') {
        const imagePromises = data?.classLogImages.map((image: any) => {
          return convertUrlToFile(image.classLogImageUrl, image.name);
        });

        Promise.all(imagePromises).then((files) => {
          setImgUrl((prevFiles: File[]) => [...prevFiles, ...files]);
        });
      }
      if (type === 'PROCEEDING') {
        const imagePromises = data?.proceedingImages.map((image: any) => {
          return convertUrlToFile(image.proceedingImageUrl, image.name);
        });

        Promise.all(imagePromises).then((files) => {
          setImgUrl((prevFiles: File[]) => [...prevFiles, ...files]);
        });
      }
      if (type === 'OBSERVATION') {
        const imagePromises = data?.images.map((image: any) => {
          return convertUrlToFile(image.observationImageUrl, image.name);
        });

        Promise.all(imagePromises).then((files) => {
          setImgUrl((prevFiles: File[]) => [...prevFiles, ...files]);
        });
      }
      if (type === 'CONSULTATION') {
        const imagePromises = data?.images.map((image: any) => {
          return convertUrlToFile(image.url, image.originalFileName);
        });

        Promise.all(imagePromises).then((files) => {
          setImgUrl((prevFiles: File[]) => [...prevFiles, ...files]);
        });
      }
    }
  }, [data]);

  const handleClickDownloadFile = (file: File) => {
    downloadFile(file);
  };

  const handleClickEditLog = () => {
    if (data) {
      let type = data?.logType;
      switch (type) {
        case 'CLASS_LOG':
          return openModal(ClassLogModal, { logId, scheduleId, isEdit: true });
        case 'PROCEEDING':
          return openModal(WorkLogModal, { logId, scheduleId, isEdit: true });
        case 'CONSULTATION':
          return openModal(ConsultationRecordsModal, {
            logId,
            scheduleId,
            isEdit: true,
          });
        case 'OBSERVATION':
          return openModal(StudentRecordsModal, {
            logId,
            scheduleId,
            isEdit: true,
          });
        case 'PLAN':
          return openModal(ScheduleLogModal, {
            logId,
            scheduleId,
            isEdit: true,
          });
        default:
          throw new Error('Unknown type');
      }
    } else {
      window.alert('작성 먼저 해주세요.');
    }
  };
  return (
    <div>
      <STitleAndDate>
        <STitle>제목: {data?.title}</STitle>
        <SDate>
          {formatDate(data?.startDate)} ~{formatDate(data?.endDate)}
        </SDate>
      </STitleAndDate>
      <SLogContentContainer>
        {data?.logType === 'PLAN' && (
          <>
            <SLabel>내용</SLabel>
            <Textarea logValue={data?.contents} />

            <SLabel>참석자</SLabel>
            <SParticipants>{data?.participants}</SParticipants>

            <SLabel>장소</SLabel>
            <SLocation>
              <SLocationItem>
                <IcGrayMap />
                {data?.location}
              </SLocationItem>
            </SLocation>
          </>
        )}
        {data?.logType === 'CLASS_LOG' && (
          <>
            <SLabel>학급계획</SLabel>
            <Textarea logValue={data?.plan} />

            <SLabel>수업내용</SLabel>
            <Textarea logValue={data?.classContents} />

            <SLabel>제출과제</SLabel>
            <Textarea logValue={data?.submission} />

            <SLabel>진도표</SLabel>
            <Textarea logValue={data?.magnitude} />
          </>
        )}

        {data?.logType === 'PROCEEDING' && (
          <>
            <SLabel>회의록</SLabel>
            <Textarea logValue={data?.workContents} />
          </>
        )}
        {data?.logType === 'CONSULTATION' && (
          <>
            <SLabel>상담내용</SLabel>
            <Textarea logValue={data?.consultationContents} />

            <SLabel>상담결과</SLabel>
            <Textarea logValue={data?.consultationResult} />
          </>
        )}
        {data?.logType === 'OBSERVATION' && (
          <>
            <SLabel>관찰 내용</SLabel>
            <Textarea logValue={data?.observationContents} />

            <SLabel>해석 및 지도방안</SLabel>
            <Textarea logValue={data?.guidance} />
          </>
        )}
        <SLabel>첨부파일</SLabel>
        <SFileBox>
          {imgUrl.length > 0 ? (
            <>
              {imgUrl.map((file: any, index: number) => (
                <SImage key={index}>
                  <SClipIcon>
                    <IcImageClip />
                  </SClipIcon>
                  <p onClick={() => handleClickDownloadFile(file)}>
                    {file.name || file.originalFileName}
                  </p>
                </SImage>
              ))}
            </>
          ) : null}
        </SFileBox>
        <SEdit onClick={handleClickEditLog}>수정</SEdit>
      </SLogContentContainer>
    </div>
  );
}
