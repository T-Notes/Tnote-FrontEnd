import { useNavigate } from 'react-router-dom';

const Main = () => {
  const navigate = useNavigate();

  const handleLoginPage = () => {
    navigate('/login');
  };

  return (
    <div>
      <h1>교사 업무 관리 앱 이용하기 </h1>
      <p>어서오세요! 선생님들의 업무를 효율적으로 관리해주는</p>
      <p>교사 업무 관리 앱입니다.</p>
      <button onClick={handleLoginPage}>Google로 로그인</button>
    </div>
  );
};

export default Main;
