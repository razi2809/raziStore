import * as React from "react";
import { motion } from "framer-motion";
import { Typography, useTheme } from "@mui/material";
import { NavLink, useLocation } from "react-router-dom";

const variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

interface Props {
  closeMenu: React.MouseEventHandler<HTMLLIElement>;
  links: {
    to: string;
    children: string;
  };
}
export const MenuItem: React.FC<Props> = ({ closeMenu, links }) => {
  const [active, setActive] = React.useState("");
  const location = useLocation();
  const theme = useTheme();

  const handlePageNavigate = () => {
    window.scrollTo(0, 0);
  };

  React.useEffect(() => {
    switch (location.pathname.slice(1)) {
      case "home":
        setActive("Home page");
        break;
      case "login":
        setActive("Login page");
        break;
      case "register":
        setActive("Register page");
        break;
      case "forgotPassword":
        setActive("reset password");
        break;
      case "business/newBusiness":
        setActive("create business");
        break;
      case "crm":
        setActive("crm system");
        break;
      case "contactMe":
        setActive("contact me");
        break;
      default:
        setActive("");
    }
  }, [location.pathname]);

  return (
    <motion.li
      onClick={closeMenu}
      variants={variants}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <NavLink
        to={links.to}
        onClick={handlePageNavigate}
        style={{ textDecoration: "none", position: "relative" }}
      >
        <Typography
          sx={{
            p: 1,
            fontSize: 19,
            fontWeight: "bold",
            textAlign: "center",
            textDecoration: "none",
            color: "text.primary",
            borderRadius: 10,
          }}
        >
          {links.children}
        </Typography>{" "}
        {active === links.children && (
          <motion.span
            style={{
              position: "absolute",
              top: 50,
              height: "2px",
              width: "100%",
              backgroundColor:
                theme.palette.mode === "light" ? "black" : "white",
            }}
            layoutId="activeLinks"
            transition={{
              type: "spring",
              stiffness: 380,
              damping: 30,
            }}
          >
            {" "}
          </motion.span>
        )}
      </NavLink>
    </motion.li>
  );
};
