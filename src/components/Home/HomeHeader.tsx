import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { semesterNameState } from '../../lib/atom';
import instanceAxios from '../../utils/InstanceAxios';

// 메인홈의 헤더 부분 (학기명, 추가&설정 버튼)
const HomeHeader = () => {
  const semesterName = useRecoilValue(semesterNameState);
  console.log('home header :', semesterName);
  // const [semesterName, setSemesterName] = useState<string | null>(null);
  useEffect(() => {
    // 전역에서 받아온 semesterName 상태를 담아서 렌더링
  }, []);

  return (
    <>
      <input
        readOnly
        placeholder="학기를 추가해주세요"
        defaultValue={semesterName}
      ></input>
      <Link to="/addSemester">
        <button>추가</button>
      </Link>

      <button>설정</button>
    </>
  );
};

export default HomeHeader;
