import styled from "styled-components";
import TitleTodo from "./TitleTodo";

const TodoList = ({ todos, setTodos, instance }) => {
  //삭제
  const onClickDelete = async (todo) => {
    try {
      await instance.delete(`/todos/${todo.id}`);
      const filtered = todos.filter((deleteTodo) => deleteTodo !== todo);
      setTodos(filtered);
    } catch (error) {
      console.log(error);
    }
  };

  //추가
  const updateTodo = async (id, updatedTitle) => {
    try {
      const response = await instance.patch(`/todos/${id}`, {
        title: updatedTitle,
      });
      setTodos(todos.map((todo) => (todo.id === id ? response.data : todo)));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {todos.map((todo, i) => {
        return (
          <List key={i}>
            <div className="listLeft">
              <li> {i + 1}.</li>
              <TitleTodo todo={todo} todos={todos} instance={instance} />
            </div>
            <div className="listRight">
              <button onClick={() => onClickDelete(todo)}>삭제</button>
              <button
                onClick={() => updateTodo(todo.id, "할 일이 수정되었습니다.")}
              >
                수정
              </button>
            </div>
          </List>
        );
      })}
    </>
  );
};

export default TodoList;

const List = styled.ul`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  font-size: 20px;
  gap: 35px;

  .listLeft {
    display: flex;
    justify-content: flex-start;
    flex: 1;
  }

  .listRight {
    display: flex;
    justify-content: flex-end;
  }

  li {
    margin: 15px 10px 10px 0;
  }

  .textDecoration {
    cursor: pointer;
  }
`;
