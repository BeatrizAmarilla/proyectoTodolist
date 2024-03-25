import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import SendIcon from "@mui/icons-material/Send";
import { FaCheck, FaTrash } from "react-icons/fa";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import NativeSelect from "@mui/material/NativeSelect";

export default function AddTask() {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );
  const [nombre, setNombre] = useState("");
  const [filterOption, setFilterOption] = useState("all");

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
        return { ...task, completed: !task.completed };
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

  function filterTasks(task) {
    if (filterOption === "all") {
      return true;
    } else if (filterOption === "completed") {
      return task.completed;
    } else if (filterOption === "incomplete") {
      return !task.completed;
    }
    return true;
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
          onChange={(e) => setFilterOption(e.target.value)}
        >
          <option value="all">TODAS</option>
          <option value="completed">COMPLETA</option>
          <option value="incomplete">INCOMPLETA</option>
        </NativeSelect>
      </FormControl>

      <Button variant="contained" endIcon={<SendIcon />} onClick={AddNewTask}>
        Send
      </Button>

      {tasks.filter(filterTasks).map((task) => (
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
