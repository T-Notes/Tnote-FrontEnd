import styled from 'styled-components';
import { IcCloseDropdownSmall, IcOpenDropdownSmall } from '../../assets/icons';
import { useToggle } from '../../utils/useHooks/useToggle';

interface StyledDropdownInputProps {
  size?: 'small' | 'large';
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
      case 'small':
        return '300px';
      case 'large':
        return '550px';
    }
  }};
  height: 40px;
  display: flex;
  align-items: center;
  opacity: 1;
  border-radius: 4px;

  padding: 10px 10px 10px 16px;
  border: 1px solid #d5d5d5;
`;
const SDropdownInput = styled.input`
  width: 250px;
  ${({ theme }) => theme.fonts.caption};
  &::placeholder {
    color: ${({ theme }) => theme.colors.gray600};
  }
`;
interface DropdownProps {
  placeholder: string;
  value: string;
  size?: 'small' | 'large';
  theme: {
    background: string;
  };
  dropdownList: any;
}
const DropdownInput = (props: DropdownProps) => {
  const { placeholder, value, size, theme, dropdownList } = props;
  const { isToggle, handleChangeToggle } = useToggle();

  return (
    <>
      <SDropdownInputWrapper size={size} theme={theme}>
        <SDropdownInput placeholder={placeholder} value={value} readOnly />
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
        {isToggle && dropdownList}
      </SDropdownInputWrapper>
    </>
  );
};

export default DropdownInput;
