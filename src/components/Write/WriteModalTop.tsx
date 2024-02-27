import styled from 'styled-components';
import React, { useState } from 'react';
import WriteDatePicker from './WriteDatePicker';
import { IcDatePicker, IcSmallDatePicker, IcTitle } from '../../assets/icons';

const SWrapper = styled.div`
  /* border: 1px solid red; */
  padding-left: 10px;

  z-index: 1;
`;
const STitle = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  width: 100%;
`;
const SPointText = styled.span`
  color: #632cfa;
`;
const STitleInput = styled.input`
  ${({ theme }) => theme.fonts.caption3}
  border: none;
  padding-left: 10px;
  border-bottom: 1px solid #e8e8e8;
  width: 30.9rem;
  &::placeholder {
    color: #a6a6a6; /* placeholder의 색상 변경 */
  }

  cursor: pointer;
  &:focus {
    border-bottom: 1px solid #632cfa; /* 포커스가 있을 때 보라색으로 변경 */
  }
`;
const STitleLength = styled.div`
  padding-left: 10px;
  padding-right: 30px;
  flex-shrink: 0;
  ${({ theme }) => theme.fonts.caption4}
  color: #A6A6A6;
  /* 포커스가 있을 때 색상 변경 */
  ${STitleInput}:focus-within + & {
    color: #632cfa;
  }
`;
const SLabel = styled.p`
  padding-left: 10px;
  padding-right: 20px;
  flex-shrink: 0;
  ${({ theme }) => theme.fonts.caption3}
`;
const SPeriod = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

interface ModalTopProps {
  onTitleChange: (newTitle: string) => void;
  onStartDateChange: (startDate: any, endDate: any) => void;
}
const WritingModalTop = ({
  onTitleChange,
  onStartDateChange,
}: ModalTopProps) => {
  const [title, setTitle] = useState<string>('');

  const handleTitleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle); // title.length 보여주기 위함
    onTitleChange(newTitle);
  };

  return (
    <SWrapper>
      <STitle>
        <IcTitle />
        <SLabel>
          제목
          <SPointText>*</SPointText>
        </SLabel>

        <STitleInput
          type="text"
          maxLength={30}
          placeholder="제목을 입력하세요"
          onChange={handleTitleInputChange}
        ></STitleInput>
        <STitleLength>({title.length} / 30)</STitleLength>
      </STitle>
      <SPeriod>
        <IcSmallDatePicker />
        <SLabel>
          기간
          <SPointText>*</SPointText>
        </SLabel>
        <div>
          <WriteDatePicker onStartDateChange={onStartDateChange} />
        </div>
      </SPeriod>
    </SWrapper>
  );
};

export default WritingModalTop;
