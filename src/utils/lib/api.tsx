import instanceAxios from '../InstanceAxios';

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
