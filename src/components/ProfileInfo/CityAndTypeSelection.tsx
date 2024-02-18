import React from 'react';
import styled from 'styled-components';
import { IcCloseDropdownSmall, IcOpenDropdownSmall } from '../../assets/icons';
import { SearchInput } from '../common/styled/Input';

const SInputContainer = styled.div`
  position: relative;
`;

const SInputBox = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 24px;
`;

const SLabel = styled.label`
  ${({ theme }) => theme.fonts.caption};
  text-align: left;
`;

const SPoint = styled.span`
  color: ${({ theme }) => theme.colors.purple100};
`;

const SDropdownIcon = styled.div`
  position: absolute;
  right: 10px; /* 아이콘 우측 여백 조절 */
  top: 35%; /* 아이콘 수직 중앙 정렬 */
  transform: translateY(-50%);
`;

interface SelectionProps {
  label: string;
  value: string;
  isDropdownOpen: boolean;
  onDropdownClick: () => void;

  dropdownListComponent: React.ReactNode;
}

const CityAndTypeSelection = ({
  label,
  value,
  isDropdownOpen,
  onDropdownClick,

  dropdownListComponent,
}: SelectionProps) => {
  return (
    <SInputContainer>
      <SInputBox>
        <SLabel htmlFor="city">
          {label}
          <SPoint>*</SPoint>
        </SLabel>
        <SearchInput placeholder="옵션을 선택하세요" readOnly value={value} />
        <SDropdownIcon>
          {isDropdownOpen ? (
            <IcCloseDropdownSmall onClick={onDropdownClick} />
          ) : (
            <IcOpenDropdownSmall onClick={onDropdownClick} />
          )}
        </SDropdownIcon>
      </SInputBox>
      {isDropdownOpen && dropdownListComponent}
    </SInputContainer>
  );
};

export default CityAndTypeSelection;
