import { Navigate } from "react-router-dom";
import { FC, Fragment, ReactNode } from "react";
import { useAppSelector } from "../REDUX/bigPie";
import { ROUTER } from "../Router/ROUTER";
import notify from "../services/toastService";
interface Props {
  children: ReactNode;
}
const UnVerifyGuard: FC<Props> = ({ children }) => {
  const user = useAppSelector((bigPie) => bigPie.authReducer.user);

  if (!user?.verified) {
    return <Fragment>{children}</Fragment>;
  } else {
    notify.warning("you are already verified");
    return <Navigate to={ROUTER.HOME} replace={true} />;
  }
};
export default UnVerifyGuard;
