import React, { useState } from 'react';
import ReactModal from 'react-modal';

import { searchCustomStyles } from '../common/styled/ModalLayout';
import { UserDataProps } from './UserInfoForm';

import styled from 'styled-components';
import { IcClose } from '../../assets/icons';
import { Button } from '../common/styled/Button';
import SchoolDataLoader from './SchoolDataLoader';
import CityAndTypeSelection from './CityAndTypeSelection';
import SearchInput from '../common/SearchInput';
import RegionDropdownList from './RegionDropdownList';
import GubunDropdownList from './GubunDropdownList';

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

const SSearchWrapper = styled.div`
  position: relative;
  margin-left: auto;
`;
const SLabel = styled.label`
  ${({ theme }) => theme.fonts.caption};
  text-align: left;
`;

const SPoint = styled.span`
  color: ${({ theme }) => theme.colors.purple100};
`;

interface searchModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onClickSubmit: (searchInput: string) => void;
  userData: UserDataProps;
  setUserData: React.Dispatch<React.SetStateAction<UserDataProps>>;
}
interface ResultsProps {
  region: string;
  schoolType: string;
  schoolName: string;
}

const UserSchoolForm = (props: searchModalProps) => {
  const { isOpen, onRequestClose, userData, setUserData, onClickSubmit } =
    props;
  const [schoolSearchData, setSchoolSearchData] = useState<ResultsProps>({
    region: '',
    schoolType: '',
    schoolName: '',
  });

  const [isRegionDropdownOpen, setIsRegionDropdownOpen] = useState(false);
  const openRegionDropdown = () => {
    setIsRegionDropdownOpen(true);
  };
  const closeRegionDropdown = () => {
    setIsRegionDropdownOpen(false);
  };

  const [isGubunDropdownOpen, setIsGubunDropdownOpen] = useState(false);
  const openGubunDropdown = () => {
    setIsGubunDropdownOpen(true);
  };
  const closeGubunDropdown = () => {
    setIsGubunDropdownOpen(false);
  };

  const handleSelectedRegionOption = (region: string) => {
    setSchoolSearchData((prev) => ({
      ...prev,
      region: region,
    }));
    closeRegionDropdown();
  };

  const handleSelectedGubunOption = (schoolType: string) => {
    setSchoolSearchData((prev) => ({
      ...prev,
      schoolType: schoolType,
    }));
    closeGubunDropdown();
  };

  const handleSchoolSearchInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const userInputChange = e.target.value;

    setSchoolSearchData((searchValue) => ({
      ...searchValue,
      schoolName: userInputChange,
    }));
  };

  const handleSelectedSchool = (schoolName: string) => {
    setSchoolSearchData((prevUserData) => ({
      ...prevUserData,
      schoolName: schoolName,
    }));

    setUserData((prevUserData) => ({
      ...prevUserData,
      schoolName: schoolName,
    }));
  };

  return (
    <>
      <ReactModal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        style={searchCustomStyles}
      >
        <>
          <SIcClose>
            <IcClose onClick={onRequestClose} className="pointer" />
          </SIcClose>
          <SSchoolSearchWrapper>
            <SModalTitle>학교검색</SModalTitle>

            <CityAndTypeSelection
              label="시/도"
              value={schoolSearchData.region}
              isDropdown={isRegionDropdownOpen}
              openDropdown={openRegionDropdown}
              closeDropdown={closeRegionDropdown}
              dropdownList={
                <RegionDropdownList
                  onSelectedRegion={handleSelectedRegionOption}
                />
              }
            />

            <CityAndTypeSelection
              label="학교분류"
              value={schoolSearchData.schoolType}
              isDropdown={isGubunDropdownOpen}
              openDropdown={openGubunDropdown}
              closeDropdown={closeGubunDropdown}
              dropdownList={
                <GubunDropdownList
                  onSelectedGubun={handleSelectedGubunOption}
                />
              }
            />

            <SInputBox>
              <SLabel htmlFor="schoolName">
                학교명
                <SPoint>*</SPoint>
              </SLabel>
              <SSearchWrapper>
                <SearchInput
                  size="small"
                  theme={{ background: 'blue400' }}
                  handleSearchInputChange={handleSchoolSearchInputChange}
                  placeholder="텍스트를 입력하세요"
                  value={schoolSearchData.schoolName}
                ></SearchInput>

                <SchoolDataLoader
                  schoolData={schoolSearchData}
                  handleSelectedSchool={handleSelectedSchool}
                />
              </SSearchWrapper>
            </SInputBox>

            <SButton onClick={() => onClickSubmit(userData.schoolName)}>
              확인
            </SButton>
          </SSchoolSearchWrapper>
        </>
      </ReactModal>
    </>
  );
};

export default UserSchoolForm;
