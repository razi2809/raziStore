import { Navigate } from "react-router-dom";
import { FC, Fragment, ReactNode } from "react";
import { useAppSelector } from "../REDUX/bigPie";
import { ROUTER } from "../Router/ROUTER";
interface Props {
  children: ReactNode;
}
const AuthPrevent: FC<Props> = ({ children }) => {
  const loggedin = useAppSelector((bigPie) => bigPie.authReducer.isLoggedIn);
  //if the user loggedin he cant use this page so direct him
  if (!loggedin) {
    return <Fragment>{children}</Fragment>;
  } else {
    // WarningMessage(`you alreday logged in`);
    return <Navigate to={ROUTER.HOME} replace={true} />;
  }
};
export default AuthPrevent;
