import { Stack, Typography } from "@mui/material";
import { FaHeart } from "react-icons/fa";

export default function Header() {
  return (
    <Stack mt={"2rem"} justifyContent={"center"} width={"100%"} padding={"10px 0"} mb={"2rem"}>
    <Typography color={"white"} textAlign={"center"}>
      Hecho con <FaHeart/>  por Beatriz
    </Typography>
    </Stack>
  );
}
