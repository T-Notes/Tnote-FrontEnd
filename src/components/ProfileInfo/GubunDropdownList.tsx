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

interface GubunListProps {
  onSelectedGubun: (selectedGubun: string) => void;
}
// 학교 검색 모달 -> 학교 분류
const GubunDropdownList = ({ onSelectedGubun }: GubunListProps) => {
  const GubunList = [
    { id: 1, typeCode: 'elem_list', typeValue: '초등학교' },
    { id: 2, typeCode: 'midd_list', typeValue: '중학교' },
    { id: 3, typeCode: 'high_list', typeValue: '고등학교' },
  ];
  return (
    <>
      <SGubunWrapper>
        {GubunList.map((gubun) => (
          <SList key={gubun.id}>
            <SItem
              onClick={() => {
                onSelectedGubun(gubun.typeValue);
              }}
            >
              {gubun.typeValue}
            </SItem>
          </SList>
        ))}
      </SGubunWrapper>
    </>
  );
};

export default GubunDropdownList;
