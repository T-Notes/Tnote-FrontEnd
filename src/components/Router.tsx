import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Landing from '../pages/Landing';
import ProfileInfo from '../pages/ProfileInfo';
import Timetable from '../pages/Timetable';
import HomeLayout from './HomeLayout';
import SemesterSetup from '../pages/SemesterSetup';
import Callback from '../utils/Callback';
import ArchiveListPage from '../pages/ArchiveListPage';
import ArchiveContainer from './Archive/ArchiveContainer';
import ArchivePage from '../pages/ArchivePage';
import ArchiveClassLog from '../pages/ArchiveClassLog';
import ArchiveProceeding from '../pages/ArchiveProceeding';
import ArchiveConsultation from '../pages/ArchiveConsultation';
import ArchiveObservation from '../pages/ArchiveObservation';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* left sidebar 없음 */}
        <Route path="/" element={<Landing />} />
        <Route path="/profileInfo" element={<ProfileInfo />} />
        <Route path="/login/oauth2/code/kakao" element={<Callback />} />
        <Route element={<HomeLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/home/:scheduleId" element={<Home />} />
          {/* 유저가 학기 추가를 해서 id를 가지고 있을때 보여줄 페이지 */}
          <Route
            path="/semesterSetup/:scheduleId"
            element={<SemesterSetup />}
          />
          {/* 유저가 학기 추가를 하기 전이라 id가 없을때 보여줄 페이지 */}
          <Route path="/semesterSetup" element={<SemesterSetup />} />

          {/* 학기 추가 후 시간표 페이지 클릭 */}
          <Route path="/timetable/:scheduleId" element={<Timetable />} />
          {/* 학기 추가 전 시간표 페이지 클릭 */}
          <Route path="/timetable" element={<Timetable />} />
          <Route path="/archive" element={<ArchiveListPage />} />
          <Route path="/archive/:scheduleId" element={<ArchiveListPage />} />
          <Route path="/archive/classLog/:id" element={<ArchiveClassLog />} />
          <Route
            path="/archive/proceeding/:id"
            element={<ArchiveProceeding />}
          />
          <Route
            path="/archive/consultation/:id"
            element={<ArchiveConsultation />}
          />
          <Route
            path="/archive/observation/:id"
            element={<ArchiveObservation />}
          />
          <Route
            path="/archiveContainer/:scheduleId"
            element={<ArchivePage />}
          />
          {/* 과목 추가 클릭 후 페이지 */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
