import * as React from "react";
import { motion } from "framer-motion";
import { MenuItem } from "../headerRelatedComponent/MenuItem";

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

interface Props {
  closeMenu: React.MouseEventHandler<HTMLLIElement>;
  links: {
    to: string;
    children: string;
    key: number;
  }[];
}
export const BottomNavigation: React.FC<Props> = ({ closeMenu, links }) => {
  return (
    <motion.ul
      variants={variants}
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        paddingLeft: 0,
      }}
    >
      {links.map((myItem) => (
        <MenuItem key={myItem.to} closeMenu={closeMenu} links={myItem} />
      ))}
    </motion.ul>
  );
};
