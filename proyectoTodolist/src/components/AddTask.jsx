import { useState } from "react";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import NativeSelect from "@mui/material/NativeSelect";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import { FaTrash } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { Typography } from "@mui/material";

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
        return { ...task, completed: !task.completed }; // Cambiar el estado de completed al contrario de su valor actual
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

      <Button variant="contained" endIcon={<SendIcon />} onClick={AddNewTask}>
        Send
      </Button>

      {tasks.map((task) => (
        <Box
          key={task.id}
          width={400}
          margin={5}
          sx={{
            textDecoration: task.completed ? "line-through" : "none",
            backgroundColor: "white",
            color: "black",
          }}
        >
          {task.nombre}

          <Button
            onClick={() => markTaskComplete(task.id)}
            sx={{
              backgroundColor: task.completed ? "grey" : "green",
              color: "white",
            }}
          >
            {task.completed ? <FaCheck /> : <FaCheck />}
          </Button>

          <Button
            onClick={() => deleteTask(task.id)}
            sx={{
              backgroundColor: "black",
              color: "white",
              marginLeft: "10px",
            }}
          >
            <FaTrash />
          </Button>
        </Box>
      ))}
    </div>
  );
}
