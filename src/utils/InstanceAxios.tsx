import axios, { AxiosInstance } from 'axios';
import jwtDecode from 'jwt-decode';

interface JwtPayload {
  exp: number;
}

const instanceAxios: AxiosInstance = axios.create({
  baseURL: 'http://j9972.kr', //기본 url설정
  timeout: 5000, // 무한대기 현상 방지와 리소스 낭비를 줄이기 위해 설정
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    //필요한 다른 헤더 설정 가능
  },
});
//###2. 요청 인터셉터 추가하기(모든 요청의 header에 accessToken을 넣어서 보낸다.)
instanceAxios.interceptors.request.use(
  (config) => {
    //##요청이 전달되기 전에 작업 수행
    // 토큰 가져오기
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    //토큰 디코딩
    if (accessToken !== null && refreshToken !== null) {
      const accessDecoded = jwtDecode<JwtPayload>(accessToken);
      const refreshDecode = jwtDecode<JwtPayload>(refreshToken);
      //현재시간(초 단위)
      const now = Math.floor(Date.now() / 1000);
      //###3. 엑세스토큰의 유효기간이 끝나기 전에 갱신처리/리프레쉬토큰은 로그아웃 처리
      // 60* 5 => 5분

      //accessDecoded.exp - now < 60 * 5
      // 조건문: 엑세스 토큰이 만료된 뒤 <= now
      if (accessDecoded.exp - now < 60 * 5) {
        //if(리프레쉬토큰 만료되기 1분 전이라면)
        console.log(1, '토큰 갱신 필요!');
        if (refreshDecode.exp - now < 60 * 1) {
          //로그아웃
          localStorage.clear();
          window.location.reload();
        } else {
          //리프레쉬토큰 만료기간이 남았다면 엑세스토큰 갱신 요청
          console.log(2, '토큰 갱신 필요!');
          const refreshToken = localStorage.getItem('refreshToken');
          // console.log('refreshToken', refreshToken);
          const renewalToken = async () => {
            await axios
              .post(
                'http://j9972.kr/tnote/refresh',
                {},
                {
                  headers: {
                    'Content-Type': 'application/json;charset=UTF-8',
                    Accept: 'application/json',
                    AccessToken: accessToken,
                    // Authorization: `Bearer ${accessToken}`,
                    RefreshToken: refreshToken,
                  },
                },
              )
              .then((res) => {
                //새로운 토큰 저장
                console.log(3, '토큰 갱신 ', res);

                const newAccessToken = res.data.get('accessToken');
                localStorage.setItem('accessToken', newAccessToken);
                if (newAccessToken) {
                  config.headers['Authorization'] = `Bearer ${newAccessToken}`;
                }
              })
              .catch((err) => {
                console.error(err);
              });
          };
          renewalToken();
        }
      }
    }

    //엑세스토큰 만료기간이 지나지 않은 경우
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }

    return config;
  },

  (error) => {
    //##요청 오류가 있는 작업 수행
    return Promise.reject(error);
  },
);
export default instanceAxios;
