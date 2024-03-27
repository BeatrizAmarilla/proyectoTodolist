import { Stack, Typography } from "@mui/material";
import { FaHeart } from "react-icons/fa";

export default function Header() {
  return (
    <Stack
      mt={"2rem"}
      justifyContent={"center"}


      width={"100%"}
      padding={"10px 0"}
      mb={"2rem"}
      position={"relative"}
      direction={"row"}
      gap={1}
      color={"white"}
    >
      <Typography textAlign={"center"}>Hecho con </Typography>

      <Typography>
        <FaHeart />
      </Typography>
      <Typography> por Beatriz</Typography>
    </Stack>
  );
}
