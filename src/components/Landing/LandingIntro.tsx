import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { isCheckedState } from '../../lib/atom';
import KakaoLoginBtn from './KakaoLoginBtn';
import PrivacyPolicyCheckbox from './PrivacyPolicyCheckbox';

import { IcLogo } from '../../assets/icons';
import { Button } from '../common/styled/Button';

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
  onPrivacyPolicyModal: () => void;
}

const LandingIntro = ({ onPrivacyPolicyModal }: PrivacyPolicyProps) => {
  const [isChecked, setIsChecked] = useRecoilState(isCheckedState);
  // 경고 모달 상태
  const [isWarning, setIsWarning] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  // 경고 상태로 변경해주는 함수
  const warning = () => {
    setIsWarning(true);
  };

  const handleGoLogin = () => {
    if (isChecked) {
      //유저의 로그인 정보를 받아오는 로직
      console.log('로그인 되었다!');
    } else {
      // console.log('개인 정보 동의 후 로그인 하세요');
      // 경고 모달 상태가 true로 바뀌는 함수 호출
      warning();
    }
    //useEffect를 통해 경고 모달 상태가 바뀔때마다,
    // 경고 모달 상태가 true라면, 모달 컴포넌트 렌더링
  };

  useEffect(() => {
    if (isWarning) {
      alert('개인정보에 동의하세요.');
      console.log('경고모달 떴다!', isWarning, isChecked);
      setIsWarning(false);
    }
  }, [isWarning]);
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
      <KakaoLoginBtn onClickLogin={handleGoLogin} />
      <SDividingline />
      {/* 개인정보 동의 체크박스 */}
      <SPrivacyPolicyCheckboxSection>
        <PrivacyPolicyCheckbox
          isChecked={isChecked}
          handleCheckboxChange={handleCheckboxChange}
        />
        <SPrivacyPolicyPointText onClick={onPrivacyPolicyModal}>
          개인 정보 보호 정책
        </SPrivacyPolicyPointText>
        <SPrivacyPolicyText>을 읽고 동의합니다.</SPrivacyPolicyText>
      </SPrivacyPolicyCheckboxSection>
    </SWrapper>
  );
};

export default LandingIntro;
