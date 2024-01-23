import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { IcLogo } from '../../assets/icons';

//** styled **//
const SLeftSidebar = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 16rem;
  height: 100vh;
  flex-shrink: 0;
  background-color: ${({ theme }) => theme.colors.blue400};
  position: fixed; /* 고정 위치 */
  top: 0; /* 맨 위에 고정 */
  left: 0; /* 맨 왼쪽에 고정 */
  border-right: 1px solid #ccc; /* 우측에 경계선 추가 (선택사항) */
`;

const LeftSidebar = () => {
  return (
    <SLeftSidebar>
      <IcLogo />
      <Link to="/home">
        <div>홈화면</div>
      </Link>

      <div>아카이브</div>
      <Link to="/timetable">
        <div>시간표</div>
      </Link>

      <div>{/* 구글로그인 정보 가져오기 */}</div>
    </SLeftSidebar>
  );
};

export default LeftSidebar;
