import React, { useState } from 'react';
import ReactModal from 'react-modal';
import SchoolSearchSection from './SchoolSearchSection';
import { searchCustomStyles } from '../common/styled/ModalLayout';
import { UserDataProps } from './UserInfoForm';

interface searchModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  // onClickSubmit: (searchInput: string) => void;
  userData: UserDataProps;
  setUserData: React.Dispatch<React.SetStateAction<UserDataProps>>;
}

// interface UserDataProps {
//   schoolName: string;
//   subject: string;
//   career: string;
//   alarm: boolean;
// }
// interface UserSubjectFormProps {
//   userData: UserDataProps;
//   setUserData: React.Dispatch<React.SetStateAction<UserDataProps>>;
// }

interface ResultsProps {
  region: string;
  gubun: string;
  schoolName: string;
}

const UserSchoolForm = (props: searchModalProps) => {
  const { isOpen, onRequestClose, userData, setUserData } = props;
  const [schoolSearchData, setSchoolSearchData] = useState<ResultsProps>({
    region: '',
    gubun: '',
    schoolName: '',
  });

  const handleClickCityOption = (city: string) => {
    //수정 코드
    setSchoolSearchData((prev) => ({
      ...prev,
      region: city,
    }));

    // setIsCityDropdownOpen(false); // 옵션 선택 후 드롭다운 닫기
  };

  const handleSelectedType = (type: string) => {
    //수정 코드
    setSchoolSearchData((prev) => ({
      ...prev,
      gubun: type,
    }));

    // setIsTypeDropdownOpen(false);
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
    // setSchoolSearchData((prevUserData) => ({
    //   ...prevUserData,
    //   schoolName: schoolName,
    // }));
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
        <SchoolSearchSection
          onRequestClose={onRequestClose} // 검색 모달 닫기
          handleClickCityOption={handleClickCityOption} //  지역 선택값 저장
          handleSelectedType={handleSelectedType} // 학교 분류 선택값 저장
          handleSchoolSearchInputChange={handleSchoolSearchInputChange} // 유저가 입력하는 학교명 저장 이벤트핸들러
          handleSelectedSchool={handleSelectedSchool} // 검색 결과 리스트 중 유저가 선택한 값 저장
          // onClickSubmit={onClickSubmit} //자식 컴포넌트의 searchInput 값 받아오는 함수
          schoolData={schoolSearchData} // 서버에 보낼 학교 데이터 상태
          userData={userData}
        />
      </ReactModal>
    </>
  );
};

export default UserSchoolForm;
