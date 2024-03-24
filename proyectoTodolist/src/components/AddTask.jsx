import { useState } from "react";
import TextField from "@mui/material/TextField";

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
    const updatedTasks = tasks.map((task) => {
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
      <TextField
        sx={{ backgroundColor: "white", mr: "50px" }}
        required
        id="filled-required"
        label="TAREA"
        defaultValue="INGRESE UNA TAREA"
        variant="filled"
        onChange={(e) => setNombre(e.target.value)}
      />

      <select name="" id="">
        <option value="">todas</option>
        <option value="">completas</option>
        <option value="">incompletas</option>
      </select>
      <button onClick={AddNewTask}>SEND</button>

      {tasks.map((task) => (
        <div key={task.id}>
          <h1
            style={{ textDecoration: task.completed ? "line-through" : "none" }}
          >
            {task.nombre}
          </h1>
          <button onClick={() => markTaskComplete(task.id)}>
            {task.completed ? "Completada" : "Marcar como completada"}
          </button>
          <button onClick={() => deleteTask(task.id)}>Eliminar tarea</button>
        </div>
      ))}
    </div>
  );
}
