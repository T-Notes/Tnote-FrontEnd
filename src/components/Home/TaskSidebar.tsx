import styled from 'styled-components';
import { Button } from '../common/styled/Button';

import { IcAddWhite } from '../../assets/icons';
import { useEffect, useState } from 'react';
import { tr } from 'date-fns/locale';
import TodoListInput from './TodoListInput';
import { useCurrentDate } from '../../utils/useHooks/useCurrentDate';
import Todo from '../Home/Todo';

const STaskSidebarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.blue400};
  width: 300px;
  height: 100vh;
  position: fixed;
  right: 0;
  top: 0;
  padding-left: 20px;

  @media (max-width: 1080px) {
    display: none;
  }
`;
const SFont = styled.div`
  font-size: 18px;
  font-weight: 500;
  padding-top: 20px;
  padding-bottom: 20px;
`;
const SDateFont = styled.div`
  font-size: 20px;
  font-weight: 500;
  padding-top: 20px;
  padding-bottom: 20px;
`;

const TaskSidebar = () => {
  // 버튼을 클릭하면 input창이 나타난다.
  // input창이 빈값이 아니고, 외부를 클릭했다면 post
  // 해당 input창은 비워지기
  // 유저가 입력한 값은 get으로 가져오기.

  // 컴포넌트는 1) headless 기반의 추상화 하기 2) 한 가지 역할만 하기(또는 그의 조합) 3) 도메인(=비즈니스 로직) 분리하기

  const { year, month, day } = useCurrentDate(); // 데이터 추상화 (headless 기반의 추상화 하기)

  return (
    <STaskSidebarWrapper>
      <SDateFont>{`${year}년 ${month + 1}월 ${day}일`}</SDateFont>
      <div>
        <SFont>To do</SFont>
        <Todo />
      </div>
      <SFont>학급 일지</SFont>
      <SFont>업무 일지</SFont>
      <SFont>관찰 일지</SFont>
      <SFont>상담 일지</SFont>
    </STaskSidebarWrapper>
  );
};

export default TaskSidebar;
