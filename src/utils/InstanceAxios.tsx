import axios, { AxiosInstance } from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const instanceAxios: AxiosInstance = axios.create({
  baseURL: 'https://j9972.kr', //기본 url설정
  timeout: 5000, // 무한대기 현상 방지와 리소스 낭비를 줄이기 위해 설정
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    //필요한 다른 헤더 설정 가능
  },
});

//###2. 응답 인터셉터 추가하기
instanceAxios.interceptors.response.use(
  (response) => {
    //##응답이 전달되기 전에 작업 수행
    return response;
  },
  async (error) => {
    //##응답 오류가 있는 작업 수행
    // 오류 응답에서 상태 코드 및 메시지를 가져옵니다.

    const errorMessage = error.response.data.message;

    // 만료된 토큰인 경우 No message available / expired access token
    if (errorMessage === 'access token의 만료 기간이 지났습니다.') {
      // 토큰 갱신 요청 보내기
      try {
        const refreshToken = localStorage.getItem('refreshToken');

        const response = await axios.get('https://j9972.kr/tnote/v1/refresh', {
          headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            Accept: 'application/json',
            RefreshToken: refreshToken,
          },
        });
        // 새로운 엑세스 토큰 저장
        const newAccessToken = response.data.data.accessToken;
        localStorage.setItem('accessToken', newAccessToken);

        // 갱신된 토큰으로 요청을 재시도합니다.
        error.config.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return axios(error.config); // 다시 해당 요청을 보냅니다.
      } catch (refreshError) {
        console.error('토큰 갱신 실패', refreshError);
        Swal.fire({
          title: '문제가 발생했습니다.',
          text: '로그아웃 후 다시 이용해주세요.',
          showCancelButton: true,
          confirmButtonColor: '#632CFA',
          cancelButtonColor: '#E8E8E8',
          confirmButtonText: '로그아웃',
          cancelButtonText: '취소',
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire({
              title: '로그아웃!',
              text: '정상적으로 로그아웃 되었습니다.',
            }).then((result) => {
              if (result.isConfirmed) {
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                localStorage.removeItem('userId');
                localStorage.removeItem('oauthRefreshToken');
                window.location.href = '/';
              }
            });
          }
        });
      }
    } else if (errorMessage === 'No message available') {
      Swal.fire({
        title: '문제가 발생했습니다.',
        text: '로그아웃 후 다시 이용해주세요.',
        showCancelButton: true,
        confirmButtonColor: '#632CFA',
        cancelButtonColor: '#E8E8E8',
        confirmButtonText: '로그아웃',
        cancelButtonText: '취소',
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: '로그아웃!',
            text: '정상적으로 로그아웃 되었습니다.',
          }).then((result) => {
            if (result.isConfirmed) {
              localStorage.removeItem('accessToken');
              localStorage.removeItem('refreshToken');
              localStorage.removeItem('userId');
              localStorage.removeItem('oauthRefreshToken');
              window.location.href = '/';
            }
          });
        }
      });
    }

    // 토큰 만료 이외의 다른 오류 처리
    return Promise.reject(error);
  },
);

// **요청인터셉터 헤더에 엑세스 토큰 추가
instanceAxios.interceptors.request.use(
  (config) => {
    // 엑세스토큰 만료기간이 지나지 않은 경우// 토큰 가져오기
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    // 요청 오류가 있는 작업 수행
    return Promise.reject(error);
  },
);
export default instanceAxios;
