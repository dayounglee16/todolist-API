const TitleTodo = ({ todo, onClick }) => {
  return (
    <li
      className="textDecoration"
      // onClick 함수를 부모에서 내리도록 수정
      onClick={() => onClick(todo.id)}
      style={{
        // 이게 지역 상태로만 관리하면 실제 todos가 바뀌지 않으니까, 그 기준을 부모의 todos로 잡음
        textDecoration: todo.completed === true ? "line-through" : "none",
      }}
    >
      {todo.title}
    </li>
  );
};

export default TitleTodo;
