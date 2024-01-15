import styled from 'styled-components';
import { IcLogo } from '../../assets/icons';

const SHeader = styled.div`
  border: none;
  padding: 15px 1450px 15px 360px;
  border-bottom: 1px solid var(--Black-Black50, #d5d5d5);
`;

const Header = () => {
  // 로고 , 하단바
  //회원 정보 입력 폼 페이지에서만 렌더링
  return (
    <SHeader>
      <IcLogo />
    </SHeader>
  );
};

export default Header;
