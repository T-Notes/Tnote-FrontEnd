import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Landing from '../pages/Landing';
import ProfileInfo from '../pages/ProfileInfo';
import Timetable from '../pages/Timetable';
import HomeLayout from './HomeLayout';
import SemesterSetup from '../pages/SemesterSetup';
import Callback from '../pages/Callback';
import Archive from '../pages/Archive';
import ArchiveSemester from '../pages/ArchiveSemester';
import ArchiveLogPage from '../pages/ArchiveLogPage';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/profileInfo" element={<ProfileInfo />} />
        <Route path="/login/oauth2/code/kakao" element={<Callback />} />
        <Route element={<HomeLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/home/:scheduleId" element={<Home />} />

          <Route
            path="/semesterSetup/:scheduleId"
            element={<SemesterSetup />}
          />
          <Route path="/semesterSetup/home" element={<SemesterSetup />} />
          <Route path="/semesterSetup/timetable" element={<SemesterSetup />} />

          <Route path="/timetable/:scheduleId" element={<Timetable />} />

          <Route path="/timetable" element={<Timetable />} />
          <Route path="/archive" element={<Archive />} />
          <Route path="/archive/:scheduleId" element={<Archive />} />

          <Route
            path="/archiveSemesterDetail/:scheduleId"
            element={<ArchiveSemester />}
          />
          <Route
            path="archive/logDetail/:logType/:logId"
            element={<ArchiveLogPage />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
