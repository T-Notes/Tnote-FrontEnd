import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { IcCloseDropdownSmall, IcOpenDropdownSmall } from '../../assets/icons';

interface StyledDropdownInputProps {
  size?: 'mini' | 'small' | 'large';
  theme: {
    background: string;
  };
}

const SDropdownInputWrapper = styled.div<StyledDropdownInputProps>`
  position: relative;
  border: 1px solid red;

  background-color: ${(props) => {
    switch (props.theme.background) {
      case 'blue400':
        return '#F7F9FC';
      case 'white':
        return '#FFFFFF';
    }
  }};
  width: ${(props) => {
    switch (props.size) {
      case 'mini':
        return '100%';
      case 'small':
        return '300px';
      case 'large':
        return '550px';
    }
  }};
  height: ${(props) => {
    switch (props.size) {
      case 'mini':
        return '30px';
      case 'small':
        return '40px';
      case 'large':
        return '40px';
    }
  }};
  display: flex;
  align-items: center;
  opacity: 1;
  border-radius: 4px;

  padding: 10px 10px 10px 16px;
  border: 1px solid #d5d5d5;
`;
const SDropdownInput = styled.input`
  width: 250px;

  ${({ theme }) => theme.fonts.caption}
  &::placeholder {
    color: ${({ theme }) => theme.colors.gray600};
  }
`;

interface DropdownProps {
  placeholder: string;
  value: string;
  size?: 'mini' | 'small' | 'large';
  theme: {
    background: string;
  };
  dropdownList: ReactNode | null;
  handleChangeToggle: () => void;
  isToggle: boolean;
}
const DropdownInput = (props: DropdownProps) => {
  const {
    placeholder,
    value,
    size,
    theme,
    dropdownList,
    handleChangeToggle,
    isToggle,
  } = props;

  return (
    <>
      <SDropdownInputWrapper size={size} theme={theme}>
        <SDropdownInput
          placeholder={placeholder}
          value={value}
          readOnly
          onClick={handleChangeToggle}
        />
        {dropdownList !== null && (
          <div>
            <>
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
            </>
          </div>
        )}
        {isToggle && dropdownList}
      </SDropdownInputWrapper>
    </>
  );
};

export default DropdownInput;
