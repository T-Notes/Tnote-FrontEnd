import styled from 'styled-components';

const SSemesterWrapper = styled.div`
  width: 300px;
  border-radius: 8px;
  background-color: white;
  box-shadow: 0px 6px 15px 0px #00000033;
  position: absolute;
  top: calc(100% + 4px); /* SDropdownLabel 아래로 위치 */
  left: 0;
  z-index: 5; /* SDropdownLabel 위에 나타나도록 설정 */
  overflow-y: scroll;
`;

const SList = styled.ul`
  padding: 5px 10px;
`;
const SItem = styled.li`
  ${({ theme }) => theme.fonts.caption}
  padding-left: 24px;
  cursor: pointer;
  &:hover {
    background-color: #e6f6fc;
  }
`;
interface SemesterOption {
  id: string;
  name: string;
}

interface SemesterOptionProps {
  options: SemesterOption[];
  onSelectedSemester: (semester: string) => void;
}
const SemesterDropdownList = (props: SemesterOptionProps) => {
  const { options, onSelectedSemester } = props;

  return (
    <>
      <SSemesterWrapper>
        {options.map((option) => (
          <SList key={option.id}>
            <SItem
              onClick={() => {
                onSelectedSemester(option.name);
              }}
            >
              {option.name}
            </SItem>
          </SList>
        ))}
        {/* {options.map((option: any) => (
          <option key={option.id} value={option.name}>
            {option.name}
          </option>
        ))} */}
      </SSemesterWrapper>
    </>
  );
};

export default SemesterDropdownList;
