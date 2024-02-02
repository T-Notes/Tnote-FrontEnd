import React, { useState, useEffect } from 'react';
import CareerInputSection from './CareerInputSection';

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

const UserCareerForm = ({ userData, setUserData }: UserSubjectFormProps) => {
  const handleCareerInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const careerNum = e.target.value;
    // 입력값이 숫자가 아니면 무시
    if (!/^\d*$/.test(careerNum)) {
      return;
    }
    // 숫자만 포함된 값으로 설정
    setUserData((prevUserData) => ({
      ...prevUserData,
      career: careerNum,
    }));
  };

  return (
    <>
      <CareerInputSection
        handleCareerInputChange={handleCareerInputChange}
        career={userData.career}
      />
    </>
  );
};

export default UserCareerForm;
