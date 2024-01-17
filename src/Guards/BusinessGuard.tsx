import { Navigate, useLocation } from "react-router-dom";
import { FC, Fragment, ReactNode } from "react";
import { useAppSelector } from "../REDUX/bigPie";
import { ROUTER } from "../Router/ROUTER";
import notify from "../services/toastService";
interface Props {
  children: ReactNode;
}
const BusinessGuard: FC<Props> = ({ children }) => {
  const user = useAppSelector((bigPie) => bigPie.authReducer);
  // redircet the user on access page he should not enter and
  if (user.user?.isBusiness) {
    return <Fragment>{children}</Fragment>;
  } else {
    notify.warning(
      "you need to be an business type user to access this page, try to contact the develper"
    );
    return <Navigate to={ROUTER.HOME} replace={true} />;
  }
};
export default BusinessGuard;
