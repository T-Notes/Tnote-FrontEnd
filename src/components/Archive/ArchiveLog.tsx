import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import { convertUrlToFile } from '../../utils/convertUrlToFile';
import {
  getProceedingDetailData,
  getClassLogDetailData,
  getConsultationDetailData,
  getObservationDetailData,
} from '../../utils/lib/api';
import { formatDate } from '../../utils/formatDate';
import { IcImageClip } from '../../assets/icons';
import { downloadFile } from '../../utils/downloadFile';
import { Textarea } from '../common/styled/Textarea';

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
  const [imgUrl, setImgUrl] = useState<File[]>([]);

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
      const imagePromises = data?.images.map((image: any) => {
        return convertUrlToFile(image.url, image.originalFileName);
      });

      Promise.all(imagePromises).then((files) => {
        setImgUrl((prevFiles: File[]) => [...prevFiles, ...files]);
      });
    }
  }, [data]);

  const handleClickDownloadFile = (file: File) => {
    downloadFile(file);
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
      </SLogContentContainer>
    </div>
  );
}
