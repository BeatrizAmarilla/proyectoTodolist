import "./App.css";
import AddTask from "./components/AddTask";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Stack } from "@mui/material";

function App() {
  return (
    <Stack
      sx={{
        backgroundImage: "linear-gradient(120deg, #150169, #000)",
      }}
    >
      <Stack
        sx={{
          width: "80%",
          maxWidth: "1200px",
          margin: "0 auto",
          boxSizing: "border-box",
          gap: 5,
          minHeight: "100vh",
        }}
      >
        <Header />
        <AddTask />
        <Footer />
      </Stack>
    </Stack>
  );
}

export default App;
