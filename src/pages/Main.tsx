import styled from 'styled-components';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import PolicyModal from '../components/PolicyModal';
import { ReactComponent as ImgTnoteLogo } from '../assets/images/imgTnoteLogo.svg';
import { ReactComponent as ImgCloud } from '../assets/images/imgCloud.svg';
import { ReactComponent as ImgDownArrow } from '../assets/images/imgDownArrow.svg';
import GoogleLogin from '../components/GoogleLogin';
import ArrowCloud from '../assets/imgComponents/ArrowCloud';

// styled //
const SMainBackground = styled.div`
  background-color: #f5f6ff;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .main-text {
    font-size: 48px;
    font-style: normal;
    font-weight: 700;
    line-height: 70px; /* 145.833% */
  }
  .text-colorB {
    color: var(--Black-Black, #000);
  }
  .text-colorP {
    color: var(--Purple_Brand-Color-Purple90, #632cfa);
  }
  .policyText {
    text-align: center;

    /* Font/Web_Body */
    font-family: Pretendard;
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: 24px;
  }
  .policyText-color {
    color: #5000bc;
    cursor: pointer;
  }
  .checkbox {
    width: 24px;
    height: 24px;
  }
`;
const SMainScreen = styled.div`
  display: flex;
  flex-direction: column;
  .mb42 {
    margin-bottom: 42px;
  }
`;
const SPolicyGuide = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 4px;
`;
const SDividingline = styled.div`
  margin-top: 32px;
  margin-bottom: 32px;
  width: 370px;
  border-bottom: 1px solid #d5d5d5;
`;

const Main = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isPolicyCheck, setIsPolicyCheck] = useState<boolean>(false);

  const handleLoginPage = () => {
    if (isPolicyCheck) {
      navigate('/signUp');
    } else {
      Swal.fire({
        icon: 'warning',
        title: '개인 정보 보호 정책에 동의 후 로그인이 가능합니다.',

        confirmButtonText: '확인',
      });
    }
  };

  const openPolicyModal = () => {
    setIsModalOpen(true);
  };

  const closePolicyModal = () => {
    setIsModalOpen(false);
  };

  const handlePolicyCheckChange = () => {
    setIsPolicyCheck(!isPolicyCheck);
  };
  return (
    <SMainBackground>
      <SMainScreen>
        <ImgTnoteLogo className="mb42" />
        <div className="main-text text-colorB">티노트와 함께 </div>
        <div className="main-text text-colorP">선생님들의 학습 생활을</div>
        <div className="main-text text-colorP">더 쉽고 효율적으로</div>
        <div className="main-text text-colorB mb42">관리해보세요.</div>

        <GoogleLogin onClick={handleLoginPage} />
        <SDividingline></SDividingline>

        <SPolicyGuide>
          <input
            className="checkbox"
            type="checkbox"
            onChange={handlePolicyCheckChange}
          ></input>
          <span
            className="policyText policyText-color"
            onClick={openPolicyModal}
          >
            개인 정보 보호 정책
          </span>
          <span className="policyText">을 읽고 동의합니다.</span>
        </SPolicyGuide>
      </SMainScreen>
      <PolicyModal
        isOpen={isModalOpen}
        onClose={closePolicyModal}
      ></PolicyModal>
      {/* 배경디자인 */}
      {/* <ArrowCloud /> */}
    </SMainBackground>
  );
};

export default Main;
