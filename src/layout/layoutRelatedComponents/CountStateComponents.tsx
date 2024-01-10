import { Box, Fab, Typography } from "@mui/material";
import React, { FC } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
interface Props {
  quantity: number;
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
}
const CountStateComponents: FC<Props> = ({ quantity, count, setCount }) => {
  return (
    <Box
      sx={{
        textTransform: "none",
        fontSize: 16,
        // height: "70%",
        width: "100%",
        color: "white",
        borderRadius: 1,
        display: "flex",
        alignItems: "center",

        justifyContent: "center",
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <Fab
        aria-label="add"
        sx={{ bgcolor: "secondary.main", scale: "0.5", zIndex: 1 }}
        onClick={() => setCount(count + 1)}
        disabled={count >= quantity}
      >
        <AddIcon />
      </Fab>
      <Typography variant="body1" sx={{ color: "secondary.main" }}>
        {count}
      </Typography>
      <Fab
        aria-label="add"
        sx={{ bgcolor: "secondary.main", scale: "0.5", zIndex: 1 }}
        disabled={count < 2}
        onClick={() => setCount(count - 1)}
      >
        <RemoveIcon />
      </Fab>
    </Box>
    // </Box>
  );
};

export default CountStateComponents;
