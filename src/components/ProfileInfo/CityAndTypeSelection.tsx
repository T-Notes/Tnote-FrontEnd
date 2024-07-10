import React from 'react';
import styled from 'styled-components';
import DropdownInput from '../common/DropdownInput';

const SInputContainer = styled.div`
  position: relative;
`;

const SInputBox = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 24px;
`;
const SDropdownInput = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 300px;
  background-color: #f7f9fc;
  margin-left: auto;
  padding: 10px 10px 10px 16px;
  border-radius: 4px;
  border: 1px solid #d5d5d5;
  > input {
    font-family: Pretendard;
    font-size: 16px;
    font-weight: 500;
    line-height: 19.09px;
    text-align: left;

    &::placeholder {
      color: #d5d5d5;
    }
  }
`;
const SLabel = styled.label`
  ${({ theme }) => theme.fonts.caption};
  text-align: left;
`;

const SPoint = styled.span`
  color: ${({ theme }) => theme.colors.purple100};
`;

interface SelectionProps {
  label: string;
  value: string;

  handleChangeToggle: () => void;
  isToggle: boolean;
  dropdownList: React.ReactNode;
}

const CityAndTypeSelection = ({
  label,
  value,
  dropdownList,
  handleChangeToggle,
  isToggle,
}: SelectionProps) => {
  return (
    <SInputContainer>
      <SInputBox>
        <SLabel htmlFor="city">
          {label}
          <SPoint>*</SPoint>
        </SLabel>
        <SDropdownInput>
          <DropdownInput
            placeholder="옵션을 선택해주세요"
            value={value}
            handleChangeToggle={handleChangeToggle}
            isToggle={isToggle}
            dropdownList={dropdownList}
          ></DropdownInput>
        </SDropdownInput>
      </SInputBox>
    </SInputContainer>
  );
};

export default CityAndTypeSelection;
