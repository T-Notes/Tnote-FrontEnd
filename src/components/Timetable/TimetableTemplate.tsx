import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { lastClassState } from '../../utils/lib/atom';
import instanceAxios from '../../utils/InstanceAxios';
import { useToggle } from '../../utils/useHooks/useToggle';
import ClassInfoPopup from './ClassInfoPopup';

const STimetableWrapper = styled.table`
  width: 50%;
  border-collapse: collapse;
`;

const SDaysWrapper = styled.td`
  border-bottom: 1px solid #ddd;
  border-right: 1px solid #ddd;
  padding: 10px;
  text-align: center;
  width: 145px;
  height: 85px;
`;

const SThead = styled.td`
  border-bottom: 1px solid #ddd;
  border-right: 1px solid #ddd;
`;
const SSubjectBox = styled.div`
  cursor: pointer;
  border: 1px solid red;
`;

const TimetableTemplate = () => {
  const { isToggle, handleChangeToggle } = useToggle();
  const { id } = useParams();
  const [lastClass, setLastClass] = useState('9');
  const lastClassNumber = parseInt(lastClass.replace(/\D/g, ''), 10); // '8교시'형태로 반환되는 값 중에서 문자열을 제외하고 숫자만 추출하는 정규식

  //임시더미데이터
  const data = [
    {
      id: 2,
      semesterName: '3학년2학기',
      lastClass: '9교시',
      email: 'jh485200@gmail.com',
      subjects: [
        {
          id: 2,
          subjectName: '물리',
          classTime: '3교시',
          classDay: '수요일',
          classLocation: '3학년 1반 교실',
          memo: '힘내자',
          semesterName: null,
        },
      ],
      startDate: '2024-01-01',
      endDate: '2024-03-01',
    },
  ];

  // api 연결 후 주석 제거
  useEffect(() => {
    const getTimetable = async () => {
      try {
        await instanceAxios.get(`/tnote/schedule/week/${id}`).then((res) => {
          const getData = res.data;
          setLastClass(getData.lastClass);
        });
      } catch (err) {
        console.log('시간표 조회에 실패했습니다.', err);
      }
    };
    getTimetable();
  }, [id]);

  useEffect(() => {
    if (lastClass === '') {
      // 유저가 선택하기 전이라면 기본 값 9교시로 설정.
      console.log('기본값 9교시');
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
            <td>
              <p>{t.class}</p>
              <p>{t.time}</p>
            </td>
            {days.map((d) => (
              <SDaysWrapper key={d.id}>
                {/* 여기서 data의 정보를 넣어줌 */}
                {data.map((userData) => (
                  <div key={userData.id}>
                    {userData.subjects
                      .filter(
                        (subject: any) =>
                          subject.classTime === t.class &&
                          subject.classDay === d.day,
                      )
                      .map((subject: any) => (
                        <SSubjectBox
                          key={subject.id}
                          onClick={handleChangeToggle}
                        >
                          <p>{subject.classLocation}</p>
                          <p>{subject.subjectName}</p>
                        </SSubjectBox>
                      ))}
                  </div>
                ))}
              </SDaysWrapper>
            ))}
          </tr>
        ))}
        {isToggle && <ClassInfoPopup onChangeToggle={handleChangeToggle} />}
      </tbody>
    </STimetableWrapper>
  );
};

export default TimetableTemplate;
