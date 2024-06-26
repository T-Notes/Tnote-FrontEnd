import styled from 'styled-components';

const SRegionWrapper = styled.div`
  width: 300px;
  height: 200px;
  border-radius: 8px;
  background-color: white;
  box-shadow: 0px 6px 15px 0px #00000033;
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  z-index: 6;
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
interface SchoolCityListProps {
  onSelectedRegion: (region: string) => void;
}

const RegionDropdownList = ({ onSelectedRegion }: SchoolCityListProps) => {
  const regionList = [
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
      <SRegionWrapper>
        <SItemContainer>
          {regionList.map((region) => (
            <SList
              key={region.cityNum}
              onClick={() => onSelectedRegion(region.cityName)}
            >
              <SItem>{region.cityName}</SItem>
            </SList>
          ))}
        </SItemContainer>
      </SRegionWrapper>
    </>
  );
};

export default RegionDropdownList;
