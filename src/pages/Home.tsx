import styled from 'styled-components';
import LeftSidebar from '../components/common/LeftSidebar';
import HomeHeader from '../components/Home/HomeHeader';
import RemainingDays from '../components/Home/RemainingDays';
import TodaySchedule from '../components/Home/TodaySchedule';

const SHomeWrapper = styled.div`
  display: flex;

  align-items: center;
  justify-content: center;
`;
const Home = () => {
  return (
    <SHomeWrapper>
      {/* <LeftSidebar /> */}
      <HomeHeader />
      <RemainingDays />
      <TodaySchedule />
    </SHomeWrapper>
  );
};

export default Home;
