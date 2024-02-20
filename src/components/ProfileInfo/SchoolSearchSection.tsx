import styled from 'styled-components';
import { useState } from 'react';

import { IcClose } from '../../assets/icons';
import { Button } from '../common/styled/Button';
import { SchoolTypeList, SchoolCityList } from './SchoolTypeList';
import SchoolDataLoader from './SchoolDataLoader';
import CityAndTypeSelection from './CityAndTypeSelection';
import SearchInput from '../common/SearchInput';

const SSchoolSearchWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const SModalTitle = styled.h1`
  margin-top: 20px;
  margin-bottom: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;

  ${({ theme }) => theme.fonts.h4};
`;
const SIcClose = styled.div`
  padding-left: 390px;
`;
const SButton = styled(Button)`
  width: 420px;
  height: 60px;
  background-color: ${({ theme }) => theme.colors.gray300};

  color: ${({ theme }) => theme.colors.gray100};
  ${({ theme }) => theme.fonts.caption};
`;

const SInputBox = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 40px;
`;
const SLabel = styled.label`
  ${({ theme }) => theme.fonts.caption};
  text-align: left;
`;

const SSearchInputWrapper = styled.div`
  margin-left: auto;
`;
const SPoint = styled.span`
  color: ${({ theme }) => theme.colors.purple100};
`;
interface SchoolSearchProps {
  onRequestClose: () => void;
  // onClickSubmit: (searchInput: string) => void;
  handleSchoolSearchInputChange: (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => void;
  handleSelectedSchool: (schoolName: string) => void;
  handleClickCityOption: (city: string) => void;
  handleSelectedType: (type: string) => void;
  schoolData: {
    region: string;
    gubun: string;
    schoolName: string;
  };
  userData: any;
}
const SchoolSearchSection = (props: SchoolSearchProps) => {
  const {
    onRequestClose,
    handleClickCityOption,
    handleSelectedType,
    handleSchoolSearchInputChange,
    schoolData,
    // onClickSubmit,
    handleSelectedSchool,
    userData,
  } = props;
  console.log('schoolData:', schoolData.schoolName);
  return (
    <>
      <SIcClose>
        <IcClose onClick={onRequestClose} className="pointer" />
      </SIcClose>
      <SSchoolSearchWrapper>
        <SModalTitle>학교검색</SModalTitle>
        {/* 시 도 옵션 선택 */}
        <CityAndTypeSelection
          label={'시/도'}
          value={schoolData.region}
          dropdownListComponent={
            <SchoolCityList onSelectedCity={handleClickCityOption} />
          }
        />

        {/* 학교 분류  */}
        <CityAndTypeSelection
          label="학교분류"
          value={schoolData.gubun}
          dropdownListComponent={
            <SchoolTypeList onSelectedSchoolType={handleSelectedType} />
          }
        />

        <SInputBox>
          {/* <IcSearch /> */}
          {/* 학교이름 검색 */}
          <SLabel htmlFor="schoolName">
            학교명
            <SPoint>*</SPoint>
          </SLabel>
          <SSearchInputWrapper>
            <SearchInput
              size="small"
              theme={{ background: 'blue400' }}
              handleSearchInputChange={handleSchoolSearchInputChange}
              placeholder="텍스트를 입력하세요"
              value={userData.schoolName}
            ></SearchInput>
          </SSearchInputWrapper>

          <SchoolDataLoader
            schoolData={schoolData}
            handleSelectedSchool={handleSelectedSchool}
          />
        </SInputBox>

        <SButton onClick={() => {}}>확인</SButton>
        {/* <SButton onClick={() => onClickSubmit(userData.schoolName)}>
          확인ß
        </SButton> */}
      </SSchoolSearchWrapper>
    </>
  );
};

export default SchoolSearchSection;
