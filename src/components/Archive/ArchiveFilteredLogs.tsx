import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import {
  IcBlackDelete,
  IcCheckedBox,
  IcCloseDropdownSmall,
  IcOpenDropdownSmall,
  IcUncheckedBox,
} from '../../assets/icons';
import instanceAxios from '../../utils/InstanceAxios';
import {
  getAllClassLog,
  getAllProceedings,
  getAllConsultations,
  getAllObservation,
  getAllLogsBySchedule,
} from '../../utils/lib/api';
import { useToggle } from '../../utils/useHooks/useToggle';
import Pagination from '../common/Pagination';

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
  > p {
    padding-right: 3px;
  }
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
  font-size: 16px;
  font-weight: 500;
`;
const SArchiveButtons = styled.div`
  margin-top: 30px;
  margin-bottom: 20px;
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
  top: calc(100% + 4px);
  left: 0;
  z-index: 3;
`;
const SDropdownItem = styled.li`
  display: flex;
  padding: 8px;
  padding-left: 24px;
  cursor: pointer;

  &:hover {
    background-color: #e6f6fc;
    border-radius: 4px;
  }
`;
const SLogContainer = styled.div`
  display: flex;
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  padding: 20px;
  color: #5b5b5b;
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 5px;
`;
const SCreatedAt = styled.div`
  margin-left: auto;
`;
const SLogContainerHeader = styled.div`
  display: flex;
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  padding: 20px;
  font-size: 16px;
  font-weight: 500;
  background-color: #f7f9fc;
`;
const SDate = styled.div`
  margin-left: auto;
`;
const SLogType = styled.span`
  padding-left: 0px;
`;
const SCheckedBox = styled.div`
  padding-right: 20px;
`;

interface Archive {
  scheduleId: string | undefined;
}
const ArchiveFilteredLogs = ({ scheduleId }: Archive) => {
  const navigate = useNavigate();

  const [filteredLogsList, setFilteredLogsList] = useState<any[]>([]);
  const options = ['전체', '학급일지', '업무일지', '상담기록', '학생관찰기록'];
  const [currentFilteredOption, setCurrentFilteredOption] =
    useState<string>('');
  const [isDelete, setIsDelete] = useState<boolean>(false);
  const [checkedDeleteId, setCheckedDeleteId] = useState<number | null>(null);
  const [logType, setLogType] = useState<string>('');
  // const [reload, setReload] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalLogs, setTotalLogs] = useState<number>(0);
  const { handleChangeToggle, isToggle } = useToggle();

  const handlePageChange = (selected: { selected: number }) => {
    setCurrentPage(selected.selected);
  };

  const handleDeleteModeActivate = () => {
    setIsDelete(true);
  };
  const handleDeletedCheck = (item: number, logType: string) => {
    setLogType(logType);
    setCheckedDeleteId((prev) => (prev === item ? null : item));
  };

  const handleClickFilter = async (option: string) => {
    setCurrentFilteredOption(option);
    try {
      let res;
      switch (option) {
        case '전체':
          res = await getAllLogsBySchedule(scheduleId, currentPage);
          setFilteredLogsList(res.data.logs);
          break;
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
      handleChangeToggle();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (scheduleId) {
      const getAllLogs = async () => {
        const res = await getAllLogsBySchedule(scheduleId, currentPage);
        console.log(res.data.logs);
        setTotalLogs(res.data.totalLog);
        setFilteredLogsList(res.data.logs);
      };
      getAllLogs();
    }
  }, [currentPage]);

  const handleDelete = () => {
    let logEndPointMiddle = '';

    if (logType === 'CLASS_LOG') {
      logEndPointMiddle = 'classLog';
    }
    if (logType === 'PROCEEDING') {
      logEndPointMiddle = 'proceeding';
    }
    if (logType === 'CONSULTATION') {
      logEndPointMiddle = 'consultation';
    }
    if (logType === 'OBSERVATION') {
      logEndPointMiddle = 'observation';
    }
    if (checkedDeleteId) {
      Swal.fire({
        title: '항목 삭제',
        text: '정말 삭제하시겠습니까?',
        confirmButtonText: '삭제',
        cancelButtonText: '취소',
        confirmButtonColor: '#632CFA',
        showCancelButton: true,
      }).then((res) => {
        if (res.isConfirmed) {
          instanceAxios
            .delete(`/tnote/${logEndPointMiddle}/${checkedDeleteId}`)
            .then((res) => {
              window.location.reload();
            });
        }
      });
    } else {
      Swal.fire({
        text: '삭제할 항목을 선택해주세요',
      });
    }
  };

  const handleChangePageAtLogs = (id: number, type: string) => {
    if (type === 'CLASS_LOG') {
      navigate(`/archive/classLog/${scheduleId}/${id}`);
    } else if (type === 'PROCEEDING') {
      navigate(`/archive/proceeding/${scheduleId}/${id}`);
    } else if (type === 'CONSULTATION') {
      navigate(`/archive/consultation/${scheduleId}/${id}`);
    } else if (type === 'OBSERVATION') {
      navigate(`/archive/observation/${scheduleId}/${id}`);
    }
  };

  return (
    <>
      <SArchiveButtons>
        {isDelete ? (
          <SDelete onClick={handleDelete}>
            <p>삭제</p>
            <IcBlackDelete />
          </SDelete>
        ) : (
          <SDelete onClick={handleDeleteModeActivate}>
            <p>삭제</p>
            <IcBlackDelete />
          </SDelete>
        )}
        <SFilter onClick={handleChangeToggle}>
          필터
          {isToggle ? <IcCloseDropdownSmall /> : <IcOpenDropdownSmall />}
          {isToggle && (
            <SDropdownList>
              {options.map((option) => (
                <SDropdownItem
                  key={option}
                  onClick={() => {
                    handleClickFilter(option);
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
      <div>
        <SLogContainerHeader>
          <div>이름</div>
          <SDate>날짜</SDate>
        </SLogContainerHeader>

        {filteredLogsList &&
          filteredLogsList.map((item, index) => {
            const newTimestamp = item.createdAt.slice(0, 10);
            return (
              <SLogContainer key={index}>
                {isDelete && (
                  <>
                    {checkedDeleteId === item.id && logType === item.logType ? (
                      <SCheckedBox>
                        <IcCheckedBox
                          onClick={() =>
                            handleDeletedCheck(item.id, item.logType)
                          }
                        />
                      </SCheckedBox>
                    ) : (
                      <SCheckedBox>
                        <IcUncheckedBox
                          onClick={() =>
                            handleDeletedCheck(item.id, item.logType)
                          }
                        />
                      </SCheckedBox>
                    )}
                  </>
                )}

                <div>
                  {item.logType === 'CLASS_LOG' && (
                    <SLogType
                      className="pointer"
                      onClick={() =>
                        handleChangePageAtLogs(item.id, item.logType)
                      }
                    >
                      <p>{item.title || item.studentName}/학급일지</p>
                    </SLogType>
                  )}

                  {item.logType === 'PROCEEDING' && (
                    <SLogType
                      className="pointer"
                      onClick={() =>
                        handleChangePageAtLogs(item.id, item.logType)
                      }
                    >
                      <p>{item.title || item.studentName}/업무일지</p>
                    </SLogType>
                  )}
                  {item.logType === 'CONSULTATION' && (
                    <SLogType
                      className="pointer"
                      onClick={() =>
                        handleChangePageAtLogs(item.id, item.logType)
                      }
                    >
                      <p>{item.title || item.studentName}/상담기록</p>
                    </SLogType>
                  )}

                  {item.logType === 'OBSERVATION' && (
                    <SLogType
                      className="pointer"
                      onClick={() =>
                        handleChangePageAtLogs(item.id, item.logType)
                      }
                    >
                      <p>{item.title || item.studentName}/학생 관찰 기록</p>
                    </SLogType>
                  )}
                </div>
                <SCreatedAt>{newTimestamp}</SCreatedAt>
              </SLogContainer>
            );
          })}
        <Pagination totalLogs={totalLogs} handlePageChange={handlePageChange} />
      </div>
    </>
  );
};

export default ArchiveFilteredLogs;
