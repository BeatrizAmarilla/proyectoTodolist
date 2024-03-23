import { useState } from "react";

export default function AddTask() {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || [] 
  );
  const [nombre, setNombre] = useState("");

  function AddNewTask() {
    const newTask = [
      ...tasks,
      { id: crypto.randomUUID(), nombre, completed: false }, 
    ];
    setTasks(newTask);
    localStorage.setItem("tasks", JSON.stringify(newTask));
  } 

  function markTaskComplete(id) {
    const updatedTasks = tasks.map(task => {
      if (task.id === id) {
        return { ...task, completed: true };
      }
      return task;
    });
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  }
  function deleteTask(id) {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  }

  return (
    <div>
      <h1>TODO LIST</h1>
      <input
        type="text"
        placeholder="Ingrese una tarea"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />
      <select name="" id="">
        <option value="">todas</option>
        <option value="">completas</option>
        <option value="">incompletas</option>
      </select>
      <button onClick={AddNewTask}>Añadir tarea</button>

      {tasks.map((task) => (
        <div key={task.id}>
          <h1 style={{ textDecoration: task.completed ? "line-through" : "none" }}>
            {task.nombre}
          </h1>
          <button onClick={() => markTaskComplete(task.id)} >
            {task.completed ? "Completada" : "Marcar como completada"}
          </button>
          <button onClick={() => deleteTask(task.id)}>Eliminar tarea</button>
        </div>
      ))}
    </div>
  );
}