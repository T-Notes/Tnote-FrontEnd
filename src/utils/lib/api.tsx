import { isError } from 'lodash';
import instanceAxios from '../InstanceAxios';

// 회원 추가정보 작성
export const updateUserInfo = async (
  userId: string | undefined,
  userData: object,
) => {
  try {
    const response = await instanceAxios.patch(
      `/tnote/user/${userId}`,
      userData,
    );
    return response.data;
  } catch (error) {
    console.error('회원 추가정보 작성 에러', error);
    throw new Error('회원 추가정보 작성 에러가 발생했습니다.');
  }
};

// 회원 정보 조회
export const getUserInfo = async (userId: string | undefined) => {
  try {
    const response = await instanceAxios.get(`/tnote/user/${userId}`);
    return response.data;
  } catch (error) {
    console.log('회원 정보 조회 에러', error);
    throw new Error('회원 정보 조회 에러가 발생했습니다.');
  }
};

// 추가한 학기 리스트 전체 조회
export const getAllSemesterNames = async () => {
  try {
    const response = await instanceAxios.get('/tnote/schedule/list');
    return response.data;
  } catch (error) {
    console.log('추가한 학기 리스트 조회 실패', error);
    throw new Error('추가한 학기 리스트를 가져오는데 에러가 발생했습니다.');
  }
};

// 남은 학기 일수 반환
//고민: 해당학기의 id값이 없는데 어떤 기준으로 학기가 반환이 되는 것일까?
type SemesterDateRange = {
  startDate: string;
  endDate: string;
};
export const remainingDayData = async (semesterDate: SemesterDateRange) => {
  try {
    const response = await instanceAxios.get('/tnote/schedule/leftClassDays', {
      data: semesterDate,
    });
    return response.data;
  } catch (error) {
    console.log('남은 학기 일수 조회 에러', error);
    throw new Error('해당 학기의 남은 일수를 조회하는데 에러가 발생했습니다.');
  }
};
