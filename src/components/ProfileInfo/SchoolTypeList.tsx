import styled from 'styled-components';

const SSchoolListWrapper = styled.div`
  width: 302px;
  height: 100px;
  border-radius: 8px;
  background-color: white;
  box-shadow: 0px 6px 15px 0px #00000033;
  position: absolute;
  top: calc(60% + 5px); /* SDropdownLabel 아래로 위치 */
  left: 28%;
  z-index: 3; /* SDropdownLabel 위에 나타나도록 설정 */
  overflow-y: scroll;
`;

const SSchoolCityListWrapper = styled.div`
  width: 302px;
  height: 200px;
  border-radius: 8px;
  background-color: white;
  box-shadow: 0px 6px 15px 0px #00000033;
  position: absolute;
  top: calc(60% + 5px); /* SDropdownLabel 아래로 위치 */
  left: 28%;
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
interface SchoolTypeListProps {
  onSelectedSchoolType: (selectedType: string) => void;
}
// 학교 검색 모달 -> 학교 분류
export const SchoolTypeList = ({
  onSelectedSchoolType,
}: SchoolTypeListProps) => {
  const typeList = [
    { id: 1, typeCode: 'elem_list', typeValue: '초등학교' },
    { id: 2, typeCode: 'midd_list', typeValue: '중학교' },
    { id: 3, typeCode: 'high_list', typeValue: '고등학교' },
  ];
  return (
    <>
      <SSchoolListWrapper>
        {typeList.map((type) => (
          <SList key={type.id}>
            <SItem onClick={() => onSelectedSchoolType(type.typeValue)}>
              {type.typeValue}
            </SItem>
          </SList>
        ))}
      </SSchoolListWrapper>
    </>
  );
};

interface SchoolCityListProps {
  onSelectedCity: (region: string) => void;
}
// 학교 검색 모달 -> 시/도*
export const SchoolCityList = ({ onSelectedCity }: SchoolCityListProps) => {
  const cityList = [
    { cityNum: '100260', cityName: '서울특별시' },
    { cityNum: '100267', cityName: '부산광역시' },
    { cityNum: '100269', cityName: '인천광역시' },
    { cityNum: '100272', cityName: '대구광역시' },
    { cityNum: '100275', cityName: '광주광역시' },
    { cityNum: '100271', cityName: '대전광역시' },
    { cityNum: '100273', cityName: '울산광역시' },
    { cityNum: '100276', cityName: '경기도' },
    { cityNum: '100278', cityName: '강원도' },
    { cityNum: '100281', cityName: '충청남도' },
    { cityNum: '100280', cityName: '충청북도' },
    { cityNum: '100285', cityName: '경상북도' },
    { cityNum: '100291', cityName: '경상남도' },
    { cityNum: '100282', cityName: '전라북도' },
    { cityNum: '100292', cityName: '제주도' },
  ];
  return (
    <>
      <SSchoolCityListWrapper>
        {cityList.map((city) => (
          <SList key={city.cityNum}>
            <SItem onClick={() => onSelectedCity(city.cityName)}>
              {city.cityName}
            </SItem>
          </SList>
        ))}
      </SSchoolCityListWrapper>
    </>
  );
};
