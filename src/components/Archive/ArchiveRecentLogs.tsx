import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { IcFile } from '../../assets/icons';
import instanceAxios from '../../utils/InstanceAxios';
import { getRecentLogs } from '../../utils/lib/api';

const SArchiveRecentLogsWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const STitle = styled.div`
  font-size: 18px;
  font-weight: 500;
  margin-top: 35px;
  margin-bottom: 10px;
`;
const SRecentSearchContainer = styled.div`
  display: flex;
`;
const SRecentSearchItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  color: #5b5b5b;
  font-size: 14px;
  font-weight: 500;
  gap: 10px;
  padding-top: 20px;
  padding-bottom: 20px;
  padding-left: 30px;
  padding-right: 30px;
  margin-right: auto;
`;

interface Archive {
  scheduleId: string | undefined;
}
interface RecentLogs {
  logId: number;
  logType: string;
  timestamp: string;
}

interface newRecentLogs {
  id: number;
  title: string;
  studentName: string;
  createdAt: string;
  logType: string;
}
const ArchiveRecentLogs = ({ scheduleId }: Archive) => {
  const navigate = useNavigate();
  const [newRecentLogs, setNewRecentLogs] = useState<newRecentLogs[]>([]);

  // 최신조회
  useEffect(() => {
    if (scheduleId) {
      try {
        const getRecentData = async () => {
          const response = await getRecentLogs(scheduleId);
          const data = response.data;

          if (data) {
            const promises = data.map(async (item: RecentLogs) => {
              let recentEndPoint = '';
              if (item.logType === 'CLASS_LOG') {
                recentEndPoint = `/tnote/classLog/${item.logId}`;
              } else if (item.logType === 'PROCEEDING') {
                recentEndPoint = `/tnote/proceeding/${item.logId}`;
              } else if (item.logType === 'OBSERVATION') {
                recentEndPoint = `/tnote/observation/${item.logId}`;
              } else if (item.logType === 'CONSULTATION') {
                recentEndPoint = `/tnote/consultation/${item.logId}`;
              }
              if (recentEndPoint) {
                const response = await instanceAxios.get(recentEndPoint);

                return response.data.data;
              }
            });
            // 모든 프로미스가 완료될 때까지 기다림
            const endPoints = await Promise.all(promises);
            setNewRecentLogs(endPoints);
          }
        };
        getRecentData();
      } catch (err) {
        console.log(err);
      }
    }
  }, [scheduleId]);

  const handleClickRecentLog = (logId: number, logType: string) => {
    let logEndpointMid = '';
    if (logType === 'CLASS_LOG') {
      logEndpointMid = 'classLog';
    }
    if (logType === 'PROCEEDING') {
      logEndpointMid = 'proceeding';
    }
    if (logType === 'CONSULTATION') {
      logEndpointMid = 'consultation';
    }
    if (logType === 'OBSERVATION') {
      logEndpointMid = 'observation';
    }
    navigate(`/archive/${logEndpointMid}/${scheduleId}/${logId}`);
  };
  return (
    <SArchiveRecentLogsWrapper>
      <STitle>최근 조회</STitle>
      <SRecentSearchContainer>
        {newRecentLogs.map((item) => {
          const newTimestamp = item.createdAt.slice(0, 10);
          return (
            <SRecentSearchItem
              key={item.id}
              onClick={() => handleClickRecentLog(item.id, item.logType)}
            >
              <IcFile />
              <div>{item.studentName || item.title}</div>
              <div>{`${newTimestamp} 작성`}</div>
            </SRecentSearchItem>
          );
        })}
      </SRecentSearchContainer>
    </SArchiveRecentLogsWrapper>
  );
};

export default ArchiveRecentLogs;
