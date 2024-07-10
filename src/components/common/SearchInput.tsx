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
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 500;
  line-height: 19.09px;
  text-align: left;

  &::placeholder {
    color: #d5d5d5;
  }

  width: 200px;
  height: 44px;
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
