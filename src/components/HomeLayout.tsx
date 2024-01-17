import LeftSidebar from '../components/common/LeftSidebar';
import { Outlet } from 'react-router-dom';

const HomeLayout = () => {
  return (
    <>
      <LeftSidebar />
      <Outlet />
    </>
  );
};

export default HomeLayout;
