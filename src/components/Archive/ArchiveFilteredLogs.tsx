import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {
  IcBlackDelete,
  IcCheckedBox,
  IcCloseDropdownSmall,
  IcDelete,
  IcFile,
  IcOpenDropdownSmall,
  IcUncheckedBox,
} from '../../assets/icons';
import instanceAxios from '../../utils/InstanceAxios';
import {
  getAllClassLog,
  getRecentLogs,
  getAllProceedings,
  getAllConsultations,
  getAllObservation,
  getTodo,
} from '../../utils/lib/api';

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
const SLogContainer = styled.div`
  display: flex;
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  padding: 20px;
  color: #5b5b5b;
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 5px;
  cursor: pointer;
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
interface Archive {
  scheduleId: string | undefined;
}
const ArchiveFilteredLogs = ({ scheduleId }: Archive) => {
  const navigate = useNavigate();

  const [filteredLogsList, setFilteredLogsList] = useState<any[]>([]);
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] =
    useState<boolean>(false);
  const options = ['학급일지', '업무일지', 'To-Do', '상담기록', '학생관찰기록'];
  const [isShowCheckBox, setIsShowCheckBox] = useState<boolean>(false);
  const [currentFilteredOption, setCurrentFilteredOption] =
    useState<string>('');
  const [isSelectedCheckBox, setIsSelectedCheckBox] = useState<number>();
  const [checkedLogs, setCheckedLogs] = useState<{ [key: number]: boolean }>(
    {},
  );

  const handleClickShowCheckBox = () => {
    setIsShowCheckBox((prev) => !prev);
  };
  const handleClickCheckBox = (id: number) => {
    setIsSelectedCheckBox(id);
    setCheckedLogs((prev) => ({
      ...prev,
      [id]: !prev[id], // 토글
    }));
  };
  const openFilterDropdown = () => {
    setIsFilterDropdownOpen(true);
  };
  const closeFilterDropdown = () => {
    setIsFilterDropdownOpen(false);
  };

  const handleClickModal = async (option: string) => {
    setCurrentFilteredOption(option);
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
        case 'To-Do':
          res = await getTodo(scheduleId, new Date());
          console.log(res.data);
          setFilteredLogsList(res.data);
          break;
        default:
          break;
      }
      closeFilterDropdown();
    } catch (error) {
      console.error(error);
    }
  };
  // 필터된 일지 정보 조회
  useEffect(() => {
    if (scheduleId) {
      const getClassLogData = async () => {
        const res = await getAllClassLog(scheduleId);

        setFilteredLogsList(res.data.classLogs);
      };
      getClassLogData();
    }
  }, [scheduleId]);

  const handleDelete = () => {
    // 클릭한 값 삭제 기능
    if (isSelectedCheckBox) {
      console.log(1, isSelectedCheckBox);

      if (currentFilteredOption === '학급일지') {
        instanceAxios.delete(`/tnote/classLog/${isSelectedCheckBox}`);
      }
      if (currentFilteredOption === '업무일지') {
        instanceAxios.delete(`/tnote/proceeding/${isSelectedCheckBox}`);
      }
      if (currentFilteredOption === 'To-Do') {
        instanceAxios.delete(
          `/tnote/todos/${scheduleId}/${isSelectedCheckBox}`,
        );
      }
      if (currentFilteredOption === '상담기록') {
        instanceAxios.delete(`/tnote/consultation/${isSelectedCheckBox}`);
      }
      if (currentFilteredOption === '학생관찰기록') {
        instanceAxios.delete(`/tnote/observation/${isSelectedCheckBox}`);
      }
    }
  };

  // 클릭한 값으로 페이지 변환 함수
  const handleChangePageAtLogs = (id: number) => {
    if (currentFilteredOption === '학급일지' || currentFilteredOption === '') {
      navigate(`/archive/classLog/${id}`);
    } else if (currentFilteredOption === '업무일지') {
      navigate(`/archive/proceeding/${id}`);
    } else if (currentFilteredOption === '상담기록') {
      navigate(`/archive/consultation/${id}`);
    } else if (currentFilteredOption === '학생관찰기록') {
      navigate(`/archive/observation/${id}`);
    }
  };
  return (
    <>
      <SArchiveButtons>
        <SDelete onClick={handleClickShowCheckBox}>선택</SDelete>
        <SDelete onClick={handleDelete}>
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
      <div>
        <SLogContainerHeader>
          <div>이름</div>
          <SDate>날짜</SDate>
        </SLogContainerHeader>

        {filteredLogsList &&
          filteredLogsList.map((item, index) => {
            const newTimestamp = item.createdAt.slice(0, 10);
            return (
              <SLogContainer
                key={index}
                onClick={() => handleChangePageAtLogs(item.id)}
              >
                {isShowCheckBox &&
                  (checkedLogs[item.id] ? (
                    <IcCheckedBox
                      className="pointer"
                      onClick={() => handleClickCheckBox(item.id)}
                    />
                  ) : (
                    <IcUncheckedBox
                      className="pointer"
                      onClick={() => handleClickCheckBox(item.id)}
                    />
                  ))}

                <div>{item.title || item.studentName}</div>
                <div>
                  {item.classContents ||
                    item.workContents ||
                    item.consultationContents ||
                    item.observationContents}
                </div>
                <SCreatedAt>{newTimestamp}</SCreatedAt>
              </SLogContainer>
            );
          })}
      </div>
    </>
  );
};

export default ArchiveFilteredLogs;
