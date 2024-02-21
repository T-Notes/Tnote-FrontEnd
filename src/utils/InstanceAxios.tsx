import axios, { AxiosInstance } from 'axios';

const instanceAxios: AxiosInstance = axios.create({
  baseURL: 'http://j9972.kr', //기본 url설정
  timeout: 5000, // 무한대기 현상 방지와 리소스 낭비를 줄이기 위해 설정
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    //필요한 다른 헤더 설정 가능
  },
});

export default instanceAxios;
