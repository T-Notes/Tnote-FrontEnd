import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import { IcGoBack, IcImageClip } from '../assets/icons';
import ArchiveContent from '../components/Archive/ArchiveContent';
import ConsultationRecordsModal from '../components/Write/ConsultationRecordsModal';
import { convertUrlToFile } from '../utils/convertUrlToFile';
import { downloadFile } from '../utils/downloadFile';
import { formatDate } from '../utils/formatDate';
import instanceAxios from '../utils/InstanceAxios';
import { getConsultationDetailData } from '../utils/lib/api';

import { useModals } from '../utils/useHooks/useModals';

const SArchiveTitle = styled.div`
  display: flex;
  ${({ theme }) => theme.fonts.h2}
`;
const STitle = styled.h1`
  padding-left: 10px;
`;
const SArchiveClassLogWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 230px;
  right: 300px;
  bottom: 0;
`;
const SArchiveClassLog = styled.div`
  margin-top: 40px;
`;
const STitleAndDate = styled.div`
  margin-top: 30px;
  margin-bottom: 30px;
  display: flex;
  align-items: center;
`;
const STitleAndDateText = styled.div`
  display: flex;
  font-size: 20px;
  font-weight: 600;
  > div {
    padding-left: 5px;
  }
`;
const SDate = styled.div`
  margin-left: auto;
  font-size: 16px;
  font-weight: 500;
`;

const STextareaContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const SDelete = styled.button`
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 10px;
  padding-bottom: 10px;
  background-color: #e8e8e8;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  margin-left: auto;
  margin-right: 20px;
`;

const SEdit = styled.button`
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 10px;
  padding-bottom: 10px;
  background-color: #632cfa;
  color: white;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
`;
const SButtons = styled.div`
  padding-bottom: 50px;
  display: flex;
`;

const SLabel = styled.label`
  font-size: 18px;
  font-weight: 600;
  padding-bottom: 10px;
`;
const SFileBox = styled.div`
  display: flex;
  height: 70px;
  width: 100%;
  color: #a6a6a6;
  overflow-y: scroll;
  padding: 15px;
  border-radius: 8px;
  border: 1px solid #a6a6a6;
  background: #ffff;
  margin-bottom: 30px;
  font-size: 14px;
`;
const SImage = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  border-radius: 50px;
  background-color: #e8e8e8;
  color: #a6a6a6;
  margin-right: 10px;
`;
const SClipIcon = styled.div`
  margin-right: 5px;
`;
interface Consultation {
  studentName: string;
  consultationContents: string;
  consultationResult: string;
  counselingField: string;
  counselingType: string;
  startDate: string;
  endDate: string;
  consultationImageUrls: File[];
}
const ArchiveConsultation = () => {
  const { logId, scheduleId } = useParams();

  const navigate = useNavigate();
  const [consultationLogData, setConsultationLogData] = useState<Consultation>({
    studentName: '',
    consultationContents: '',
    consultationResult: '',
    counselingField: '',
    counselingType: '',
    startDate: '',
    endDate: '',
    consultationImageUrls: [],
  });
  const [imgUrl, setImgUrl] = useState<File[]>([]);
  const { openModal } = useModals();
  const isEdit = true;

  const handleClickEdit = () => {
    openModal(ConsultationRecordsModal, { scheduleId, logId, isEdit });
  };

  useEffect(() => {
    const getDetailData = async () => {
      const res = await getConsultationDetailData(logId);

      setConsultationLogData({
        studentName: res.data.studentName,
        consultationContents: res.data.consultationContents,
        consultationResult: res.data.consultationResult,
        counselingField: res.data.counselingField,
        counselingType: res.data.counselingType,
        startDate: res.data.startDate.slice(0, 10),
        endDate: res.data.endDate.slice(0, 10),
        consultationImageUrls: res.data.images,
      });

      const imagePromises = res.data.images.map((image: any) => {
        return convertUrlToFile(image.url, image.originalFileName);
      });

      Promise.all(imagePromises).then((files) => {
        setImgUrl((prevFiles: File[]) => [...prevFiles, ...files]);
      });
    };
    getDetailData();
  }, []);

  const handleDelete = async () => {
    await Swal.fire({
      title: '일지 삭제',
      text: '해당 일지내용을 삭제하시겠습니까?',

      showCancelButton: true,
      confirmButtonText: '삭제',
      cancelButtonText: '취소',
    }).then((result) => {
      if (result.isConfirmed) {
        instanceAxios.delete(`/tnote/consultation/${logId}`);
        Swal.fire('삭제가 완료되었습니다.');
        setTimeout(() => {
          navigate(`/archiveSemesterDetail/${scheduleId}`);
        }, 100);
      }
    });
  };

  const handleClickDownloadFile = (file: File) => {
    downloadFile(file);
  };
  return (
    <>
      <SArchiveClassLogWrapper>
        <SArchiveClassLog>
          <SArchiveTitle>
            <IcGoBack className="pointer" onClick={() => navigate(-1)} />
            <STitle>상담기록</STitle>
          </SArchiveTitle>
          <STitleAndDate>
            <STitleAndDateText>
              제목:
              <div>{`${consultationLogData.studentName}`}</div>
            </STitleAndDateText>
            <SDate>{`${formatDate(
              consultationLogData.startDate,
            )} ~ ${formatDate(consultationLogData.endDate)}`}</SDate>
          </STitleAndDate>
          <STextareaContainer>
            <ArchiveContent
              label="상담내용"
              contentValue={consultationLogData.consultationContents}
              isFile={false}
            />
            <ArchiveContent
              label="상담결과"
              contentValue={consultationLogData.consultationResult}
              isFile={false}
            />
            <SLabel>첨부파일</SLabel>
            <SFileBox>
              {imgUrl.length > 0 ? (
                <>
                  {imgUrl.map((file: any, index: number) => (
                    <SImage key={index}>
                      <SClipIcon>
                        <IcImageClip />
                      </SClipIcon>
                      <div onClick={() => handleClickDownloadFile(file)}>
                        {file.name || file.originalFileName}
                      </div>
                    </SImage>
                  ))}
                </>
              ) : null}
            </SFileBox>
          </STextareaContainer>
          <SButtons>
            <SDelete onClick={handleDelete}>삭제</SDelete>
            <SEdit onClick={handleClickEdit}>수정</SEdit>
          </SButtons>
        </SArchiveClassLog>
      </SArchiveClassLogWrapper>
    </>
  );
};

export default ArchiveConsultation;
