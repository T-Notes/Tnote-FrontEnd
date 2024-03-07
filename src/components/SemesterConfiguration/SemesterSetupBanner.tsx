import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';

import { IcAddBlack, IcGoBack } from '../../assets/icons';
import { useEffect, useState } from 'react';
import instanceAxios from '../../utils/InstanceAxios';
import { createSemester, getAllSemesterNames } from '../../utils/lib/api';
import { useCurrentDate } from '../../utils/useHooks/useCurrentDate';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userDataState } from '../../utils/lib/recoil/userDataState';
import { scheduleIdState } from '../../utils/lib/recoil/scheduleIdState';
const SHeader = styled.h1`
  ${({ theme }) => theme.fonts.h2}
`;
const SSetup = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;
const SBannerText = styled.div`
  margin-top: 30px;
  padding-left: 10px;
`;
const SAddSemester = styled.div`
  display: flex;
  align-items: center;
  margin-top: 30px;
`;
const SCaption = styled.p`
  padding-bottom: 20px;
`;
const SText = styled.div`
  color: ${({ theme }) => theme.colors.gray1000};
  ${({ theme }) => theme.fonts.button1};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-left: 30px;
`;
const SWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.gray1100};
  /* margin-right: 50px; */
  width: 250px;
  height: 100vh;
  position: fixed; /* 고정 위치 */
  top: 0; /* 맨 위에 고정 */
  left: 200px; /* 맨 왼쪽에 고정 */
`;
const SAddSemesterText = styled.div`
  cursor: pointer;
`;
interface SemesterListProps {
  id: number;
  semesterName: string;
}

const SemesterSetupBanner = () => {
  const email = useRecoilValue(userDataState); // 이메일이 꼭 필요할까?
  const [semesterList, setSemesterList] = useState<SemesterListProps[]>([]);
  const { year, month } = useCurrentDate();
  // const { scheduleId } = useParams();
  const [scheduleId, setScheduleId] = useRecoilState(scheduleIdState);
  // post와 조회를 분리하기 위함
  const [isPostSemester, setIsPostSemester] = useState<boolean>(false);

  // 학기 자동 생성 기준
  const autoCreateSemester = () => {
    let createdSemester = '';
    // month가 1~ 6월이면 상반기 =>  2학기 생성
    if (1 <= month && month <= 6) {
      createdSemester = `${year}년 2학기`;
      // month가 7~12월이면 하반기 => 1학기 생성
    } else if (7 <= month && month <= 12) {
      createdSemester = `${year}년 1학기`;
    }
    return createdSemester;
  };

  // 학기 Post
  const handleAddSemester = async () => {
    const createdSemester = autoCreateSemester();
    try {
      if (createdSemester) {
        const data = {
          semesterName: createdSemester,
          lastClass: '',
          email: '',
          startDate: '',
          endDate: '',
        };
        const getScheduleId = await createSemester(data); // await 키워드를 통해 api 요청의 응답이 돌아오기 전까지 다음 코드가 실행되지 않음 (동기적)
        setScheduleId(getScheduleId.id); // 전역에다가 스케줄 Id 저장
        setIsPostSemester((prev) => !prev);
      }
    } catch (error) {
      console.log('학기 추가에 실패했습니다.', error);
    }
  };
  // 조회
  useEffect(() => {
    const getSemester = async () => {
      const updatedSemesterList = await getAllSemesterNames();
      setSemesterList(updatedSemesterList);
    };
    getSemester();
  }, [isPostSemester]);

  return (
    <SWrapper>
      {/* 홈으로 이동 시 어디로 라우팅 되는걸까? */}
      <SBannerText>
        <SSetup>
          <Link to={scheduleId ? `/home/${scheduleId}` : '/home'}>
            <IcGoBack />
          </Link>
          <SHeader>설정</SHeader>
        </SSetup>
        <SText>
          <SCaption>학기 설정</SCaption>

          {semesterList.map((semester) => (
            <div key={semester.id}>
              <Link to={`/semesterSetup/${semester.id}`}>
                <ul>
                  <li>{semester.semesterName}</li>
                </ul>
              </Link>
            </div>
          ))}
          <SAddSemester>
            <IcAddBlack />
            <SAddSemesterText onClick={handleAddSemester}>
              학기 추가하기
            </SAddSemesterText>
          </SAddSemester>
        </SText>
      </SBannerText>
    </SWrapper>
  );
};

export default SemesterSetupBanner;
