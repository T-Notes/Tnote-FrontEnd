import { useState, useEffect } from 'react';

const handleDateTimeOffset = (
  startDate: Date,
  endDate: Date,
  isAllDay: boolean,
) => {
  // 의문: 서버애서도 해당 시간을 한국 로컬 시간으로 인식해서 보내는가?
  startDate = new Date(
    startDate.getTime() - startDate.getTimezoneOffset() * 60000,
  ); // 시작 날짜의 시간대 오프셋 적용
  endDate = new Date(endDate.getTime() - endDate.getTimezoneOffset() * 60000); // 종료 날짜의 시간대 오프셋 적용

  const ISOStartDate = startDate.toISOString();
  const ISOEndDate = endDate.toISOString();
  return { ISOStartDate, ISOEndDate };
};

export default handleDateTimeOffset;

// const handleDateValue = (
//   startDate: Date,
//   endDate: Date,
//   isAllDay: boolean,
// ) => {
//   // 의문: 서버애서도 해당 시간을 한국 로컬 시간으로 인식해서 보내는가?
//   startDate = new Date(
//     startDate.getTime() - startDate.getTimezoneOffset() * 60000,
//   ); // 시작 날짜의 시간대 오프셋 적용
//   endDate = new Date(endDate.getTime() - endDate.getTimezoneOffset() * 60000); // 종료 날짜의 시간대 오프셋 적용

//   setDate((prevDate) => ({
//     ...prevDate,
//     startDate: startDate.toISOString(),
//     endDate: endDate.toISOString(),
//   }));
//   setParentsIsAllDay(isAllDay);
// };
