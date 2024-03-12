import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import instanceAxios from '../../utils/InstanceAxios';
import { useCurrentDate } from '../../utils/useHooks/useCurrentDate';

import { IcUncheckedBox, IcCheckedBox, IcClose } from '../../assets/icons';
import Home from '../../pages/Home';
import { Button } from '../common/styled/Button';
import { useParams } from 'react-router-dom';
import {
  createTodo,
  getTodo,
  removeTodo,
  updateTodo,
} from '../../utils/lib/api';

const SInput = styled.input`
  color: ${({ theme }) => theme.colors.gray700};
  ${({ theme }) => theme.fonts.caption};
`;

interface TodoProps {
  date: string;
  content: string;
  status: boolean;
}
interface TodoListProps {
  id: number | null;
  content: string;
  date: string;
}

const initialTodoList: TodoListProps[] = [
  {
    id: null,
    content: '',
    date: '',
  },
];
const TodoListInput = (todoId: number) => {
  // input창이 빈값이 아니고, 외부를 클릭했다면 post
  // 해당 input창은 비워지기
  // 유저가 입력한 값은 get으로 가져오기.
  const { scheduleId } = useParams();

  const inputRef = useRef<HTMLInputElement>(null);
  const [todo, setTodo] = useState<TodoProps>({
    date: '',
    content: '',
    status: false,
  });
  const [todoList, setTodoList] = useState(initialTodoList);
  const [isSaved, setIsSaved] = useState<boolean>(false);
  // const [todoId, setTodoId] = useState<number | undefined>();

  // 유저가 todo Input창에 글 작성
  const handleChangeTodoInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const todoContent = e.target.value;

    setTodo((prev) => ({ ...prev, content: todoContent }));
    setIsSaved(false);
  };
  // 체크박스 토글
  const handleCheckedToggle = () => {
    setTodo((prev) => ({ ...prev, status: !todo.status }));
  };

  // input 바깥쪽 클릭
  // useEffect(() => {
  //   console.log('content!');
  //   const handleClickOutside = (e: any) => {
  //     if (inputRef.current && !inputRef.current.contains(e.target)) {
  //       handleAddTodo();
  //     }
  //   };

  //   document.addEventListener('mousedown', handleClickOutside);

  //   return () => {
  //     document.removeEventListener('mousedown', handleClickOutside);
  //   };
  // }, []);
  useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (inputRef.current && !inputRef.current.contains(e.target)) {
        const patchTodo = async () => {
          const todoData = {
            date: todo.date,
            content: todo.content,
            status: todo.status,
          };
          await updateTodo(scheduleId, todoId, todoData);
        };
        // patchTodo();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleAddTodo = () => {
    if (todo.content !== '' && !isSaved) {
      try {
        //post
        const postTodo = async () => {
          const todoData = {
            date: todo.date,
            content: todo.content,
          };
          const response = await createTodo(scheduleId, todoData);

          // setTodoId(response.id);
        };

        setTodo((prev) => ({ ...prev, content: '' }));
        setIsSaved(true);

        postTodo();
      } catch (err) {
        console.log('todo list 보내는 것에 실패했습니다.', err);
      }
    } else if (todo.content !== '' && isSaved) {
      //patch
      const patchTodo = async () => {
        const todoData = {
          date: todo.date,
          content: todo.content,
          status: todo.status,
        };
        await updateTodo(scheduleId, todoId, todoData);
      };
      patchTodo();
    }
  };
  const data = [
    {
      id: 1,
      content: '오늘할일1',
      date: '2024-01-10',
    },
    {
      id: 2,
      content: '오늘할일2',
      date: '2024-01-10',
    },
    {
      id: 3,
      content: '오늘할일3',
      date: '2024-01-10',
    },
  ];
  useEffect(() => {
    const getTodoData = async () => {
      try {
        await getTodo(scheduleId);
        setTodoList(data);
      } catch (err) {
        console.log('todo list를 가져올 수 없습니다.', err);
      }
    };
    getTodoData();
  }, []);

  // todo 삭제
  const handleDelete = async () => {
    await removeTodo(scheduleId, todoId);
  };
  return (
    <>
      <div ref={inputRef}>
        {todo.status ? (
          <IcCheckedBox onClick={handleCheckedToggle} />
        ) : (
          <IcUncheckedBox onClick={handleCheckedToggle} />
        )}

        <SInput
          placeholder="todo list 작성하세요"
          onChange={handleChangeTodoInput}
          value={todo.content}
        ></SInput>
        <IcClose onClick={handleDelete} />
      </div>
    </>
  );
};

export default TodoListInput;
