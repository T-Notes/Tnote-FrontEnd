import styled from 'styled-components';
import { useState } from 'react';
import { IcAddWhite } from '../../assets/icons';
import { Button } from '../common/styled/Button';
import TodoListInput from './TodoListInput';

const SAddTodo = styled(Button)`
  background-color: ${({ theme }) => theme.colors.purple100};
  width: 260px;
  height: 40px;
  color: ${({ theme }) => theme.colors.white};
`;
const Todo = () => {
  const [todoInputs, setTodoInputs] = useState<any[]>([
    { id: 1, isVisible: false },
  ]);

  const handleAddTodo = () => {
    setTodoInputs((prevInputs) => [
      ...prevInputs,
      { id: prevInputs.length + 1, isVisible: true },
    ]);
  };
  return (
    <>
      {/* <div>To do</div> */}
      {todoInputs.map(
        (todoInput) =>
          todoInput.isVisible && <TodoListInput key={todoInput.id} />,
      )}
      <SAddTodo onClick={handleAddTodo}>
        <IcAddWhite />
      </SAddTodo>
    </>
  );
};

export default Todo;
