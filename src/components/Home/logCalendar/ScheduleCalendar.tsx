import '../../../App.css';
import styled from 'styled-components';
import _debounce from 'lodash/debounce';
import { ChangeEvent, useEffect, useState } from 'react';
import { ko } from 'date-fns/locale';
import { useCurrentDate } from '../../../utils/useHooks/useCurrentDate';
import {
  format,
  startOfWeek,
  endOfWeek,
  addDays,
  startOfMonth,
  endOfMonth,
  isToday,
  isSameMonth,
  isSameDay,
} from 'date-fns';
import SearchInput from '../../common/SearchInput';
import { Button } from '../../common/styled/Button';
import { useParams } from 'react-router-dom';
import { getAllLogsByMonth, getSearchLogsValue } from '../../../utils/lib/api';
import ScheduleCalendarSearchValue from '../../search/ScheduleCalendarSearchValue';
import MoreLogModal from './MoreLogModal';
import { useModals } from '../../../utils/useHooks/useModals';

const SCalendarWrapper = styled.div`
  width: 100%;
  height: auto;
`;

const SCalendarHeader = styled.div`
  display: flex;
  align-items: center;

  font-family: Pretendard;
  font-size: 23px;
  font-weight: 600;
  line-height: 27.45px;
  text-align: left;
`;
const SCalendarDate = styled.div`
  height: auto;
`;

const SWeekBox = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
  background-color: #f7f9fc;

  color: #2f2f2f;
  font-family: Pretendard;
  font-size: 18px;
  font-weight: 600;
  line-height: 21.48px;
  text-align: center;
`;
const SWeek = styled.div`
  padding: 10px 0px;
`;

const SDaysContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex: 1;
  flex-wrap: wrap;
`;
const SDaysBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  white-space: nowrap;
  overflow: hidden;

  height: 130px;
  flex: 1;
  flex: 1 0 14%;
  padding-top: 5px;
  padding-bottom: 5px;

  cursor: pointer;
`;
const SCalendarHeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 30px 30px 50px 30px;
`;
const STodayButton = styled(Button)`
  border: 1px solid #d5d5d5;
  border-radius: 35px;
  color: #a6a6a6;
  margin-right: auto;
  margin-left: 20px;
  padding: 13px 25px;

  font-family: Pretendard;
  font-size: 16px;
  font-weight: 600;
  line-height: 19.09px;
  text-align: left;
`;
const SYearMonth = styled.div`
  padding-left: 4vw;
  padding-right: 4vw;
`;

const SLogContainer = styled.ul`
  width: 100%;
`;

const SLog = styled.div<{ color: string }>`
  font-family: Pretendard;
  font-size: 13px;
  font-weight: 600;
  line-height: 15.51px;
  text-align: center;
  color: #ffffff;
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 8px 16px;
  background-color: ${({ color }) => (color ? color : '#ffff')};
  > p {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
const SMoreLogs = styled.div`
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 600;
  line-height: 15.51px;
  text-align: center;

  width: 100%;
  color: #a6a6a6;
  padding: 3px 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &:hover {
    color: #3378ff;
  }
`;
const SDay = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 40px;
  padding: 10px 0px;
  font-family: Pretendard;
  font-size: 18px;
  font-weight: 600;
  line-height: 21.48px;
  text-align: center;
  .today {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ffff;
    background-color: #7f51fc;
    border-radius: 25px;
    width: 1.56vw;
    height: 1.56vw;
    gap: 10px;
    padding: 5px;
    @media (max-width: 1439px) {
      padding: auto;
    }
    @media (max-width: 1279px) {
      padding: 10px;
    }
  }
`;
const SMySchedule = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const ScheduleCalendar = ({
  onDayClick,
}: {
  onDayClick: (clickedDate: Date) => void;
}) => {
  const { scheduleId } = useParams();
  const [modalPosition, setModalPosition] = useState<{
    top: number;
    left: number;
  }>({
    top: 0,
    left: 0,
  });
  const [searchValue, setSearchValue] = useState<string>('');
  const [searchValueList, setSearchValueList] = useState<any[]>([]);
  const [allLogs, setAllLogs] = useState<any[]>([]);
  const { openModal } = useModals();
  const { currentDate, handlePrevMonth, handleNextMonth, setCurrentDate } =
    useCurrentDate();

  const startWeek = startOfWeek(startOfMonth(currentDate));
  const endWeek = endOfWeek(endOfMonth(currentDate));

  const days = [];
  let day = startWeek;

  while (day <= endWeek) {
    days.push(day);
    day = addDays(day, 1);
  }

  const handleMoveCurrentDate = () => {
    setCurrentDate(startOfMonth(new Date()));
    onDayClick(new Date());
  };

  useEffect(() => {
    if (scheduleId) {
      try {
        const getMonthlyLogs = async () => {
          const formattedDate = format(currentDate, 'yyyy-MM-dd');

          const response = await getAllLogsByMonth(scheduleId, formattedDate);

          const { classLogs, consultations, proceedings, observations } =
            response.data;

          const allLogs = [
            ...classLogs,
            ...consultations,
            ...proceedings,
            ...observations,
          ];

          setAllLogs(allLogs);
        };
        getMonthlyLogs();
      } catch {}
    }
  }, [scheduleId, currentDate]);

  const handleClickMoreLogs = (e: any, day: Date) => {
    const rect = e.target.getBoundingClientRect();
    const newModalPosition = {
      top: rect.top - 120,
      left: rect.left,
    };
    setModalPosition(newModalPosition);

    openModal(MoreLogModal, {
      clickDay: day,
      scheduleId,
      modalPosition: newModalPosition,
    });
  };

  const handleChangeSearchValue = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    if (!value) {
      setSearchValueList([]);
    }
  };

  const handleLogsSearch = async () => {
    const getSearchValue = await getSearchLogsValue(searchValue, scheduleId);
    setSearchValueList(getSearchValue.data);
  };

  const debouncedSearch = _debounce(handleLogsSearch, 300);

  useEffect(() => {
    if (searchValue) {
      debouncedSearch();

      return () => {
        debouncedSearch.cancel();
      };
    }
  }, [searchValue]);

  return (
    <SCalendarWrapper>
      <SCalendarHeaderWrapper>
        <SCalendarHeader>
          <button onClick={handlePrevMonth}>&lt;</button>
          <SYearMonth>
            {format(currentDate, 'yyyy년 MMMM', { locale: ko })}
          </SYearMonth>
          <button onClick={handleNextMonth}>&gt;</button>
        </SCalendarHeader>
        <STodayButton onClick={handleMoveCurrentDate}>오늘</STodayButton>
        <SearchInput
          handleSearchInputChange={handleChangeSearchValue}
          placeholder="텍스트를 입력하세요"
          value={searchValue}
        />
      </SCalendarHeaderWrapper>

      {searchValue ? (
        <>
          <ScheduleCalendarSearchValue
            searchValueList={searchValueList}
            searchValue={searchValue}
          />
        </>
      ) : (
        <SCalendarDate>
          <SWeekBox>
            {['일', '월', '화', '수', '목', '금', '토'].map((week, index) => (
              <SWeek key={index}>{week}</SWeek>
            ))}
          </SWeekBox>
          <SDaysContainer>
            {days.map((day, index) => (
              <SDaysBox
                key={index}
                className={
                  isSameMonth(day, currentDate) ? 'white' : 'lightGray'
                }
                onClick={() => onDayClick(day)}
              >
                <SDay>
                  <div className={isToday(day) ? 'today' : ''}>
                    {format(day, 'd')}
                  </div>
                </SDay>

                {(() => {
                  const logsForDay = allLogs.filter((item) => {
                    const startDate = new Date(item.startDate);
                    const endDate = new Date(item.endDate);
                    const daysInRange = [];

                    let currentDate = startDate;
                    while (currentDate <= endDate) {
                      daysInRange.push(new Date(currentDate));
                      currentDate = addDays(currentDate, 1);
                    }
                    daysInRange.push(endDate);

                    return daysInRange.some((date) => isSameDay(date, day));
                  });

                  const visibleLogs = logsForDay.slice(0, 2);
                  const hiddenLogsCount =
                    logsForDay.length - visibleLogs.length;
                  return (
                    <SMySchedule>
                      {visibleLogs.map((item, index) => (
                        <SLogContainer key={index}>
                          <SLog color={item.color}>
                            <p>{item.title || item.studentName}</p>
                          </SLog>
                        </SLogContainer>
                      ))}
                      {hiddenLogsCount > 0 && (
                        <SMoreLogs
                          onClick={(e: any) => handleClickMoreLogs(e, day)}
                        >{`${hiddenLogsCount}개 더보기`}</SMoreLogs>
                      )}
                    </SMySchedule>
                  );
                })()}
              </SDaysBox>
            ))}
          </SDaysContainer>
        </SCalendarDate>
      )}
    </SCalendarWrapper>
  );
};

export default ScheduleCalendar;
