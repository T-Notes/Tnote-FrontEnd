import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { kakaoLogin } from './lib/api';
import instanceAxios from './InstanceAxios';

const Callback = () => {
  console.log(2, '실행!');
  const navigate = useNavigate();

  const [code, setCode] = useState<string | null>(null);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  // 특정 키에 해당하는 쿼리 파라미터 값 가져오기
  const myParamValue = queryParams.get('code');

  const getToken = async () => {
    await instanceAxios
      .get(
        `http://j9972.kr/login/oauth2/code/kakao?code=${code}&state=2vmvEBbhSq4ujp1WQbL1eh3VwSSGX6zck1AFq4XAXro%3D`,
      )
      .then(({ data }) => {
        console.log('TOKEN:', data);
        navigate('/profileInfo');
      })
      .catch((e) => {
        console.log('ERRORE:', e);
      });
  };

  useEffect(() => {
    setCode(myParamValue);
  }, []);

  useEffect(() => {
    getToken();
  }, [code]);

  // useEffect(() => {
  //   const getTokens = async () => {
  //     try {
  //       const accessToken = localStorage.getItem('accessToken');
  //       const refreshToken = localStorage.getItem('refreshToken');

  //       if (!accessToken || !refreshToken) {
  //         // 토큰이 없을 때 카카오 로그인을 호출합니다.
  //         await kakaoLogin(); // kakaoLogin API를 호출하여 토큰을 받아옵니다.
  //         // 받아온 토큰을 가지고 원하는 페이지로 리다이렉트합니다.
  //         navigate('/profileInfo');
  //       } else {
  //         // 토큰이 이미 있으면 원하는 페이지로 리다이렉트합니다.
  //         navigate('/home/:id');
  //       }
  //     } catch (error) {
  //       console.error('토큰 가져오기 실패:', error);
  //     }
  //   };

  //   getTokens();
  // }, [navigate]);

  return null; // 이 컴포넌트는 렌더링하지 않음
};

export default Callback;
