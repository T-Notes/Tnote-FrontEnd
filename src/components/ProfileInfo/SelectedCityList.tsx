interface SelectedCityProps {
  onSelectedCity: (cityNameOption: {
    cityName: string;
    cityNum: string;
  }) => void;
}
const SelectedCityList = ({ onSelectedCity }: SelectedCityProps) => {
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
      <div>
        {cityList.map((city) => (
          <ul key={city.cityNum}>
            <li
              onClick={() =>
                onSelectedCity({
                  cityName: city.cityName,
                  cityNum: city.cityNum,
                })
              }
            >
              {city.cityName}
            </li>
          </ul>
        ))}
      </div>
    </>
  );
};

export default SelectedCityList;
