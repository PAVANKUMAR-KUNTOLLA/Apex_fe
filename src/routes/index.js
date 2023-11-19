import React, { lazy } from "react";
import { Outlet, Routes, Navigate, Route, Router } from "react-router-dom";
import Loadable from "../components/Loadable";
import PrivateRoute from "../components/PrivateRoute";
import AppLayout from "./../Layout/MainLayout";

import config from "../config";

const HomePage = Loadable(lazy(() => import("../views/Home/home.page")));
const TaxFillingPage = Loadable(lazy(() => import("../views/TaxFilling")));
const LoginViewPage = Loadable(lazy(() => import("../views/Auth/LoginView")));
const RegisterView = Loadable(lazy(() => import("../views/Auth/RegisterView")));
const ProfilePage = Loadable(
  lazy(() => import("../views/Profile/profile.page"))
);
const ReferPage = Loadable(lazy(() => import("../views/Refer")));

const ResetPasswordView = Loadable(
  lazy(() => import("../views/Auth/ResetPasswordView"))
);

//-----------------------|| ROUTING RENDER ||-----------------------//
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate replace to={config.defaultPath} />} />
      <Route
        path="app"
        element={
          <PrivateRoute>
            <AppLayout />
          </PrivateRoute>
        }
      >
        <Route path="home" element={<HomePage />} />
        <Route
          path="tax-filing/:year/:id/:action"
          element={<TaxFillingPage />}
        />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="refer" element={<ReferPage />} />
      </Route>
      <Route path="/login" element={<LoginViewPage />} />
      <Route path="/register" element={<RegisterView />} />
      <Route
        path="/reset-password/:uidb64/:token"
        element={<ResetPasswordView />}
      />
    </Routes>
  );
};

export default AppRoutes;
