import styled from 'styled-components';
import { useEffect, useState } from 'react';
import _debounce from 'lodash/debounce';

import { getSchoolSearchValue } from '../../utils/lib/api';

const SSearchValueWrapper = styled.ul`
  position: absolute;
  width: 100%;
  max-height: 100px;
  border-radius: 8px;
  background-color: white;
  box-shadow: 0px 6px 15px 0px #00000033;
  top: calc(100% + 4px);
  left: 0;
  z-index: 3;
  overflow-y: scroll;
`;

const SList = styled.div`
  padding: 5px;
`;
const SSchool = styled.div`
  padding: 10px;
  cursor: pointer;
  &:hover {
    background-color: #e6f6fc;
    border-radius: 4px;
  }
`;
const SSchoolName = styled.li`
  font-size: 13px;
  font-weight: 500;
  padding-bottom: 6px;
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
  const [schoolSearchResults, setSchoolSearchResults] = useState<string[][]>(
    [],
  );

  const handleSchoolSearch = async () => {
    try {
      const response = await getSchoolSearchValue(schoolData);

      setSchoolSearchResults(response.data);
    } catch (err) {
      console.log('학교 검색결과 조회 에러', err);
    }
  };

  const debouncedSearch = _debounce(handleSchoolSearch, 500);

  useEffect(() => {
    if (schoolData.schoolType && schoolData.schoolName && schoolData.region) {
      debouncedSearch();

      return () => {
        debouncedSearch.cancel();
      };
    }
  }, [schoolData]);

  return (
    <>
      {schoolData.schoolName && (
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
      )}
    </>
  );
};

export default SchoolDataLoader;
