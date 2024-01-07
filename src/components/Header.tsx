import styled from 'styled-components';
import { ReactComponent as ImgHeaderLogo } from '../assets/images/imgHeaderLogo.svg';

const SHeader = styled.div`
  border: none;
  padding: 15px 1450px 15px 360px;
  border-bottom: 1px solid var(--Black-Black50, #d5d5d5);
`;

const Header = () => {
  return (
    <SHeader>
      <ImgHeaderLogo />
    </SHeader>
  );
};

export default Header;
