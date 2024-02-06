import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { IcAddBlack, IcGoBack } from '../../assets/icons';
import { useEffect, useState } from 'react';
import instanceAxios from '../../utils/InstanceAxios';
import { createSemester, getAllSemesterNames } from '../../utils/lib/api';
import { useCurrentDate } from '../../utils/useHooks/useCurrentDate';

const SHeader = styled.h1`
  ${({ theme }) => theme.fonts.h3}
`;
const SCaption = styled.p`
  color: ${({ theme }) => theme.colors.gray1000};
`;
const SWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.gray1100};
  margin-right: 10rem;
  width: 20rem;
  height: 100vh;
  position: fixed; /* 고정 위치 */
  top: 0; /* 맨 위에 고정 */
  left: 16rem; /* 맨 왼쪽에 고정 */
`;

interface SemesterListProps {
  id: number;
  semesterName: string;
}

interface SemesterDataProps {
  semesterName: String;
  lastClass: String;
  email: String;
  startDate: string;
  endDate: string;
}
const SemesterSetupBanner = () => {
  const [semesterList, setSemesterList] = useState<SemesterListProps[]>([]);
  const [semesterData, setSemesterDate] = useState<SemesterDataProps>({
    semesterName: '',
    lastClass: '',
    email: '',
    startDate: '',
    endDate: '',
  });

  const { year, month } = useCurrentDate();

  // 학기 자동 생성 기준
  const addSemesterName = () => {
    // month가 1~ 6월이면 상반기 =>  2학기 생성
    if (1 <= month && month <= 6) {
      setSemesterDate((prev) => ({ ...prev, semesterName: `${year}년 2학기` }));
    }
    // month가 7~12월이면 하반기 => 1학기 생성
    else if (7 <= month && month <= 12) {
      setSemesterDate((prev) => ({ ...prev, semesterName: `${year}년 1학기` }));
    }
  };
  console.log('생성한 학기 이름:', semesterData.semesterName);

  // 학기 Post
  const handleAddSemester = async () => {
    addSemesterName();
    try {
      // 학기 추가 Post
      const data = {
        semesterName: semesterData?.semesterName,
        lastClass: '',
        email: '',
        startDate: '',
        endDate: '',
      };
      await createSemester(data);
    } catch (error) {
      console.log('학기 추가에 실패했습니다.');
    }
  };
  const data = [
    {
      id: 2,
      semesterName: '2024년 2학기',
    },
    {
      id: 1,
      semesterName: '2024년 1학기',
    },
  ];
  useEffect(() => {
    const getData = async () => {
      try {
        // 배포 후 코드
        // const data = await getAllSemesterNames();
        setSemesterList(data);
      } catch (error) {
        console.log(
          '전체 학기 리스트를 조회하는데 에러가 발생했습니다.',
          error,
        );
      }
    };
    getData();
  }, []);

  return (
    <SWrapper>
      {/* 홈으로 이동 시 어디로 라우팅 되는걸까? */}
      <Link to="/home/:id">
        <IcGoBack />
      </Link>

      <SHeader>설정</SHeader>
      <SCaption>학기 설정</SCaption>
      <div>
        {semesterList.map((data) => (
          <div key={data.id}>
            <Link to={`/semesterSetup/${data.id}`}>
              <ul>
                <li>{data.semesterName}</li>
              </ul>
            </Link>
          </div>
        ))}
      </div>
      <div>
        <IcAddBlack />
        <SCaption onClick={handleAddSemester}>학기 추가하기</SCaption>
      </div>
    </SWrapper>
  );
};

export default SemesterSetupBanner;
