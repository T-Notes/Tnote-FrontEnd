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
import useRandomColor from '../../../utils/useHooks/useRandomColor';
import { useModals } from '../../../utils/useHooks/useModals';

const SCalendarWrapper = styled.div`
  width: 100%;
  height: auto;
`;

const SCalendarHeader = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  ${({ theme }) => theme.fonts.button1}
`;
const SCalendarDate = styled.div`
  height: auto;
`;

const SWeekBox = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
  background-color: ${({ theme }) => theme.colors.blue400};
  font-size: 14px;
  font-weight: 600;
  color: #2f2f2f;
`;
const SWeek = styled.div`
  padding: 10px;
`;
const SDaysBox = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex: 1;
  flex-wrap: wrap;
`;
const SDays = styled.div`
  font-size: 14px;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 80px;
  flex: 1;
  flex: 1 0 14%;
  padding: 5px;
  .today {
    color: #ffff;
    background-color: #7f51fc;
    padding-left: 5px;
    padding-right: 5px;
    border-radius: 8px;
  }
  cursor: pointer;
`;
const SCalendarHeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  padding-left: 30px;
  padding-right: 30px;
  padding-top: 20px;
  padding-bottom: 30px;
`;
const STodayButton = styled(Button)`
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 20px;
  padding-right: 20px;
  border: 1px solid #d5d5d5;
  border-radius: 35px;
  color: #a6a6a6;
  margin-right: auto;
  margin-left: 20px;
`;
const SYearMonth = styled.h2`
  padding-left: 20px;
  padding-right: 20px;
`;

const SLogContainer = styled.ul`
  width: 100%;
`;

const SLog = styled.div<{ color: string }>`
  font-size: 13px;
  width: auto;
  display: flex;
  justify-content: center;
  border-radius: 8px;
  padding: 3px;
  background-color: ${({ color }) => color};
`;
const SMoreLogs = styled.div`
  font-size: 13px;
  color: #a6a6a6;
  padding-top: 3px;
  &:hover {
    color: #3378ff;
  }
`;

const ScheduleCalendar = ({
  onDayClick,
}: {
  onDayClick: (clickedDate: Date) => void;
}) => {
  const { scheduleId } = useParams();
  const getRandomColor = useRandomColor();
  const [searchValue, setSearchValue] = useState<string>('');
  const [searchValueList, setSetSearchValueList] = useState<any[]>([]);
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

  const handleClickMoreLogs = (day: Date) => {
    openModal(MoreLogModal, { clickDay: day, scheduleId });
  };

  const handleChangeSearchValue = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    if (!value) {
      setSetSearchValueList([]);
    }
  };

  const handleLogsSearch = async () => {
    const getSearchValue = await getSearchLogsValue(searchValue, scheduleId);
    setSetSearchValueList(getSearchValue.data);
  };

  const debouncedSearch = _debounce(handleLogsSearch, 1000);

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
          size="small"
          theme={{ background: 'blue400' }}
          handleSearchInputChange={handleChangeSearchValue}
          placeholder="텍스트를 입력하세요"
          value={searchValue}
        />
      </SCalendarHeaderWrapper>

      {searchValueList.length > 0 ? (
        <>
          <ScheduleCalendarSearchValue searchValueList={searchValueList} />
        </>
      ) : (
        <SCalendarDate>
          <SWeekBox>
            {['일', '월', '화', '수', '목', '금', '토'].map((week, index) => (
              <SWeek key={index}>{week}</SWeek>
            ))}
          </SWeekBox>
          <SDaysBox>
            {days.map((day, index) => (
              <SDays
                key={index}
                className={
                  isSameMonth(day, currentDate) ? 'white' : 'lightGray'
                }
                onClick={() => onDayClick(day)}
              >
                <div className={isToday(day) ? 'today' : ''}>
                  {format(day, 'd')}
                </div>

                {(() => {
                  const logsForDay = allLogs.filter((item) =>
                    isSameDay(new Date(item.startDate), day),
                  );
                  const visibleLogs = logsForDay.slice(0, 2);
                  const hiddenLogsCount =
                    logsForDay.length - visibleLogs.length;
                  return (
                    <>
                      {visibleLogs.map((item, index) => (
                        <SLogContainer key={index}>
                          <SLog color={getRandomColor()}>
                            {item.title || item.studentName}
                          </SLog>
                        </SLogContainer>
                      ))}
                      {hiddenLogsCount > 0 && (
                        <SMoreLogs
                          onClick={() => handleClickMoreLogs(day)}
                        >{`그 외 ${hiddenLogsCount}개 더 보기`}</SMoreLogs>
                      )}
                    </>
                  );
                })()}
              </SDays>
            ))}
          </SDaysBox>
        </SCalendarDate>
      )}
    </SCalendarWrapper>
  );
};

export default ScheduleCalendar;
