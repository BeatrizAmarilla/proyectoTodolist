import { useState } from "react";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import NativeSelect from "@mui/material/NativeSelect";

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
        sx={{ minWidth: 500, backgroundColor: "white", mr: "60px", mb: "10px" }}
        required
        id="filled-required"
        label="TAREA"
        defaultValue="INGRESE UNA TAREA"
        variant="filled"
        onChange={(e) => setNombre(e.target.value)}
      />

      <FormControl sx={{ minWidth: 500, backgroundColor: "white", mr: "60px" }}>
        <InputLabel variant="standard" htmlFor="uncontrolled-native">
          SELECCIONAR
        </InputLabel>
        <NativeSelect
          defaultValue={10}
          inputProps={{
            name: "TASK",
            id: "uncontrolled-native",
          }}
        >
          <option value={10}>TODAS</option>
          <option value={20}>COMPLETA</option>
          <option value={30}>INCOMPLETA</option>
        </NativeSelect>
      </FormControl>

      <button onClick={AddNewTask}>Añadir tarea</button>

      {tasks.map((task) => (
        <Box key={task.id}>
          <h1
            style={{ textDecoration: task.completed ? "line-through" : "none" }}
          >
            {task.nombre}
          </h1>
          <button onClick={() => markTaskComplete(task.id)}>
            {task.completed ? "Completada" : "Marcar como completada"}
          </button>
          <button onClick={() => deleteTask(task.id)}>Eliminar tarea</button>
        </Box>
      ))}
    </div>
  );
}
