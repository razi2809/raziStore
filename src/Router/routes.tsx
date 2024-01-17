import { Route, Routes } from "react-router-dom";
import { ROUTER } from "./ROUTER";
import Directing from "../pages/layoutRelatedPages/Directing";
import VerifyUserPage from "../pages/userRelatedPages/VerifyUserPage";
import LoginPage from "../pages/userRelatedPages/LoginPage";
import AuthPrevent from "../Guards/AuthPrevent";
import AuthGuard from "../Guards/AuthGuard";
import RegisterPage from "../pages/userRelatedPages/RegisterPage";
import ResetPasswordPage from "../pages/userRelatedPages/ResetPasswordPage";
import HomePage from "../pages/businessRelatedPages/HomePage";
import BusinessPage from "../pages/businessRelatedPages/BusinessPage";
import PlaceAnOrdePage from "../pages/ordersRelatedPages/PlaceAnOrderPage";
import VerifyGuard from "../Guards/VerifyGuard";
import OrderViewPage from "../pages/ordersRelatedPages/OrderViewPage";
import ProfilePage from "../pages/userRelatedPages/ProfilePage";
import CreateBusiness from "../pages/businessRelatedPages/CreateBusinessPage";
import AddNewProduct from "../pages/businessRelatedPages/AddNewProduct";
import AdminGuard from "../Guards/AdminGuard";
import BusinessGuard from "../Guards/BusinessGuard";
import CRMPage from "../pages/userRelatedPages/CRMPage";
import BusinessDetails from "../pages/businessRelatedPages/BusinessDetails";
import UnVerifyGuard from "../Guards/UnVerifyGuard";

const Router = () => {
  return (
    <Routes>
      <Route index element={<Directing />} />
      <Route path={ROUTER.HOME} element={<HomePage />} />
      <Route
        path={ROUTER.REGISTER}
        element={
          <AuthPrevent>
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
            <ResetPasswordPage />
          </AuthPrevent>
        }
      />
      <Route
        path={`${ROUTER.VERIFY}/:email`}
        element={
          <UnVerifyGuard>
            <VerifyUserPage />
          </UnVerifyGuard>
        }
      />
      <Route
        path={`${ROUTER.PROFILE}/:userId`}
        element={
          <AuthGuard>
            <ProfilePage />
          </AuthGuard>
        }
      />
      <Route
        path={`${ROUTER.CRM}`}
        element={
          <AdminGuard>
            <CRMPage />
          </AdminGuard>
        }
      />
      <Route path={`${ROUTER.BUSINESS}`}>
        <Route index element={<Directing />} />

        <Route
          path={`${ROUTER.BUSINESS}/:BusinessId`}
          element={<BusinessPage />}
        />
        <Route
          path={`${ROUTER.BUSINESS}/:BusinessId/addNewProduct`}
          element={
            <AuthGuard>
              <BusinessGuard>
                <AddNewProduct />
              </BusinessGuard>
            </AuthGuard>
          }
        />
        <Route
          path={`${ROUTER.BUSINESS}/:BusinessId/businessDetails`}
          element={
            <AuthGuard>
              <BusinessGuard>
                <BusinessDetails />
              </BusinessGuard>
            </AuthGuard>
          }
        />
        <Route
          path={`${ROUTER.BUSINESS}/newBusiness`}
          element={
            <AuthGuard>
              <AdminGuard>
                <CreateBusiness />
              </AdminGuard>
            </AuthGuard>
          }
        />
      </Route>
      <Route path={`${ROUTER.ORDER}`}>
        <Route index element={<Directing />} />

        <Route
          path={`${ROUTER.ORDER}/neworder/:BusinessId`}
          element={
            <AuthGuard>
              <VerifyGuard>
                <PlaceAnOrdePage />
              </VerifyGuard>
            </AuthGuard>
          }
        />
        <Route
          path={`${ROUTER.ORDER}/:orderId`}
          element={
            <AuthGuard>
              <OrderViewPage />
            </AuthGuard>
          }
        />
      </Route>
    </Routes>
  );
};
export default Router;
