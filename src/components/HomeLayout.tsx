import HomeNavigationBar from './common/HomeNavigationBar';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

const SLayoutWrapper = styled.div`
  position: fixed;
`;

const SContentWrapper = styled.div`
  margin-left: 13.54vw;
  @media (max-width: 960px) {
    margin-left: 0px;
  }
`;
const HomeLayout = () => {
  return (
    <>
      <SLayoutWrapper>
        <HomeNavigationBar />
      </SLayoutWrapper>

      <SContentWrapper>
        <Outlet />
      </SContentWrapper>
    </>
  );
};

export default HomeLayout;
