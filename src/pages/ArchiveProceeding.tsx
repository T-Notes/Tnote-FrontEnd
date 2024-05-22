import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import { IcGoBack, IcImageClip } from '../assets/icons';
import ArchiveContent from '../components/Archive/ArchiveContent';
import WorkLogModal from '../components/Write/WorkLogModal';
import { formatDate } from '../utils/formatDate';
import instanceAxios from '../utils/InstanceAxios';
import { getProceedingDetailData } from '../utils/lib/api';
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
interface Proceeding {
  title: string;
  workContents: string;
  startDate: string;
  endDate: string;
  proceedingImageUrls: File[];
}

const ArchiveProceeding = () => {
  const { logId, scheduleId } = useParams();

  const navigate = useNavigate();
  const [proceedingLogData, setProceedingLogData] = useState<Proceeding>({
    title: '',
    workContents: '',
    startDate: '',
    endDate: '',
    proceedingImageUrls: [],
  });
  const { openModal } = useModals();
  const isEdit = true;

  const handleClickEdit = () => {
    openModal(WorkLogModal, { scheduleId, logId, isEdit });
  };

  useEffect(() => {
    const getDetailData = async () => {
      const res = await getProceedingDetailData(logId);
      const data = res.data;
      console.log(data);

      setProceedingLogData({
        title: data.title,
        workContents: data.workContents,
        startDate: data.startDate,
        endDate: data.endDate,

        proceedingImageUrls: data.images,
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
        instanceAxios.delete(`/tnote/proceeding/${logId}`);
        Swal.fire('삭제가 완료되었습니다.');
        setTimeout(() => {
          navigate(`/archiveSemesterDetail/${scheduleId}`);
        }, 100);
      }
    });
  };
  return (
    <SArchiveClassLogWrapper>
      <SArchiveClassLog>
        <SArchiveTitle>
          <IcGoBack className="pointer" onClick={() => navigate(-1)} />
          <STitle>업무일지</STitle>
        </SArchiveTitle>
        <STitleAndDate>
          <STitleAndDateText>
            제목: <div>{`${proceedingLogData.title}`}</div>
          </STitleAndDateText>
          <SDate>{`${formatDate(proceedingLogData.startDate)} ~ ${formatDate(
            proceedingLogData.endDate,
          )}`}</SDate>
        </STitleAndDate>
        <STextareaContainer>
          <ArchiveContent
            label="업무일지"
            contentValue={proceedingLogData.workContents}
            isFile={false}
          />
          <SLabel>첨부파일</SLabel>
          <SFileBox>
            {proceedingLogData.proceedingImageUrls.length > 0 ? (
              <>
                {proceedingLogData.proceedingImageUrls.map(
                  (file: any, index: number) => (
                    <SImage key={index}>
                      <SClipIcon>
                        <IcImageClip />
                      </SClipIcon>
                      <div>{file.originalFileName}</div>
                    </SImage>
                  ),
                )}
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
  );
};

export default ArchiveProceeding;
