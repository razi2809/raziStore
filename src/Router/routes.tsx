import { Route, Routes } from "react-router-dom";
import { ROUTER } from "./ROUTER";
import GoogleButton from "../googleButton";
import RegisterPage from "../pages/userRelatedPages/RegisterPage";
import Directing from "../pages/layoutRelatedPages/Directing";
import VerifyUserPage from "../pages/userRelatedPages/VerifyUserPage";
import LoginPage from "../pages/userRelatedPages/LoginPage";
import AuthPrevent from "../Guards/AuthPrevent";
import AuthGuard from "../Guards/AuthGuard";
import GoogleMap from "../components/layoutRelatedComponents/GoogleMap";
import ProfileViewer from "../pages/userRelatedPages/ProfileViewer";
import RegisterPageCopy from "../pages/userRelatedPages/RegisterPage copy";

const Router = () => {
  return (
    <Routes>
      <Route index element={<Directing />} />
      <Route path={ROUTER.HOME} element={<div>Home</div>} />
      <Route path={ROUTER.REGISTER} element={<RegisterPageCopy />} />
      <Route
        path={ROUTER.LOGIN}
        element={
          <AuthPrevent>
            <LoginPage />
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
