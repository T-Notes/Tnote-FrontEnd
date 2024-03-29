import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import instanceAxios from './InstanceAxios';

const Callback = () => {
  console.log(1, '실행!');
  const navigate = useNavigate();
  const code = new URL(window.location.href).searchParams.get('code'); // 인가코드 받아보기

  // 서버에 인가코드 넘겨주고, 토큰 값 받아오기
  // 기존회원과 새회원 구분하여 페이지 이동하기
  // 로그인을 해서 받아오는 정보에 회원정보 폼까지 작성한 유저인지, 아닌지 구분이 필요!
  // 내 생각: 추가 회원정보 폼까지 다 작성한 유저라면, /home/id
  // 그 이외에는 전부 /profileInfo
  const getToken = async () => {
    console.log(2, '실행');

    try {
      await instanceAxios
        .get(
          `https://j9972.kr/login/oauth2/code/kakao?code=${code}&state=2vmvEBbhSq4ujp1WQbL1eh3VwSSGX6zck1AFq4XAXro%3D`,
        )
        .then((res) => {
          console.log(3, '실행');

          const data = res.data.data;
          localStorage.setItem('accessToken', data.accessToken);
          localStorage.setItem('refreshToken', data.refreshToken);
          localStorage.setItem('userId', data.userId);

          navigate('/profileInfo');
        });
    } catch (err) {
      console.log('err', err);
    }
  };

  useEffect(() => {
    getToken();
  }, [code]);

  return (
    <>
      <div>잠시만 기다려주세요!</div>
      <p>회원님의 정보를 가져오는 중입니다.</p>
    </>
  );
};

export default Callback;
