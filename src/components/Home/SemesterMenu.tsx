import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import AllSemesterNamesForm from './AllSemesterNamesForm';

const SSemesterMenuWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 28px;
`;
const SButton = styled.button`
  font-family: Pretendard;
  font-size: 23px;
  font-weight: 500;
  line-height: 23.87px;
  text-align: left;
  padding: 0px 0px 0px 1.78vw;
  color: #666666;
  cursor: pointer;

  @media (max-width: 1439px) {
    font-size: 23px;
  }

  @media (max-width: 1279px) {
    font-size: 20px;
  }

  @media (max-width: 1023px) {
    font-size: 18px;
  }
`;
const SAddAndSetup = styled.div`
  margin-left: auto;
`;
interface SemesterMenu {
  onClickAddBtn: () => void;
}
const SemesterMenu = ({ onClickAddBtn }: SemesterMenu) => {
  const { scheduleId } = useParams();
  const navigate = useNavigate();

  const handleClickRoute = () => {
    if (scheduleId) {
      if (window.location.pathname.includes('home')) {
        navigate(`/semesterSetup/home/${scheduleId}`);
      } else if (window.location.pathname.includes('timetable')) {
        navigate(`/semesterSetup/timetable/${scheduleId}`);
      }
    } else if (!scheduleId) {
      if (window.location.pathname.includes('home')) {
        navigate(`/semesterSetup/home`);
      } else if (window.location.pathname.includes('timetable')) {
        navigate(`/semesterSetup/timetable`);
      }
    }
  };

  return (
    <SSemesterMenuWrapper>
      <AllSemesterNamesForm />
      <SAddAndSetup>
        <SButton onClick={onClickAddBtn}>추가</SButton>
        <SButton onClick={handleClickRoute}>설정</SButton>
      </SAddAndSetup>
    </SSemesterMenuWrapper>
  );
};

export default SemesterMenu;
