import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import instanceAxios from '../../utils/InstanceAxios';
import { useCurrentDate } from '../../utils/useHooks/useCurrentDate';

import { IcUncheckedBox, IcCheckedBox, IcClose } from '../../assets/icons';
import Home from '../../pages/Home';
import { Button } from '../common/styled/Button';
import { useParams } from 'react-router-dom';

const SInput = styled.input`
  color: ${({ theme }) => theme.colors.gray700};
  ${({ theme }) => theme.fonts.caption};
`;
const TodoListInput = () => {
  // input창이 빈값이 아니고, 외부를 클릭했다면 post
  // 해당 input창은 비워지기
  // 유저가 입력한 값은 get으로 가져오기.
  const { id } = useParams();
  const { currentDate } = useCurrentDate();
  const date = currentDate;

  const inputRef = useRef<HTMLInputElement>(null);
  const [content, setContent] = useState<string>('');
  const [todoList, setTodoList] = useState([]);
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const handleChangeTodoInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);

    setIsSaved(false);
  };

  const handleIsCompleted = () => {
    setIsCompleted(!isCompleted);
  };

  // input 바깥쪽 클릭
  useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (inputRef.current && !inputRef.current.contains(e.target)) {
        handleAddTodo();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [content]);

  const handleAddTodo = () => {
    if (content !== '' && !isSaved) {
      try {
        // post
        instanceAxios
          .post('/tnote/todos', {
            date,
            content,
          })
          .then((res) => {
            setContent(''); // 전송 후 해당 input 창 비우기
            setIsSaved(true);
            console.log('전송 성공!', res);
          });
      } catch (err) {
        console.log('todo list 보내는 것에 실패했습니다.', err);
      }
    } else if (content !== '' && isSaved) {
      // patch
      instanceAxios.patch(`/tnote/todos/${id}`, {
        date,
        content,
      });
    }
  };

  useEffect(() => {
    const getTodoData = async () => {
      try {
        await instanceAxios.get('/tnote/todos').then((res) => {
          setTodoList(res.data);
        });
      } catch (err) {
        console.log('todo list를 가져올 수 없습니다.', err);
      }
    };
    getTodoData();
  }, []);

  const handleDelete = () => {
    instanceAxios.delete(`/tnote/todos/${id}`);
  };
  return (
    <>
      <div ref={inputRef}>
        {isCompleted ? (
          <IcCheckedBox onClick={handleIsCompleted} />
        ) : (
          <IcUncheckedBox onClick={handleIsCompleted} />
        )}
        <SInput
          placeholder="todo list 작성하세요"
          onChange={handleChangeTodoInput}
          value={content}
        ></SInput>
        <IcClose onClick={handleDelete} />
      </div>
    </>
  );
};

export default TodoListInput;
