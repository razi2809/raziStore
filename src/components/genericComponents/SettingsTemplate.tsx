import { FC } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import type { changeType } from "../../@types/generic";

interface Props {
  name: changeType;
  value: string | number;
  handleEdit: (name: changeType) => void;
}
const SettingsTemplate: FC<Props> = ({ name, value, handleEdit }) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
        borderBottom: `1px solid ${
          theme.palette.mode === "dark"
            ? "rgba(255, 255, 255, 0.12)"
            : "rgba(32, 33, 37, 0.12)"
        }`,
        pl: 3,
        pr: 3,
        pb: 1,
      }}
    >
      <Box>
        <Typography variant="h6" color="text.primary">
          {name}
        </Typography>
      </Box>
      <Box sx={{ cursor: "pointer" }} onClick={() => handleEdit(name)}>
        <Typography variant="h6" color="blue">
          {value}
        </Typography>
      </Box>
    </Box>
  );
};

export default SettingsTemplate;
