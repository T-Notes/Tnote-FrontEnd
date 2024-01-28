import styled from 'styled-components';
import { Button } from '../common/styled/Button';

import { IcAddWhite } from '../../assets/icons';
import { useEffect, useState } from 'react';
import { tr } from 'date-fns/locale';
import TodoListInput from './TodoListInput';
import { useCurrentDate } from '../../utils/useHooks';

const STaskSidebarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.blue400};
  width: 408px;
  height: 100vh;
  position: fixed;
  right: 0;
  top: 0;
  align-items: center;
`;
const SAddTodo = styled(Button)`
  background-color: ${({ theme }) => theme.colors.purple100};
  width: 350px;
  height: 50px;
  color: ${({ theme }) => theme.colors.white};
`;
const TaskSidebar = () => {
  // 버튼을 클릭하면 input창이 나타난다.
  // input창이 빈값이 아니고, 외부를 클릭했다면 post
  // 해당 input창은 비워지기
  // 유저가 입력한 값은 get으로 가져오기.

  // 컴포넌트는 1) headless 기반의 추상화 하기 2) 한 가지 역할만 하기(또는 그의 조합) 3) 도메인(=비즈니스 로직) 분리하기

  const { year, month, day } = useCurrentDate(); // 데이터 추상화 (headless 기반의 추상화 하기)
  const [todoInputs, setTodoInputs] = useState([{ id: 1, isVisible: false }]);

  const handleAddTodo = () => {
    setTodoInputs((prevInputs) => [
      ...prevInputs,
      { id: prevInputs.length + 1, isVisible: true },
    ]);
  };
  return (
    <STaskSidebarWrapper>
      <div>{`${year}년 ${month + 1}월 ${day}일`}</div>
      <div>To-do</div>
      {todoInputs.map(
        (todoInput) =>
          todoInput.isVisible && <TodoListInput key={todoInput.id} />,
      )}
      <SAddTodo onClick={handleAddTodo}>
        <IcAddWhite />
      </SAddTodo>
    </STaskSidebarWrapper>
  );
};

export default TaskSidebar;
