import { Stack, Typography } from "@mui/material";

export default function Header() {
  return (
    <Stack width={"100%"} padding={"10px 0"}>
    <Typography sx={{fontWeight:"bold"}} variant="h2" mt={4} textAlign={"center"} color={"white"}>
      Todo List
    </Typography>
    </Stack>
  );
}
