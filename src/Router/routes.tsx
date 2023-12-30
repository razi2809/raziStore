import { Route, Routes } from "react-router-dom";
import { ROUTER } from "./ROUTER";
import Directing from "../pages/layoutRelatedPages/Directing";
import VerifyUserPage from "../pages/userRelatedPages/VerifyUserPage";
import LoginPage from "../pages/userRelatedPages/LoginPage";
import AuthPrevent from "../Guards/AuthPrevent";
import AuthGuard from "../Guards/AuthGuard";
import ProfileViewer from "../pages/userRelatedPages/ProfileViewer";
import RegisterPage from "../pages/userRelatedPages/RegisterPage";
import ResetPasswordPage from "../pages/userRelatedPages/ResetPasswordPage";
import HomePage from "../pages/businessRelatedPages/HomePage";

const Router = () => {
  return (
    <Routes>
      <Route index element={<Directing />} />
      <Route path={ROUTER.HOME} element={<HomePage />} />
      <Route
        path={ROUTER.REGISTER}
        element={
          <AuthPrevent>
            {" "}
            <RegisterPage />
          </AuthPrevent>
        }
      />
      <Route
        path={ROUTER.LOGIN}
        element={
          <AuthPrevent>
            <LoginPage />
          </AuthPrevent>
        }
      />
      <Route
        path={ROUTER.PASSWORDRESET}
        element={
          <AuthPrevent>
            {" "}
            <ResetPasswordPage />
          </AuthPrevent>
        }
      />
      <Route
        path={`${ROUTER.VERIFY}/:email`}
        element={
          <AuthPrevent>
            <VerifyUserPage />
          </AuthPrevent>
        }
      />
      <Route
        path={`${ROUTER.PROFILE}/:userId`}
        element={
          <AuthGuard>
            {" "}
            <ProfileViewer />{" "}
          </AuthGuard>
        }
      />
    </Routes>
  );
};
export default Router;
