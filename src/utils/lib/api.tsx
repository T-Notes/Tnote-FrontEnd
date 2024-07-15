import instanceAxios from '../InstanceAxios';

// 회원 추가정보 작성
export const updateUserInfo = async (userData: object) => {
  try {
    const response = await instanceAxios.patch(`/tnote/user`, userData);
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
  date: string,
) => {
  try {
    const response = await instanceAxios.get(
      `/tnote/schedule/leftClassDays/${scheduleId}`,
      {
        params: { date: date },
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
  content: string | undefined;
}
// export const createTodo = async (
//   scheduleId: string | undefined,
//   todoData: TodoProps,
//   date: string | undefined,
// ) => {
//   try {
//     const response = await instanceAxios.post(
//       `/tnote/todos/${scheduleId}`,
//       todoData,
//       {
//         params: { date },
//       },
//     );
//     return response.data;
//   } catch (error) {
//     throw new Error('Todo 작성을 게시하는데 에러가 발생했습니다.');
//   }
// };
interface TodoPost {
  scheduleId: string;
  content: string;
  date: string | undefined;
}
export const createTodo = async ({ scheduleId, content, date }: TodoPost) => {
  const { data } = await instanceAxios.post(
    `/tnote/todos/${scheduleId}`,
    { content },
    {
      params: { date },
    },
  );
  return data.data;
};
interface TodoUpdate {
  scheduleId: string;
  todoId: number;
  content: string;
  date: string | undefined;
  status: boolean;
}
// export const updateTodo = async () => {
//   try {
//     const response = await instanceAxios.patch(
//       `/tnote/todos/${scheduleId}/${todoId}`,
//       todoData,
//       {
//         params: { date },
//       },
//     );
//     return response;
//   } catch (error) {
//     throw new Error('todo 수정에 에러가 발생했습니다.');
//   }
// };
export const updateTodo = async ({
  scheduleId,
  todoId,
  content,
  date,
  status,
}: TodoUpdate) => {
  const { data } = await instanceAxios.patch(
    `/tnote/todos/${scheduleId}/${todoId}`,
    { content, status },
    {
      params: { date },
    },
  );
  return data;
};

// export const getTodo = async (
//   scheduleId: string | undefined,
//   date: string | undefined,
// ) => {
//   try {
//     const response = await instanceAxios.get(`/tnote/todos/${scheduleId}`, {
//       params: date,
//     });
//     return response.data;
//   } catch (error) {
//     console.log(error);

//     throw new Error('todo list를 조회하는데 에러가 발생했습니다.');
//   }
// };

export const getTodo = async ({ queryKey }: { queryKey: string[] }) => {
  const [_, scheduleId, date] = queryKey; // queryKey에서 scheduleId와 date 추출

  try {
    const response = await instanceAxios.get(`/tnote/todos/${scheduleId}`, {
      params: { date },
    });
    return response.data.data;
  } catch (error) {
    throw new Error('todo list를 조회하는데 에러가 발생했습니다.');
  }
};

interface TodoDelete {
  scheduleId: string;
  todoId: number;
}
export const removeTodo = async ({ scheduleId, todoId }: TodoDelete) => {
  const { data } = await instanceAxios.delete(
    `/tnote/todos/${scheduleId}/${todoId}`,
  );
  return data;
};
interface CreateSemester {
  semesterName: string;
  lastClass: string;
  email: string;
  startDate: Date | string;
  endDate: Date | string;
}
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
    return response.data;
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
      localStorage.clear();
    });
    return response;
  } catch {}
};

export interface SubjectDate {
  subjectName: string;
  classTime: string;
  classDay: string;
  classLocation: string;
  memo: string;
  color: string;
}
// 과목 post
export const crateSubject = async (
  scheduleId: string | undefined,
  data: SubjectDate,
) => {
  try {
    const response = await instanceAxios.post(
      `/tnote/subjects/${scheduleId}`,
      data,
    );
    return response.data;
  } catch {}
};

// 특정 과목 조회

export const getSelectedSubjectData = async (
  scheduleId: string | undefined,
  subjectsId: string | undefined,
) => {
  try {
    const response = await instanceAxios.get(
      `/tnote/subjects/details/${scheduleId}/${subjectsId}`,
    );
    return response.data;
  } catch {}
};

//과목 수정
export const editSubject = async (
  subjectsId: string | undefined,
  data: SubjectDate,
) => {
  try {
    const response = await instanceAxios.patch(
      `/tnote/subjects/${subjectsId}`,
      data,
    );
    return response.data;
  } catch {}
};
// 과목 삭제

export const deletedSubject = async (
  scheduleId: string | undefined,
  subjectsId: string | undefined,
) => {
  try {
    await instanceAxios.delete(`/tnote/subjects/${scheduleId}/${subjectsId}`);
  } catch {}
};

// 학급일지 전체 조회

export const getAllClassLog = async (scheduleId: string | undefined) => {
  try {
    const response = await instanceAxios.get(
      `/tnote/classLog/${scheduleId}/classLogs?page=0&size=4`,
    );
    return response.data;
  } catch {}
};

// 업무일지 전체조회
export const getAllProceedings = async (scheduleId: string | undefined) => {
  try {
    const response = await instanceAxios.get(
      `/tnote/proceeding/${scheduleId}/proceedings?page=0&size=4`,
    );
    return response.data;
  } catch {}
};

// 상담기록 전체 조회
export const getAllConsultations = async (scheduleId: string | undefined) => {
  try {
    const response = await instanceAxios.get(
      `/tnote/consultation/${scheduleId}/consultations?page=0&size=4`,
    );
    return response.data;
  } catch {}
};

// 학생관찰일지 전체 조회
export const getAllObservation = async (scheduleId: string | undefined) => {
  try {
    const response = await instanceAxios.get(
      `/tnote/observation/${scheduleId}/observations?page=0&size=4`,
    );
    return response.data;
  } catch {}
};

// 학기 일지 전체 조회(아카이브)
export const getAllLogsBySchedule = async (
  scheduleId: string | undefined,
  page: number,
) => {
  try {
    const response = await instanceAxios.get(
      `tnote/archive/${scheduleId}/LogsByFilter?page=${page}&size=8&logType=ALL`,
    );
    return response.data;
  } catch {}
};

// 월별 모든 일지 가져오기

export const getAllLogsByMonth = async (
  scheduleId: string | undefined,
  date: string,
) => {
  try {
    const response = await instanceAxios.get(
      `/tnote/archive/${scheduleId}/monthlyLogs?date=${date}`,
    );
    return response.data;
  } catch {}
};

// 최근 조회한 일지
export const getRecentLogs = async (scheduleId: string | undefined) => {
  try {
    const response = await instanceAxios.get(
      `/tnote/archive/recentLogs/${scheduleId}`,
    );
    return response.data;
  } catch {}
};

// 일지 검색
export const getSearchLogsValue = async (
  keyword: string,
  scheduleId: string | undefined,
) => {
  try {
    const response = await instanceAxios.get(
      `/tnote/archive/searching/${scheduleId}`,
      {
        params: { keyword: keyword },
      },
    );
    return response.data;
  } catch {}
};

// 오늘 수업 시간표 조회
export const getTodayTimetable = async (
  scheduleId: string | undefined,
  day: string,
) => {
  try {
    const response = await instanceAxios.get(
      `/tnote/subjects/${scheduleId}/${day}`,
    );
    return response.data;
  } catch {
    throw new Error('오늘 시간표 조회 실패');
  }
};

// 날짜별 일지 정보 조회
export const getFilteredLogsByDate = async (
  scheduleId: string | undefined,
  startDate: string,
  endDate: string,
  logType: string,
) => {
  try {
    const response = await instanceAxios.get(
      `tnote/archive/${scheduleId}/dateLogs?startDate=${startDate}&endDate=${endDate}&page=0&size=8&logType=${logType}`,
    );

    return response.data;
  } catch (error) {
    throw new Error('필터된 일지를 조회하는데 실패했습니다.');
  }
};

// 학급일지 상세조회
export const getClassLogDetailData = async (classLogId: string | undefined) => {
  try {
    const response = await instanceAxios.get(`/tnote/classLog/${classLogId}`);
    return response.data;
  } catch {}
};

// 업무일지 상세조회
export const getProceedingDetailData = async (
  proceedingId: string | undefined,
) => {
  try {
    const response = await instanceAxios.get(
      `/tnote/proceeding/${proceedingId}`,
    );
    return response.data;
  } catch {}
};
// 학급일지 수정하기

export const patchClassLog = async (
  classLogId: string | undefined,
  LogData: object,
) => {
  try {
    const response = instanceAxios.patch(
      `/tnote/classLog/${classLogId}`,
      LogData,
    );
    return response;
  } catch {
    throw new Error('학급일지 생성 에러가 발생했습니다.');
  }
};

// 상담기록 상세조회
export const getConsultationDetailData = async (
  consultationId: string | undefined,
) => {
  try {
    const response = await instanceAxios.get(
      `/tnote/consultation/${consultationId}`,
    );
    return response.data;
  } catch {}
};

//학생 관찰일지 상세조회
export const getObservationDetailData = async (
  observationId: string | undefined,
) => {
  try {
    const response = await instanceAxios.get(
      `/tnote/observation/${observationId}`,
    );
    return response.data;
  } catch {}
};

// 날짜별 일지정보 조회

export const getAllTaskByDate = async (
  scheduleId: string | undefined,
  date: string,
) => {
  try {
    const response = await instanceAxios.get(
      `/tnote/archive/${scheduleId}/dailyLogs`,
      {
        params: { date: date },
      },
    );
    return response.data;
  } catch {}
};

//알람 토글 수정
export const updateAlarmToggle = async (alarm: boolean) => {
  try {
    const response = await instanceAxios.patch('/tnote/user/alarm', {
      alarm,
    });
    return response.data;
  } catch {}
};

// 일주일 단위 시간표 조회
export const weekSchedule = async (scheduleId: string | undefined) => {
  try {
    const response = await instanceAxios.get(
      `/tnote/schedule/week/${scheduleId}`,
    );
    return response.data;
  } catch {}
};

// 일지 다중 삭제 기능
interface LogsProps {
  classLogIds: number[];
  proceedingIds: number[];
  observationIds: number[];
  consultationIds: number[];
}
export const logsDelete = async (logs: LogsProps) => {
  try {
    const response = await instanceAxios.post(
      '/tnote/archive/deleteLogs',
      logs,
    );
    return response.data;
  } catch {}
};

interface SearchParams {
  dateType?: string;
  searchType?: string;
  keyword?: string;
  page?: number;
  size?: number;
}

// 아카이브 내 일지 검색 기능
export const searchArchiveLog = async (params: SearchParams) => {
  const {
    dateType = '',
    searchType = '',
    keyword = '',
    page = 0,
    size = 8,
  } = params;

  try {
    const response = await instanceAxios.get('/tnote/archive/searching/log', {
      params: { dateType, searchType, keyword, page, size },
    });
    return response.data;
  } catch {}
};
