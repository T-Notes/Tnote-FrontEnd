import HomeNavigationBar from './common/HomeNavigationBar';
import { Outlet } from 'react-router-dom';

const HomeLayout = () => {
  return (
    <>
      <HomeNavigationBar />
      <Outlet />
    </>
  );
};

export default HomeLayout;
