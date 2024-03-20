import styled from 'styled-components';

const SSearchValueWrapper = styled.div`
  display: flex;
  padding-top: 15px;
  padding-bottom: 15px;
  margin-left: 30px;
  margin-right: 30px;
  border-bottom: 1px solid #e8e8e8;
  font-size: 16px;
  font-weight: 500;
  > div {
    padding-right: 70px;
  }
`;

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
        const searchStartDate = item.startDate.slice(0, 10);
        const searchEndDate = item.endDate.slice(0, 10);
        const searchStartTime = item.startDate.slice(11, 16);
        const searchEndTime = item.endDate.slice(11, 16);
        return (
          <SSearchValueWrapper key={index}>
            <div>
              {searchStartDate}~{searchEndDate}
            </div>
            <div>
              {searchStartTime}~{searchEndTime}
            </div>
            <div>{item.studentName || item.title}</div>
          </SSearchValueWrapper>
        );
      })}
    </>
  );
};

export default ScheduleCalendarSearchValue;
