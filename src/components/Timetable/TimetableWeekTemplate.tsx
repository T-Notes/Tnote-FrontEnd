import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import instanceAxios from '../../utils/InstanceAxios';
import { useToggle } from '../../utils/useHooks/useToggle';
import ClassInfoPopup from './ClassInfoPopup';
import { colorMapping } from '../../utils/colorMapping';
import ClassAddForm from './ClassAddForm';

const STimetableWrapper = styled.table`
  margin-top: 30px;
  width: auto;
  height: auto;
  border-collapse: collapse;
`;

const SDaysWrapper = styled.td`
  border-bottom: 1px solid #ddd;
  border-right: 1px solid #ddd;
  width: 145px;
  height: 60px;
`;

const SThead = styled.td`
  border-bottom: 1px solid #ddd;
  font-size: 12px;
  color: #5b5b5b;
  font-weight: 700;
`;
// 색상 이름과 코드가 매핑된 배열
// const colorMapping: { [key: string]: string } = {
//   파란색: '#0EA5E91A',
//   보라색: '#E5E6FE',
//   노란색: '#FEF5E6',
//   빨간색: '#FEE6E6',
//   초록색: '#E6FEE7',
//   분홍색: '#FEE6F9',
//   회색: '#D9D9D9',
// };

const SSubjectBox = styled.div<{ color: string }>`
  cursor: pointer;
  font-size: 12px;
  height: 100%;
  gap: 4px;
  padding-top: 11px;
  padding-left: 10px;
  color: #5b5b5b;
  background-color: ${({ color }) => color || '#fffff'};
  width: auto;
  overflow: hidden;
  white-space: nowrap; /* 글자가 넘칠 경우 줄바꿈을 방지합니다. */
  text-overflow: ellipsis; /* 넘어간 텍스트를 생략 부호(...)로 표시합니다. */
`;
const SClassAndTime = styled.td`
  padding: 10px;
  font-size: 12px;
  color: #5b5b5b;
  font-weight: 700;
`;
const SLocation = styled.p`
  font-weight: 600;
`;
interface TimetableTemplate {
  setReloadTrigger: React.Dispatch<React.SetStateAction<boolean>>;
  reloadTrigger: boolean;
  handleOpenAddClass: () => void;
  setIsEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  setSubjectId: React.Dispatch<React.SetStateAction<string>>;
  setLastClass: React.Dispatch<React.SetStateAction<string>>;
  lastClass: string;
  subjectId: string;
}
const TimetableWeekTemplate = ({
  reloadTrigger,
  setReloadTrigger,
  handleOpenAddClass,
  setIsEditMode,
  setSubjectId,
  subjectId,
  setLastClass,
  lastClass,
}: TimetableTemplate) => {
  const { scheduleId } = useParams();
  let lastClassNumber = parseInt(lastClass.replace(/\D/g, ''), 10); // '8교시'형태로 반환되는 값 중에서 문자열을 제외하고 숫자만 추출하는 정규식
  const [subjectsList, setSubjectList] = useState<any[]>([]);
  // 과목 조회 모달 상태관리
  const [isOpenSubjectDataModal, setIsOpenSubjectDataModal] =
    useState<boolean>(false);
  const [color, setColor] = useState<string>('');

  const openSubjectDataModal = (subjectId: string) => {
    setSubjectId(subjectId);

    setIsOpenSubjectDataModal(true);
  };

  const closeSubjectDataModal = () => {
    setIsOpenSubjectDataModal(false);
  };

  // api 연결 후 주석 제거
  useEffect(() => {
    if (scheduleId) {
      const getTimetable = async () => {
        try {
          await instanceAxios
            .get(`/tnote/schedule/week/${scheduleId}`)
            .then((res) => {
              const getData = res.data;
              const subjectArray = getData.data[0].subjects;
              setColor(subjectArray.map((item: any) => item.color));
              setSubjectList(subjectArray);
              setLastClass(getData.data[0].lastClass || '9교시');
            });
        } catch (err) {
          console.log('시간표 조회에 실패했습니다.', err);
        }
      };
      getTimetable();
    }
  }, [scheduleId, reloadTrigger]);

  useEffect(() => {
    if (lastClass === '') {
      // 유저가 선택하기 전이라면 기본 값 9교시로 설정.
      lastClassNumber = 9;
    } else {
      // 유저가 마지막 교시를 선택했다면, 해당 교시까지의 시간표 출력.

      // 선택한 교시까지의 시간표 출력
      for (let hour = 1; hour <= lastClassNumber; hour++) {}
    }
  }, [lastClass]);

  const days = [
    { id: 1, day: '월요일' },
    { id: 2, day: '화요일' },
    { id: 3, day: '수요일' },
    { id: 4, day: '목요일' },
    { id: 5, day: '금요일' },
    { id: 6, day: '토요일' },
    { id: 7, day: '일요일' },
  ];
  const timetables: any = [
    { id: 1, class: '1교시', time: '09:00' },
    { id: 2, class: '2교시', time: '10:00' },
    { id: 3, class: '3교시', time: '11:00' },
    { id: 4, class: '4교시', time: '12:00' },
    { id: 5, class: '5교시', time: '13:40' },
    { id: 6, class: '6교시', time: '14:40' },
    { id: 7, class: '7교시', time: '15:40' },
    { id: 8, class: '8교시', time: '17:00' },
    { id: 9, class: '9교시', time: '18:00' },
  ];
  // lastClass 값에 따라 필요한 시간표만 추출
  const filteredTimetables = timetables.slice(0, lastClassNumber);

  // 두 값을 비교 후 맞다면 true를, 아니라면 false를 반환하는 함수를 만들자
  // 배열의 값과  filteredTimetables의 값이 맞다면 렌더링하기
  const isSameClassDay = (
    day1: string | undefined,
    day2: string | undefined,
  ) => {
    return day1 === day2;
  };
  const isSameClassTime = (
    time1: string | undefined,
    time2: string | undefined,
  ) => {
    return time1 === time2;
  };
  // 1교시~9교시 까지의 리스트 만들기
  // 유저에게 넘어온 lastClass 에 맞게 보여주기
  return (
    <STimetableWrapper>
      <thead>
        <tr>
          <td></td>
          {days.map((d) => (
            <SThead key={d.id}>
              <p>{d.day}</p>
            </SThead>
          ))}
        </tr>
      </thead>
      <tbody>
        {filteredTimetables.map((t: any) => (
          <tr key={t.id}>
            <SClassAndTime>
              <p>{t.class}</p>
              <p>{t.time}</p>
            </SClassAndTime>
            {days.map((d) => (
              <SDaysWrapper key={d.id}>
                {/* 여기서 data의 정보를 넣어줌 */}
                {subjectsList.map((item) => {
                  if (
                    isSameClassDay(item.classDay, d.day) &&
                    isSameClassTime(item.classTime, t.class)
                  ) {
                    const backgroundColor = colorMapping[item.color] || '';

                    return (
                      <SSubjectBox
                        key={item.id}
                        onClick={() => openSubjectDataModal(item.id)}
                        color={backgroundColor}
                      >
                        <SLocation>{item.subjectName}</SLocation>
                        <p>{item.classLocation}</p>
                        {item.memo ? <p>{`메모: ${item.memo}`}</p> : null}
                      </SSubjectBox>
                    );
                  }
                  return null;
                })}
              </SDaysWrapper>
            ))}
          </tr>
        ))}
        {isOpenSubjectDataModal && (
          <ClassInfoPopup
            closeSubjectDataModal={closeSubjectDataModal}
            subjectId={subjectId}
            setReloadTrigger={setReloadTrigger}
            handleOpenAddClass={handleOpenAddClass}
            setIsEditMode={setIsEditMode}
          />
        )}
      </tbody>
    </STimetableWrapper>
  );
};

export default TimetableWeekTemplate;
