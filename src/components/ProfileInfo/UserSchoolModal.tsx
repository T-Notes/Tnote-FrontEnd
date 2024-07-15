import React, { useState } from 'react';
import ReactModal from 'react-modal';
import { searchCustomStyles } from '../common/styled/ModalLayout';
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
const SSearchContainer = styled.div`
  width: 300px;
  background-color: #f7f9fc;
  > input {
    font-family: Pretendard;
    font-size: 16px;
    font-weight: 500;
    line-height: 19.09px;
    text-align: left;
  }
`;
interface searchModalProps {
  isOpen: boolean;
  onClose: () => void;
  handleSubmit: (searchInput: string) => void;
}
interface ResultsProps {
  region: string;
  schoolType: string;
  schoolName: string;
}

const UserSchoolModal = (props: searchModalProps) => {
  const { isOpen, onClose, handleSubmit } = props;
  const [schoolSearchData, setSchoolSearchData] = useState<ResultsProps>({
    region: '',
    schoolType: '',
    schoolName: '',
  });

  const [showSchoolDataLoader, setShowSchoolDataLoader] =
    useState<boolean>(true);
  const [isValid, setIsValid] = useState<boolean>(false);

  const [isGubunDropdownToggle, setIsGubunDropdownToggle] = useState(false);
  const [isRegionDropdownToggle, setIsRegionDropdownToggle] =
    useState<boolean>(false);

  const handleChangeGubunToggle = () => {
    setIsGubunDropdownToggle(!isGubunDropdownToggle);
  };
  const handleChangeRegionToggle = () => {
    setIsRegionDropdownToggle(!isRegionDropdownToggle);
  };

  const handleSelectedRegionOption = (region: string) => {
    setSchoolSearchData((prev) => ({
      ...prev,
      region: region,
    }));
    handleChangeRegionToggle();
  };

  const handleSelectedGubunOption = (schoolType: string) => {
    setSchoolSearchData((prev) => ({
      ...prev,
      schoolType: schoolType,
    }));
    handleChangeGubunToggle();
  };

  const handleSchoolSearchInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const userInputChange = e.target.value;
    setShowSchoolDataLoader(true);

    setSchoolSearchData((searchValue) => ({
      ...searchValue,
      schoolName: userInputChange,
    }));

    setIsValid(userInputChange.trim() !== '');
  };

  const handleSelectedSchool = (schoolName: string) => {
    setSchoolSearchData((prevUserData) => ({
      ...prevUserData,
      schoolName: schoolName,
    }));
    setShowSchoolDataLoader(false);
    setIsValid(true);
  };

  return (
    <>
      <ReactModal
        isOpen={isOpen}
        ariaHideApp={false}
        style={searchCustomStyles}
      >
        <>
          <SIcClose>
            <IcClose onClick={onClose} className="pointer" />
          </SIcClose>
          <SSchoolSearchWrapper>
            <SModalTitle>학교검색</SModalTitle>

            <CityAndTypeSelection
              label="시/도"
              value={schoolSearchData.region}
              handleChangeToggle={handleChangeRegionToggle}
              isToggle={isRegionDropdownToggle}
              dropdownList={
                <RegionDropdownList
                  onSelectedRegion={handleSelectedRegionOption}
                />
              }
            />

            <CityAndTypeSelection
              label="학교분류"
              value={schoolSearchData.schoolType}
              handleChangeToggle={handleChangeGubunToggle}
              isToggle={isGubunDropdownToggle}
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
                <SSearchContainer>
                  <SearchInput
                    handleSearchInputChange={handleSchoolSearchInputChange}
                    placeholder="텍스트를 입력하세요"
                    value={schoolSearchData.schoolName}
                  ></SearchInput>
                </SSearchContainer>

                {showSchoolDataLoader && (
                  <SchoolDataLoader
                    schoolData={schoolSearchData}
                    handleSelectedSchool={handleSelectedSchool}
                  />
                )}
              </SSearchWrapper>
            </SInputBox>

            <SButton
              onClick={() => handleSubmit(schoolSearchData.schoolName)}
              style={{
                backgroundColor: isValid ? '#632CFA' : '#F3F3F3',
                color: isValid ? '#FFFFFF' : '#A6A6A6',
                cursor: isValid ? 'pointer' : 'not-allowed',
              }}
            >
              확인
            </SButton>
          </SSchoolSearchWrapper>
        </>
      </ReactModal>
    </>
  );
};

export default UserSchoolModal;
