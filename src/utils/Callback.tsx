import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import instanceAxios from './InstanceAxios';
import { kakaoLogin } from './lib/api';

const Callback = () => {
  console.log(2, '실행!');
  const navigate = useNavigate();
  const [code, setCode] = useState<string | null>(null);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  // 특정 키에 해당하는 쿼리 파라미터 값 가져오기
  const myParamValue = queryParams.get('code');
  // const code = new URL(window.location.href).searchParams.get('code'); // 인가코드 받아보기

  // 서버주소로 돌아옴
  useEffect(() => {
    console.log(3, '실행!');
    const getTokens = async () => {
      try {
        await instanceAxios
          .get(
            `http://j9972.kr/login/oauth2/code/kakao?code=${code}&state=2vmvEBbhSq4ujp1WQbL1eh3VwSSGX6zck1AFq4XAXro%3D`,
          )
          .then((res: any) => {
            console.log('res:', res);
            localStorage.setItem('accessToken', res.data.accessToken);
            localStorage.setItem('refreshToken', res.data.refreshToken);
            navigate('/profileInfo');
          });
      } catch (error) {
        console.error('토큰 가져오기 실패:', error);
      }
    };

    getTokens();
  }, [navigate]);

  return null; // 이 컴포넌트는 렌더링하지 않음
};

export default Callback;
