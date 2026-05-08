import { useState } from 'react';
import Todo from './Todo';

import './TodoApp.css';
function TodoApp (){
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");

  const handleAddTask = (event) => {
    event.preventDefault();
    if (text.trim() === "") return; // Prevent adding empty tasks
    const newTask = {
      id: crypto.randomUUID(),
      text: text.trim(),
    };
    setTasks([...tasks, newTask]);
    setText(""); // Clear the input field after adding a task
  };

  const handleInputChange = (event) => {
    setText(event.target.value);
  };

  const onDelete = (id) => {
    // Logic to delete the todo item
    const todoToDelete = tasks.find((item) => item.id === id);
    if (todoToDelete) {
      const updatedTodos = tasks.filter((item) => item.id !== id);
      setTasks(updatedTodos);
    }
  };
  const onToggle = (id) => {
    // Logic to toggle the completed status of the todo item
    const todoToToggle = tasks.find((item) => item.id === id);
    if (todoToToggle) {
      todoToToggle.completed = !todoToToggle.completed;
      setTasks([...tasks]);
    }
  };

  return (

    <div  className="todo-app">
      <input type="text" value={text} onChange={handleInputChange} placeholder="Add a new task" />
      <button onClick={handleAddTask}>Add</button>
      <ul>
        {tasks.map((task) => (
          <Todo key={task.id} task={task} setTodo={setTasks} onDelete={onDelete} onToggle={onToggle} />
        ))}
      </ul>
    </div>
  )
} 

export default TodoApp;