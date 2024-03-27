import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import { FaCheck, FaTrash } from "react-icons/fa";
import {
  FormControl,
  FormLabel,
  Input,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";

export default function AddTask() {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );
  const [nombre, setNombre] = useState("");
  const [filterOption, setFilterOption] = useState("all");
  const [error, setError] = useState("");

  function AddNewTask() {
    if (nombre.length < 5) {
      return;
    }

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

  const selectOption = [
    {
      value: "all",
      label: "Todas",
    },
    {
      value: "completed",
      label: "Completada",
    },
    {
      value: "incomplete",
      label: "Incompleta",
    },
  ];
  console.log(error);
  return (
    <Stack
      direction={{ md: "row", xs: "column" }}
      flexWrap={"wrap"}
      width={"100%"}
      gap={2}
    >
      <Stack direction={{ xs: "column", md: "row" }} width={"100%"} spacing={2}>
        <FormControl sx={{ width: { md: "49%", xs: "100%" } }}>
          <FormLabel sx={{ color: "white" }}>Agregar Tarea</FormLabel>

          <TextField
            sx={{
              backgroundColor: "white",
            }}
            required
            id="filled-required"
            placeholder="Correr"
            variant="filled"
            onChange={(e) => {
              setNombre(e.target.value);
              if (e.target.value.length < 5) {
                setError("La tarea debe tener al menos 5 caracteres.");
              } else {
                setError("");
              }
            }}
            error={Boolean(error)} 
            helperText={error} 
            inputProps={{ maxLength: 30 }}
          />
        </FormControl>

        <FormControl sx={{ width: { md: "49%", xs: "100%" } }}>
          <FormLabel sx={{ color: "white" }}>Seleccionar Tipo de Tarea</FormLabel>
          <TextField
            sx={{ backgroundColor: "white" }}
            id="outlined-select-currency"
            select
            placeholder="Seleccione tipo de tarea"
            onChange={(e) => setFilterOption(e.target.value)}
            defaultValue="all"
          >
            {selectOption.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </FormControl>
      </Stack>

      <Stack
        sx={{
          justifyContent: { xs: "center", md: "flex-start" },
          alignItems: "center",
          width: "100%",
        }}
      >
        <Button
          variant="contained"
          endIcon={<SendIcon />}
          onClick={AddNewTask}
          sx={{
            background: "#4449D8",
            textTransform: "none",
            "&:hover": {
              backgroundColor: "#4449D8",
            },
            width: { md: "20%", xs: "100%" },
          }}
        >
          Agregar
        </Button>
      </Stack>

      {tasks.filter(filterTasks).map((task) => (
        <Stack
          key={task.id}
          width={{ md: "80%", xs: "100%" }}
          margin={"0 auto"}
          direction={"row"}
          sx={{
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px",
            borderRadius: "8px",
            backgroundColor: "aliceblue",
            color: "black",
            gap: "4px",
            boxSizing: "border-box",
          }}
        >
          <Stack width={"69%"} flexWrap={"nowrap"}>
            <Typography
              sx={{
                textDecoration: task.completed ? "line-through" : "none",
              }}
            >
              {task.nombre}
            </Typography>
          </Stack>

          <Stack
            direction={"row"}
            width={"29%"}
            justifyContent={"center"}
            alignItems={"end"}
            gap={"4px"}
          >
            <Button
              onClick={() => markTaskComplete(task.id)}
              size="small"
              sx={{
                backgroundColor: task.completed ? "grey" : "green",
                color: "white",
                width: "49%",
                padding: "8px",
                minWidth: "",
                fontSize: "12px",
                "&:hover": {
                  backgroundColor: task.completed ? "grey" : "green",
                },
              }}
            >
              <FaCheck />
            </Button>

            <Button
              onClick={() => deleteTask(task.id)}
              size="small"
              sx={{
                backgroundColor: "red",
                color: "white",
                width: "49%",
                padding: "8px",
                minWidth: "",
                fontSize: "12px",
                "&:hover": {
                  backgroundColor: "red",
                },
              }}
            >
              <FaTrash fontSize={"12px"} />
            </Button>
          </Stack>
        </Stack>
      ))}
    </Stack>
  );
}
