import React, { useState } from 'react';
import SchoolSearchSection from './SchoolSearchSection';

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
interface UserDataProps {
  schoolName: string;
  subject: string;
  career: string;
  alarm: boolean;
}
interface UserSubjectFormProps {
  userData: UserDataProps;
  setUserData: React.Dispatch<React.SetStateAction<UserDataProps>>;
}

const UserSchoolForm = ({
  isOpen,
  onRequestClose,
  onClickSubmit,
  userData,
  setUserData,
}: searchModalProps & UserSubjectFormProps) => {
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState<boolean>(false);
  const [isTypeDropdownOpen, setIsTypeDropdownOpen] = useState<boolean>(false);
  const [cityOption, setCityOption] = useState<string | null>('');
  const [typeOption, setTypeOption] = useState<string | null>('');
  const [typeCode, setTypeCode] = useState<string | null>('');
  const [cityNum, setCityNum] = useState<string | null>('');

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
    setIsTypeDropdownOpen(false);
  };

  const handleSchoolSearchInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const userInputChange = e.target.value;
    setUserData((prevUserData) => ({
      ...prevUserData,
      schoolName: userInputChange,
    }));
  };

  const handleSelectedSchool = (schoolName: string) => {
    setUserData((prevUserData) => ({
      ...prevUserData,
      schoolName: schoolName,
    }));
  };

  return (
    <>
      <SchoolSearchSection
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        cityOption={cityOption}
        isCityDropdownOpen={isCityDropdownOpen}
        handleClickCity={handleClickCity}
        handleClickCityOption={handleClickCityOption}
        typeOption={typeOption}
        isTypeDropdownOpen={isTypeDropdownOpen}
        handleClickType={handleClickType}
        handleSelectedType={handleSelectedType}
        handleSchoolSearchInputChange={handleSchoolSearchInputChange}
        searchInput={userData.schoolName}
        cityNum={cityNum}
        typeCode={typeCode}
        handleSelectedSchool={handleSelectedSchool}
        onClickSubmit={onClickSubmit}
      />
    </>
  );
};

export default UserSchoolForm;
