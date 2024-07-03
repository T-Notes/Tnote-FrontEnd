import styled from 'styled-components';
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
import Swal from 'sweetalert2';
import { Task } from './TaskSidebar';

const STodoWrapper = styled.div``;
const STodoInputWrapper = styled.div`
  margin-bottom: 26px;
  padding-left: 10px;
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
  width: 70%;
  overflow: hidden;
  white-space: nowrap;
`;
const SFont = styled.div`
  font-family: Pretendard;
  font-size: 23px;
  font-weight: 600;
  line-height: 27.45px;
  text-align: left;
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
  .icon {
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
    max-height: 8vh;
  }
`;
interface TodoOutside {
  todo: Task[];
  setTodo: React.Dispatch<SetStateAction<Task[]>>;
  clickedDate: string | undefined;
  setReload: React.Dispatch<React.SetStateAction<boolean>>;
}

interface Todo {
  id: number;
  content: string;
  date: string;
  status: boolean;
}
const Todo = memo(({ todo, setTodo, clickedDate, setReload }: TodoOutside) => {
  const { scheduleId } = useParams();
  const [todoContent, setTodoContent] = useState<string>('');

  const handleChangeTodoInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newContent = e.target.value;

    setTodoContent(newContent);
  };

  const handleToggleCheckBox = async (todoId: number, content: string) => {
    if (content && content !== '') {
      try {
        const updatedTodoList = todo.map((item) =>
          item.id === todoId ? { ...item, status: !item.status } : item,
        );
        setTodo(updatedTodoList);

        const date = clickedDate;
        const todoItem = todo.find((item) => item.id === todoId);

        if (!todoItem) return;

        const todoData = {
          content: content,
          status: !todoItem.status,
        };

        await updateTodo(scheduleId, todoId, todoData, date);
        setReload((prev) => !prev);
      } catch (error) {
        console.error('Error toggling checkbox:', error);
      }
    } else {
      alert('텍스트를 입력 및 저장하세요');
    }
  };

  const handleDelete = async (todoId: number | undefined) => {
    await removeTodo(scheduleId, todoId);
    setReload((prev) => !prev);
  };

  const handleAddTodo = async () => {
    const isAnyEmpty = todo.some((item) => item.content.trim() === '');

    if (scheduleId) {
      if (!isAnyEmpty) {
        const date = clickedDate;
        const todoData = {
          content: '',
        };
        await createTodo(scheduleId, todoData, date);
        setReload((prev) => !prev);
      } else {
        alert('텍스트를 입력 및 저장하세요');
      }
    } else {
      Swal.fire({
        title: '학기가 있어야 합니다.',
        text: '학기 추가 혹은 학기 선택을 먼저 해주십시오.',
      });
    }
  };

  const handleInputBlur = async (todoId: number | undefined) => {
    if (todoId) {
      const date = clickedDate;
      const todoData = {
        content: todoContent,
      };
      await updateTodo(scheduleId, todoId, todoData, date);
      setReload((prev) => !prev);
    }
  };
  return (
    <STodoWrapper>
      <STodoInputWrapper>
        <STodoHeader>
          <SFont>To do</SFont>
          <STodoTotalNumber>{todo.length}</STodoTotalNumber>
        </STodoHeader>
        <STodoInputContainer>
          {todo.map((todoItem) => (
            <STodoContainer key={todoItem.id}>
              <SCheckbox>
                {todoItem.status ? (
                  <IcCheckedBox
                    onClick={() =>
                      handleToggleCheckBox(todoItem.id, todoItem.content)
                    }
                  />
                ) : (
                  <IcUncheckedBox
                    onClick={() =>
                      handleToggleCheckBox(todoItem.id, todoItem.content)
                    }
                  />
                )}
              </SCheckbox>

              <SInput
                placeholder="todo list 작성하세요"
                defaultValue={todoItem.content}
                $completed={todoItem.status}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleChangeTodoInput(e)
                }
                onBlur={() => handleInputBlur(todoItem.id)}
                readOnly={todoItem.status}
              />
              <IcCloseSmall
                onClick={() => handleDelete(todoItem.id)}
                className="icon"
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
