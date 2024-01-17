import { Navigate } from "react-router-dom";
import { FC, Fragment, ReactNode } from "react";
import { useAppSelector } from "../REDUX/bigPie";
import { ROUTER } from "../Router/ROUTER";
import notify from "../services/toastService";
interface Props {
  children: ReactNode;
}
const VerifyGuard: FC<Props> = ({ children }) => {
  const user = useAppSelector((bigPie) => bigPie.authReducer.user);

  if (!user?.verified) {
    notify.warning("you need to be verified");
    return <Navigate to={`${ROUTER.VERIFY}/${user?.email}`} replace={true} />;
  } else {
    return <Fragment>{children}</Fragment>;
  }
};
export default VerifyGuard;
