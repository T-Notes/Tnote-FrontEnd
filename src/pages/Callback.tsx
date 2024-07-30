import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import instanceAxios from '../utils/InstanceAxios';
import { log } from 'console';

const Callback = () => {
  const navigate = useNavigate();
  const code = new URL(window.location.href).searchParams.get('code');

  const getToken = async () => {
    try {
      await instanceAxios
        .get(
          `https://j9972.kr/login/oauth2/code/kakao?code=${code}&state=2vmvEBbhSq4ujp1WQbL1eh3VwSSGX6zck1AFq4XAXro%3D`,
        )
        .then((res) => {
          const data = res.data.data;
          console.log('data', data);
          localStorage.setItem('accessToken', data.accessToken);
          localStorage.setItem('refreshToken', data.refreshToken);
          localStorage.setItem('userId', data.userId);
          localStorage.setItem('oauthRefreshToken', data.oauthRefreshToken);

          const accessToken = localStorage.getItem('accessToken');
          const checkMembership = axios
            .get('https://j9972.kr/tnote/v1/user', {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            })
            .then((res) => {
              const userMessage = res.data.message;
              if (userMessage === '성공') {
                navigate('/home');
              }
            })
            .catch((error) => {
              const notUserMessage = error.response.data.code;
              if (notUserMessage === 'USER_NOT_FOUND') {
                navigate('/profileInfo');
              }
            });
          checkMembership;
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
