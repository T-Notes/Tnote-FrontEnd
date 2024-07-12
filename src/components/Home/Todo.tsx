import styled from 'styled-components';
import { ChangeEvent, memo, useEffect, useRef, useState } from 'react';
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
import { TodoProps } from './TaskSidebar';

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
const SInput = styled.input<{ $completed: boolean; $focused: boolean }>`
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

  //styleName: Font/Caption;
  font-family: Pretendard;
  font-size: 20px;
  font-weight: 500;
  line-height: 17.9px;
  text-align: left;
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
  border: 3px solid red;
  display: flex;
  flex-direction: column;
  max-height: 210px;
  overflow-y: auto;
  overflow-x: hidden;

  @media (max-height: 1079px) {
    /* max-height: 8vh; */
    max-height: 120px;
  }

  @media (max-height: 720px) {
    max-height: 80px;
  }
`;

const SEdit = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #482ee6;
  color: #ffff;
  border-radius: 8px;
  margin-left: 10px;
  //styleName: Font/Caption;
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 500;
  line-height: 17.9px;
  text-align: left;
`;
const STodoTextField = styled.input`
  display: flex;
  padding: 10px;
  width: 100%;
  margin-bottom: 10px;
  border-bottom: 1px solid #a6a6a6;
`;
interface TodoOutside {
  clickedDate: string | undefined;
}

// 1. 일반 저장: text필드 이외 부분 클릭 시 내용 저장
// 2. 저장 후 todo 생성: + 버튼 클릭, Enter 입력
const Todo = memo(({ clickedDate }: TodoOutside) => {
  const { scheduleId } = useParams();
  const [todoContent, setTodoContent] = useState<string>('');
  const [todoId, setTodoId] = useState<number | null>(null);
  const inputRefs = useRef<{ [key: number]: HTMLInputElement | null }>({});
  const [todos, setTodos] = useState<TodoProps[]>([]);
  const [clickTodoAddBtn, setClickTodoAddBtn] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<{ [key: number]: boolean }>({});
  const [focusedTodoId, setFocusedTodoId] = useState<number | null>(null);
  const [fakeTodo, setFakeTodo] = useState<TodoProps[]>([]);

  const [fTodoContent, setFTodoContent] = useState<string>('');
  // todo 가져오기
  useEffect(() => {
    const getTodoData = async () => {
      const res = await getTodo(scheduleId, clickedDate);
      setTodos(res.data);
    };
    getTodoData();
  }, [scheduleId, clickTodoAddBtn]);

  const handleChangeTodoInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    todoId: number | null,
  ) => {
    const newContent = e.target.value;
    setTodoContent(newContent);
    setTodoId(todoId);
    setFocusedTodoId(todoId);

    // todo id 목록에 있는 값 중에 현재 todoId가 있다면, 수정. 아니라면 수정 x
    const findTodoId = todos.some((todo) => todo.id === todoId);
    if (newContent !== '' && findTodoId) {
      setIsEdit((prev) => ({ ...prev, [todoId!]: true }));
    } else {
      setIsEdit((prev) => ({ ...prev, [todoId!]: false }));
    }
  };

  const handleToggleCheckBox = async (todoId: number, content: string) => {
    // if (focusedTodoId !== todoId) {
    //   window.alert('수정을 마무리해주세요.');
    //   handleFocus(todoId);
    //   return;
    // }
    if (content && content !== '') {
      try {
        const updatedTodoList = todos.map((item) =>
          item.id === todoId ? { ...item, status: !item.status } : item,
        );
        setTodos(updatedTodoList);

        const date = clickedDate;
        const todoItem = todos.find((item) => item.id === todoId);

        if (!todoItem) return;

        const todoData = {
          content: content,
          status: !todoItem.status,
        };
        if (todoId) {
          await updateTodo(scheduleId, todoId, todoData, date);
          setClickTodoAddBtn((prev) => !prev);
        }
      } catch (error) {
        console.error('Error toggling checkbox:', error);
      }
    } else {
      alert('텍스트를 입력 및 저장하세요');
    }
  };

  const handleDelete = async (todoId: number | null) => {
    if (todoId) {
      await removeTodo(scheduleId, todoId);
      setClickTodoAddBtn((prev) => !prev);
    }
  };

  const handleChangeTodo = (e: any) => {
    setFTodoContent(e.target.value);
  };
  /**포커스 내용은 저장, 새로운 Todo 생성 기능 */
  const handleAddTodo = async () => {
    if (!scheduleId) {
      Swal.fire({
        title: '학기가 있어야 합니다.',
        text: '학기 추가 혹은 학기 선택을 먼저 해주십시오.',
      });
      return;
    }
    if (fTodoContent === '') {
      window.alert('Todo를 작성해 주십시오.');
      return;
    }

    const date = clickedDate;
    const todoData = {
      content: fTodoContent,
    };

    const newTodo = {
      id: todos.length + 1,
      date: '',
      status: false,
      content: '',
    };
    //1 가상의 텍스트 필드 노출
    setFakeTodo([newTodo]);
    //2. 작성 중인 값 실제로 등록
    // 만약, todos 목록에 있는 id와 수정 중인 상태의 id가 같다면
    if (todoId && isEdit[todoId]) {
      window.alert('수정 중인 값은 등록되지 않습니다.');
      return;
    } else {
      try {
        // 등록
        const res = await createTodo(scheduleId, todoData, date);
        setTodos([res.data, ...todos]);
        setFTodoContent('');
        setIsEdit((prev) => ({ ...prev, [todoId!]: false }));
      } catch {}
    }

    setClickTodoAddBtn((prev) => !prev);
    // if (todos.length === 0) {
    //   await createTodo(scheduleId, todoData, date);
    // } else if (todos.length > 0 && todoContent.trim() === '') {
    //   window.alert('텍스트 입력 후 저장하십시오.');
    //   return;
    // } else if (todoContent.trim() !== '') {
    //   try {
    //     const res = await createTodo(scheduleId, todoData, date);
    //     setTodos([res.data, ...todos]);
    //   } catch {}
    //   setTodoContent('');
    // }
  };

  const handleFocus = (todoId: number | null) => {
    if (todoId) {
      if (inputRefs.current && inputRefs.current[todoId]) {
        inputRefs.current[todoId]?.focus();
        setFocusedTodoId(todoId);
      }
    }
  };

  // const handleKeyDown = async (event: any) => {
  //   if (event.key === 'Enter') {
  //     event.preventDefault();

  //     if (todoContent.trim() !== '') {
  //       const date = clickedDate;
  //       const todoData = {
  //         content: todoContent,
  //       };

  //       await createTodo(scheduleId, todoData, date);
  //     } else {
  //       window.alert('입력값을 입력해주세요.');
  //     }
  //   }
  // };

  const handleInputBlur = async (todoId: number | null) => {
    if (todoId && isEdit[todoId]) {
      const date = clickedDate;
      const todoData = {
        content: todoContent,
      };
      await updateTodo(scheduleId, todoId, todoData, date);
    }
    setClickTodoAddBtn((prev) => !prev);
    setIsEdit((prev) => ({ ...prev, [todoId!]: false }));
  };

  const handleTodoEdit = async (todoId: number | null) => {
    if (todoId) {
      const date = clickedDate;
      const todoData = {
        content: todoContent,
      };
      await updateTodo(scheduleId, todoId, todoData, date);
    }
    setClickTodoAddBtn((prev) => !prev);
    setIsEdit((prev) => ({ ...prev, [todoId!]: false }));
  };
  return (
    <STodoWrapper>
      <STodoInputWrapper>
        <STodoHeader>
          <SFont>To do</SFont>

          <STodoTotalNumber>{todos.length}</STodoTotalNumber>
        </STodoHeader>

        <STodoTextField
          placeholder="todo 입력"
          onChange={handleChangeTodo}
          value={fTodoContent}
        ></STodoTextField>
        <STodoInputContainer>
          {todos.map((todoItem) => (
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
                $focused={focusedTodoId === todoItem.id}
                ref={(el: any) =>
                  todoItem.id ? (inputRefs.current[todoItem.id] = el) : null
                }
                onClick={() => handleFocus(todoItem.id)}
                defaultValue={todoItem.content}
                $completed={todoItem.status}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleChangeTodoInput(e, todoItem.id)
                }
                // onKeyDown={handleKeyDown}
                onBlur={() => handleInputBlur(todoItem.id)}
                readOnly={todoItem.status}
              />
              {focusedTodoId === todoItem.id &&
                todoItem.id &&
                todoItem.content !== '' &&
                isEdit[todoItem.id] && (
                  <SEdit
                    onClick={() => {
                      // handleTodoEdit(todoItem.id);
                    }}
                  >
                    수정
                  </SEdit>
                )}
              <IcCloseSmall
                onClick={() => handleDelete(todoItem.id)}
                className="deleteIcon"
              />
            </STodoContainer>
          ))}
        </STodoInputContainer>
      </STodoInputWrapper>

      <SAddTodo onClick={handleAddTodo}>
        등록
        {/* <IcAddWhite /> */}
      </SAddTodo>
    </STodoWrapper>
  );
});

export default Todo;
