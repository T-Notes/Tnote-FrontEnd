import styled from 'styled-components';

import HomeNavigationBar from '../components/common/HomeNavigationBar';
import SemesterSetupBanner from '../components/SemesterConfiguration/SemesterSetupBanner';
import AddSemesterForm from '../components/SemesterConfiguration/AddSemesterForm';
import SemesterSetupHeader from '../components/SemesterConfiguration/SemesterSetupHeader';

const SWrapper = styled.div`
  display: flex;
  text-align: center;
  justify-content: center;
`;
const SBody = styled.div`
  flex-direction: column;
`;
const AddSemesterSetup = () => {
  return (
    <SWrapper>
      <SBody>
        <SemesterSetupBanner />
        <AddSemesterForm />
      </SBody>
    </SWrapper>
  );
};

export default AddSemesterSetup;
