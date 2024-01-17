import styled from 'styled-components';

import LeftSidebar from '../components/common/LeftSidebar';
import SemesterSetupBanner from '../components/SemesterConfiguration/SemesterSetupBanner';
import SemesterSetupForm from '../components/SemesterConfiguration/SemesterSetupForm';
import SemesterSetupHeader from '../components/SemesterConfiguration/SemesterSetupHeader';

const SWrapper = styled.div`
  display: flex;
`;
const SBody = styled.div`
  flex-direction: column;
`;
const SemesterConfiguration = () => {
  //학기 설정 배너,
  //학기 설정 헤더
  //폼
  return (
    <SWrapper>
      <SemesterSetupBanner />
      <SBody>
        <SemesterSetupHeader />
        <SemesterSetupForm />
      </SBody>
    </SWrapper>
  );
};

export default SemesterConfiguration;
