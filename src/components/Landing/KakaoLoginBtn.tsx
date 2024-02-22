import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { IcKakao } from '../../assets/icons';
import instanceAxios from '../../utils/InstanceAxios';
import { kakaoLogin } from '../../utils/lib/api';

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
  const navigate = useNavigate();
  const [token, setToken] = useState<any>();
  const handleLogin = () => {
    if (isChecked) {
      window.location.assign('http://j9972.kr/oauth2/authorization/kakao'); //카카오 oauth url이동 주소
    } else {
      onWarning(true);
    }
  };

  const handleTokenAndRedirect = async () => {
    console.log('리다이렉트!');
    try {
      // 토큰을 받아오는 API 호출 (예시 코드)
      const accessToken = await kakaoLogin(); // 토큰을 받아오는 함수는 실제 구현에 맞게 변경되어야 합니다.

      // 받아온 토큰을 로컬 스토리지에 저장
      // localStorage.setItem('accessToken', accessToken);

      // /home 페이지로 리다이렉트
      navigate('/home');
    } catch (error) {
      console.error('토큰을 받아오는 중에 오류가 발생했습니다:', error);
      // 오류 처리
    }
    const login = async () => {
      try {
        const accessToken = await kakaoLogin();
        setToken(accessToken);
        console.log('accessToken:', accessToken);
      } catch (err) {
        console.log('err', err);
      }
    };
  };

  // 카카오 로그인 버튼 클릭 핸들러
  // const handleClick = () => {
  //   handleLogin();
  //   handleTokenAndRedirect(); // 로그인 후 토큰을 받아오고 /home 페이지로 이동하는 함수 호출
  // };
  return (
    <SKakaoLoginBtn onClick={handleLogin}>
      <SKaKao />
      카카오로 시작하기
    </SKakaoLoginBtn>
  );
};

export default KakaoLoginBtn;
