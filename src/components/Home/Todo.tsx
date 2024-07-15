import styled from 'styled-components';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ChangeEvent, memo, SetStateAction, useEffect, useState } from 'react';
import {
  IcAddWhite,
  IcCheckedBox,
  IcCloseSmall,
  IcUncheckedBox,
} from '../../assets/icons';
import { Button } from '../common/styled/Button';
import {
  createTodo,
  getTodo,
  removeTodo,
  updateTodo,
} from '../../utils/lib/api';
import { useParams } from 'react-router-dom';

const STodoWrapper = styled.div``;
const STodoInputWrapper = styled.div`
  margin-bottom: 26px;
  padding-left: 10px;
  @media (max-height: 720px) {
    margin-bottom: 10px;
  }
`;
const STodoHeader = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 10px;
`;
const SInput = styled.input<{ $completed: boolean }>`
  margin-left: 1vw;
  padding: 0px;
  color: #2f2f2f;
  text-decoration: ${(props) => (props.$completed ? 'line-through' : 'none')};
  font-family: Pretendard;
  font-size: 15px;
  font-weight: 500;
  text-align: left;
  width: 60%;
  overflow: hidden;
  white-space: nowrap;
  &:focus {
    outline: none;
    border-bottom: 2px solid #482ee6;
  }
`;
const SFont = styled.div`
  font-family: Pretendard;
  font-size: 23px;
  font-weight: 600;
  line-height: 27.45px;
  text-align: left;
  @media (max-height: 720px) {
    font-size: 20px;
  }
`;
const STodoTotalNumber = styled.div`
  display: flex;
  border-radius: 19px;
  padding: 2px 10px;
  margin-left: 10px;
  color: white;
  background-color: #2dd4bf;
  font-family: Pretendard;
  font-size: 13px;
  font-weight: 600;
  line-height: 15.51px;
  text-align: left;
`;
const SAddTodo = styled(Button)`
  background-color: ${({ theme }) => theme.colors.purple100};
  width: 100%;
  height: 40px;
  color: ${({ theme }) => theme.colors.white};
`;
const STodoContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 0px;
  .deleteIcon {
    margin-left: auto;
    margin-right: 0.5vw;
  }
`;
const SCheckbox = styled.div`
  display: flex;
`;
const STodoInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 210px;
  overflow-y: auto;
  overflow-x: hidden;

  @media (max-height: 1079px) {
    max-height: 120px;
  }

  @media (max-height: 720px) {
    max-height: 80px;
  }
`;

const SVirtualInput = styled.input`
  margin-left: 1vw;
  padding: 0px;
  color: #2f2f2f;
  font-family: Pretendard;
  font-size: 15px;
  font-weight: 500;
  text-align: left;
  width: 60%;
  overflow: hidden;
  white-space: nowrap;
  outline: none;

  &:focus {
    outline: none;
    border-bottom: 2px solid #482ee6;
  }
`;

interface TodoOutside {
  clickedDate: string | undefined;
}

interface TodoProps {
  id: number;
  content: string;
  date: string;
  status: boolean;
}

const Todo = memo(({ clickedDate }: TodoOutside) => {
  const [content, setContent] = useState<string>('');
  const [updateContent, setUpdateContent] = useState<{ [key: number]: string }>(
    {},
  );
  const [todoInput, setTodoInput] = useState<boolean>(false);
  const [isCheckedTodo, setIsCheckedTodo] = useState<boolean>(false);
  const { scheduleId } = useParams<{ scheduleId?: string | undefined }>();
  const queryClient = useQueryClient();
  const date = clickedDate;

  const { data, isLoading, isError } = useQuery({
    queryKey: ['todos', scheduleId || '', date || ''],
    queryFn: getTodo,
  });

  useEffect(() => {
    setTodoInput(false);
  }, [clickedDate]);

  const addTodo = useMutation({
    mutationFn: createTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  const deletedTodo = useMutation({
    mutationFn: removeTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  const modifyTodo = useMutation({
    mutationFn: updateTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });
  const handleAddTodo = () => {
    setTodoInput(true);

    if (scheduleId && content.trim() !== '') {
      addTodo.mutate({ scheduleId, content, date });
      setContent('');
    }
  };

  const handleOnBlur = (todoId: number | null) => {
    if (todoId) {
      if (scheduleId && todoId && updateContent[todoId].trim() !== '') {
        modifyTodo.mutate({
          scheduleId,
          todoId,
          content: updateContent[todoId],
          date,
          status: isCheckedTodo,
        });
      }
    } else if (scheduleId && content.trim() !== '') {
      addTodo.mutate({ scheduleId, content, date });
      setContent('');
    }
  };

  const handleOnEnter = (
    e: React.KeyboardEvent<HTMLInputElement>,
    todoId: number | null,
  ) => {
    if (e.key === 'Enter') {
      if (scheduleId && content.trim() !== '') {
        addTodo.mutate({ scheduleId, content, date });
        setContent('');
        setTodoInput(true);
      } else if (todoId && scheduleId && updateContent[todoId].trim() !== '') {
        modifyTodo.mutate({
          scheduleId,
          todoId,
          content: updateContent[todoId],
          date,
          status: isCheckedTodo,
        });

        const inputElement = e.target as HTMLInputElement;
        inputElement.blur();
      }
    }
  };

  const handleDelete = (todoId: number) => {
    if (scheduleId) {
      deletedTodo.mutate({ scheduleId, todoId });
    }
  };

  const handleChangeTodo = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setContent(value);
  };
  const handleChangeUpdate = (
    e: ChangeEvent<HTMLInputElement>,
    todoId: number,
  ) => {
    const value = e.target.value;

    setUpdateContent((prev) => ({
      ...prev,
      [todoId]: value,
    }));
  };

  const handleToggleCheckBox = (
    todoId: number,
    content: string,
    status: boolean,
  ) => {
    if (scheduleId) {
      modifyTodo.mutate({
        scheduleId,
        todoId,
        content: content,
        date,
        status: !status,
      });
    }
  };

  return (
    <STodoWrapper>
      <STodoInputWrapper>
        <STodoHeader>
          <SFont>To do</SFont>
          <STodoTotalNumber>{data?.length}</STodoTotalNumber>
        </STodoHeader>

        {todoInput && (
          <SCheckbox>
            <IcUncheckedBox />
            <SVirtualInput
              placeholder="할 일 입력"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleChangeTodo(e)
              }
              onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
                handleOnEnter(e, null)
              }
              value={content}
              onBlur={() => handleOnBlur(null)}
            />
          </SCheckbox>
        )}

        <STodoInputContainer>
          {data?.map((todo: TodoProps) => (
            <STodoContainer key={todo.id}>
              <SCheckbox>
                {todo.status ? (
                  <IcCheckedBox
                    onClick={() =>
                      handleToggleCheckBox(todo.id, todo.content, todo.status)
                    }
                  />
                ) : (
                  <IcUncheckedBox
                    onClick={() =>
                      handleToggleCheckBox(todo.id, todo.content, todo.status)
                    }
                  />
                )}
              </SCheckbox>

              <SInput
                placeholder="할 일 입력"
                value={updateContent[todo.id] ?? todo.content}
                $completed={todo.status}
                onBlur={() => handleOnBlur(todo.id)}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleChangeUpdate(e, todo.id)
                }
                onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) =>
                  handleOnEnter(e, todo.id)
                }
                readOnly={todo.status}
              />

              <IcCloseSmall
                onClick={() => handleDelete(todo.id)}
                className="deleteIcon"
              />
            </STodoContainer>
          ))}
        </STodoInputContainer>
      </STodoInputWrapper>

      <SAddTodo onClick={handleAddTodo}>
        <IcAddWhite />
      </SAddTodo>
    </STodoWrapper>
  );
});

export default Todo;
