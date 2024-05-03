import styled from 'styled-components';
import { memo, SetStateAction, useEffect, useState } from 'react';
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
  max-height: 260px;
  overflow-y: auto;
  overflow-x: hidden;
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

interface TodoOutside {
  clickedOutside: boolean;
  setClickedOutside: React.Dispatch<SetStateAction<boolean>>;
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
const Todo = memo(
  ({
    clickedOutside,
    setClickedOutside,
    todo,
    setTodo,
    clickedDate,
  }: TodoOutside) => {
    const { scheduleId } = useParams();
    const [todoContent, setTodoContent] = useState<string>('');
    const [todoId, setTodoId] = useState<number>();
    const [isCheckBox, setIsCheckBox] = useState<boolean>(false);
    const [todoList, setTodoList] = useState<Todo[]>([]);
    const [reload, setReload] = useState<boolean>(false);

    const handleChangeTodoInput = (
      e: React.ChangeEvent<HTMLInputElement>,
      todoId: number,
    ) => {
      setTodoId(todoId);
      const newContent = e.target.value;

      setTodoContent(newContent);
    };

    const handleToggleCheckBox = (
      todoId: number,
      todoContent: string | undefined,
    ) => {
      // setTodoId(todoId); // 클릭된 todo의 ID를 설정합니다.
      const updatedTodoList = todo.map((item) =>
        item.id === todoId ? { ...item, status: !item.status } : item,
      );

      setTodo(updatedTodoList); // 해당 ID의 상태를 변경한 새로운 todo 리스트를 설정합니다.
    };

    const handleDelete = async (todoId: number | undefined) => {
      await removeTodo(scheduleId, todoId);
      setReload((prev) => !prev);
    };
    // useEffect(() => {
    //   const getTodoList = async () => {
    //     try {
    //       if (scheduleId) {
    //         const response = await getTodo(scheduleId, clickedDate);
    //         console.log(response.data);
    //         setTodoList(response.data);
    //       }
    //     } catch {}
    //   };
    //   getTodoList();
    // }, []);

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
      if (clickedOutside) {
        const date = clickedDate;

        const patchTodoData = {
          content: todoContent,
          status: isCheckBox,
        };

        if (todoId) {
          updateTodo(scheduleId, todoId, patchTodoData, date);
          setClickedOutside(false);
        }
      }
      // setReload((prev) => !prev);
    }, [clickedOutside, isCheckBox, reload]);

    // useEffect(() => {
    //   const date = clickedDate;
    //   // 부모에서 클릭 이벤트 발생 시
    //   const patchTodoData = {
    //     content: todoContent,
    //     status: false,
    //   };
    //   updateTodo(scheduleId, todoId, patchTodoData, date); // 수정 요청 보내기
    //   setClickedOutside(false); // 클릭 상태 초기화
    // }, [todoContent]);

    const handleAddTodo = async () => {
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
    };

    const handleStatusChange = async (
      todoId: number,
      todoContent: string | undefined,
    ) => {
      const date = clickedDate;
      const patchTodoData = {
        content: todoContent,
        status: true,
      };
      await updateTodo(scheduleId, todoId, patchTodoData, date);
      setReload((prev) => !prev);
    };

    return (
      <div>
        <STodoWrapper>
          <STodoHeader>
            <SFont>To do</SFont>
            <STodoTotalNumber>{todo.length}</STodoTotalNumber>
          </STodoHeader>

          {todoList.map((todoItem) => (
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
                onChange={(e: any) => handleChangeTodoInput(e, todoItem.id)}
                readOnly={todoItem.status}
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
  },
);

export default Todo;
