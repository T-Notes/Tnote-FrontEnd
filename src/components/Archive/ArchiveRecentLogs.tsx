import { useEffect, useState } from 'react';
import { getRecentLogs } from '../../utils/lib/api';

interface Archive {
  scheduleId: string | undefined;
}
interface RecentLogs {
  id: number;
  logType: string;
  timestamp: string;
}
const ArchiveRecentLogs = ({ scheduleId }: Archive) => {
  const [recentLogsList, setRecentLogsList] = useState<RecentLogs[]>([]);

  useEffect(() => {
    if (scheduleId) {
      const getRecentData = async () => {
        const response = await getRecentLogs();
        const data = response.data;

        setRecentLogsList(response.data);
      };
      getRecentData();
    }
  }, [scheduleId]);
  const [newTimestamp, setNewTimestamp] = useState<string>('');
  const handleChangeTimestamp = (timestamp: string) => {
    const newTimestamp = timestamp.slice(0, 10);

    setNewTimestamp(newTimestamp);
  };
  return (
    <>
      <div>최근 조회</div>
      {recentLogsList.length > 0 && (
        <>
          {recentLogsList.map((item, index) => {
            let koLogType = '';
            if (item.logType === 'CLASS_LOG') {
              koLogType = '학급일지';
            } else if (item.logType === 'PROCEEDING') {
              koLogType = '업무일지';
            } else if (item.logType === 'OBSERVATION') {
              koLogType = '학생 관찰일지';
            } else if (item.logType === 'CONSULTATION') {
              koLogType = '상담일지';
            }
            const newTimestamp = item.timestamp.slice(0, 10);

            return (
              <div key={index}>
                <div>{koLogType}</div>
                <div>{newTimestamp}</div>
              </div>
            );
          })}
        </>
      )}
    </>
  );
};

export default ArchiveRecentLogs;
