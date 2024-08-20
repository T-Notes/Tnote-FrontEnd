import HomeNavigationBar from './common/HomeNavigationBar';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

const SLayoutWrapper = styled.div`
  @media (min-width: 1025px) {
    position: fixed;
    left: 0;
    top: 0;
  }
`;

const SContentWrapper = styled.div`
  margin-left: 13.54vw;
  @media (max-width: 1024px) {
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
