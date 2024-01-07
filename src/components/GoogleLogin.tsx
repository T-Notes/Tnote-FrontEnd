import React from 'react';
import styled from 'styled-components';
import { ReactComponent as ImgGoogle } from '../assets/images/imgGoogle.svg';

const SLoginBtn = styled.div`
  width: 290px;
  height: 30px;
  border-radius: 8px;
  border: 1px solid var(--Black-Black50, #d5d5d5);
  background: #fff;
  cursor: pointer;
  display: inline-flex;
  padding: 20px 40px;
  align-items: center;
  gap: 24px;
  .login-text {
    color: var(--Black-Black90, #2f2f2f);
    text-align: center;
    font-size: 24px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }
`;

interface GoogleLoginProps {
  onClick: React.MouseEventHandler<HTMLDivElement>;
}
const GoogleLogin = ({ onClick }: GoogleLoginProps) => {
  return (
    <SLoginBtn onClick={onClick}>
      <ImgGoogle />
      <p className="login-text">Google 계정으로 로그인</p>
    </SLoginBtn>
  );
};

export default GoogleLogin;
