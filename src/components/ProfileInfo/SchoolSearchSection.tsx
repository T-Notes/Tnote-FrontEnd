import styled from 'styled-components';
import ReactModal from 'react-modal';

import { SearchInput } from '../common/styled/Input';
import { searchCustomStyles } from '../common/styled/ModalLayout';
import {
  IcClose,
  IcSearch,
  IcCloseDropdown,
  IcOpenDropdown,
} from '../../assets/icons';
import { Button } from '../common/styled/Button';
import React, { useState } from 'react';
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
  isOpen: boolean;
  onRequestClose: () => void;
  onClickSubmit: (searchInput: string) => void;
  isCityDropdownOpen: boolean;
  handleClickCity: () => void;
  cityOption: string | null;
  handleClickType: () => void;
  isTypeDropdownOpen: boolean;
  typeOption: string | null;
  typeCode: string | null;
  cityNum: string | null;
  searchInput: string;
  handleSchoolSearchInputChange: (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => void;
  handleSelectedSchool: (schoolName: string) => void;
  handleClickCityOption: (cityNameOption: {
    cityName: string;
    cityNum: string;
  }) => void;
  handleSelectedType: (selectedType: {
    typeCode: string;
    typeValue: string;
  }) => void;
}
const SchoolSearchSection = (props: SchoolSearchProps) => {
  const {
    isOpen,
    onRequestClose,
    cityOption,
    isCityDropdownOpen,
    handleClickCity,
    handleClickCityOption,
    typeOption,
    isTypeDropdownOpen,
    handleClickType,
    handleSelectedType,
    handleSchoolSearchInputChange,
    searchInput,
    cityNum,
    typeCode,
    handleSelectedSchool,
    onClickSubmit,
  } = props;
  return (
    <>
      <ReactModal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        style={searchCustomStyles}
      >
        <>
          <IcClose onClick={onRequestClose} />
          <h1>학교검색</h1>
          {/* 시 도 옵션 선택 */}
          <label htmlFor="city">시/도*</label>
          <SearchInput
            placeholder="옵션을 선택하세요"
            readOnly
            value={cityOption || ''}
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
            value={typeOption || ''}
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
            value={searchInput}
          ></SearchInput>
          <SchoolDataLoader
            cityNum={cityNum}
            typeCode={typeCode}
            searchInput={searchInput}
            onSelectedSchool={handleSelectedSchool}
          />
          <SButton onClick={() => onClickSubmit(searchInput)}>확인</SButton>
        </>
      </ReactModal>
    </>
  );
};

export default SchoolSearchSection;
