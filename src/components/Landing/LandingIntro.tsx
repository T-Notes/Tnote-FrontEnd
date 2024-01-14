import styled from 'styled-components';
import { ReactComponentElement, useState } from 'react';
import KakaoLoginBtn from './KakaoLoginBtn';
import PrivacyPolicyCheckbox from './PrivacyPolicyCheckbox';

import { IcLogo } from '../../assets/icons';

// styled //
const SWrapper = styled.div`
  margin-top: 200px;
  margin-left: 370px;
`;

const SContentWrapper = styled.section`
  margin-top: 41px;
  margin-bottom: 42px;
`;

const SPrivacyPolicyText = styled.span`
  ${({ theme }) => theme.fonts.button1}
`;

const SPrivacyPolicyPointText = styled(SPrivacyPolicyText)`
  color: ${({ theme }) => theme.colors.purple000};
  margin-left: 12px;
  cursor: pointer;
`;

const SLandingContent = styled.h1`
  ${({ theme }) => theme.fonts.h1}
`;

const SLandingContentPointText = styled(SLandingContent)`
  color: ${({ theme }) => theme.colors.purple100};
`;

const SDividingline = styled.div`
  margin-top: 32px;
  margin-bottom: 32px;
  width: 370px;
  border-bottom: 1px solid #d5d5d5;
`;

const SPrivacyPolicyCheckboxSection = styled.div`
  display: flex;
  align-items: center; /* 세로축 가운데 정렬 */
`;

interface PrivacyPolicyProps {
  onClick: () => void;
}

const LandingIntro = ({ onClick }: PrivacyPolicyProps) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <SWrapper>
      {/* 로고 */}
      <IcLogo />
      {/* 내용 */}
      <SContentWrapper>
        <article>
          <SLandingContent>티노트와 함께</SLandingContent>
          <SLandingContentPointText>
            선생님들의 학급 생활을
          </SLandingContentPointText>
          <SLandingContentPointText>
            더 쉽고 효율적으로
          </SLandingContentPointText>
          <SLandingContent>관리해보세요.</SLandingContent>
        </article>
      </SContentWrapper>
      {/* 카카오 로그인 버튼 */}
      <KakaoLoginBtn />
      <SDividingline />
      {/* 개인정보 동의 체크박스 */}
      <SPrivacyPolicyCheckboxSection>
        <PrivacyPolicyCheckbox
          isChecked={isChecked}
          onClick={handleCheckboxChange}
        />
        <SPrivacyPolicyPointText onClick={onClick}>
          개인 정보 보호 정책
        </SPrivacyPolicyPointText>
        <SPrivacyPolicyText>을 읽고 동의합니다.</SPrivacyPolicyText>
      </SPrivacyPolicyCheckboxSection>
    </SWrapper>
  );
};

export default LandingIntro;
