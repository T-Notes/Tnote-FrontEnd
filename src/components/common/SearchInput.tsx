import styled from 'styled-components';
import { IcSearch } from '../../assets/icons';

const SSearchWrapper = styled.div`
  display: flex;
  align-items: center;
  opacity: 1;
  border-radius: 4px;
  padding-left: 16px;
  border: 1px solid #d5d5d5;
`;
const SSearchInput = styled.input`
  ${({ theme }) => theme.fonts.caption}
  &::placeholder {
    color: ${({ theme }) => theme.colors.gray600};
  }
  width: 200px;
  padding: 10px;
`;
interface SearchProps {
  placeholder: string;
  value: string;
  handleSearchInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const SearchInput = (props: SearchProps) => {
  const { placeholder, value, handleSearchInputChange } = props;
  return (
    <>
      <SSearchWrapper>
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
