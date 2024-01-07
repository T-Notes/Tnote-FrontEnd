import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as ImgTnoteLogo } from '../assets/images/imgTnoteLogo.svg';

//** styled **//
const SLeftSidebar = styled.div`
  width: 260px;
  height: 1504px;
  flex-shrink: 0;
  background-color: #f7f9fc; /* 배경색 설정 */
  position: fixed; /* 고정 위치 */
  top: 0; /* 맨 위에 고정 */
  left: 0; /* 맨 왼쪽에 고정 */
  border-right: 1px solid #ccc; /* 우측에 경계선 추가 (선택사항) */
`;

const LeftSidebar = () => {
  const navigate = useNavigate();

  const handleHomeNav = () => {
    navigate('/home');
  };
  return (
    <SLeftSidebar>
      <ImgTnoteLogo />
      <div onClick={handleHomeNav}>홈화면</div>
      <div>아카이브</div>
      <div>시간표</div>
      <div>{/* 구글로그인 정보 가져오기 */}</div>
    </SLeftSidebar>
  );
};

export default LeftSidebar;
