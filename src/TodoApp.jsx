import { useState, useEffect } from 'react';
import Todo from './Todo';
import './TodoApp.css';

function TodoApp() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });
  const [text, setText] = useState("");

  const handleAddTask = (event) => {
    event.preventDefault();
    if (text.trim() === "") return;
    const newTask = {
      id: crypto.randomUUID(),
      text: text.trim(),
      completed: false,   // important for toggle
    };
    setTasks((prev) => [...prev, newTask]);
    setText("");
  };

  const handleInputChange = (event) => setText(event.target.value);

  const onDelete = (id) => {
    setTasks((prev) => prev.filter((item) => item.id !== id));
  };

  const onToggle = (id) => {
    setTasks((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div className="todo-app">
      <input
        type="text"
        value={text}
        onChange={handleInputChange}
        placeholder="Add a new task"
      />
      <button onClick={handleAddTask}>Add</button>
      <ul>
        {tasks.map((task) => (
          <Todo
            key={task.id}
            task={task}
            onDelete={onDelete}
            onToggle={onToggle}
          />
        ))}
      </ul>
    </div>
  );
}

export default TodoApp;
