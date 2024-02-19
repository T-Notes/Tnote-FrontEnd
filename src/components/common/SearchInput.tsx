import styled from 'styled-components';
import { IcSearch } from '../../assets/icons';

interface StyledSearchInputProps {
  size?: 'small' | 'large';
  theme: {
    background: string;
  };
}
const SSearchWrapper = styled.div<StyledSearchInputProps>`
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
  z-index: 1;
  opacity: 1;
  border-radius: 4px;

  padding: 10px 10px 10px 16px;
  border: 1px solid #d5d5d5;
`;
const SSearchInput = styled.input`
  ${({ theme }) => theme.fonts.caption}
  &::placeholder {
    color: ${({ theme }) => theme.colors.gray600};
  }
  width: 200px;
  padding-left: 10px;
`;
interface SearchProps {
  placeholder: string;
  value: string;
  handleSearchInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  size?: 'small' | 'large';
  theme: {
    background: string;
  };
}
const SearchInput = (props: SearchProps) => {
  const { placeholder, value, handleSearchInputChange, size, theme } = props;
  return (
    <>
      <SSearchWrapper size={size} theme={theme}>
        <IcSearch />
        <SSearchInput
          placeholder={placeholder}
          value={value}
          onChange={handleSearchInputChange}
        />
      </SSearchWrapper>
    </>
  );
};

export default SearchInput;
