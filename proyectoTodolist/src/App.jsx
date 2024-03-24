import './App.css'
import AddTask from "./components/AddTask";
import {Typography} from "@mui/material";

function App() {
  return (
    <>
       <Typography variant="h2" mb={4}>
          TODO LIST
        </Typography>

    <AddTask /> 
    </>
  )
}

export default App