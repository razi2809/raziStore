import { Navigate } from "react-router-dom";
import { FC, Fragment, ReactNode } from "react";
import { useAppSelector } from "../REDUX/bigPie";
import { ROUTER } from "../Router/ROUTER";
interface Props {
  children: ReactNode;
}
const VerifyGuard: FC<Props> = ({ children }) => {
  const user = useAppSelector((bigPie) => bigPie.authReducer.user);

  if (user?.verified) {
    return <Fragment>{children}</Fragment>;
  } else {
    return <Navigate to={ROUTER.HOME} replace={true} />;
  }
};
export default VerifyGuard;
