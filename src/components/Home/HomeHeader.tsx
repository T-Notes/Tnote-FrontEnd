import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import AllSemesterNamesForm from './AllSemesterNamesForm';

// 메인홈의 헤더 부분 (학기명, 추가&설정 버튼)
const HomeHeader = () => {
  return (
    <>
      <AllSemesterNamesForm />
      <Link to="/semesterSetup/:id">
        <button>추가</button>
      </Link>

      <button>설정</button>
    </>
  );
};

export default HomeHeader;
