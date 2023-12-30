import { Box, Typography } from "@mui/material";
import { FC, Fragment, ReactNode, useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { text } from "stream/consumers";
import { motion } from "framer-motion";

interface Props {
  links: {
    to: string;
    children: string;
  }[];
}
const NavLinkComponent: FC<Props> = ({ links }) => {
  const [mouseOver, setMouseOver] = useState(false);
  const [active, setActive] = useState("");
  const location = useLocation();

  const handlePageNavigate = () => {
    window.scrollTo(0, 0);
  };
  useEffect(() => {
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
      default:
        setActive("");
    }
  }, [location.pathname]);
  return (
    <>
      {links.map((myItem) => {
        return (
          <Fragment key={myItem.children}>
            <NavLink
              onMouseEnter={() => setMouseOver(true)}
              onMouseLeave={() => setMouseOver(false)}
              to={myItem.to}
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
                  color: "black",
                  borderRadius: 10,
                }}
              >
                {myItem.children}
              </Typography>{" "}
              {active === myItem.children && (
                <motion.span
                  style={{
                    backgroundColor: "rgba(128, 128, 128, 0.5)",
                    borderRadius: 50,
                    position: "absolute",
                    inset: 0,
                    zIndex: -1,
                  }}
                  layoutId="activePage"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                >
                  {" "}
                </motion.span>
              )}
            </NavLink>
          </Fragment>
        );
      })}
    </>
  );
};
export default NavLinkComponent;
