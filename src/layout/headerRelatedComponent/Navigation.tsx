import * as React from "react";
import { motion } from "framer-motion";
import { MenuItem } from "./MenuItem";

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
  }[];
}
export const Navigation: React.FC<Props> = ({ closeMenu, links }) => {
  return (
    <motion.ul variants={variants} className="ul">
      {links.map((myItem) => (
        <MenuItem key={myItem.to} closeMenu={closeMenu} links={myItem} />
      ))}
    </motion.ul>
  );
};
