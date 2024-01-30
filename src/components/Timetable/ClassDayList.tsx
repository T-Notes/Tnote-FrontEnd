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
    <>
      <div>
        {classDay.map((days) => (
          <div key={days.id} onClick={() => handleClickDay(days.day)}>
            <p>{days.day}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default ClassDayList;
