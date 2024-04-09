import styled from 'styled-components';
import { SetStateAction, useEffect, useState } from 'react';
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
import { css } from 'styled-components';

const STodoWrapper = styled.div`
  max-height: 260px;
  overflow-y: auto;
  overflow-x: hidden;
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

  .icon {
    margin-left: auto;
    margin-right: 10px;
  }
`;
const SCheckbox = styled.div`
  padding-left: 7px;
`;

interface TodoOutside {
  clickedOutside: boolean;
  setClickedOutside: React.Dispatch<SetStateAction<boolean>>;
  todo: Task[];
  setTodo: any;
  clickedDate: string | undefined;
  setReload: React.Dispatch<React.SetStateAction<boolean>>;
}
const Todo = ({
  clickedOutside,
  setClickedOutside,
  todo,
  setTodo,
  clickedDate,
  setReload,
}: TodoOutside) => {
  const { scheduleId } = useParams();

  const [isAddTodo, setIsAddTodo] = useState<boolean>(false);
  const [todoArray, setTodoArray] = useState<any[]>([]);
  const [todoContent, setTodoContent] = useState<string>('');
  const [todoId, setTodoId] = useState<number>();
  const [todoStatus, setTodoStatus] = useState<boolean>(false);

  const handleChangeTodoInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    todoId: number,
  ) => {
    setTodoId(todoId);
    const newContent = e.target.value;
    setTodo((prevTodoArray: any) => {
      return prevTodoArray.map((todoItem: any) => {
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
    setReload((prev) => !prev);
  };

  // 수정 기능

  //수정
  useEffect(() => {
    if (clickedOutside) {
      const date = clickedDate;
      // 부모에서 클릭 이벤트 발생 시
      const patchTodoData = {
        content: todoContent,
        status: false,
      };
      if (todoId) {
        updateTodo(scheduleId, todoId, patchTodoData, date); // 수정 요청 보내기
        setClickedOutside(false); // 클릭 상태 초기화
      }
    }
  }, [clickedOutside, todoContent, scheduleId, todoId]);

  // 조회
  useEffect(() => {
    if (scheduleId) {
      const getTodoData = async () => {
        try {
          const response = await getTodo(scheduleId, clickedDate);
          setTodoArray(response.data);
        } catch {}
      };
      getTodoData();
    }
  }, [isAddTodo, clickedDate]);

  // 처음 조회 시
  useEffect(() => {
    if (scheduleId) {
      setTodoArray(todo);
    }
  }, []);

  // + 버튼으로 post 요청
  const handleAddTodo = async () => {
    if (scheduleId) {
      const date = clickedDate;
      const todoData = {
        content: '',
      };
      await createTodo(scheduleId, todoData, date);
      // getTodoData();
      setReload((prev) => !prev);
    } else {
      Swal.fire({
        title: '학기가 있어야 합니다.',
        text: '학기 추가 혹은 학기 선택을 먼저 해주십시오.',
      });
    }
  };

  const handleStatusChange = async (
    todoId: number,
    todoContent: string | undefined,
  ) => {
    console.log(todoId);

    const date = clickedDate;
    const patchTodoData = {
      content: todoContent,
      status: true,
    };
    const updatedTodoList = await updateTodo(
      scheduleId,
      todoId,
      patchTodoData,
      date,
    );
    console.log(updatedTodoList);
  };

  return (
    <div>
      <STodoWrapper>
        <STodoContainer>
          <SFont>To do</SFont>
          <STodoTotalNumber>{todo.length}</STodoTotalNumber>
        </STodoContainer>

        {todo.map((todoItem) => (
          <STodoContainer className="todo-item" key={todoItem.id}>
            <SCheckbox>
              {todoItem.status ? (
                <IcCheckedBox
                  onClick={() =>
                    handleStatusChange(todoItem.id, todoItem.content)
                  }
                />
              ) : (
                <IcUncheckedBox
                  onClick={() =>
                    handleStatusChange(todoItem.id, todoItem.content)
                  }
                />
              )}
            </SCheckbox>

            <SInput
              placeholder="todo list 작성하세요"
              defaultValue={todoItem.content}
              $completed={todoItem.status}
              onChange={(e: any) => handleChangeTodoInput(e, todoItem.id)}
            />
            <IcCloseSmall
              onClick={() => handleDelete(todoItem.id)}
              className="icon"
            />
          </STodoContainer>
        ))}
      </STodoWrapper>

      <SAddTodo onClick={handleAddTodo}>
        <IcAddWhite />
      </SAddTodo>
    </div>
  );
};

export default Todo;
