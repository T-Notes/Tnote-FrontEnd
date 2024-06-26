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
  margin-left: auto;
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
            size="small"
            theme={{ background: 'blue400' }}
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
