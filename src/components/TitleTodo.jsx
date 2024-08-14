import { useState } from "react";

const TitleTodo = ({ todo }) => {
  const [isCheckedLine, setIsCheckedLine] = useState(todo.completed);

  //할 일 체크
  const onClickLine = async ({ id, instance }) => {
    try {
      await instance.patch(`/todos/${id}`, { complated: !isCheckedLine });
      setIsCheckedLine(!isCheckedLine);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <li
      className="textDecoration"
      onClick={() => onClickLine(todo.id)}
      style={{
        textDecoration: isCheckedLine ? "line-through" : "none",
      }}
    >
      {todo.title}
    </li>
  );
};

export default TitleTodo;
