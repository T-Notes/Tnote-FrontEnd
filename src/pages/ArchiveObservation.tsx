import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { IcGoBack } from '../assets/icons';
import WorkLogModal from '../components/Write/WorkLogModal';
import EditObservationModal from '../components/WriteEdit/EditObservationModal';
import EditProceedingModal from '../components/WriteEdit/EditProceedingModal';
import { getObservationDetailData } from '../utils/lib/api';
import ModalPortal from '../utils/ModalPortal';

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
  font-size: 20px;
  font-weight: 600;
`;
const SDate = styled.div`
  margin-left: auto;
  font-size: 16px;
  font-weight: 500;
`;
const SLabel = styled.label`
  font-size: 17px;
  font-weight: 600;
  padding-bottom: 10px;
`;
const STextareaContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const STextarea = styled.textarea`
  height: 130px;
  width: 100%;
  color: #a6a6a6;
  overflow-y: scroll;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #a6a6a6;
  background: #ffff;
  margin-bottom: 15px;
  margin-bottom: 30px;
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

interface Proceeding {
  studentName: string;
  guidance: string;
  observationContents: string;
  startDate: string;
  endDate: string;
}

const ArchiveObservation = () => {
  const { logId } = useParams();
  const navigate = useNavigate();
  const [observationLogData, setObservationLogData] = useState<Proceeding>({
    studentName: '',
    guidance: '',
    observationContents: '',
    startDate: '',
    endDate: '',
  });
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const handleClickEdit = () => {
    setIsEdit((prev) => !prev);
  };
  const [reload, setReload] = useState<boolean>(false);

  useEffect(() => {
    const getDetailData = async () => {
      const res = await getObservationDetailData(logId);
      setObservationLogData({
        studentName: res.data.studentName,
        guidance: res.data.guidance,
        observationContents: res.data.observationContents,
        startDate: res.data.startDate.slice(0, 10),
        endDate: res.data.endDate.slice(0, 10),
      });
      console.log(res.data);
    };
    getDetailData();
  }, []);
  return (
    <>
      <SArchiveClassLogWrapper>
        <SArchiveClassLog>
          <SArchiveTitle>
            <IcGoBack className="pointer" onClick={() => navigate(-1)} />
            <STitle>학생 관찰 기록</STitle>
          </SArchiveTitle>
          <STitleAndDate>
            <STitleAndDateText>{`${observationLogData.studentName}`}</STitleAndDateText>
            <SDate>{`${observationLogData.startDate} ~ ${observationLogData.endDate}`}</SDate>
          </STitleAndDate>
          <STextareaContainer>
            <SLabel>관찰내용</SLabel>
            <STextarea
              readOnly
              defaultValue={observationLogData.observationContents}
            />
            <SLabel>해석 및 지도방안</SLabel>
            <STextarea readOnly defaultValue={observationLogData.guidance} />
          </STextareaContainer>
          <SButtons>
            <SDelete>삭제</SDelete>
            <SEdit onClick={handleClickEdit}>수정</SEdit>
          </SButtons>
        </SArchiveClassLog>
        <ModalPortal>
          {isEdit && (
            <EditObservationModal
              onClose={handleClickEdit}
              logId={logId}
              setReload={setReload}
            />
          )}
        </ModalPortal>
      </SArchiveClassLogWrapper>
    </>
  );
};

export default ArchiveObservation;
