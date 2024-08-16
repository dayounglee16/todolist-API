import styled from "styled-components";
import { instance } from "../App";
import TitleTodo from "./TitleTodo";

const TodoList = ({ todos, setTodos }) => {
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
      const res = await instance.patch(`/todos/${id}`, {
        title: updatedTitle,
      });
      setTodos(todos.map((todo) => (todo.id === id ? res.data : todo)));
    } catch (error) {
      console.error(`error ${error}`);
    }
  };

  // 자식 컴포넌트의 onClick 함수를 여기로 가지고옴.
  const titleClick = async (id) => {
    try {
      // 직접 수정하려면 꼭 복사후에 진행해야함. useState는 직접 변경 X
      const newTodos = [...todos];
      newTodos.forEach((todo) => {
        // 수동으로 해당 todo의 completed 변경
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
      });

      // 현재 클릭된 todo가 체크되어 있는지 아닌지, 기준을 해당 todo의 completed로 판단.
      const isCompleted = newTodos.filter((todo) => todo.id === id)[0]
        ?.completed;
      await instance.patch(`/todos/${id}`, { completed: !isCompleted });

      setTodos(newTodos);
    } catch (error) {
      console.error(`error ${error}`);
    }
  };

  return (
    <>
      {todos.map((todo, i) => {
        return (
          <List key={i}>
            <div className="listLeft">
              <li> {i + 1}.</li>
              <TitleTodo todo={todo} todos={todos} onClick={titleClick} />
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
