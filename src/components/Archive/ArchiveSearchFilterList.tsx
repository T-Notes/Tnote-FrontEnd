import styled from 'styled-components';

const SOptionWrapper = styled.div`
  width: 6.875vw;
  border-radius: 0px 0px 4px 4px;
  background-color: white;
  position: absolute;
  top: calc(100% + 1px);
  left: 0;
  z-index: 5;
  box-shadow: 0px 9px 28px 8px #0000000d;
`;
const SList = styled.ul`
  padding: 5px 12px 5px 12px;
  cursor: pointer;
  color: #262626;
  &:hover {
    background-color: #1890ff;
    color: #ffff;
  }
`;
const SItem = styled.li`
  font-family: Public Sans;
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  text-align: left;
`;
interface ArchiveSearchFilterListProps {
  option: string[];
  onSelectedOption: (item: string) => void;
}

const ArchiveSearchFilterList = (props: ArchiveSearchFilterListProps) => {
  const { option, onSelectedOption } = props;
  // const archiveFilter = options.option;
  return (
    <SOptionWrapper>
      {option.map((item, index) => (
        <SList
          key={index}
          onClick={() => {
            onSelectedOption(item);
          }}
        >
          <SItem>{item}</SItem>
        </SList>
      ))}
    </SOptionWrapper>
  );
};

export default ArchiveSearchFilterList;
