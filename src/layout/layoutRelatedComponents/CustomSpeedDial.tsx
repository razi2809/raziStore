import { FC, useState } from "react";
import { SpeedDial, SpeedDialAction, Tooltip } from "@mui/material";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
interface Props {
  actions: {
    icon: JSX.Element;
    name: "Share" | "edit" | "add product";
  }[];
  onActionClick: (actionName: "Share" | "edit" | "add product") => void;
  canEdit: boolean;
}
const CustomSpeedDial: FC<Props> = ({ actions, onActionClick, canEdit }) => {
  const [open, setOpen] = useState(false);

  return (
    <SpeedDial
      ariaLabel="SpeedDial"
      sx={{ position: "absolute", top: 50, right: 50 }}
      icon={<SpeedDialIcon />}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      direction="down"
    >
      {actions.map((action) => {
        const canEditBusiness = action.name === "edit" && canEdit;
        const canAddProducts = action.name === "add product" && canEdit;
        if (
          (action.name === "edit" && !canEditBusiness) ||
          (action.name === "add product" && !canAddProducts)
        )
          return null;
        const actionElement = (
          <SpeedDialAction
            key={action.name}
            icon={<Tooltip title={action.name}>{action.icon}</Tooltip>}
            onClick={() => {
              onActionClick(action.name);
              setOpen(false);
            }}
          />
        );

        return actionElement;
      })}
    </SpeedDial>
  );
};

export default CustomSpeedDial;
