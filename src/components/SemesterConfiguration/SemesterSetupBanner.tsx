import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { IcAddBlack, IcGoBack } from '../../assets/icons';
import { useEffect, useState } from 'react';
import instanceAxios from '../../utils/InstanceAxios';

const SHeader = styled.h1`
  ${({ theme }) => theme.fonts.h3}
`;
const SCaption = styled.p`
  color: ${({ theme }) => theme.colors.gray1000};
`;
const SWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.gray1100};
  margin-right: 10rem;
  width: 20rem;
  height: 100vh;
  position: fixed; /* 고정 위치 */
  top: 0; /* 맨 위에 고정 */
  left: 16rem; /* 맨 왼쪽에 고정 */
`;
const SemesterSetupBanner = () => {
  const [dataArray, setDataArray] = useState([]);
  // 학기 리스트 조회 (get 메서드)
  // api 연결 후 주석 해제!
  // 유저가 저장을 클릭 할 때마다, get 메서드 불러오기. (useEffect)
  // useEffect(() => {
  //   try {
  //     instanceAxios.get('/schedule/list').then((res) => {
  //       const getDate = res.data;
  //       setDataArray(getDate);
  //     });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }, []);
  // 고민 1. 어떤 값이 바뀔때마다 get 데이터를 불러와야할까?
  return (
    <SWrapper>
      <Link to="/home">
        <IcGoBack />
      </Link>

      <SHeader>설정</SHeader>
      <SCaption>학기 설정</SCaption>
      {/* 추가한 학기 리스트 map */}
      <div>
        {dataArray.map((data) => (
          <Link to="/semesterSetup:id">
            <ul>
              <li>{data}</li>
            </ul>
          </Link>
        ))}
      </div>
      <div>
        <IcAddBlack />
        <Link to="/addSemester">
          <SCaption>학기 추가하기</SCaption>
        </Link>
      </div>
    </SWrapper>
  );
};

export default SemesterSetupBanner;
