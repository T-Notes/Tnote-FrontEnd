import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { lastClassState } from '../../lib/atom';

const STimetableWrapper = styled.div`
  border: 1px solid black;
  display: grid;
  grid-template-columns: 300px; /* 요일 열과 강의 시간 열 정의 */
  /* grid-template-rows:  */
  gap: 1px; /* 격자 사이의 간격 설정 */
  /* border: 1px solid blue;
  display: flex;
  flex-direction: row;
  width: 60%;
  height: 40%; // 1rem은 16픽셀 */
`;
const SDaysWrapper = styled.div`
  /* display: flex; */
`;

const SDays = styled.div`
  /* margin-right: 8rem; */
  /* padding-right: 8rem;
  border-right: 1px solid #e8e8e8;
  height: 100vh;
  width: 100%;
  color: ${({ theme }) => theme.colors.gray000};
  ${({ theme }) => theme.fonts.dateText}; */
`;
const STimeWrapper = styled.div`
  /* width: 60%;

  border: 1px solid red; */
`;

const TimetableTemplate = () => {
  //임시방편으로 lastClass 값 가져오기
  const lastClass = useRecoilValue(lastClassState);

  const days = [
    { id: 1, day: '월요일' },
    { id: 2, day: '화요일' },
    { id: 3, day: '수요일' },
    { id: 4, day: '목요일' },
    { id: 5, day: '금요일' },
    { id: 6, day: '토요일' },
    { id: 7, day: '일요일' },
  ];
  const timetables = [
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

  // 1교시~9교시 까지의 리스트 만들기
  // 유저에게 넘어온 lastClass 에 맞게 보여주기
  return (
    <STimetableWrapper>
      <STimeWrapper>
        {timetables.map((t) => (
          <div key={t.id}>
            <div>{t.class}</div>
            <p>{t.time}</p>
          </div>
        ))}
      </STimeWrapper>
      <SDaysWrapper>
        {days.map((d) => (
          <SDays key={d.id}>
            <div>{d.day}</div>
          </SDays>
        ))}
      </SDaysWrapper>
    </STimetableWrapper>
  );
};

export default TimetableTemplate;
