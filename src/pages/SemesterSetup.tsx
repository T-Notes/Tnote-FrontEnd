import { useState } from 'react';
import styled from 'styled-components';
import SemesterForm from '../components/SemesterConfiguration/SemesterForm';
import SemesterSetupBanner from '../components/SemesterConfiguration/SemesterSetupBanner';

const SWrapper = styled.div`
  /* display: flex;
  text-align: center;
  justify-content: center; */
`;
const SBody = styled.div`
  /* flex-direction: column; */
  /* display: flex; */
`;
//학기 설정페이지
const SemesterSetup = () => {
  console.log(1, '리렌더링!');

  const [reload, setReload] = useState<boolean>(false);
  return (
    <>
      <SemesterSetupBanner />
      <SemesterForm setReload={setReload} reload={reload} />
    </>
  );
};

export default SemesterSetup;
