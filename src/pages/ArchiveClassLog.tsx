import { result } from 'lodash';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import { IcGoBack } from '../assets/icons';
import EditClassLogModal from '../components/WriteEdit/EditClassLogModal';
import instanceAxios from '../utils/InstanceAxios';
import { getClassLogDetailData } from '../utils/lib/api';
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

interface ClassLog {
  id: number | null;
  title: string;
  startDate: string;
  endDate: string;
  classContents: string;
  magnitude: string;
  plan: string;
  submission: string;
}
// 수정 버튼을 클릭 -> 상태를 수정 상태로 변경
// 상태가 true라면 수정용 모달을 띄우기
const ArchiveClassLog = () => {
  const { logId } = useParams();
  const navigate = useNavigate();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [reload, setReload] = useState<boolean>(false);
  const handleClickEdit = () => {
    setIsEdit((prev) => !prev);
  };
  const [classLogData, setClassLogData] = useState<ClassLog>({
    id: null,
    title: '',
    startDate: '',
    endDate: '',
    classContents: '',
    magnitude: '',
    plan: '',
    submission: '',
  });

  useEffect(() => {
    const getDetailData = async () => {
      const res = await getClassLogDetailData(logId);
      setClassLogData({
        id: res.data.id,
        title: res.data.title,
        startDate: res.data.startDate.slice(0, 10),
        endDate: res.data.endDate.slice(0, 10),
        classContents: res.data.classContents,
        magnitude: res.data.magnitude,
        plan: res.data.plan,
        submission: res.data.submission,
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
        instanceAxios.delete(`/tnote/classLog/${logId}`);
        Swal.fire('삭제가 완료되었습니다.');
        navigate(-1);
      }
    });
  };
  return (
    <SArchiveClassLogWrapper>
      <SArchiveClassLog>
        <SArchiveTitle>
          <IcGoBack className="pointer" onClick={() => navigate(-1)} />
          <STitle>학급일지</STitle>
        </SArchiveTitle>
        <STitleAndDate>
          <STitleAndDateText>제목내용:</STitleAndDateText>
          <STitleAndDateText>{`${classLogData.title} 학급일지`}</STitleAndDateText>
          <SDate>{`${classLogData.startDate} ~ ${classLogData.endDate}`}</SDate>
        </STitleAndDate>
        <STextareaContainer>
          <SLabel>학급계획</SLabel>
          <STextarea value={classLogData.plan} />
          <SLabel>수업내용</SLabel>
          <STextarea value={classLogData.classContents} />
          <SLabel>제출과제</SLabel>
          <STextarea value={classLogData.submission} />
          <SLabel>진도표</SLabel>
          <STextarea value={classLogData.magnitude} />
        </STextareaContainer>
        <SButtons>
          <SDelete onClick={handleDelete}>삭제</SDelete>
          <SEdit onClick={handleClickEdit}>수정</SEdit>
        </SButtons>
      </SArchiveClassLog>
      <ModalPortal>
        {isEdit && (
          <EditClassLogModal
            onClose={handleClickEdit}
            logId={logId}
            setReload={setReload}
          />
        )}
      </ModalPortal>
    </SArchiveClassLogWrapper>
  );
};

export default ArchiveClassLog;
