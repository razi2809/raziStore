import { Navigate, useLocation } from "react-router-dom";
import { FC, Fragment, ReactNode } from "react";
import { useAppSelector } from "../REDUX/bigPie";
import { ROUTER } from "../Router/ROUTER";
import notify from "../services/toastService";
interface Props {
  children: ReactNode;
}
const AuthPrevent: FC<Props> = ({ children }) => {
  const loggedin = useAppSelector((bigPie) => bigPie.authReducer.isLoggedIn);
  const location = useLocation();

  //if the user loggedin he cant use this page so direct him

  if (!loggedin) {
    return <Fragment>{children}</Fragment>;
  } else {
    if (location.pathname !== ROUTER.LOGIN) {
      notify.warning(`you alreday logged in`);
    }
    return <Navigate to={ROUTER.HOME} replace={true} />;
  }
};
export default AuthPrevent;
