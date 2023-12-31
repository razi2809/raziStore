import { ROUTER } from "../../Router/ROUTER";

export const links = {
  alwaysLinks: [],
  loggedinLinks: [
    { to: ROUTER.HOME, children: "Home page" },
    //   { to: `${ROUTER.CARDS}/favorite`, children: "favorite" },
  ],
  loggedoutLinks: [
    { to: ROUTER.HOME, children: "Home page" },

    { to: ROUTER.REGISTER, children: "Register page" },
    { to: ROUTER.LOGIN, children: "Login page" },
    { to: ROUTER.PASSWORDRESET, children: "reset password" },
  ],
  businessType: [
    //   {
    //     to: `${ROUTER.CARDS}/createcard`,
    //     children: "create card",
    //   },
  ],
  adminType: [
    // { to: ROUTER.SANDBOX, children: "SANDBOX" }
  ],
};
