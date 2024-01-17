import { ToggleButton, ToggleButtonGroup, Tooltip } from "@mui/material";
import React, { FC, useState } from "react";
import GridOnIcon from "@mui/icons-material/GridOn";
import TocOutlinedIcon from "@mui/icons-material/TocOutlined";
import { useNavigate, useSearchParams } from "react-router-dom";
type newDevices = "grid" | "tabel";
interface Props {
  handleDevices: (newDevices: newDevices) => void;
}
const GridviewLayout: FC<Props> = ({ handleDevices }) => {
  const [searchParams] = useSearchParams();
  const WhatView = searchParams.get("view") || "grid";
  const [layout, setLayout] = useState(WhatView);
  const navigate = useNavigate();

  const handleDevicesChange = (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    newDevices: newDevices
  ) => {
    if (newDevices) {
      if (newDevices === "grid") {
        handleDevices(newDevices);
        navigate(`/crm?view=${newDevices}`);
      } else {
        navigate(`/crm?view=${newDevices}`);
        handleDevices(newDevices);
      }
      setLayout(newDevices);
    }
  };
  return (
    <ToggleButtonGroup
      value={layout}
      onChange={handleDevicesChange}
      aria-label="device"
      exclusive
    >
      <ToggleButton
        value="grid"
        aria-label="grid"
        sx={{ borderRadius: "30%", mr: 0, height: 1 }}
      >
        <Tooltip title="grid view" placement="top">
          <GridOnIcon />
        </Tooltip>
      </ToggleButton>

      <ToggleButton
        value="table"
        aria-label="table"
        sx={{ borderRadius: "30%", height: 1 }}
      >
        <Tooltip title="table view" placement="top">
          <TocOutlinedIcon />
        </Tooltip>
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export default GridviewLayout;
