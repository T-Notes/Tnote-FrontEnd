import instanceAxios from '../InstanceAxios';

// 회원 추가정보 작성
export const updateUserInfo = async (
  userId: string | null,
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
export const getUserInfo = async (userId: string | null) => {
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
    return response.data.data;
  } catch (error) {
    console.log('추가한 학기 리스트 조회 실패', error);
    throw new Error('추가한 학기 리스트를 가져오는데 에러가 발생했습니다.');
  }
};

// 남은 학기 일수 반환

export const getRemainingDayData = async (
  scheduleId: string | undefined,
  date: any,
) => {
  try {
    const response = await instanceAxios.get(
      `/tnote/schedule/leftClassDays/${scheduleId}`,
      {
        params: { date: date },
      },
    );
    console.log('response:', response);

    return response;
  } catch (error) {
    console.log('남은 학기 일수 조회 에러', error);
    throw new Error('해당 학기의 남은 일수를 조회하는데 에러가 발생했습니다.');
  }
};

// 학교검색 결과 조회
interface schoolSearchValueProps {
  region: string;
  schoolType: string;
  schoolName: string;
}
export const getSchoolSearchValue = async (
  schoolData: schoolSearchValueProps,
) => {
  try {
    const response = await instanceAxios.get('/tnote/user/school', {
      params: schoolData,
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

// 특정 학기 전체 정보 조회
export const getSemesterData = async (scheduleId: string | undefined) => {
  try {
    const response = await instanceAxios.get(`/tnote/schedule/${scheduleId}`);
    return response.data;
  } catch {
    throw new Error('해당 학기의 정보를 조회하는데 에러가 발생했습니다.');
  }
};

// 학기 수정
export const updateSemester = async (
  scheduleId: string | undefined,
  semesterData: object,
) => {
  try {
    const response = await instanceAxios.patch(
      `/tnote/schedule/${scheduleId}`,
      semesterData,
    );
    return response;
  } catch {
    throw new Error('학기 수정 에러가 발생했습니다.');
  }
};

// 학기 삭제
export const removeSemester = async (scheduleId: string | undefined) => {
  try {
    await instanceAxios.delete(`/tnote/schedule/${scheduleId}`);
  } catch {
    throw new Error('학기 삭제 에러가 발생했습니다.');
  }
};

// 학급일지 등록
export const createClassLog = async (
  scheduleId: string | undefined,
  LogData: object,
) => {
  try {
    const response = instanceAxios.post(
      `/tnote/classLog/${scheduleId}`,
      LogData,
    );
    return response;
  } catch {
    throw new Error('학급일지 생성 에러가 발생했습니다.');
  }
};

// 업무일지 등록
export const createWorkLog = async (
  scheduleId: string | undefined,
  LogData: object,
) => {
  try {
    const response = instanceAxios.post(
      `/tnote/proceeding/${scheduleId}`,
      LogData,
    );
    return response;
  } catch {
    throw new Error('학급일지 생성 에러가 발생했습니다.');
  }
};

// 학생관찰일지 등록
export const createStudentObservation = async (
  scheduleId: string | undefined,
  LogData: object,
) => {
  try {
    const response = instanceAxios.post(
      `/tnote/observation/${scheduleId}`,
      LogData,
    );
    return response;
  } catch {
    throw new Error('학급일지 생성 에러가 발생했습니다.');
  }
};

export const createConsultationRecords = async (
  scheduleId: string | undefined,
  LogData: object,
) => {
  try {
    const response = instanceAxios.post(
      `/tnote/consultation/${scheduleId}`,
      LogData,
    );
    return response;
  } catch {
    throw new Error('학급일지 생성 에러가 발생했습니다.');
  }
};

// 로그아웃

export const logout = async () => {
  try {
    const response = instanceAxios.post('/tnote/user/logout').then((res) => {
      console.log(1, 'res:', res);
      localStorage.clear();
      window.location.reload();
    });
    return response;
  } catch {}
};

// 계정탈퇴

export const deletedAccount = async (email: string) => {
  try {
    const response = await instanceAxios
      .delete('/tnote/user', {
        data: { email }, // 요청 바디에 이메일을 포함
      })
      .then((res) => {
        console.log(res);
        localStorage.clear();
        window.location.reload();
      });
    return response;
  } catch {}
};
