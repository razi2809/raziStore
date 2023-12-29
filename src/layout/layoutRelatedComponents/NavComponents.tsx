import { Typography } from "@mui/material";
import { FC, ReactNode, useState } from "react";
import { NavLink } from "react-router-dom";
interface Props {
  to: string;
  children: ReactNode;
}
const NavLinkComponent: FC<Props> = ({ to, children }) => {
  const [mouseOver, setMouseOver] = useState(false);

  const hanlePageNavigate = () => {
    window.scrollTo(0, 0);
  };
  return (
    <NavLink
      onMouseEnter={() => setMouseOver(true)}
      onMouseLeave={() => setMouseOver(false)}
      to={to}
      onClick={hanlePageNavigate}
      style={{ textDecoration: "none" }}
    >
      {({ isActive }) => (
        <Typography
          sx={{ p: 1, fontSize: 19, fontWeight: "bold", textAlign: "center" }}
        >
          {children}
        </Typography>
      )}
    </NavLink>
  );
};

export default NavLinkComponent;
