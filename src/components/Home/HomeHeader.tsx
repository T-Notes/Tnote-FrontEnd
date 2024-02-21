import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import AllSemesterNamesForm from './AllSemesterNamesForm';

// 메인홈의 상단 부분 (학기명, 추가&설정 버튼)
// 시간표 상단 부분과 동일 => 공통 컴포넌트 나중에 고려하자
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
