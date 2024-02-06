import styled from 'styled-components';
import SemesterForm from '../components/SemesterConfiguration/SemesterForm';
import SemesterSetupBanner from '../components/SemesterConfiguration/SemesterSetupBanner';
import SemesterSetupHeader from '../components/SemesterConfiguration/SemesterSetupHeader';

const SWrapper = styled.div`
  display: flex;
  text-align: center;
  justify-content: center;
`;
const SBody = styled.div`
  flex-direction: column;
`;
const SemesterSetup = () => {
  return (
    <SWrapper>
      <SBody>
        <SemesterSetupBanner />
        <SemesterForm />
      </SBody>
    </SWrapper>
  );
};

export default SemesterSetup;
