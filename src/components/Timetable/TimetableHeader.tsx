import { tr } from 'date-fns/locale';
import { useState } from 'react';

interface IsClassAddProps {
  onClassAdd: () => void;
}
const TimetableHeader = ({ onClassAdd }: IsClassAddProps) => {
  return (
    <>
      <button onClick={onClassAdd}>추가</button>
    </>
  );
};

export default TimetableHeader;
