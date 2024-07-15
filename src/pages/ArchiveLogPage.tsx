import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { IcGoBack } from '../assets/icons';
import ArchiveLog from '../components/Archive/ArchiveLog';

const SLogHead = styled.div`
  display: flex;
`;
const SLogName = styled.p`
  padding-left: 16px;
  font-family: Pretendard;
  font-size: 32px;
  font-weight: 600;
  line-height: 38.19px;
  text-align: left;
  @media (max-width: 1023px) {
    font-size: 28px;
  }
  @media (max-width: 767px) {
    font-size: 24px;
  }
`;
const SArchiveLogWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 40px;
  padding-right: 21.3vw;
  padding-left: 30px;
`;

const ArchiveLogPage = () => {
  const { logType, logId } = useParams();
  const navigate = useNavigate();

  const [logName, setLogName] = useState<string>('');

  useEffect(() => {
    if (logType) {
      if (logType === 'CLASS_LOG') {
        setLogName('학급일지');
      }
      if (logType === 'PROCEEDING') {
        setLogName('업무일지');
      }
      if (logType === 'CONSULTATION') {
        setLogName('상담기록');
      }
      if (logType === 'OBSERVATION') {
        setLogName('학생 관찰 기록');
      }
    }
  }, [logType]);
  return (
    <SArchiveLogWrapper>
      <SLogHead>
        <IcGoBack className="pointer" onClick={() => navigate(-1)} />
        <SLogName>{logName}</SLogName>
      </SLogHead>

      <ArchiveLog type={logType || ''} id={logId} />
    </SArchiveLogWrapper>
  );
};

export default ArchiveLogPage;
