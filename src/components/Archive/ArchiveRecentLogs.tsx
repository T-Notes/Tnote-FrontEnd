import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { IcFile } from '../../assets/icons';
import instanceAxios from '../../utils/InstanceAxios';
import { getRecentLogs } from '../../utils/lib/api';

const SArchiveRecentLogsWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const STitle = styled.div`
  font-family: Pretendard;
  font-size: 23px;
  font-weight: 500;
  line-height: 27.45px;
  text-align: left;
  margin-top: 50px;
  margin-bottom: 20px;

  @media (min-width: 481px) and (max-width: 767px) {
    font-size: 17px;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    font-size: 19px;
  }
`;
const SRecentSearchContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 3vw;
`;
const SRecentSearchItem = styled.div`
  display: flex;
  flex: 1 1 0;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  padding: 24px 20px 20px 20px;
  overflow: hidden;
  @media (min-width: 481px) and (max-width: 767px) {
    padding: 10px;
  }
  @media (min-width: 768px) and (max-width: 1070px) {
    padding: 12px;
  }
`;
const SFileTitle = styled.p`
  padding-top: 10px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;
const SCreatedAt = styled.p`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;
const SFileCaption = styled.div`
  width: 100%;
  color: #5b5b5b;
  font-family: Pretendard;
  font-size: 18px;
  font-weight: 600;
  line-height: 28px;
  text-align: center;

  @media (min-width: 481px) and (max-width: 767px) {
    font-size: 14px;
  }
  @media (min-width: 768px) and (max-width: 1070px) {
    font-size: 16px;
  }
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

  useEffect(() => {
    if (scheduleId) {
      try {
        const getRecentData = async () => {
          const response = await getRecentLogs(scheduleId);
          const data = response.data;

          if (data) {
            const promises = data.recentLogs.map(async (item: RecentLogs) => {
              let recentEndPoint = '';
              if (item.logType === 'CLASS_LOG') {
                recentEndPoint = `/tnote/v1/classLog/${item.logId}`;
              } else if (item.logType === 'PROCEEDING') {
                recentEndPoint = `/tnote/v1/proceeding/${item.logId}`;
              } else if (item.logType === 'OBSERVATION') {
                recentEndPoint = `/tnote/v1/observation/${item.logId}`;
              } else if (item.logType === 'CONSULTATION') {
                recentEndPoint = `/tnote/v1/consultation/${item.logId}`;
              } else if (item.logType === 'PLAN') {
                recentEndPoint = `/tnote/v1/plan/${item.logId}`;
              }
              if (recentEndPoint) {
                const response = await instanceAxios.get(recentEndPoint);

                return response.data.data;
              }
            });

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

  const handleClickRecentLog = (id: number, type: string) => {
    navigate(`/archive/logDetail/${scheduleId}/${type}/${id}`);
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
              <SFileCaption>
                <SFileTitle>{item.studentName || item.title}</SFileTitle>
                <SCreatedAt>{`${newTimestamp} 작성`}</SCreatedAt>
              </SFileCaption>
            </SRecentSearchItem>
          );
        })}
      </SRecentSearchContainer>
    </SArchiveRecentLogsWrapper>
  );
};

export default ArchiveRecentLogs;
