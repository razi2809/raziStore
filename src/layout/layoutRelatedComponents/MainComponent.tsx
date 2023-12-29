import { Box, Container } from "@mui/material";
import { FC, Fragment, ReactNode } from "react";
interface Prop {
  children: ReactNode;
}
const MainComponent: FC<Prop> = ({ children }) => {
  return (
    <Box sx={{ m: 0, p: 0, border: "1px solid transparent" }}>{children}</Box>
  );
};

export default MainComponent;
