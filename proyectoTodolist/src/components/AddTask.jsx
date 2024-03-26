import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import SendIcon from "@mui/icons-material/Send";
import { FaCheck, FaTrash } from "react-icons/fa";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import NativeSelect from "@mui/material/NativeSelect";
import { Stack, Typography } from "@mui/material";

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
    <>
      <Stack direction={{md:"row",xs:"column"}} flexWrap={"wrap"} width={"100%"} gap={"1rem"}>
      <TextField
        sx={{backgroundColor: "white", mb: "10px",width:{md:"49%",xs:"100%"}}}
        required
        id="filled-required"
        label="TAREA"
        defaultValue="INGRESE UNA TAREA"
        variant="filled"
        onChange={(e) => setNombre(e.target.value)}
      />

      <FormControl sx={{backgroundColor: "white",width:{md:"49%",xs:"100%"}}}>
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
      <Stack sx={{alignItems:"center",width:"100%"}}>
      <Button variant="contained" endIcon={<SendIcon />} onClick={AddNewTask} sx={{alignSelf:"center",background:"#3f51b5"}} fullWidth>
        Send
      </Button>
      </Stack>

      {tasks.filter(filterTasks).map((task) => (
        <Stack
          key={task.id}
          width={{md:"80%",xs:"100%"}}
          margin={"0 auto"}
          direction={"row"}
          sx={{
            justifyContent:"space-between",
            alignItems:"center",
           
            backgroundColor: "white",
            color: "black",
            gap:"4px",
            boxSizing:"border-box",
          }}
        >
        <Stack width={"69%"} flexWrap={"nowrap"}> <Typography sx={{textDecoration: task.completed ? "line-through" : "none",}}
        textAlign={""}>{task.nombre}</Typography></Stack>
          
        <Stack direction={"row"} width={"29%"} justifyContent={"center"} alignItems={"end"} gap={"4px"}>
          <Button
            onClick={() => markTaskComplete(task.id)}
            size="small"
            sx={{
              backgroundColor: task.completed ? "grey" : "green",
              color: "white",
              width:"49%",
              padding:"8px",
              minWidth:"",
              fontSize:"12px",
            }}
          >
             <FaCheck /> 
          </Button>

          <Button
            onClick={() => deleteTask(task.id)}
            size="small"
            sx={{
              backgroundColor: "black",
              color: "white",
              width:"49%",
              padding:"8px",
              minWidth:"",
              fontSize:"12px",
            }}
          >
            <FaTrash />
          </Button>
          </Stack>
        </Stack>
      ))} 






      </Stack>



      
    </>
  );
}
