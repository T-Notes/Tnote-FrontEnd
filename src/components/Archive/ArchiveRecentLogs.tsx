import { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  IcBlackDelete,
  IcCloseDropdownSmall,
  IcDelete,
  IcFile,
  IcOpenDropdownSmall,
} from '../../assets/icons';
import instanceAxios from '../../utils/InstanceAxios';
import {
  getAllClassLog,
  getRecentLogs,
  getAllProceedings,
  getAllConsultations,
  getAllObservation,
} from '../../utils/lib/api';

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
const SDelete = styled.button`
  display: flex;
  align-items: center;
  padding-right: 15px;
  padding-left: 15px;
  padding-top: 5px;
  padding-bottom: 5px;
  border: 1px solid #a6a6a6;
  border-radius: 50px;
  color: #5b5b5b;
  margin-right: 20px;
  font-size: 16px;
  font-weight: 500;
`;
const SFilter = styled.button`
  display: flex;
  position: relative;
  align-items: center;
  padding-right: 15px;
  padding-left: 15px;
  padding-top: 5px;
  padding-bottom: 5px;
  border: 1px solid #a6a6a6;
  border-radius: 50px;
  color: #5b5b5b;
  margin-right: 60px;
  font-size: 16px;
  font-weight: 500;
`;
const SArchiveButtons = styled.div`
  margin-top: 30px;
  margin-left: auto;
  display: flex;
`;
const SDropdownList = styled.ul`
  ${({ theme }) => theme.fonts.caption}
  width: 10rem;
  border-radius: 8px;
  border: 1px solid #00000033;
  box-shadow: 0px 6px 15px 0px #00000033;
  background-color: white;
  padding: 4px;
  position: absolute;
  top: calc(100% + 4px); /* SDropdownLabel 아래로 위치 */
  left: 0;
  z-index: 3; /* SDropdownLabel 위에 나타나도록 설정 */
`;
const SDropdownItem = styled.li`
  padding: 8px;
  cursor: pointer;

  &:hover {
    background-color: #e6f6fc;
    border-radius: 4px;
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
  id: number | null;
  title: string;
  studentName: string;
  createdAt: string;
}
const ArchiveRecentLogs = ({ scheduleId }: Archive) => {
  const [newRecentLogs, setNewRecentLogs] = useState<newRecentLogs[]>([]);
  const [filteredLogsList, setFilteredLogsList] = useState<any[]>([]);
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] =
    useState<boolean>(false);
  const options = ['학급일지', '업무일지', 'To-Do', '상담기록', '학생관찰기록'];

  // 최신조회
  useEffect(() => {
    if (scheduleId) {
      // const getRecentData = async () => {
      //   const response = await getRecentLogs();
      //   const data = response.data;
      //   if (data) {
      //     const promises = data.map(async (item: RecentLogs) => {
      //       let recentEndPoint = '';
      //       if (item.logType === 'CLASS_LOG') {
      //         recentEndPoint = `/tnote/classLog/${item.logId}`;
      //       } else if (item.logType === 'PROCEEDING') {
      //         recentEndPoint = `/tnote/proceeding/${item.logId}`;
      //       } else if (item.logType === 'OBSERVATION') {
      //         recentEndPoint = `/tnote/observation/${item.logId}`;
      //       } else if (item.logType === 'CONSULTATION') {
      //         recentEndPoint = `/tnote/consultation/${item.logId}`;
      //       }
      //       const response = await instanceAxios.get(recentEndPoint);
      //       return response.data.data;
      //     });
      //     // 모든 프로미스가 완료될 때까지 기다림
      //     const endPoints = await Promise.all(promises);
      //     setNewRecentLogs(endPoints);
      //   }
      // };
      // getRecentData();
    }
  }, [scheduleId]);

  const openFilterDropdown = () => {
    setIsFilterDropdownOpen(true);
  };
  const closeFilterDropdown = () => {
    setIsFilterDropdownOpen(false);
  };
  // 필터된 일지 정보 조회
  useEffect(() => {
    if (scheduleId) {
      const getClassLogData = async () => {
        const res = await getAllClassLog(scheduleId);
        console.log(1, res.data.classLogs);
        setFilteredLogsList(res.data.classLogs);
      };
      getClassLogData();
    }
  }, [scheduleId]);

  const handleClickModal = async (option: string) => {
    console.log(option);
    try {
      let res;
      switch (option) {
        case '학급일지':
          res = await getAllClassLog(scheduleId);
          setFilteredLogsList(res.data.classLogs);
          break;
        case '업무일지':
          res = await getAllProceedings(scheduleId);
          setFilteredLogsList(res.data.proceedings);
          break;
        case '상담기록':
          res = await getAllConsultations(scheduleId);
          setFilteredLogsList(res.data.consultations);
          break;
        case '학생관찰기록':
          res = await getAllObservation(scheduleId);
          setFilteredLogsList(res.data.observations);
          break;
        default:
          break;
      }
      closeFilterDropdown();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <SArchiveRecentLogsWrapper>
      <STitle>최근 조회</STitle>
      <SRecentSearchContainer>
        {newRecentLogs.map((item, index) => {
          const newTimestamp = item.createdAt.slice(0, 10);
          return (
            <SRecentSearchItem key={index}>
              <IcFile />
              <div>{item.studentName || item.title}</div>
              <div>{`${newTimestamp} 작성`}</div>
            </SRecentSearchItem>
          );
        })}
      </SRecentSearchContainer>
      <SArchiveButtons>
        <SDelete>
          삭제
          <IcBlackDelete />
        </SDelete>

        <SFilter>
          필터
          {isFilterDropdownOpen ? (
            <IcCloseDropdownSmall onClick={closeFilterDropdown} />
          ) : (
            <IcOpenDropdownSmall onClick={openFilterDropdown} />
          )}
          {/* 문제 부분 */}
          {isFilterDropdownOpen && (
            <SDropdownList>
              {options.map((option) => (
                <SDropdownItem
                  key={option}
                  onClick={() => {
                    handleClickModal(option);
                  }}
                >
                  {option}
                </SDropdownItem>
              ))}
            </SDropdownList>
          )}
        </SFilter>
      </SArchiveButtons>
      {/* 일지 전체 조회 */}
      {filteredLogsList &&
        filteredLogsList.map((item, index) => {
          console.log(filteredLogsList);

          return (
            <div key={index}>
              <div>{item.title || item.studentName}</div>
              <div>{item.classContents}</div>
              <div>{item.createdAt}</div>
            </div>
          );
        })}
    </SArchiveRecentLogsWrapper>
  );
};

export default ArchiveRecentLogs;
