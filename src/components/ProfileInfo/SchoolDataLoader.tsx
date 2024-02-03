import styled from 'styled-components';
import { useEffect, useState } from 'react';
import _debounce from 'lodash/debounce';
import axios from 'axios';
import instanceAxios from '../../utils/InstanceAxios';

interface searchDataProps {
  cityNum: string | null;
  typeCode: string | null;
  searchInput: string;
  onSelectedSchool: (schoolName: string) => void;
}

interface ResultsProps {
  seq: string;
  schoolName: string;
  adres: string;
}
const SchoolDataLoader = ({
  cityNum,
  typeCode,
  searchInput,
  onSelectedSchool,
}: searchDataProps) => {
  //1. 받아온 값을 화면에 렌더링하기!
  const [schoolSearchResults, setSchoolSearchResults] = useState<
    ResultsProps[]
  >([]);
  // 학교정보 api
  const apiKey: string | undefined = process.env.REACT_APP_API_KEY;
  const apiUrl: string | undefined =
    'http://www.career.go.kr/cnet/openapi/getOpenApi.json';

  //학교정보 받아오기 (Open Api)
  const handleSchoolSearch = async () => {
    if (searchInput && typeCode && cityNum) {
      try {
        const response = await axios.get(apiUrl, {
          params: {
            apiKey: apiKey,
            svcType: 'api',
            svcCode: 'SCHOOL',
            gubun: typeCode,
            region: cityNum,
            searchSchulNm: searchInput,
          },
        });

        //응답들어오는 XML 형식에서 특정 데이터 추출하기
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(response.data, 'application/xml');

        //검색결과를 처리하는 함수 추가
        const schools = Array.from(xmlDoc.querySelectorAll('content')).map(
          (contentNode) => {
            return {
              seq: contentNode.querySelector('seq')?.textContent || '',
              schoolName:
                contentNode.querySelector('schoolName')?.textContent || '',
              adres: contentNode.querySelector('adres')?.textContent || '',
            };
          },
        );
        //만약 빈값이 들어온다면 빈배열이 되도록.

        // setSchoolSearchResults(searchInput ? schools : []);
        if (searchInput !== '') {
          //   console.log('값이 있다!');
          setSchoolSearchResults(schools);
        } else {
          //   console.log('빈배열이다');
          setSchoolSearchResults([]);
        }

        // console.log('schoolSearchResults:', schoolSearchResults); // 배열객체 형태로 들어옴 [{...}]
        // schools.forEach(({ seq, schoolName, adres }) => {
        //   console.log('성공?!:', seq, schoolName, adres); // 배열 객체 분해 값 잘 들어옴!
        // });

        // 검색결과를 담자.
      } catch (error) {
        console.error('학교 정보 검색 중 오류가 발생했습니다.', error);
      }
    }
  };
  // lodash 라이브러리에서 debounce 함수 사용(모든 검색 동작에서 api호출을 하는 것을 막아줌.)
  const debouncedSearch = _debounce(handleSchoolSearch, 300);

  useEffect(() => {
    debouncedSearch();
    return () => {
      debouncedSearch.cancel();
    };
  }, [searchInput, cityNum, typeCode]);

  return (
    <>
      {/* 고민1: 학교 검색 결과를 조회하는 api 활용 유무 */}
      <div>
        {schoolSearchResults.map((school) => (
          <div
            key={school.seq}
            onClick={() => onSelectedSchool(school.schoolName)}
          >
            <span>{school.schoolName}</span>
            <p>{school.adres}</p>
          </div>
        ))}
      </div>
    </>
  );
};
//1. 문제: 검색 후 빈값이 되었을때 리스트가 남아있음.

export default SchoolDataLoader;
