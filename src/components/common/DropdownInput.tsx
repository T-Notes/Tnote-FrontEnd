import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { IcCloseDropdownSmall, IcOpenDropdownSmall } from '../../assets/icons';

const SDropdownInput = styled.input`
  width: 100%;
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
    </>
  );
};

export default DropdownInput;
