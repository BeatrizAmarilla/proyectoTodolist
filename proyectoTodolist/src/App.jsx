import "./App.css";
import AddTask from "./components/AddTask";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Stack } from "@mui/material";

function App() {
  return (
    <Stack sx={{
      width:"80%",
      maxWidth:"1200px",
      margin:"0 auto", 
      boxSizing:"border-box",
      height:"100vh",
      
    }}>
    
      <Header />
      <AddTask />
      <Footer/>
     
    </Stack>
  );
}

export default App;
