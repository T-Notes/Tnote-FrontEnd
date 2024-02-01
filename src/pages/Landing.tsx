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

import ImgLandingBackgroundImage from '../assets/images/LandingBackgroundImage.png';

// styled //
const SLandingWrapper = styled.div`
  // 개선 : 웹 화면 크기에 따라 달라져야 함
  background-image: url(${ImgLandingBackgroundImage});
  background-size: cover;
  width: 100%;
  height: 100vh;
  position: absolute;
`;
const SUnderbar = styled.div`
  margin-top: 32px;
  margin-bottom: 32px;
  width: 370px;
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
  align-items: center; /* 세로축 가운데 정렬 */
`;

const Landing = () => {
  const [isWarning, setIsWarning] = useState<boolean>(false);
  const [showWarningModal, setShowWarningModal] = useState<boolean>(false);

  const { isOpen, openModal, closeModal } = useModal(); //개인정보 정책 모달
  const { isToggle, setIsToggle, handleChangeToggle } = useToggle(); // checked

  const handleIsCheckedTrue = () => {
    closeModal();
    setIsToggle(true);
  };

  const closeWarmingModal = () => {
    setShowWarningModal(false);
  };
  useEffect(() => {
    if (isWarning) {
      setShowWarningModal(true);

      setIsWarning(false);
    }
  }, [isWarning]);
  return (
    <SLandingWrapper>
      <LandingLayout />
      <KakaoLoginBtn onWarning={setIsWarning} isChecked={isToggle} />
      <SUnderbar />

      <SPrivacyPolicyCheckboxSection>
        <PrivacyPolicyCheckbox
          isChecked={isToggle}
          onCheckboxChange={handleChangeToggle}
        />
        <SPrivacyPolicyPointText onClick={openModal}>
          개인 정보 보호 정책
        </SPrivacyPolicyPointText>
        <SPrivacyPolicyText>을 읽고 동의합니다.</SPrivacyPolicyText>
      </SPrivacyPolicyCheckboxSection>
      {/* 로그인 로직과 관련 */}
      {showWarningModal && <WarningModal onClose={closeWarmingModal} />}
      {isOpen && (
        <>
          <PrivacyPolicyModal
            isOpen={isOpen}
            onRequestClose={closeModal}
            title="개인 정보 보호 정책"
            content={privacyPolicyContent}
            onPrivacyAgreement={handleIsCheckedTrue}
          />
        </>
      )}
    </SLandingWrapper>
  );
};

export default Landing;
