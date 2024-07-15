import styled from 'styled-components';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { IcAddBlack, IcGoBack } from '../../assets/icons';
import { useEffect, useState } from 'react';
import { createSemester, getAllSemesterNames } from '../../utils/lib/api';
import { useCurrentDate } from '../../utils/useHooks/useCurrentDate';

const SHeader = styled.div`
  display: flex;

  font-family: Pretendard;
  font-size: 30px;
  font-weight: 600;
  line-height: 38.19px;
  text-align: left;
`;
const SSetup = styled.div`
  display: flex;
  margin-bottom: 20px;
`;
const SBannerText = styled.div`
  margin-top: 30px;
  padding-left: 1vw;
`;
const SAddSemester = styled.div`
  display: flex;
  align-items: center;
  padding-left: 0px;
  margin-left: 0px;
  margin-top: 30px;
`;
const SCaption = styled.p`
  padding-bottom: 20px;
`;
const SText = styled.div`
  color: #5e5e5e;

  font-family: Pretendard;
  font-size: 21px;
  font-weight: 500;
  line-height: 27.45px;
  text-align: left;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-left: 2vw;
`;
const SWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.gray1100};
  width: 18.75vw;
  min-width: 250px;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 13.54vw;
  @media (max-width: 1024px) {
    position: fixed;
    top: 80px;
    left: 0;
  }

  @media (max-width: 1200px) {
    min-width: 200px;
  }
`;
const SAddSemesterText = styled.div`
  cursor: pointer;
  margin-left: 15px;
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
  const { scheduleId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const currentUrl = location.pathname;
  const [semesterList, setSemesterList] = useState<SemesterListProps[]>([]);
  const { year, month, day } = useCurrentDate();

  const [isPostSemester, setIsPostSemester] = useState<boolean>(false);

  /** 학기 자동 생성 기준*/
  const autoCreateSemester = () => {
    let createdSemester = '';
    if (1 <= Number(month) && Number(month) <= 6) {
      createdSemester = `${year}년 2학기`;
    } else if (7 <= Number(month) && Number(month) <= 12) {
      createdSemester = `${year}년 1학기`;
    }
    return createdSemester;
  };

  const handleAddSemester = async () => {
    const createdSemester = autoCreateSemester();
    try {
      if (createdSemester) {
        const data = {
          semesterName: createdSemester,
          lastClass: '',
          email: '',
          startDate: '',
          endDate: '',
        };
        const response = await createSemester(data);
        const newSemesterId = response.data.id;

        if (newSemesterId) {
          if (currentUrl.includes('home')) {
            navigate(`/semesterSetup/home/${newSemesterId}`);
            window.location.reload();
          } else if (currentUrl.includes('timetable')) {
            navigate(`/semesterSetup/timetable/${newSemesterId}`);
            window.location.reload();
          }
        }

        setIsPostSemester((prev) => !prev);
      }
    } catch (error) {
      console.log('학기 추가에 실패했습니다.', error);
    }
  };

  useEffect(() => {
    const getSemester = async () => {
      const updatedSemesterList = await getAllSemesterNames();
      setSemesterList(updatedSemesterList);
    };
    getSemester();
  }, [isPostSemester]);

  const handleClickBackRoute = () => {
    if (currentUrl.includes('home')) {
      navigate('/home');
    } else if (currentUrl.includes('timetable')) {
      navigate('/timetable');
    }
  };

  const handleClickRoute = (scheduleId: number) => {
    if (currentUrl.includes('home')) {
      navigate(`/semesterSetup/home/${scheduleId}`);
    } else if (currentUrl.includes('timetable')) {
      navigate(`/semesterSetup/timetable/${scheduleId}`);
    }
  };
  return (
    <SWrapper>
      <SBannerText>
        <SSetup>
          <div>
            <IcGoBack onClick={handleClickBackRoute} className="pointer" />
          </div>

          <SHeader>설정</SHeader>
        </SSetup>
        <SText>
          <SCaption>학기 설정</SCaption>
          {semesterList.map((semester) => (
            <SSemester
              key={semester.id}
              selected={Number(scheduleId) === semester.id}
            >
              <ul onClick={() => handleClickRoute(semester.id)}>
                <li className="pointer">{semester.semesterName}</li>
              </ul>
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
