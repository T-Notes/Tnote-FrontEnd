import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { IcAddWhite, IcClose } from '../../assets/icons';
import { Button } from '../common/styled/Button';
import TodoListInput from './TodoListInput';
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
  color: ${({ theme }) => theme.colors.gray700};
  ${({ theme }) => theme.fonts.caption};
`;
const SAddTodo = styled(Button)`
  background-color: ${({ theme }) => theme.colors.purple100};
  width: 260px;
  height: 40px;
  color: ${({ theme }) => theme.colors.white};
`;
// 이 영역 제외를 클릭하면 수정 요청
const STodoWrapper = styled.div`
  border: 1px solid red;
`;

interface TodoProps {
  date: string;
  content: string;
  status: boolean;
}

const Todo = () => {
  const scheduleId = useRecoilValue(scheduleIdState);
  const [isAddTodo, setIsAddTodo] = useState<boolean>(false);
  const [todoArray, setTodoArray] = useState<any[]>([]);
  const [todoContent, setTodoContent] = useState<string>('');

  // const [todo, setTodo] = useState<TodoProps>({
  //   date: '',
  //   content: '',
  //   status: false,
  // });
  const handleChangeTodoInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    todoId: number,
  ) => {
    console.log(1, todoId);

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
    // console.log('todoId:', todoId);
    await removeTodo(scheduleId, todoId);
    setIsAddTodo(!isAddTodo);
  };

  // console.log(todoArray);

  // 외부 클릭 시 수정 요청
  const handleUpdateTodo = async (todoId: number | undefined) => {
    console.log(2, todoContent);

    const patchTodoData = {
      date: new Date().toISOString().split('T')[0],
      content: todoContent,
      status: true,
    };
    await updateTodo(scheduleId, todoId, patchTodoData);
  };

  // 외부 클릭 시 수정 요청을 위한 이벤트 핸들러
  const handleClickOutside = (e: any, todoId: number | undefined) => {
    if (todoId && !e.target.closest('.todo-item')) {
      handleUpdateTodo(todoId);
    }
  };

  // 외부 클릭 시 이벤트 추가
  //  useEffect(() => {
  //     console.log('content!');
  //     const handleClickOutside = (e: any) => {
  //       if (inputRef.current && !inputRef.current.contains(e.target)) {
  //         handleAddTodo();
  //       }
  //     };

  //     document.addEventListener('mousedown', handleClickOutside);

  //     return () => {
  //       document.removeEventListener('mousedown', handleClickOutside);
  //     };
  //   }, []);

  // 조회
  useEffect(() => {
    if (scheduleId) {
      const getTodoData = async () => {
        await getTodo(scheduleId).then((res) => {
          console.log('todo', res.data);
          setTodoArray(res.data);
        });
      };
      getTodoData();
    }
  }, [isAddTodo, scheduleId]);

  // + 버튼으로 post 요청
  const handleAddTodo = async () => {
    if (scheduleId) {
      const todoData = {
        date: new Date().toISOString().split('T')[0],
        content: '',
      };
      await createTodo(scheduleId, todoData).then((res) => {
        // console.log('todo Id', res.data.id);
        setIsAddTodo(!isAddTodo);
      });
    } else {
      window.alert('학기 추가 후 이용가능한 서비스입니다.');
    }
  };

  return (
    <>
      {todoArray.map((todoItem) => (
        <div className="todo-item" key={todoItem.id}>
          <SInput
            placeholder="todo list 작성하세요"
            defaultValue={todoItem.content}
            onChange={(e: any) => handleChangeTodoInput(e, todoItem.id)}
          />
          <IcClose onClick={() => handleDelete(todoItem.id)} />
        </div>
      ))}
      <SAddTodo onClick={handleAddTodo}>
        <IcAddWhite />
      </SAddTodo>
    </>
  );
};

export default Todo;
