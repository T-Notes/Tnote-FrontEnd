import { tr } from 'date-fns/locale';
import { useState } from 'react';
import styled from 'styled-components';

const STimetableHeader = styled.h1`
  padding-top: 20px;
  font-size: 20px;
  font-weight: 600;
`;
const SColorBlue = styled.span`
  color: #4987ff;
`;
interface IsClassAddProps {
  onClassAdd: () => void;
}
const TimetableHeader = () => {
  return (
    <>
      <STimetableHeader>
        <span>
          {' '}
          이번 학기의 총 수업 횟수는 <SColorBlue> {'00'}회 </SColorBlue>
          입니다.
        </span>
      </STimetableHeader>
    </>
  );
};

export default TimetableHeader;
