import { useEffect, useState } from 'react';
import instanceAxios from '../../utils/InstanceAxios';
import { getRecentLogs } from '../../utils/lib/api';

interface Archive {
  scheduleId: string | undefined;
}
interface RecentLogs {
  logId: number;
  logType: string;
  timestamp: string;
}

interface newRecentLogs {
  id: number | null;
  title: string;
  studentName: string;
  createdAt: string;
}
const ArchiveRecentLogs = ({ scheduleId }: Archive) => {
  const [newRecentLogs, setNewRecentLogs] = useState<newRecentLogs[]>([]);

  useEffect(() => {
    if (scheduleId) {
      const getRecentData = async () => {
        const response = await getRecentLogs();
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
            const response = await instanceAxios.get(recentEndPoint);
            return response.data.data;
          });
          // 모든 프로미스가 완료될 때까지 기다림
          const endPoints = await Promise.all(promises);
          setNewRecentLogs(endPoints);
          console.log('response:', response);
        }
      };
      getRecentData();
    }
  }, [scheduleId]);

  return (
    <>
      <div>최근 조회</div>
      {newRecentLogs.map((item, index) => {
        const newTimestamp = item.createdAt.slice(0, 10);
        return (
          <div key={index}>
            <div>{item.studentName || item.title}</div>
            <div>{newTimestamp}</div>
          </div>
        );
      })}
    </>
  );
};

export default ArchiveRecentLogs;
