import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { IcKakao } from '../../assets/icons';
import instanceAxios from '../../utils/InstanceAxios';
// import { kakaoLogin } from '../../utils/lib/api';

//styled //
const SKakaoLoginBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 290px;
  height: 50px;
  margin-left: 230px;
  border-radius: 12px;

  background-color: ${({ theme }) => theme.colors.yellow200}; // active
  ${({ theme }) => theme.fonts.caption2}
  color: ${({ theme }) => theme.colors.black}; // active
`;

const SKaKao = styled(IcKakao)`
  margin-right: 5.5%;
`;
interface LoginProps {
  onWarning: React.Dispatch<React.SetStateAction<boolean>>;
  isChecked: boolean;
}
const KakaoLoginBtn = ({ onWarning, isChecked }: LoginProps) => {
  const [token, setToken] = useState<any>();
  const handleLogin = () => {
    if (isChecked) {
      window.location.assign(
        'https://businessyoon.store/oauth2/authorization/kakao',
      ); //카카오 oauth url이동 주소
    } else {
      onWarning(true);
    }
  };

  return (
    <SKakaoLoginBtn onClick={handleLogin}>
      <SKaKao />
      카카오로 시작하기
    </SKakaoLoginBtn>
  );
};

export default KakaoLoginBtn;
