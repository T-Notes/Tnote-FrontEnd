import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Landing from '../pages/Landing';
import ProfileInfo from '../pages/ProfileInfo';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/profileInfo" element={<ProfileInfo />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
