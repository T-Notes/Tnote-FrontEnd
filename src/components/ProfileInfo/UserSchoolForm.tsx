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
import { useToggle } from '../../utils/useHooks/useToggle';

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
  /* position: relative; */
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

const SSearchInputWrapper = styled.div`
  /* margin-left: auto; */
`;
const SPoint = styled.span`
  color: ${({ theme }) => theme.colors.purple100};
`;

interface searchModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  // onClickSubmit: (searchInput: string) => void;
  userData: UserDataProps;
  setUserData: React.Dispatch<React.SetStateAction<UserDataProps>>;
}
interface ResultsProps {
  region: string;
  schoolType: string;
  schoolName: string;
}

const UserSchoolForm = (props: searchModalProps) => {
  const { isOpen, onRequestClose, userData, setUserData } = props;
  const [schoolSearchData, setSchoolSearchData] = useState<ResultsProps>({
    region: '',
    schoolType: '',
    schoolName: '',
  });
  // 드롭다운 상태 제어 코드 추가
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

  // 자식에서 해당 함수를 콜백
  const handleSelectedRegionOption = (region: string) => {
    //수정 코드
    setSchoolSearchData((prev) => ({
      ...prev,
      region: region,
    }));
    closeRegionDropdown(); //옵션 선택 후 드롭다운 닫기
  };

  const handleSelectedGubunOption = (schoolType: string) => {
    //수정 코드
    setSchoolSearchData((prev) => ({
      ...prev,
      schoolType: schoolType,
    }));
    closeGubunDropdown(); //옵션 선택 후 드롭다운 닫기
  };

  const handleSchoolSearchInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const userInputChange = e.target.value;
    // 학교 검색 폼 데이터
    //문제 지점: 유저가 입력한 값은 schoolSearchData에 담는데, 보여주는 value값은 userData.schoolName이다.
    setSchoolSearchData((searchValue) => ({
      ...searchValue,
      schoolName: userInputChange,
    }));
    console.log('유저가 입력한 값:', userInputChange);
  };

  //유저가 선택한 학교이름
  const handleSelectedSchool = (schoolName: string) => {
    // 서버에 학교 검색 조회를 하기 위해서 schoolData에 값 전달해야함 => 서버에는 입력값만 보내면 되지 않음?
    setSchoolSearchData((prevUserData) => ({
      ...prevUserData,
      schoolName: schoolName,
    }));
    // 유저 추가 정보 내용을 patch하기 위해 담아주는 값
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
            {/* 시 도 옵션 선택 */}
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

            {/* 학교 분류  */}
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
              {/* <IcSearch /> */}
              {/* 학교이름 검색 */}
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

            <SButton onClick={() => {}}>확인</SButton>
            {/* <SButton onClick={() => onClickSubmit(userData.schoolName)}>
          확인ß
        </SButton> */}
          </SSchoolSearchWrapper>
        </>
      </ReactModal>
    </>
  );
};

export default UserSchoolForm;
