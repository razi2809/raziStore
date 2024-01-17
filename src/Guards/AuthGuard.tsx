import { Navigate, useLocation } from "react-router-dom";
import { FC, Fragment, ReactNode } from "react";
import { useAppSelector } from "../REDUX/bigPie";
import { ROUTER } from "../Router/ROUTER";
import notify from "../services/toastService";
interface Props {
  children: ReactNode;
}
const AuthGuard: FC<Props> = ({ children }) => {
  const loggedin = useAppSelector((bigPie) => bigPie.authReducer.isLoggedIn);
  const location = useLocation();
  // redircet the user on access page he should not enter and saving to original path
  //so when they will login direct tehm to the original path
  if (loggedin) {
    return <Fragment>{children}</Fragment>;
  } else {
    notify.warning("you need to log in to access this page");
    return (
      <Navigate
        to={ROUTER.LOGIN}
        state={{ redirect: location.pathname }}
        replace={true}
      />
    );
  }
};
export default AuthGuard;
