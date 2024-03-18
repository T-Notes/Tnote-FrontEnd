import styled from 'styled-components';

const SClassDaysWrapper = styled.div`
  width: 100%;
  height: 120px;
  border-radius: 8px;
  background-color: white;
  box-shadow: 0px 6px 15px 0px #00000033;
  position: absolute;
  top: calc(100% + 2px); /* SDropdownLabel 아래로 위치 */
  left: 0;
  z-index: 6; /* SDropdownLabel 위에 나타나도록 설정 */
  overflow-y: scroll;
`;
const SList = styled.ul`
  padding: 5px 10px;
`;
const SItem = styled.li`
  ${({ theme }) => theme.fonts.caption}
  padding-left: 24px;
  cursor: pointer;
  &:hover {
    background-color: #e6f6fc;
  }
`;
interface ClassDayProps {
  handleClickDay: (day: string) => void;
}

const ClassDayList = ({ handleClickDay }: ClassDayProps) => {
  const classDay = [
    { id: 1, day: '월요일' },
    { id: 2, day: '화요일' },
    { id: 3, day: '수요일' },
    { id: 4, day: '목요일' },
    { id: 5, day: '금요일' },
    { id: 6, day: '토요일' },
    { id: 7, day: '일요일' },
  ];
  return (
    <SClassDaysWrapper>
      {classDay.map((days) => (
        <SList key={days.id} onClick={() => handleClickDay(days.day)}>
          <SItem>{days.day}</SItem>
        </SList>
      ))}
    </SClassDaysWrapper>
  );
};

export default ClassDayList;
