import styled from 'styled-components';

const SSemesterWrapper = styled.div`
  width: 19.8vw;
  border-radius: 8px;
  background-color: white;
  box-shadow: 0px 6px 15px 0px #00000033;
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  z-index: 5;
  overflow-y: scroll;
  padding: 4px;
`;

const SList = styled.ul`
  padding-top: 10px;
  padding-bottom: 10px;
  padding-right: 10px;
  padding-left: 1.25vw;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #e6f6fc;
  }
`;
const SItem = styled.li`
  font-family: Pretendard;
  font-size: 18px;
  font-weight: 500;
  line-height: 24px;
  text-align: left;
  color: #000000;

  @media (max-width: 1380px) {
    font-size: 16px;
  }

  @media (max-width: 1023px) {
    font-size: 14px;
  }

  @media (max-width: 879px) {
    font-size: 12px;
  }
`;
interface SemesterOption {
  id: string;
  semesterName: string;
}

interface SemesterOptionProps {
  options: SemesterOption[];
  onSelectedSemester: (semesterName: string, semesterId: string) => void;
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
                onSelectedSemester(option.semesterName, option.id);
              }}
            >
              {option.semesterName}
            </SItem>
          </SList>
        ))}
      </SSemesterWrapper>
    </>
  );
};

export default SemesterDropdownList;
