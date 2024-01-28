import styled from 'styled-components';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { isCheckedState } from '../utils/lib/atom';
import LandingIntro from '../components/Landing/LandingIntro';
import PrivacyPolicyModal from '../components/Landing/PrivacyPolicyModal';
import { privacyPolicyContent } from '../utils/privacyPolicyContent';

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

const Landing = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isChecked, setIsChecked] = useRecoilState(isCheckedState);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleChangeIsChecked = () => {
    closeModal();
    setIsChecked(true);
  };
  return (
    <SLandingWrapper>
      <LandingIntro onPrivacyPolicyModal={openModal} />
      {isModalOpen && (
        <>
          <PrivacyPolicyModal
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            title="개인 정보 보호 정책"
            content={privacyPolicyContent}
            onPrivacyAgreement={handleChangeIsChecked}
          />
        </>
      )}
    </SLandingWrapper>
  );
};

export default Landing;
