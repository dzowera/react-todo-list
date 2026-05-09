import { useEffect } from "react";
import "./Todo.css";

function Todo({ task, onDelete, onToggle }) {
  useEffect(() => {
    console.log("Todo item updated:", task);
  }, [task]);

  return (
    <li className={`todo-item ${task.completed ? "todo-completed" : ""}`}>
      <div className="todo-text">{task.text}</div>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
      />
      <div className="todo-status">
        {task.completed ? "Completed" : "Pending"}
      </div>
      <button onClick={() => onDelete(task.id)}>Delete</button>
    </li>
  );
}

export default Todo;
