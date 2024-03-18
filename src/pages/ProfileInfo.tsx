import { useState } from 'react';
import styled from 'styled-components';
import Header from '../components/common/Header';

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

const ProfileInfo = () => {
  return (
    <>
      <Header />
      <STextBox>
        <SText>티노트에서 사용할</SText>
        <SText>세부 정보를 입력해주세요!</SText>
      </STextBox>
      <UserInfoForm />
    </>
  );
};

export default ProfileInfo;
