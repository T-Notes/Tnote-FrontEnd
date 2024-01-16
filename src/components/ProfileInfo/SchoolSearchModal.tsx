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
import SelectedCityList from './SelectedCityList';
import SchoolTypeList from './SchoolTypeList';
import SchoolDataLoader from './SchoolDataLoader';

const SButton = styled(Button)`
  width: 420px;
  height: 60px;
  background-color: ${({ theme }) => theme.colors.gray300};

  color: ${({ theme }) => theme.colors.gray100};
  ${({ theme }) => theme.fonts.button1};
`;

interface searchModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onClickSubmit: (searchInput: string) => void;
}
interface SelectedCityProps {
  cityName: string;
  cityNum: string;
}
interface SelectedTypeProps {
  typeCode: string;
  typeValue: string;
}

const SchoolSearchModal = ({
  isOpen,
  onRequestClose,
  onClickSubmit,
}: searchModalProps) => {
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState<boolean>(false);
  const [isTypeDropdownOpen, setIsTypeDropdownOpen] = useState<boolean>(false);

  const [cityOption, setCityOption] = useState<string | null>('');
  const [typeOption, setTypeOption] = useState<string | null>('');
  const [typeCode, setTypeCode] = useState<string | null>('');
  const [cityNum, setCityNum] = useState<string | null>('');
  const [school, setSchool] = useState<string | null>('');

  const [searchInput, setSearchInput] = useState<string>('');

  const handleClickCity = () => {
    setIsCityDropdownOpen(!isCityDropdownOpen);
  };

  const handleClickType = () => {
    setIsTypeDropdownOpen(!isTypeDropdownOpen);
  };

  const handleClickCityOption = (cityNameOption: SelectedCityProps) => {
    setCityOption(cityNameOption.cityName);
    setCityNum(cityNameOption.cityNum);
    setIsCityDropdownOpen(false); // 옵션 선택 후 드롭다운 닫기
  };

  const handleSelectedType = (selectedType: SelectedTypeProps) => {
    setTypeOption(selectedType.typeValue);
    setTypeCode(selectedType.typeCode);
    //typeCode 값도 상태에 담은 후 확인 버튼 클릭 시 서버로 값 보내기
    setIsTypeDropdownOpen(false);
  };

  const handleSchoolSearchInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSearchInput(e.target.value);
  };

  const handleSelectedSchool = (schoolName: string) => {
    // setSchool(schoolName);
    setSearchInput(schoolName);
    console.log('내가 선택한 학교이름은:', schoolName);
  };
  const handleClickSubmit = () => {
    onRequestClose();
  };
  return (
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
          <SelectedCityList onSelectedCity={handleClickCityOption} />
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
  );
};

export default SchoolSearchModal;
