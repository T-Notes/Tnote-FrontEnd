import styled from 'styled-components';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { IcAddBlack, IcGoBack } from '../../assets/icons';
import { useEffect, useState } from 'react';
import { createSemester, getAllSemesterNames } from '../../utils/lib/api';
import { useCurrentDate } from '../../utils/useHooks/useCurrentDate';
import { useRecoilValue } from 'recoil';
import { userDataState } from '../../utils/lib/recoil/userDataState';

const SHeader = styled.h1`
  ${({ theme }) => theme.fonts.h2}
`;
const SSetup = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;
const SBannerText = styled.div`
  margin-top: 30px;
  padding-left: 10px;
`;
const SAddSemester = styled.div`
  display: flex;
  align-items: center;
  margin-top: 30px;
`;
const SCaption = styled.p`
  padding-bottom: 20px;
`;
const SText = styled.div`
  color: ${({ theme }) => theme.colors.gray1000};
  ${({ theme }) => theme.fonts.button1};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-left: 30px;
`;
const SWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.gray1100};
  width: 250px;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 200px;
`;
const SAddSemesterText = styled.div`
  cursor: pointer;
`;
const SSemester = styled.div<{ selected: boolean }>`
  color: ${(props) => (props.selected ? '#632CFA' : '#5E5E5E')};
  padding-bottom: 10px;
`;

interface SemesterListProps {
  id: number;
  semesterName: string;
}

const SemesterSetupBanner = () => {
  const navigate = useNavigate();
  const [semesterList, setSemesterList] = useState<SemesterListProps[]>([]);
  const { year, month } = useCurrentDate();

  const [isPostSemester, setIsPostSemester] = useState<boolean>(false);
  const [selectedSemester, setSelectedSemester] = useState<number | null>(null);

  // 학기 자동 생성 기준
  const autoCreateSemester = () => {
    let createdSemester = '';
    // month가 1~ 6월이면 상반기 =>  2학기 생성
    if (1 <= month && month <= 6) {
      createdSemester = `${year}년 2학기`;
      // month가 7~12월이면 하반기 => 1학기 생성
    } else if (7 <= month && month <= 12) {
      createdSemester = `${year}년 1학기`;
    }
    return createdSemester;
  };

  // 학기 Post
  const handleAddSemester = async () => {
    const createdSemester = autoCreateSemester();
    try {
      if (createdSemester) {
        const data = {
          semesterName: createdSemester,
          lastClass: '',
          email: '',
          startDate: new Date(),
          endDate: new Date(),
        };
        await createSemester(data);
        setIsPostSemester((prev) => !prev);
      }
    } catch (error) {
      console.log('학기 추가에 실패했습니다.', error);
    }
  };
  // 조회
  useEffect(() => {
    const getSemester = async () => {
      const updatedSemesterList = await getAllSemesterNames();
      setSemesterList(updatedSemesterList);
    };
    getSemester();
  }, [isPostSemester]);

  const handleClickBackRoute = () => {
    if (window.location.pathname.includes('home')) {
      navigate('/home');
    } else if (window.location.pathname.includes('timetable')) {
      navigate('/timetable');
    }
  };

  const handleClickRoute = (scheduleId: number) => {
    if (window.location.pathname.includes('home')) {
      navigate(`/semesterSetup/home/${scheduleId}`);
    } else if (window.location.pathname.includes('timetable')) {
      navigate(`/semesterSetup/timetable/${scheduleId}`);
    }
  };
  return (
    <SWrapper>
      <SBannerText>
        <SSetup>
          <IcGoBack onClick={handleClickBackRoute} className="pointer" />
          <SHeader>설정</SHeader>
        </SSetup>
        <SText>
          <SCaption>학기 설정</SCaption>
          {semesterList.map((semester) => (
            <SSemester
              key={semester.id}
              selected={selectedSemester === semester.id}
              onClick={() => setSelectedSemester(semester.id)}
            >
              {/* <Link to={`/semesterSetup/${semester.id}`}> */}
              <ul onClick={() => handleClickRoute(semester.id)}>
                <li className="pointer">{semester.semesterName}</li>
              </ul>
              {/* </Link> */}
            </SSemester>
          ))}
          <SAddSemester>
            <IcAddBlack />
            <SAddSemesterText onClick={handleAddSemester}>
              학기 추가하기
            </SAddSemesterText>
          </SAddSemester>
        </SText>
      </SBannerText>
    </SWrapper>
  );
};

export default SemesterSetupBanner;
