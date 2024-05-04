import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useModal } from '../utils/useHooks/useModal';
import { useToggle } from '../utils/useHooks/useToggle';
import { privacyPolicyContent } from '../utils/privacyPolicyContent';
import { WarningModal } from '../components/common/WarningModal';
import LandingLayout from '../components/Landing/LandingLayout';
import KakaoLoginBtn from '../components/Landing/KakaoLoginBtn';
import PrivacyPolicyCheckbox from '../components/Landing/PrivacyPolicyCheckbox';
import PrivacyPolicyModal from '../components/Landing/PrivacyPolicyModal';
import { IcBackgroundIconGroup } from '../assets/icons';
import { useModals } from '../utils/useHooks/useModals';
// import LandingBackgroundImage from '../assets/images/LandingBackgroundImage.png';

// styled //
const SLandingWrapper = styled.div`
  // 개선 : 웹 화면 크기에 따라 달라져야 함
  /* background-image: url(${'../assets/images/LandingBackgroundImage.png'}); // 추후 수정하기 */
  background-color: #f5f6ff;
  display: flex;
  align-items: center;
  /* align-items: center;
  justify-content: center; */
  /* background-size: cover;
  background-position: center; */
  width: 100%;
  height: 100vh;
  /* position: absolute; */

  @media (max-width: 768px) {
    background-size: auto;
  }
`;

const SIcBackgroundIconGroup = styled(IcBackgroundIconGroup)`
  padding-left: 60px;
`;

const SBackContent = styled.div`
  display: flex;
  margin-left: 18.75%;
`;
const SUnderbar = styled.div`
  margin-top: 32px;
  margin-bottom: 32px;
  width: 290px;
  border-bottom: 1px solid #d5d5d5;
`;
const SPrivacyPolicyText = styled.span`
  ${({ theme }) => theme.fonts.button1}
`;
const SPrivacyPolicyPointText = styled(SPrivacyPolicyText)`
  color: ${({ theme }) => theme.colors.purple000};
  margin-left: 12px;
  cursor: pointer;
`;
const SPrivacyPolicyCheckboxSection = styled.div`
  display: flex;
  align-items: center;
`;

const Landing = () => {
  const { isToggle, setIsToggle, handleChangeToggle } = useToggle();
  const { openModal, closeModal } = useModals();

  const handleIsCheckedTrue = () => {
    closeModal(PrivacyPolicyModal);
    setIsToggle(true);
  };

  const handleClickLandingModal = () => {
    openModal(PrivacyPolicyModal, { closeModal, handleIsCheckedTrue });
  };
  return (
    <SLandingWrapper>
      <SBackContent>
        <div>
          <LandingLayout />
          <KakaoLoginBtn isChecked={isToggle} />
          <SUnderbar />

          <SPrivacyPolicyCheckboxSection>
            <PrivacyPolicyCheckbox
              isChecked={isToggle}
              onCheckboxChange={handleChangeToggle}
            />
            <SPrivacyPolicyPointText onClick={handleClickLandingModal}>
              개인 정보 보호 정책
            </SPrivacyPolicyPointText>
            <SPrivacyPolicyText>을 읽고 동의합니다.</SPrivacyPolicyText>
          </SPrivacyPolicyCheckboxSection>
        </div>

        <SIcBackgroundIconGroup />
      </SBackContent>
    </SLandingWrapper>
  );
};

export default Landing;
