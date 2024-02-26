import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Landing from '../pages/Landing';
import ProfileInfo from '../pages/ProfileInfo';
import AddSemester from '../pages/AddSemester';
import Timetable from '../pages/Timetable';
import HomeLayout from './HomeLayout';
import SemesterSetup from '../pages/SemesterSetup';
import Callback from '../utils/Callback';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* left sidebar 없음 */}
        <Route path="/" element={<Landing />} />
        <Route path="/profileInfo" element={<ProfileInfo />} />
        <Route path="/login/oauth2/code/kakao" element={<Callback />} />
        <Route element={<HomeLayout />}>
          <Route path="/home/:id" element={<Home />} />
          <Route
            path="/semesterSetup/:scheduleId"
            element={<SemesterSetup />}
          />
          <Route path="/addSemester" element={<AddSemester />} />
          <Route path="/timetable/:id" element={<Timetable />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
