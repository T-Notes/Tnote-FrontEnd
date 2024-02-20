import { useEffect, useState } from 'react';
import instanceAxios from '../utils/InstanceAxios';
import { useLocation } from 'react-router-dom';

const Auth = () => {
  const [code, setCode] = useState<string | null>(null);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  // 특정 키에 해당하는 쿼리 파라미터 값 가져오기
  const myParamValue = queryParams.get('code');

  const getToken = async () => {
    await instanceAxios
      .get(`https://j9972.kr/login/oauth2/code/kakao`)
      .then(({ data }) => {
        console.log('TOKEN:', data);
      })
      .catch(() => {});
  };

  useEffect(() => {
    getToken();

    setCode(myParamValue);

    console.log(code);
    
  }, []);

  return <div></div>;
};

export default Auth;
