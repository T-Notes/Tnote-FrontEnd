import styled from 'styled-components';
import { useEffect, useState } from 'react';
import _debounce from 'lodash/debounce';
import axios from 'axios';
import instanceAxios from '../../utils/InstanceAxios';
import { getSchoolSearchValue } from '../../utils/lib/api';

const SSearchValueWrapper = styled.ul`
  position: absolute;
  width: 100%;
  max-height: 100px;
  border-radius: 8px;
  background-color: white;
  box-shadow: 0px 6px 15px 0px #00000033;
  top: calc(100% + 4px); /* SDropdownLabel 아래로 위치 */
  left: 0;
  z-index: 3; /* SDropdownLabel 위에 나타나도록 설정 */
  overflow-y: scroll;
`;

const SList = styled.div`
  padding: 5px;
`;
const SSchool = styled.div`
  padding: 5px;
  cursor: pointer;
  &:hover {
    background-color: #e6f6fc;
  }
`;
const SSchoolName = styled.li`
  font-size: 13px;
  font-weight: 500;
`;
const SAdress = styled.p`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.gray000};
`;
interface ResultsProps {
  schoolData: {
    region: string;
    schoolType: string;
    schoolName: string;
  };
  handleSelectedSchool: (schoolName: string) => void;
}
const SchoolDataLoader = ({
  schoolData,
  handleSelectedSchool,
}: ResultsProps) => {
  console.log('schoolData:', schoolData);
  //검색 결과를 담을 배열
  const [schoolSearchResults, setSchoolSearchResults] = useState<string[][]>(
    [],
  );

  // 학교검색 결과 조회 이벤트핸들러
  // 유저가 정보를 모두 입력 후 검색을 할때, 요청이 가야함.
  const handleSchoolSearch = async () => {
    console.log(3, '학교 검색');
    //문제 지점
    try {
      console.log(
        4,
        '학교 정보:',
        schoolData,
        schoolData.schoolType,
        schoolData.region,
        schoolData.schoolName,
      ); // schoolData 값 잘 들어옴
      const response = await getSchoolSearchValue(schoolData);

      console.log(5, '학교 검색:', response.data); // 여기서 에러 발생 통신에 문제가 있다.
      setSchoolSearchResults(response.data); // 타입이 맞는지 확인해 볼 것
    } catch (err) {
      console.log('학교 검색결과 조회 에러', err);
    }
  };
  // lodash 라이브러리에서 debounce 함수 사용(모든 검색 동작에서 api호출을 하는 것을 막아줌.)
  const debouncedSearch = _debounce(handleSchoolSearch, 300);

  useEffect(() => {
    console.log(
      1,
      '학교 정보:',
      schoolData.schoolType,
      schoolData.region,
      schoolData.schoolName,
    );
    if (schoolData.schoolType && schoolData.region && schoolData.schoolName) {
      debouncedSearch();
      console.log(2);
      return () => {
        debouncedSearch.cancel();
      };
    }
  }, [schoolData]);

  return (
    <>
      {/* 고민1: 학교 검색 결과를 조회하는 api 활용 유무 */}
      <SSearchValueWrapper>
        {schoolSearchResults.map((school) => (
          <SList
            key={school[1]}
            onClick={() => handleSelectedSchool(school[0])}
          >
            <SSchool>
              <SSchoolName>{school[0]}</SSchoolName>
              <SAdress>{school[1]}</SAdress>
            </SSchool>
          </SList>
        ))}
      </SSearchValueWrapper>
    </>
  );
};
//1. 문제: 검색 후 빈값이 되었을때 리스트가 남아있음.

export default SchoolDataLoader;
