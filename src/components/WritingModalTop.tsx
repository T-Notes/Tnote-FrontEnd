import styled from 'styled-components';
import React, { useState } from 'react';
import DateSelector from './DateSelector';

import { ReactComponent as WritingTitle } from '../assets/writingTitle.svg';
import { ReactComponent as WritingPeriod } from '../assets/writingPeriod.svg';

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
const WritingModalTop = () => {
  const [title, setTitle] = useState<string>('');

  const handleTitleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  return (
    <div>
      <STitle>
        <WritingTitle />
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
        <WritingPeriod />
        {'  '} 기간*
        <div>
          <DateSelector />
        </div>
      </SPeriod>
    </div>
  );
};

export default WritingModalTop;
