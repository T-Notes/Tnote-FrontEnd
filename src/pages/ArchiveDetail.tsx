import React from 'react';
import { text } from 'node:stream/consumers';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import { IcGoBack } from '../assets/icons';
import { getFilteredLogsByDate, getSemesterData } from '../utils/lib/api';
import { useCurrentDate } from '../utils/useHooks/useCurrentDate';
import ArchiveRecentLogs from '../components/Archive/ArchiveRecentLogs';
import ArchiveFilteredLogs from '../components/Archive/ArchiveFilteredLogs';
import instanceAxios from '../utils/InstanceAxios';

const SArchiveContainerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0;
  left: 230px;
  right: 300px;
  bottom: 0;
  margin-top: 40px;
`;
const SArchiveTitle = styled.div`
  display: flex;
  ${({ theme }) => theme.fonts.h2}
`;
const STitle = styled.h1`
  padding-left: 10px;
`;
const SArchiveDateContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
`;

const SArchiveCurrentDate = styled.div`
  font-size: 20px;
  font-weight: 600;
  margin-right: 50px;
`;
const SSelectDateButton = styled.button`
  color: #5b5b5b;
  font-size: 12px;
  font-weight: 500;
  width: 90px;
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 5px;
  padding-bottom: 5px;
  margin-right: 15px;
`;
const ArchiveDetail = () => {
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

  const handleNoFeature = async (dateRange: string) => {
    let startDate = '';
    let endDate = '';
    if (dateRange === 'TODAY') {
      startDate = `${year}-${month}-${day}`;
      endDate = `${year}-${month}-${day}`;
    }

    const response = await instanceAxios.get(
      `tnote/home/${scheduleId}/dateLogs?startDate=${startDate}&endDate=${endDate}&page=0&size=8&logType=`,
    );
    console.log(response);
  };
  return (
    <SArchiveContainerWrapper>
      <SArchiveTitle>
        <Link to={`/archive/${scheduleId}`}>
          <IcGoBack className="pointer" />
        </Link>
        <STitle> {`${semesterName} 아카이브`}</STitle>
      </SArchiveTitle>
      <SArchiveDateContainer>
        {/* <SArchiveCurrentDate>{`${year}년 ${month}월 ${day}일`}</SArchiveCurrentDate> */}
        {/* <SSelectDateButton onClick={() => handleNoFeature('TODAY')}>
          오늘
        </SSelectDateButton>
        <SSelectDateButton onClick={() => handleNoFeature('WEEK')}>
          일주일
        </SSelectDateButton>
        <SSelectDateButton onClick={() => handleNoFeature('MONTH')}>
          한달
        </SSelectDateButton>
        <SSelectDateButton onClick={() => handleNoFeature('TODAY')}>
          직접지정
        </SSelectDateButton> */}
      </SArchiveDateContainer>
      <ArchiveRecentLogs scheduleId={scheduleId} />
      <ArchiveFilteredLogs scheduleId={scheduleId} />
    </SArchiveContainerWrapper>
  );
};

export default ArchiveDetail;
