import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import "./App.css";
import TodoList from "./components/TodoList";

export const instance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

function App() {
  const [todos, setTodos] = useState([]);
  const [addInputValue, setAddInputValue] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await instance.get(`/todos`);
        setTodos([...res.data.slice(0, 5)]);
      } catch (error) {
        console.error(`error ${error}`);
      }
    };

    getData();
  }, []);

  const onChange = (e) => {
    setAddInputValue(e.target.value);
  };

  const addTodoItem = async () => {
    const newTodoObj = {
      title: addInputValue,
    };

    try {
      if (addInputValue === "") {
        setTodos([...todos]);
      } else {
        const res = await instance.post("/todos", newTodoObj);
        setTodos([...todos, res.data]);
        setAddInputValue("");
      }
    } catch (error) {
      console.error(`error ${error}`);
    }
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      addTodoItem();
    }
  };

  return (
    <Container>
      <h1>ToDoList</h1>
      <InputBox>
        <input
          type="text"
          value={addInputValue}
          onChange={onChange}
          onKeyDown={onKeyDown}
        />
        <button onClick={addTodoItem}>추가</button>
      </InputBox>
      {/* 보통은 파일 이름이랑 컴포넌트 이름이랑 맞춰요. 안맞추면 다른 사람이 찾기가 힘듬 */}
      <TodoList todos={todos} setTodos={setTodos} instance={instance} />
    </Container>
  );
}

export default App;

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 15px;

  h1 {
    font-size: 36px;
    text-align: center;
    margin: 20px 0;
  }
`;

const InputBox = styled.div`
  width: 100%;
  display: flex;
  gap: 10px;
  input {
    flex: 1;
    padding: 15px;
    border-radius: 5px;
    border: none;
  }
  button {
    padding: 10px 20px;
    border: none;
  }
`;
