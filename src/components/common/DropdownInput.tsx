import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { IcCloseDropdownSmall, IcOpenDropdownSmall } from '../../assets/icons';

const SDropdownInputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  opacity: 1;
  border-radius: 8px;
  padding: 14px 18px 14px 16px;
  border: 1px solid #d5d5d5;

  @media (max-width: 1200px) {
    padding: 10px;
  }
`;
const SDropdownInput = styled.input`
  width: 100%;
  font-family: Pretendard;
  font-size: 28px;
  font-weight: 600;
  line-height: 33.41px;
  text-align: left;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  &::placeholder {
    color: #a6a6a6;
  }

  @media (max-width: 1380px) {
    font-size: 22px;
  }

  @media (max-width: 1023px) {
    font-size: 20px;
  }

  @media (max-width: 879px) {
    font-size: 16px;
  }
`;
const SDropdownIcon = styled.div`
  width: 24px;
  height: 24px;
`;
interface DropdownProps {
  placeholder: string;
  value: string;

  dropdownList: ReactNode | null;
  handleChangeToggle: () => void;
  isToggle: boolean;
}
const DropdownInput = (props: DropdownProps) => {
  const { placeholder, value, dropdownList, handleChangeToggle, isToggle } =
    props;

  return (
    <>
      <SDropdownInputWrapper>
        <SDropdownInput
          placeholder={placeholder}
          value={value}
          readOnly
          onClick={handleChangeToggle}
        />
        {dropdownList !== null && (
          <SDropdownIcon>
            {isToggle ? (
              <IcCloseDropdownSmall
                onClick={handleChangeToggle}
                className="pointer"
              />
            ) : (
              <IcOpenDropdownSmall
                onClick={handleChangeToggle}
                className="pointer"
              />
            )}
          </SDropdownIcon>
        )}
        {isToggle && dropdownList}
      </SDropdownInputWrapper>
    </>
  );
};

export default DropdownInput;
