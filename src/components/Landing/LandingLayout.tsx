import styled from 'styled-components';
import { useState, useEffect } from 'react';

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

const SLandingContent = styled.h1`
  ${({ theme }) => theme.fonts.h1}
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
