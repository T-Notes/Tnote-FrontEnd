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
  return (
    <>
      <SemesterSetupBanner />
      <SemesterForm />
    </>
  );
};

export default SemesterSetup;
