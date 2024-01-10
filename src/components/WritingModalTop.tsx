import styled from 'styled-components';
import React, { useState } from 'react';
import DateSelector from './DateSelector';
import { useRecoilValue } from 'recoil';
import { startDateState, endDateState } from '../recoil/atoms/dateState';
import { ReactComponent as ImgWritingTitle } from '../assets/images/imgWritingTitle.svg';
import { ReactComponent as ImgWritingPeriod } from '../assets/images/imgWritingPeriod.svg';

const STitle = styled.div`
  display: flex;
  margin-left: 95px;
  .titleInput {
    margin-left: 10px;
    border: none;
    width: 782px;
    height: 24px;
  }
`;

const SPeriod = styled.div`
  display: flex;
  margin-left: 95px;
`;

interface ModalTopProps {
  onTitleChange: (newTitle: string) => void;
  // onDateChange: (newDate: string) => void;
}
const WritingModalTop = ({ onTitleChange }: ModalTopProps) => {
  const [title, setTitle] = useState<string>('');
  const startDate = useRecoilValue(startDateState);

  const endDate = useRecoilValue(endDateState);

  const handleTitleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle); // title.length 보여주기 위함
    onTitleChange(newTitle);
  };

  return (
    <div>
      <STitle>
        <ImgWritingTitle />
        {'  '}제목*
        <input
          type="text"
          maxLength={30}
          placeholder="제목을 입력하세요"
          onChange={handleTitleInputChange}
          className="titleInput"
        ></input>
        <div>({title.length} / 30)</div>
      </STitle>
      <SPeriod>
        <ImgWritingPeriod />
        {'  '} 기간*
        <div>
          <DateSelector />
        </div>
      </SPeriod>
    </div>
  );
};

export default WritingModalTop;
