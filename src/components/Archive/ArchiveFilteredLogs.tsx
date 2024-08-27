import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import {
  IcCheckedBox,
  IcCloseDropdownSmall,
  IcOpenDropdownSmall,
  IcUncheckedBox,
} from '../../assets/icons';
import {
  getAllClassLog,
  getAllProceedings,
  getAllConsultations,
  getAllObservation,
  getAllLogsBySchedule,
  getAllPlan,
  logsDelete,
} from '../../utils/lib/api';
import { useToggle } from '../../utils/useHooks/useToggle';
import DeleteButton from '../common/DeleteButton';
import Pagination from '../common/Pagination';

const SFilter = styled.button`
  border: 1px solid #d5d5d5;
  border-radius: 4px;
  display: flex;
  justify-content: space-around;
  position: relative;
  background-color: #f7f9fc;
  width: 132px;
  align-items: center;
  height: 40px;
  gap: 20px;

  margin-left: 24px;
  .text {
    font-family: Pretendard;
    font-size: 20px;
    font-weight: 500;
    line-height: 23.87px;
    text-align: center;
    color: #a6a6a6;
  }

  @media (max-width: 767px) {
    .text {
      font-size: 14px;
    }
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    .text {
      font-size: 16px;
    }
  }
`;
const SArchiveButtons = styled.div`
  display: flex;
  margin-top: 50px;
  margin-bottom: 40px;
  margin-left: auto;
  font-family: Pretendard;
  font-size: 20px;
  font-weight: 500;
  line-height: 23.87px;
  text-align: center;
`;
const SDropdownList = styled.ul`
  ${({ theme }) => theme.fonts.caption}
  width: 100%;
  border-radius: 8px;
  border: 1px solid #00000033;
  box-shadow: 0px 6px 15px 0px #00000033;
  background-color: white;
  padding-top: 8px;
  padding-bottom: 8px;
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  z-index: 3;
`;
const SDropdownItem = styled.li`
  display: flex;
  padding: 10px 26px 10px 10px;
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
  margin-bottom: 5px;

  font-family: Pretendard;
  font-size: 20px;
  font-weight: 500;
  line-height: 23.87px;
  text-align: left;

  @media (max-width: 1023px) {
    font-size: 18px;
  }
  @media (max-width: 767px) {
    font-size: 16px;
  }
`;
const SCreatedAt = styled.div`
  margin-left: auto;
`;
const SLogContainerHeader = styled.div`
  display: flex;
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  padding: 20px;
  background-color: #f7f9fc;
  font-family: Pretendard;
  font-size: 20px;
  font-weight: 500;
  line-height: 28px;
  text-align: center;

  @media (max-width: 1023px) {
    font-size: 18px;
  }
  @media (max-width: 767px) {
    font-size: 16px;
  }
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
const SFilterIcon = styled.div`
  width: 24px;
  height: 24px;

  @media (min-width: 481px) and (max-width: 767px) {
    width: 18px;
    height: 18px;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    width: 20px;
    height: 20px;
  }
`;
interface Archive {
  scheduleId: string | undefined;
}
interface DeleteIds {
  classLogIds: number[];
  proceedingIds: number[];
  observationIds: number[];
  consultationIds: number[];
}
const ArchiveFilteredLogs = ({ scheduleId }: Archive) => {
  const navigate = useNavigate();

  const [filteredLogsList, setFilteredLogsList] = useState<any[]>([]);
  const options = [
    '전체',
    '일정',
    '학급일지',
    '업무일지',
    '상담기록',
    '학생관찰기록',
  ];

  const [isDelete, setIsDelete] = useState<boolean>(false);
  const [checkedDeleteIds, setCheckedDeleteIds] = useState<
    { id: number; logType: string }[]
  >([]);

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
    setCheckedDeleteIds((prev) => {
      const alreadyChecked = prev.find(
        (log) => log.id === item && log.logType === logType,
      );
      if (alreadyChecked) {
        return prev.filter((log) => log.id !== item || log.logType !== logType);
      } else {
        return [...prev, { id: item, logType: logType }];
      }
    });
  };

  const handleClickFilter = async (option: string) => {
    try {
      let res;
      switch (option) {
        case '전체':
          res = await getAllLogsBySchedule(scheduleId, currentPage);
          setFilteredLogsList(res.data.logs);
          break;
        case '일정':
          res = await getAllPlan(scheduleId);

          setFilteredLogsList(res.data.plans);
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

        setTotalLogs(res.data.totalLog);
        setFilteredLogsList(res.data.logs);
      };
      getAllLogs();
    }
  }, [currentPage]);

  const handleClickDelete = async () => {
    const logsDeleteIds: DeleteIds = {
      classLogIds: [],
      proceedingIds: [],
      observationIds: [],
      consultationIds: [],
    };
    if (checkedDeleteIds) {
      for (const log of checkedDeleteIds) {
        if (log.logType === 'CLASS_LOG') {
          logsDeleteIds.classLogIds.push(log.id);
        } else if (log.logType === 'PROCEEDING') {
          logsDeleteIds.proceedingIds.push(log.id);
        } else if (log.logType === 'OBSERVATION') {
          logsDeleteIds.observationIds.push(log.id);
        } else if (log.logType === 'CONSULTATION') {
          logsDeleteIds.consultationIds.push(log.id);
        }
      }
    }

    if (checkedDeleteIds.length !== 0) {
      Swal.fire({
        title: '항목 삭제',
        text: '정말 삭제하시겠습니까?',
        confirmButtonText: '삭제',
        cancelButtonText: '취소',
        confirmButtonColor: '#632CFA',
        showCancelButton: true,
      }).then((res) => {
        if (res.isConfirmed) {
          logsDelete(logsDeleteIds).then((res) => {
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
    navigate(`/archive/logDetail/${scheduleId}/${type}/${id}`);
  };

  return (
    <>
      <SArchiveButtons>
        <DeleteButton
          onClick={handleClickDelete}
          isDeleteChecked={checkedDeleteIds.length !== 0 ? true : false}
        />

        <SFilter onClick={handleChangeToggle}>
          <p className="text">필터</p>
          <SFilterIcon>
            {isToggle ? <IcCloseDropdownSmall /> : <IcOpenDropdownSmall />}
          </SFilterIcon>

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

      <div>
        <SLogContainerHeader>
          <div>이름</div>
          <SDate>날짜</SDate>
        </SLogContainerHeader>

        {filteredLogsList &&
          filteredLogsList.map((item, index) => {
            const newTimestamp = item.createdAt.slice(0, 10);
            const isChecked = checkedDeleteIds.some(
              (log) => log.id === item.id && log.logType === item.logType,
            );
            return (
              <SLogContainer key={index}>
                {isChecked ? (
                  <SCheckedBox>
                    <IcCheckedBox
                      onClick={() => handleDeletedCheck(item.id, item.logType)}
                    />
                  </SCheckedBox>
                ) : (
                  <SCheckedBox>
                    <IcUncheckedBox
                      onClick={() => handleDeletedCheck(item.id, item.logType)}
                    />
                  </SCheckedBox>
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

                  {item.logType === 'PLAN' && (
                    <SLogType
                      className="pointer"
                      onClick={() =>
                        handleChangePageAtLogs(item.id, item.logType)
                      }
                    >
                      <p>{item.title || item.studentName}/일정</p>
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
