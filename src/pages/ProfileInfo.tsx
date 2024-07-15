import { useState } from 'react';
import styled from 'styled-components';
import Header from '../components/common/Header';
import { IcLogoHeader } from '../assets/icons';
import UserInfoForm from '../components/ProfileInfo/UserInfoForm';

const STextBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 20px;
`;
const SText = styled.div`
  ${({ theme }) => theme.fonts.h4}
  padding-bottom: 10px;
`;
const SHeader = styled.div`
  border: none;
  padding: 7px;
  padding-left: 300px;
  border-bottom: 1px solid var(--Black-Black50, #d5d5d5);
`;
const ProfileInfo = () => {
  return (
    <>
      <SHeader>
        <IcLogoHeader />
      </SHeader>
      <STextBox>
        <SText>티노트에서 사용할</SText>
        <SText>세부 정보를 입력해주세요!</SText>
      </STextBox>
      <UserInfoForm isEditMode={false} closeEditModal={() => ''} />
    </>
  );
};

export default ProfileInfo;
