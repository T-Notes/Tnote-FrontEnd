import '../../App.css';
import styled from 'styled-components';
import _debounce from 'lodash/debounce';
import { ChangeEvent, useEffect, useState } from 'react';
import { ko } from 'date-fns/locale';
import { useCurrentDate } from '../../utils/useHooks/useCurrentDate';
import {
  format,
  startOfWeek,
  endOfWeek,
  addDays,
  startOfMonth,
  endOfMonth,
  isToday,
  isSameMonth,
  isWeekend,
  isSameDay,
} from 'date-fns';
import SearchInput from '../common/SearchInput';
import { Button } from '../common/styled/Button';
import { useParams } from 'react-router-dom';
import { getAllLogs, getSearchLogsValue } from '../../utils/lib/api';
import ScheduleCalendarSearchValue from '../../components/search/ScheduleCalendarSearchValue';

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
  flex: 1; /* 남은 공간을 모두 차지하도록 설정 */
  flex-wrap: wrap;
`;
const SDays = styled.div`
  font-size: 14px;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 60px;
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
  font-size: 12px;
  width: auto;
  display: flex;
  justify-content: center;
  border-radius: 8px;
  padding: 3px;
  background-color: ${({ color }) => color};
`;
interface Task {
  id: number;
  title: string;
  studentName: string;
  startDate: Date;
}
interface Reload {
  reload: boolean;
  onDayClick: (clickedDate: Date) => void;
}
const ScheduleCalendar = ({ reload, onDayClick }: Reload) => {
  const { scheduleId } = useParams();
  const [classLogs, setClassLogs] = useState<Task[]>([]);
  const [consultations, setConsultations] = useState<Task[]>([]);
  const [workLogs, setWorkLogs] = useState<Task[]>([]);
  const [observations, setObservations] = useState<Task[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');
  const [searchValueList, setSetSearchValueList] = useState<any[]>([]);

  const { currentDate, handlePrevMonth, handleNextMonth, setCurrentDate } =
    useCurrentDate();
  const formattedDate = currentDate.toISOString().split('T')[0];

  const startWeek = startOfWeek(startOfMonth(currentDate));
  const endWeek = endOfWeek(endOfMonth(currentDate));

  const days = [];
  let day = startWeek;

  // 한달 안에 들어가야 하는 날짜들을 days[]에 push
  while (day <= endWeek) {
    days.push(day);
    day = addDays(day, 1);
  }

  //   // 현재날짜로 돌아오기
  const handleCurrentDate = () => {
    setCurrentDate(startOfMonth(new Date()));
    onDayClick(new Date());
  };
  // 랜덤 색상
  const getRandomColor = (() => {
    const colors = ['#FEF5E6', '#FFD9D9', '#D2F0FF', '#F0EBFF'];
    let index = 0;

    return () => {
      const color = colors[index];
      index = (index + 1) % colors.length;

      return color;
    };
  })();

  // 월별 전체 조회하기
  useEffect(() => {
    if (scheduleId) {
      try {
        const getMonthlyLogs = async () => {
          const response = await getAllLogs(scheduleId, formattedDate);
          setClassLogs(response.data.classLogs);
          setWorkLogs(response.data.proceedings);
          setConsultations(response.data.consultations);
          setObservations(response.data.observations);
        };
        getMonthlyLogs();
      } catch {}
    }
  }, [scheduleId, reload, currentDate]);

  const handleChangeSearchValue = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    if (!value) {
      setSetSearchValueList([]); // 검색어가 비어있을 때 검색 결과를 초기화
    }
  };

  const handleLogsSearch = async () => {
    const getSearchValue = await getSearchLogsValue(searchValue);
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
        <STodayButton onClick={handleCurrentDate}>오늘</STodayButton>
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
                {classLogs.map((item) => {
                  const itemDate = new Date(item.startDate);
                  if (isSameDay(itemDate, day)) {
                    return (
                      <SLogContainer key={item.id}>
                        <SLog color={getRandomColor()}>{item.title}</SLog>
                      </SLogContainer>
                    );
                  }
                })}
                {consultations.map((item) => {
                  const itemDate = new Date(item.startDate);
                  if (isSameDay(itemDate, day)) {
                    return (
                      <SLogContainer key={item.id}>
                        <SLog color={getRandomColor()}>{item.studentName}</SLog>
                      </SLogContainer>
                    );
                  }
                })}
                {workLogs.map((item) => {
                  const itemDate = new Date(item.startDate);
                  if (isSameDay(itemDate, day)) {
                    return (
                      <SLogContainer key={item.id}>
                        <SLog color={getRandomColor()}>{item.title}</SLog>
                      </SLogContainer>
                    );
                  }
                })}
                {observations.map((item) => {
                  const itemDate = new Date(item.startDate);
                  if (isSameDay(itemDate, day)) {
                    return (
                      <SLogContainer key={item.id}>
                        <SLog color={getRandomColor()}>{item.studentName}</SLog>
                      </SLogContainer>
                    );
                  }
                })}
              </SDays>
            ))}
          </SDaysBox>
        </SCalendarDate>
      )}
    </SCalendarWrapper>
  );
};

export default ScheduleCalendar;
