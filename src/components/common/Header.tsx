import styled from 'styled-components';
import { IcLogo, IcLogoHeader } from '../../assets/icons';

const SHeader = styled.div`
  border: none;
  padding: 7px;
  padding-left: 300px;
  border-bottom: 1px solid var(--Black-Black50, #d5d5d5);
`;

const Header = () => {
  return (
    <SHeader>
      <IcLogoHeader />
    </SHeader>
  );
};

export default Header;
