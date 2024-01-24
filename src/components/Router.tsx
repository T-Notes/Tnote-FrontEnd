import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Landing from '../pages/Landing';
import ProfileInfo from '../pages/ProfileInfo';
import AddSemesterSetup from '../pages/AddSemesterSetup';
import Timetable from '../pages/Timetable';
import HomeLayout from './HomeLayout';
import AddSemesterForm from './SemesterConfiguration/AddSemesterForm';
import SemesterForm from './SemesterConfiguration/SemesterForm';
import SemesterLayout from './SemesterLayout';
import SemesterSetup from '../pages/SemesterSetup';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route element={<HomeLayout />}>
          <Route path="/home" element={<Home />} />
          <Route element={<SemesterLayout />}>
            <Route path="/addSemester" element={<AddSemesterSetup />} />
            <Route path="/semesterSetup/:id" element={<SemesterSetup />} />
          </Route>

          <Route path="/timetable/:id" element={<Timetable />} />
        </Route>
        {/* left sidebar 없음 */}
        <Route path="/profileInfo" element={<ProfileInfo />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
