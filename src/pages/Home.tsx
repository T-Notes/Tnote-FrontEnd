import LeftSidebar from '../components/common/LeftSidebar';
import HomeHeader from '../components/Home/HomeHeader';
import RemainingDays from '../components/Home/RemainingDays';
import TodaySchedule from '../components/Home/TodaySchedule';

const Home = () => {
  return (
    <>
      {/* <LeftSidebar /> */}
      <HomeHeader />
      <RemainingDays />
      <TodaySchedule />
    </>
  );
};

export default Home;
