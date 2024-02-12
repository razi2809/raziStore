import * as React from "react";
import { useRef } from "react";
import { motion, useCycle } from "framer-motion";
import { useDimensions } from "../../hooks/use-dimensions";
import { MenuToggle } from "./MenuToggle";
import { Navigation } from "./Navigation";
import { useAppSelector } from "../../REDUX/bigPie";
import { useTheme } from "@mui/material";
import { links } from "../layoutRelatedComponents/linksRelated/links";
const { alwaysLinks, loggedinLinks, loggedoutLinks, adminType, businessType } =
  links;
const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: "circle(20px at 30px 30px)",
    transition: {
      delay: 0.5,
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
};

export const Sidebar = () => {
  const theme = useTheme();
  const [isOpen, toggleOpen] = useCycle(false, true);
  const containerRef = useRef(null);
  const { height } = useDimensions(containerRef);
  const auth = useAppSelector((bigPie) => bigPie.authReducer);
  const userInfo = auth.user;
  const userLinks = userInfo
    ? userInfo.isAdmin
      ? [...loggedinLinks, ...adminType]
      : loggedinLinks
    : loggedoutLinks;

  return (
    <motion.nav
      className={`navSideBar ${!isOpen ? "sidebar-hidden" : ""}`}
      initial={false}
      animate={isOpen ? "open" : "closed"}
      custom={height}
      ref={containerRef}
    >
      <motion.div
        className="background"
        variants={sidebar}
        style={{
          backgroundColor: theme.palette.divider,
        }}
      />
      <Navigation
        closeMenu={() => {
          toggleOpen();
        }}
        links={userLinks}
      />

      <MenuToggle
        toggle={() => {
          toggleOpen();
        }}
      />
    </motion.nav>
  );
};
