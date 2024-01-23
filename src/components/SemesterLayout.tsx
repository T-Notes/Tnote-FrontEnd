import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import SemesterSetupBanner from './SemesterConfiguration/SemesterSetupBanner';

const SemesterLayout = () => {
  return (
    <>
      <SemesterSetupBanner />
      <Outlet />
    </>
  );
};

export default SemesterLayout;
