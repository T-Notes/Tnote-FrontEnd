import styled from 'styled-components';

const SGubunWrapper = styled.div`
  width: 300px;
  height: 100px;
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
  display: flex;
  align-items: center;
  height: 40px;
  margin-left: 4px;
  margin-right: 10px;
  border-radius: 4px;
  padding: 5px 10px;
  cursor: pointer;
  &:hover {
    background-color: #e6f6fc;
  }
`;
const SItem = styled.li`
  ${({ theme }) => theme.fonts.caption}
  padding-left: 14px;
`;
const SItemContainer = styled.div`
  margin-top: 4px;
`;

interface GubunListProps {
  onSelectedGubun: (selectedGubun: string) => void;
}
// 학교 검색 모달 -> 학교 분류
const GubunDropdownList = ({ onSelectedGubun }: GubunListProps) => {
  const GubunList = [
    { id: 1, typeCode: '초등학교', typeValue: '초등학교' },
    { id: 2, typeCode: '중학교', typeValue: '중학교' },
    { id: 3, typeCode: '고등학교', typeValue: '고등학교' },
  ];
  return (
    <>
      <SGubunWrapper>
        <SItemContainer>
          {GubunList.map((gubun) => (
            <SList
              key={gubun.id}
              onClick={() => {
                onSelectedGubun(gubun.typeValue);
              }}
            >
              <SItem>{gubun.typeValue}</SItem>
            </SList>
          ))}
        </SItemContainer>
      </SGubunWrapper>
    </>
  );
};

export default GubunDropdownList;
