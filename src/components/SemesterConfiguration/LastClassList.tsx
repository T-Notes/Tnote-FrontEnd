import styled from 'styled-components';

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

interface LastClassListProps {
  onSelectedSession: (per: string) => void;
}
const LastClassList = ({ onSelectedSession }: LastClassListProps) => {
  const lastClassList = [
    { id: 1, session: '1교시' },
    { id: 2, session: '2교시' },
    { id: 3, session: '3교시' },
    { id: 4, session: '4교시' },
    { id: 5, session: '5교시' },
    { id: 6, session: '6교시' },
    { id: 7, session: '7교시' },
    { id: 8, session: '8교시' },
    { id: 9, session: '9교시' },
  ];
  return (
    <SDropdownWrapper>
      {lastClassList.map((session) => (
        <SList key={session.id}>
          <SItem onClick={() => onSelectedSession(session.session)}>
            {session.session}
          </SItem>
        </SList>
      ))}
    </SDropdownWrapper>
  );
};

export default LastClassList;
