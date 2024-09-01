import styled from 'styled-components';
import { useToggle } from '../utils/useHooks/useToggle';
import LandingLayout from '../components/Landing/LandingLayout';
import KakaoLoginBtn from '../components/Landing/KakaoLoginBtn';
import PrivacyPolicyCheckbox from '../components/Landing/PrivacyPolicyCheckbox';
import PrivacyPolicyModal from '../components/Landing/PrivacyPolicyModal';
import { IcBackgroundIconGroup } from '../assets/icons';
import { useModals } from '../utils/useHooks/useModals';
import privacyPolicyContent from '../utils/privacyPolicyContent';

// styled //
const SLandingWrapper = styled.div`
  background-color: #f5f6ff;
  display: flex;
  align-items: center;
  position: relative;

  width: 100%;
  height: 100vh;

  @media (max-width: 768px) {
    background-size: auto;
  }
`;

const SIcBackgroundIconGroup = styled(IcBackgroundIconGroup)`
  margin-left: 3.125vw;
  z-index: 5;
  width: 612px;
  height: 477px;
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
  font-family: Pretendard;
  font-size: 18px;
  font-weight: 500;
  line-height: 24px;
  text-align: center;
  white-space: nowrap;
  display: flex;
  align-items: center;
`;
const SPrivacyPolicyPointText = styled(SPrivacyPolicyText)`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.purple000};
  margin-left: 12px;
  cursor: pointer;
`;
const SPrivacyPolicyCheckboxSection = styled.div`
  display: flex;
  align-items: center;
`;
const SBackgroundCircle = styled.div`
  position: fixed;
  bottom: 0;
  right: 0;
  transform: translateX(0%);
  width: 100%;
  height: 100vh;
  background-color: #c4cdffcc;
  /* clip-path: ellipse(30% 80% at 100% 50%); */
  clip-path: circle(50% at 100% 50%);
  z-index: 4;
`;
const SBackgroundCircle2 = styled.div`
  background-color: #dae0ffe5;
  clip-path: ellipse(45% 100% at 100% 50%);
  z-index: 3;
`;
const SBackgroundCircle3 = styled.div`
  /* width: 500px;
  height: 100vh;
  background-color: #eff1ff;
  clip-path: circle(50% at 100% 50%);
  position: fixed;
  right: 0;
  top: 0;
  transform: translateX(150%);
  z-index: 2; */
  background-color: #eff1ff;
  clip-path: ellipse(50% 100% at 100% 50%);
  z-index: 2;
`;
const Landing = () => {
  const { isToggle, setIsToggle, handleChangeToggle } = useToggle();
  const { openModal, closeModal } = useModals();

  const handleIsCheckedTrue = () => {
    closeModal(PrivacyPolicyModal);
    setIsToggle(true);
  };

  const handleClickLandingModal = () => {
    openModal(PrivacyPolicyModal, { handleIsCheckedTrue, isToggle });
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

        {/* <SBackgroundCircle></SBackgroundCircle>
        <SBackgroundCircle2></SBackgroundCircle2>
        <SBackgroundCircle3></SBackgroundCircle3> */}
        <SIcBackgroundIconGroup />
      </SBackContent>
    </SLandingWrapper>
  );
};

export default Landing;
