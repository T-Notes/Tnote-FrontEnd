import LeftSidebar from '../components/LeftSidebar';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <>
      <LeftSidebar />
      <Outlet />
    </>
  );
};

export default MainLayout;
