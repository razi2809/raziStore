import { Route, Routes } from "react-router-dom";
import { ROUTER } from "./ROUTER";
import GoogleButton from "../googleButton";
import RegisterPage from "../pages/userRelatedPages/RegisterPage";
import Directing from "../pages/layoutRelatedPages/Directing";

const Router = () => {
  return (
    <Routes>
      <Route index element={<Directing />} />
      <Route path={ROUTER.HOME} element={<div>Home</div>} />
      <Route path={ROUTER.REGISTER} element={<RegisterPage />} />
    </Routes>
  );
};
export default Router;
