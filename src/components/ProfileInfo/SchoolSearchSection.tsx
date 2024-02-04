import styled from 'styled-components';
import { useState } from 'react';
import { SearchInput } from '../common/styled/Input';
import {
  IcClose,
  IcSearch,
  IcCloseDropdown,
  IcOpenDropdown,
} from '../../assets/icons';
import { Button } from '../common/styled/Button';
import { SchoolTypeList, SchoolCityList } from './SchoolTypeList';
import SchoolDataLoader from './SchoolDataLoader';

const SButton = styled(Button)`
  width: 420px;
  height: 60px;
  background-color: ${({ theme }) => theme.colors.gray300};

  color: ${({ theme }) => theme.colors.gray100};
  ${({ theme }) => theme.fonts.button1};
`;

interface SchoolSearchProps {
  onRequestClose: () => void;
  // onClickSubmit: (searchInput: string) => void;
  isCityDropdownOpen: boolean;
  handleClickCity: () => void;
  handleClickType: () => void;
  isTypeDropdownOpen: boolean;
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
    isCityDropdownOpen,
    handleClickCity,
    handleClickCityOption,
    isTypeDropdownOpen,
    handleClickType,
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
      <>
        <IcClose onClick={onRequestClose} />
        <h1>학교검색</h1>
        {/* 시 도 옵션 선택 */}
        <label htmlFor="city">시/도*</label>
        <SearchInput
          placeholder="옵션을 선택하세요"
          readOnly
          value={schoolData.region}
        ></SearchInput>
        {isCityDropdownOpen ? (
          <IcCloseDropdown onClick={handleClickCity} />
        ) : (
          <IcOpenDropdown onClick={handleClickCity} />
        )}
        {isCityDropdownOpen && (
          <SchoolCityList onSelectedCity={handleClickCityOption} />
        )}
        {/* 학교 분류  */}
        <label htmlFor="type">학교분류*</label>
        <SearchInput
          value={schoolData.gubun}
          readOnly
          placeholder="옵션을 선택하세요"
        ></SearchInput>
        {isTypeDropdownOpen ? (
          <IcCloseDropdown onClick={handleClickType} />
        ) : (
          <IcOpenDropdown onClick={handleClickType} />
        )}
        {isTypeDropdownOpen && (
          <SchoolTypeList onSelectedSchoolType={handleSelectedType} />
        )}
        <IcSearch />
        {/* 학교이름 검색 */}
        <label htmlFor="schoolName">학교명*</label>
        <SearchInput
          onChange={handleSchoolSearchInputChange}
          placeholder="텍스트를 입력하세요"
          // value={userData.schoolName}
        ></SearchInput>
        <SchoolDataLoader
          schoolData={schoolData}
          handleSelectedSchool={handleSelectedSchool}
        />
        <SButton onClick={() => {}}>확인</SButton>
        {/* <SButton onClick={() => onClickSubmit(userData.schoolName)}>
          확인
        </SButton> */}
      </>
    </>
  );
};

export default SchoolSearchSection;
