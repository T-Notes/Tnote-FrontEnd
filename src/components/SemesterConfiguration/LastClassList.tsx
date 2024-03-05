import styled from 'styled-components';

interface LastClassListProps {
  onSelectedPeriod: (per: string) => void;
}
const SDropdownWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 150px;
  border-radius: 8px;
  background-color: white;
  box-shadow: 0px 6px 15px 0px #00000033;
  top: calc(100% + 4px); /* SDropdownLabel 아래로 위치 */
  left: 0;
  z-index: 3; /* SDropdownLabel 위에 나타나도록 설정 */
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
const LastClassList = ({ onSelectedPeriod }: LastClassListProps) => {
  const lastClassList = [
    { id: 1, period: '1교시' },
    { id: 2, period: '2교시' },
    { id: 3, period: '3교시' },
    { id: 4, period: '4교시' },
    { id: 5, period: '5교시' },
    { id: 6, period: '6교시' },
    { id: 7, period: '7교시' },
    { id: 8, period: '8교시' },
    { id: 9, period: '9교시' },
  ];
  return (
    <SDropdownWrapper>
      {lastClassList.map((per) => (
        <SList key={per.id}>
          <SItem onClick={() => onSelectedPeriod(per.period)}>
            {per.period}
          </SItem>
        </SList>
      ))}
    </SDropdownWrapper>
  );
};

export default LastClassList;
