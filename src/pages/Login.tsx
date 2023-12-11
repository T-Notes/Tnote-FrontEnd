import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import PolicyModal from '../components/PolicyModal';

const Login = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLoginPage = () => {
    navigate('/EnterInfo');
  };

  const openPolicyModal = () => {
    setIsModalOpen(true);
  };

  const closePolicyModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div>
      <h1>교사 업무 관리 앱 이용하기 </h1>
      <p>어서오세요! 선생님들의 업무를 효율적으로 관리해주는</p>
      <p>교사 업무 관리 앱입니다.</p>
      <button onClick={handleLoginPage}>Google로 로그인</button>
      <div>
        <input type="checkbox"></input>
        <span className="policyText" onClick={openPolicyModal}>
          개인 정보 보호 정책
        </span>
        <span>을 읽고 동의합니다.</span>
        <PolicyModal
          isOpen={isModalOpen}
          onClose={closePolicyModal}
        ></PolicyModal>
      </div>
    </div>
  );
};

export default Login;
