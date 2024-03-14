import styled from 'styled-components';
import { SetStateAction, useEffect, useState } from 'react';
import { IcAddWhite, IcCloseSmall } from '../../assets/icons';
import { Button } from '../common/styled/Button';

import {
  createTodo,
  getTodo,
  removeTodo,
  updateTodo,
} from '../../utils/lib/api';
import { useParams } from 'react-router-dom';
import { lowerFirst } from 'lodash';
import { useRecoilValue } from 'recoil';
import { scheduleIdState } from '../../utils/lib/recoil/scheduleIdState';

const SInput = styled.input`
  font-size: 15px;
  font-weight: 500;
  color: #2f2f2f;
  /* color: ${({ theme }) => theme.colors.gray700}; */
  /* ${({ theme }) => theme.fonts.caption}; */
`;
const SAddTodo = styled(Button)`
  background-color: ${({ theme }) => theme.colors.purple100};
  width: 260px;
  height: 40px;
  color: ${({ theme }) => theme.colors.white};
`;
const STodoContainer = styled.div`
  display: flex;

  .icon {
    margin-left: auto;
  }
`;

interface TodoProps {
  date: string;
  content: string;
  status: boolean;
}
interface TodoOutside {
  clickedOutside: boolean;
  setClickedOutside: React.Dispatch<SetStateAction<boolean>>;
}
const Todo = ({ clickedOutside, setClickedOutside }: TodoOutside) => {
  const { scheduleId } = useParams();

  const [isAddTodo, setIsAddTodo] = useState<boolean>(false);
  const [todoArray, setTodoArray] = useState<any[]>([]);
  const [todoContent, setTodoContent] = useState<string>('');
  const [todoId, setTodoId] = useState<number>();

  const handleChangeTodoInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    todoId: number,
  ) => {
    setTodoId(todoId);
    const newContent = e.target.value;
    setTodoArray((prevTodoArray) => {
      return prevTodoArray.map((todoItem) => {
        if (todoItem.id === todoId) {
          setTodoContent(newContent);
        }
        return todoItem;
      });
    });
  };

  // todo 삭제
  const handleDelete = async (todoId: number | undefined) => {
    await removeTodo(scheduleId, todoId);
    setIsAddTodo(!isAddTodo);
  };

  //수정
  useEffect(() => {
    if (clickedOutside) {
      // 부모에서 클릭 이벤트 발생 시
      const patchTodoData = {
        date: new Date(),
        content: todoContent,
        status: true,
      };
      if (todoId) {
        updateTodo(scheduleId, todoId, patchTodoData); // 수정 요청 보내기
        setClickedOutside(false); // 클릭 상태 초기화
      }
    }
  }, [clickedOutside, todoContent, scheduleId, todoId]);

  // 조회
  useEffect(() => {
    if (scheduleId) {
      const getTodoData = async () => {
        try {
          const response = await getTodo(scheduleId, new Date());
          setTodoArray(response.data);
        } catch {}
      };
      getTodoData();
    }
  }, [isAddTodo, scheduleId]);

  // + 버튼으로 post 요청
  const handleAddTodo = async () => {
    if (scheduleId) {
      const todoData = {
        date: new Date(),
        content: '',
      };
      await createTodo(scheduleId, todoData);
      setIsAddTodo(!isAddTodo);
    } else {
      window.alert('학기 추가 후 이용가능한 서비스입니다.');
    }
  };

  return (
    <div>
      <>
        {todoArray.map((todoItem) => (
          <STodoContainer className="todo-item" key={todoItem.id}>
            <SInput
              placeholder="todo list 작성하세요"
              defaultValue={todoItem.content}
              onChange={(e: any) => handleChangeTodoInput(e, todoItem.id)}
            />
            <IcCloseSmall
              onClick={() => handleDelete(todoItem.id)}
              className="icon"
            />
          </STodoContainer>
        ))}
      </>

      <SAddTodo onClick={handleAddTodo}>
        <IcAddWhite />
      </SAddTodo>
    </div>
  );
};

export default Todo;
