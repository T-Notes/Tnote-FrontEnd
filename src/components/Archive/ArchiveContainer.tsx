import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { IcGoBack } from '../../assets/icons';
import { getSemesterData } from '../../utils/lib/api';
import { useCurrentDate } from '../../utils/useHooks/useCurrentDate';
import ArchiveRecentLogs from './ArchiveRecentLogs';

const SArchiveContainerWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ArchiveContainer = () => {
  const { scheduleId } = useParams();
  const navigate = useNavigate();
  const [semesterName, setSemesterName] = useState<string>('');
  const { year, month, day } = useCurrentDate();

  useEffect(() => {
    if (scheduleId) {
      const getSemesterName = async () => {
        const response = await getSemesterData(scheduleId);
        const data = response.data[0];
        setSemesterName(data.semesterName);
      };
      getSemesterName();
    }
  }, [scheduleId]);
  return (
    <SArchiveContainerWrapper>
      <Link to={`/archive/${scheduleId}`}>
        <IcGoBack />
      </Link>
      {semesterName}
      <br></br>
      {`${year}년 ${month}월 ${day}일`}
      <ArchiveRecentLogs scheduleId={scheduleId} />
    </SArchiveContainerWrapper>
  );
};

export default ArchiveContainer;
