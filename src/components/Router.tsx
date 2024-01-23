import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Landing from '../pages/Landing';
import ProfileInfo from '../pages/ProfileInfo';
import SemesterConfiguration from '../pages/SemesterConfiguration';
import Timetable from '../pages/Timetable';
import HomeLayout from './HomeLayout';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        {/* <Route element={<HomeLayout />}> */}
        <Route element={<HomeLayout />}>
          <Route path="/home" element={<Home />} />
          <Route
            path="/semesterConfiguration"
            element={<SemesterConfiguration />}
          />
          <Route path="/timetable" element={<Timetable />} />
        </Route>
        {/* <Route path="/home" element={<Home />} />
        <Route
          path="/semesterConfiguration"
          element={<SemesterConfiguration />}
        />
        <Route path="/timetable" element={<Timetable />} /> */}
        {/* left sidebar 없음 */}
        <Route path="/profileInfo" element={<ProfileInfo />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
