import styled from 'styled-components';
import { useEffect, useState } from 'react';
import _debounce from 'lodash/debounce';
import axios from 'axios';
import instanceAxios from '../../utils/InstanceAxios';
import { getSchoolSearchValue } from '../../utils/lib/api';

interface ResultsProps {
  schoolData: {
    region: string;
    gubun: string;
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
  const handleSchoolSearch = async () => {
    try {
      const response = await getSchoolSearchValue(schoolData);
      setSchoolSearchResults(response); // 타입이 맞는지 확인해 볼 것
    } catch (err) {
      console.log('학교 검색결과 조회 에러', err);
    }
  };
  // lodash 라이브러리에서 debounce 함수 사용(모든 검색 동작에서 api호출을 하는 것을 막아줌.)
  const debouncedSearch = _debounce(handleSchoolSearch, 300);

  useEffect(() => {
    debouncedSearch();
    return () => {
      debouncedSearch.cancel();
    };
  }, [schoolData]);

  return (
    <>
      {/* 고민1: 학교 검색 결과를 조회하는 api 활용 유무 */}
      <div>
        {schoolSearchResults.map((school) => (
          <div key={school[1]} onClick={() => handleSelectedSchool(school[0])}>
            <span>{school[0]}</span>
            <p>{school[1]}</p>
          </div>
        ))}
      </div>
    </>
  );
};
//1. 문제: 검색 후 빈값이 되었을때 리스트가 남아있음.

export default SchoolDataLoader;
