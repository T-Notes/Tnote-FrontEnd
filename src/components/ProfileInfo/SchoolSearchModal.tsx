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
import { useState } from 'react';
import SelectedCityList from './SelectedCityList';
import SchoolTypeList from './SchoolTypeList';

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
}
interface SelectedCityProps {
  cityName: string;
  cityNum: string;
}
interface SelectedTypeProps {
  typeCode: string;
  typeValue: string;
}

const SchoolSearchModal = ({ isOpen, onRequestClose }: searchModalProps) => {
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState<boolean>(false);
  const [isTypeDropdownOpen, setIsTypeDropdownOpen] = useState<boolean>(false);

  const [isCityOption, setIsCityOption] = useState<string | null>('');
  const [isTypeOption, setIsTypeOption] = useState<string | null>('');

  const handleClickCity = () => {
    setIsCityDropdownOpen(!isCityDropdownOpen);
  };

  const handleClickType = () => {
    setIsTypeDropdownOpen(!isTypeDropdownOpen);
  };

  const handleClickCityOption = (cityNameOption: SelectedCityProps) => {
    setIsCityOption(cityNameOption.cityName);
    setIsCityDropdownOpen(false); // 옵션 선택 후 드롭다운 닫기
  };

  const handleSelectedType = (selectedType: SelectedTypeProps) => {
    setIsTypeOption(selectedType.typeValue);
    //typeCode 값도 상태에 담은 후 확인 버튼 클릭 시 서버로 값 보내기
    setIsTypeDropdownOpen(false);
  };
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={searchCustomStyles}
    >
      <>
        <IcClose />
        <h1>학교검색</h1>
        {/* 시 도 옵션 선택 */}
        <label htmlFor="city">시/도*</label>
        <SearchInput
          placeholder="옵션을 선택하세요"
          readOnly
          value={isCityOption || ''}
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
          value={isTypeOption || ''}
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
        <SearchInput placeholder="텍스트를 입력하세요"></SearchInput>
        <SButton>확인</SButton>
      </>
    </ReactModal>
  );
};

export default SchoolSearchModal;
