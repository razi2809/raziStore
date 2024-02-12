import { Children } from "react";
import { ROUTER } from "../../../Router/ROUTER";

export const links = {
  alwaysLinks: [],
  loggedinLinks: [{ to: ROUTER.HOME, children: "Home page", key: 1 }],
  loggedoutLinks: [
    { to: ROUTER.HOME, children: "Home page", key: 2 },
    { to: ROUTER.REGISTER, children: "Register page", key: 3 },
    { to: ROUTER.LOGIN, children: "Login page", key: 4 },
    { to: ROUTER.PASSWORDRESET, children: "reset password", key: 5 },
  ],
  businessType: [
    //   {
    //     to: `${ROUTER.CARDS}/createcard`,
    //     children: "create card",
    //   },
  ],
  adminType: [
    {
      to: `${ROUTER.BUSINESS}/newBusiness`,
      children: "create business",
      key: 6,
    },
    { to: `${ROUTER.CRM}`, children: "crm system", key: 7 },
  ],
  contectMe: [
    {
      to: `${ROUTER.CONTACTME}`,
      children: "contact me",
      key: 8,
    },
  ],
};
