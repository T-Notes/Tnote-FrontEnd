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

const STodoWrapper = styled.div`
  /* max-height: 180px;
  overflow-y: auto;
  overflow-x: hidden; */
`;
const STodoHeader = styled.div`
  display: flex;
`;
const SInput = styled.input<{ $completed: boolean }>`
  margin-left: 20px;
  font-size: 15px;
  font-weight: 500;
  color: #2f2f2f;
  text-decoration: ${(props) => (props.$completed ? 'line-through' : 'none')};
`;
const SFont = styled.div`
  font-size: 18px;
  font-weight: 500;
  padding-top: 20px;
  padding-bottom: 20px;
`;
const STodoTotalNumber = styled.div`
  margin-left: 10px;
  color: white;
  background-color: #2dd4bf;
  border-radius: 19px;
  margin-top: 20px;
  margin-bottom: 20px;
  padding-top: 3px;
  padding-bottom: 3px;
  padding-left: 10px;
  padding-right: 10px;
  font-size: 13px;
`;
const SAddTodo = styled(Button)`
  background-color: ${({ theme }) => theme.colors.purple100};
  width: 240px;
  height: 40px;
  color: ${({ theme }) => theme.colors.white};
`;
const STodoContainer = styled.div`
  display: flex;
  padding-top: 8px;
  padding-bottom: 8px;
  .icon {
    margin-left: auto;
    margin-right: 10px;
  }
`;
const SCheckbox = styled.div`
  padding-left: 7px;
`;
const STodoInputContainer = styled.div`
  max-height: 120px;
  overflow-y: auto;
  overflow-x: hidden;
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
  const [todoId, setTodoId] = useState<number>();
  const [isCheckBox, setIsCheckBox] = useState<boolean>(false);
  const [todoList, setTodoList] = useState<Todo[]>([]);

  const handleChangeTodoInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    todoId: number,
  ) => {
    const newContent = e.target.value;
    setTodoId(todoId);
    setTodoContent(newContent);
  };

  const handleToggleCheckBox = async (
    todoId: number,
    todoContent: string | undefined,
  ) => {
    try {
      const updatedTodoList = todo.map((item) =>
        item.id === todoId ? { ...item, status: !item.status } : item,
      );
      setTodo(updatedTodoList); // 상태를 변경하여 UI 업데이트

      const date = clickedDate;
      const todoData = {
        content: todoContent,
        status: !todo.find((item) => item.id === todoId)?.status,
      };
      await updateTodo(scheduleId, todoId, todoData, date);
      setReload((prev) => !prev);
    } catch (error) {
      console.error('Error toggling checkbox:', error);
    }
  };

  const handleDelete = async (todoId: number | undefined) => {
    await removeTodo(scheduleId, todoId);
    setReload((prev) => !prev);
  };

  useEffect(() => {
    const getTodoList = async () => {
      try {
        if (scheduleId) {
          const response = await getTodo(scheduleId, clickedDate);

          setTodoList(response.data);
        }
      } catch {}
    };
    getTodoList();
  }, []);

  const handleAddTodo = async () => {
    const isAnyEmpty = todo.some((item) => !item.content.trim());

    if (!isAnyEmpty) {
      if (scheduleId) {
        const date = clickedDate;
        const todoData = {
          content: '',
        };
        await createTodo(scheduleId, todoData, date);
        setReload((prev) => !prev);
      } else {
        Swal.fire({
          title: '학기가 있어야 합니다.',
          text: '학기 추가 혹은 학기 선택을 먼저 해주십시오.',
        });
      }
    }
  };

  const handleInputBlur = async (todoId: number | undefined) => {
    if (todoId && todoContent.trim() !== '') {
      const date = clickedDate;
      const todoData = {
        content: todoContent,
      };
      await updateTodo(scheduleId, todoId, todoData, date);
      setReload((prev) => !prev);
    }
  };
  return (
    <div>
      <STodoWrapper>
        <STodoHeader>
          <SFont>To do</SFont>
          <STodoTotalNumber>{todo.length}</STodoTotalNumber>
        </STodoHeader>
        <STodoInputContainer>
          {todo.map((todoItem) => (
            <STodoContainer className="todo-item" key={todoItem.id}>
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
                    // onClick={() =>
                    //   handleStatusChange(todoItem.id, todoItem.content)
                    // }
                  />
                )}
              </SCheckbox>

              <SInput
                placeholder="todo list 작성하세요"
                defaultValue={todoItem.content}
                $completed={todoItem.status}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleChangeTodoInput(e, todoItem.id)
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
      </STodoWrapper>

      <SAddTodo onClick={handleAddTodo}>
        <IcAddWhite />
      </SAddTodo>
    </div>
  );
});

export default Todo;
