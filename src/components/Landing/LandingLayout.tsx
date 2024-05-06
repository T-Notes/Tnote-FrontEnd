import styled from 'styled-components';

import { IcLogo } from '../../assets/icons';

// styled //
const SWrapper = styled.div``;

const SContentWrapper = styled.section`
  margin-top: 30px;
  margin-bottom: 20px;
`;

const SLandingContent = styled.h1`
  @media (max-width: 768px) {
    /* 화면 크기가 768px 이하일 때의 폰트 크기 */
    font-weight: 700;
    font-size: 28px;
    line-height: 50px;
  }

  @media (min-width: 769px) {
    /* 화면 크기가 769px 이상일 때의 폰트 크기 */
    ${({ theme }) => theme.fonts.h1}
  }
`;

const SLandingContentPointText = styled(SLandingContent)`
  color: ${({ theme }) => theme.colors.purple100};
`;

const LandingLayout = () => {
  return (
    <SWrapper>
      <IcLogo />
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
