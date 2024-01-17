import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { IcAdd, IcGoBack } from '../../assets/icons';

const SHeader = styled.h1`
  ${({ theme }) => theme.fonts.h3}
`;
const SCaption = styled.p`
  color: ${({ theme }) => theme.colors.gray1000};
`;
const SWrapper = styled.div`
  margin-right: 10rem;
`;
const SemesterSetupBanner = () => {
  return (
    <SWrapper>
      <Link to="/home">
        <IcGoBack />
      </Link>

      <SHeader>설정</SHeader>
      <SCaption>학기 설정</SCaption>
      <div>
        <IcAdd />
        <SCaption>학기 추가하기</SCaption>
      </div>
    </SWrapper>
  );
};

export default SemesterSetupBanner;
