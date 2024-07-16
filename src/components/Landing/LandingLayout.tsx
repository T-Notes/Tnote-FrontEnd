import styled from 'styled-components';

import { IcLogo } from '../../assets/icons';

// styled //
const SWrapper = styled.div``;

const SContentWrapper = styled.section`
  margin-top: 30px;
  margin-bottom: 20px;
  font-family: Pretendard;
  font-size: 48px;
  font-weight: 700;
  line-height: 70px;
  text-align: left;

  @media (max-width: 768px) {
    font-weight: 700;
    font-size: 28px;
    line-height: 50px;
  }

  @media (max-width: 1350px) {
    font-size: 34px;
    line-height: 60px;
  }
  @media (max-width: 1130px) {
    font-size: 30px;
    line-height: 60px;
  }
`;
const SLogo = styled.div`
  width: 146px;
  height: 40px;
`;
const SLandingContent = styled.h1``;

const SLandingContentPointText = styled(SLandingContent)`
  color: #632cfa;
`;

const LandingLayout = () => {
  return (
    <SWrapper>
      <SLogo>
        <IcLogo />
      </SLogo>

      <SContentWrapper>
        <article>
          <SLandingContent>티노트와 함께</SLandingContent>
          <SLandingContentPointText>
            선생님들의 학급 생활을 <br />더 쉽고 효율적으로
          </SLandingContentPointText>
          <SLandingContent>관리해보세요.</SLandingContent>
        </article>
      </SContentWrapper>
    </SWrapper>
  );
};

export default LandingLayout;
