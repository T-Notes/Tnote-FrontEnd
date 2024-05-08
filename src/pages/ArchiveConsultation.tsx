import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import { IcGoBack } from '../assets/icons';
import WorkLogModal from '../components/Write/WorkLogModal';
import EditConsultationModal from '../components/WriteEdit/EditConsultationModal';
import EditProceedingModal from '../components/WriteEdit/EditProceedingModal';
import { formatDate } from '../utils/formatDate';
import instanceAxios from '../utils/InstanceAxios';
import { getConsultationDetailData } from '../utils/lib/api';
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
interface Consultation {
  studentName: string;
  consultationContents: string;
  consultationResult: string;
  counselingField: string;
  counselingType: string;
  startDate: string;
  endDate: string;
}
const ArchiveConsultation = () => {
  const { logId } = useParams();
  const navigate = useNavigate();
  const [consultationLogData, setConsultationLogData] = useState<Consultation>({
    studentName: '',
    consultationContents: '',
    consultationResult: '',
    counselingField: '',
    counselingType: '',
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
      const res = await getConsultationDetailData(logId);
      setConsultationLogData({
        studentName: res.data.studentName,
        consultationContents: res.data.consultationContents,
        consultationResult: res.data.consultationResult,
        counselingField: res.data.counselingField,
        counselingType: res.data.counselingType,
        startDate: res.data.startDate.slice(0, 10),
        endDate: res.data.endDate.slice(0, 10),
      });
    };
    getDetailData();
  }, [reload]);

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

        navigate(-1);
      }
    });
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
            <SLabel>상담내용</SLabel>
            <STextarea
              readOnly
              defaultValue={consultationLogData.consultationContents}
            />
            <SLabel>상담결과</SLabel>
            <STextarea
              readOnly
              defaultValue={consultationLogData.consultationResult}
            />
          </STextareaContainer>
          <SButtons>
            <SDelete onClick={handleDelete}>삭제</SDelete>
            <SEdit onClick={handleClickEdit}>수정</SEdit>
          </SButtons>
        </SArchiveClassLog>
        <ModalPortal>
          {isEdit && (
            <EditConsultationModal
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

export default ArchiveConsultation;
