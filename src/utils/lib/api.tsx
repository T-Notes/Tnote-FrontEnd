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

export const getRemainingDayData = async (
  scheduleId: string | undefined,
  remainingDate: string,
) => {
  try {
    const response = await instanceAxios.get(
      `/tnote/schedule/leftClassDays/${scheduleId}`,
      {
        data: remainingDate,
      },
    );
    return response.data;
  } catch (error) {
    console.log('남은 학기 일수 조회 에러', error);
    throw new Error('해당 학기의 남은 일수를 조회하는데 에러가 발생했습니다.');
  }
};

// 학교검색 결과 조회
interface schoolSearchValueProps {
  region: string;
  gubun: string;
  schoolName: string;
}
export const getSchoolSearchValue = async (
  schoolList: schoolSearchValueProps,
) => {
  try {
    // return [
    //   ['흥덕고등학교', '경기도 용인시 기흥구 흥덕2로 36(영덕동)'],
    //   ['원종고등학교', '경기도 용인시 기흥구 흥덕2로 37(영덕동)'],
    //   ['수주고등학교', '경기도 용인시 기흥구 흥덕2로 38(영덕동)'],
    // ];
    const response = await instanceAxios.get('/tnote/user/school', {
      data: schoolList,
    });
    return response.data;
  } catch (error) {
    console.log('학교 검색결과 조회 에러');
    throw new Error('학교 검색 결과를 가져오는데 에러가 발생했습니다.');
  }
};

// todo
interface TodoProps {
  date: string;
  content: string;
}
export const createTodo = async (
  scheduleId: string | undefined,
  todoData: TodoProps,
) => {
  try {
    const response = await instanceAxios.post(
      `/tnote/todos/${scheduleId}`,
      todoData,
    );
    return response.data;
  } catch (error) {
    throw new Error('Todo 작성을 게시하는데 에러가 발생했습니다.');
  }
};

export const updateTodo = async (
  scheduleId: string | undefined,
  todoId: number | undefined,
  todoData: TodoProps,
) => {
  try {
    const response = await instanceAxios.patch(
      `/tnote/todos/${scheduleId}/${todoId}`,
      todoData,
    );
    return response;
  } catch (error) {
    throw new Error('todo 수정에 에러가 발생했습니다.');
  }
};

export const getTodo = async (scheduleId: string | undefined) => {
  try {
    const response = await instanceAxios.get(`/tnote/todos/${scheduleId}`);
    return response.data;
  } catch (error) {
    throw new Error('todo list를 조회하는데 에러가 발생했습니다.');
  }
};

export const removeTodo = async (
  scheduleId: string | undefined,
  todoId: number | undefined,
) => {
  try {
    await instanceAxios.delete(`/tnote/todos/${scheduleId}/${todoId}`);
  } catch (error) {
    throw new Error('todo 삭제 에러가 발생했습니다.');
  }
};

// 학기 추가하기
export const createSemester = async (semesterData: object) => {
  try {
    const response = await instanceAxios.post('/tnote/schedule', semesterData);
    return response.data;
  } catch {
    throw new Error('학기 리스트 생성 에러가 발생했습니다.');
  }
};
