import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';

import { IcAddBlack, IcGoBack } from '../../assets/icons';
import { useEffect, useState } from 'react';
import instanceAxios from '../../utils/InstanceAxios';
import { createSemester, getAllSemesterNames } from '../../utils/lib/api';
import { useCurrentDate } from '../../utils/useHooks/useCurrentDate';
import { useRecoilValue } from 'recoil';
import { userDataState } from '../../utils/lib/recoil/userDataState';

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

// interface SemesterDataProps {
//   semesterName: String;
//   lastClass: String;
//   startDate: string;
//   endDate: string;
// }
const SemesterSetupBanner = () => {
  const email = useRecoilValue(userDataState); // 이메일이 꼭 필요할까?
  // console.log('email', email.email);
  const [semesterList, setSemesterList] = useState<SemesterListProps[]>([]);
  // const [semesterData, setSemesterData] = useState<SemesterDataProps>({
  //   semesterName: '',
  //   lastClass: '',
  //   startDate: '',
  //   endDate: '',
  // });
  const { year, month } = useCurrentDate();
  const { scheduleId } = useParams();

  useEffect(() => {
    // 학기 리스트 가져오기
    const fetchData = async () => {
      try {
        const data = await getAllSemesterNames();
        setSemesterList(data);
      } catch (error) {
        console.log(
          '전체 학기 리스트를 조회하는데 에러가 발생했습니다.',
          error,
        );
      }
    };

    fetchData();
  }, []); // 컴포넌트가 처음 마운트될 때만 실행

  // 학기 자동 생성 기준
  const addSemesterName = () => {
    let newSemesterName = '';
    // month가 1~ 6월이면 상반기 =>  2학기 생성
    if (1 <= month && month <= 6) {
      newSemesterName = `${year}년 2학기`;
      // month가 7~12월이면 하반기 => 1학기 생성
    } else if (7 <= month && month <= 12) {
      newSemesterName = `${year}년 1학기`;
    }
    return newSemesterName;
  };

  // 학기 Post
  const handleAddSemester = async () => {
    const newSemesterName = addSemesterName();
    try {
      if (newSemesterName) {
        const data = {
          semesterName: newSemesterName,
          lastClass: '',
          email: '',
          startDate: '',
          endDate: '',
        };
        await createSemester(data);
        const updatedSemesterList = await getAllSemesterNames();

        setSemesterList(updatedSemesterList);
      }
    } catch (error) {
      console.log('학기 추가에 실패했습니다.', error);
    }
  };

  return (
    <SWrapper>
      {/* 홈으로 이동 시 어디로 라우팅 되는걸까? */}
      <SBannerText>
        <SSetup>
          <Link to={`/home/${scheduleId}`}>
            <IcGoBack />
          </Link>
          <SHeader>설정</SHeader>
        </SSetup>
        <SText>
          <SCaption>학기 설정</SCaption>

          {semesterList.map((data) => (
            <div key={data.id}>
              <Link to={`/semesterSetup/${data.id}`}>
                <ul>
                  <li>{data.semesterName}</li>
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
