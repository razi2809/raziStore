import { Box, Typography, useTheme } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useState, useRef, FC, DragEvent, ChangeEvent } from "react";
interface Props {
  onFileSelect: (file: File) => void;
}
const UploadPicComponent: FC<Props> = ({ onFileSelect }) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleDrag = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onFileSelect(e.target.files[0]);
    }
  };
  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        border: `2px dashed ${isDarkMode ? "#666" : "#ccc"}`,
        borderRadius: "10px",
        backgroundColor: isDarkMode ? "#424242" : "#fafafa",
        color: isDarkMode ? "#fff" : "inherit",
        "&:hover": {
          backgroundColor: isDarkMode ? "#535353" : "#f0f0f0",
          borderColor: isDarkMode ? "#888" : "#999",
        },
        ...(dragActive && {
          borderColor: theme.palette.primary.main,
        }),
      }}
      onDragOver={handleDrag}
      onDragLeave={handleDrag}
      onDrop={handleDrop}
      onClick={handleClick}
    >
      <input
        ref={fileInputRef}
        id="file-input"
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleChange}
      />
      <CloudUploadIcon fontSize="large" />
      <Typography variant="body1">
        {dragActive
          ? "Drop the files here ..."
          : "Drag 'n' drop some files here, or click to select files"}
      </Typography>
    </Box>
  );
};

export default UploadPicComponent;
