/* eslint-disable react/prop-types */

const TodoList = ({ todos, removeTodo }) => {
  return (
    <ul>
      {todos.map((todo, index) => (
        <li key={index}>
          {todo}
          <button onClick={() => removeTodo(index)}>Remove</button>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;