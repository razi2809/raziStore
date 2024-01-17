import { Typography } from "@mui/material";
import { FC, Fragment, useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useTheme } from "@mui/material/styles";

interface Props {
  links: {
    to: string;
    children: string;
  }[];
}
const NavLinkComponent: FC<Props> = ({ links }) => {
  const [active, setActive] = useState("");
  const location = useLocation();
  const theme = useTheme();

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
      case "business/newBusiness":
        setActive("create business");
        break;
      case "crm":
        setActive("crm system");
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
                  color: "text.primary",
                  borderRadius: 10,
                }}
              >
                {myItem.children}
              </Typography>{" "}
              {active === myItem.children && (
                <motion.span
                  style={{
                    position: "absolute",
                    top: 50,
                    height: "2px",
                    width: "100%",
                    backgroundColor:
                      theme.palette.mode === "light" ? "black" : "white",
                  }}
                  layoutId="activeSection"
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
          </Fragment>
        );
      })}
    </>
  );
};
export default NavLinkComponent;
