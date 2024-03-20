interface SearchValue {
  id: number;
  studentName: string;
  title: string;
  startDate: string;
  endDate: string;
}

interface Props {
  searchValueList: SearchValue[];
}

const ScheduleCalendarSearchValue = ({ searchValueList }: Props) => {
  return (
    <>
      {searchValueList.map((item, index) => {
        console.log(item.startDate);

        const searchStartDate = item.startDate.slice(0, 10);
        const searchEndDate = item.endDate.slice(0, 10);
        const searchStartTime = item.startDate.slice(11, 16);
        const searchEndTime = item.endDate.slice(11, 16);
        return (
          <div key={index}>
            <div>{searchStartDate}</div>
            <div>{searchEndDate}</div>
            <div>{searchStartTime}</div>
            <div>{searchEndTime}</div>
            <div>{item.studentName || item.title}</div>
          </div>
        );
      })}
    </>
  );
};

export default ScheduleCalendarSearchValue;
