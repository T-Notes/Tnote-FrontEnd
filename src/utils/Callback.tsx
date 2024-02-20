import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { kakaoLogin } from './lib/api';

const Callback = () => {
  console.log(2, '실행!');
  const navigate = useNavigate();

  useEffect(() => {
    const getTokens = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');

        if (!accessToken || !refreshToken) {
          // 토큰이 없을 때 카카오 로그인을 호출합니다.
          await kakaoLogin(); // kakaoLogin API를 호출하여 토큰을 받아옵니다.
          // 받아온 토큰을 가지고 원하는 페이지로 리다이렉트합니다.
          navigate('/profileInfo');
        } else {
          // 토큰이 이미 있으면 원하는 페이지로 리다이렉트합니다.
          navigate('/home/:id');
        }
      } catch (error) {
        console.error('토큰 가져오기 실패:', error);
      }
    };

    getTokens();
  }, [navigate]);

  return null; // 이 컴포넌트는 렌더링하지 않음
};

export default Callback;
