import styled from 'styled-components';

const StyledTodoList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;

  .TodoList__wrapper {
    border: 1px solid black;
    padding: 10px;
  }

  .TodoList__cancel {
    text-decoration: line-through;
  }
`;

export default StyledTodoList;
