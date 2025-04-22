import "./App.scss";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
  // Navigate,
} from "react-router-dom";

import Home from "./pages/home/Home";
import Login from "./pages/auth/login/Login";
import Register from "./pages/auth/register/Register";
import ForgotPassword from "./pages/auth/forgotPassword/ForgotPassword";
import ResetPassword from "./pages/auth/resetPassword/ResetPassword";
import ConfirmAccount from "./pages/auth/confirmAccount/ConfirmAccount";
import InterestTags from "./pages/auth/interesTags/InterestTags";
import SetUpProfile from "./pages/auth/setupProfile/SetUpProfile";
import ProfileHeader from "./components/profile/profileHeader/ProfileHeader";
import ProfileLeftBar from "./components/profile/profileLeftBar/ProfileLeftBar";
import ProfileRightBar from "./components/profile/profileRightBar/ProfileRightBar";

function App() {
  const Layout = () => {
    return (
      <div className="profile-wrapper">
        <div className="profile-container">
          <ProfileHeader />
          <div className="profile-content">
            <ProfileLeftBar />
            <Outlet />
            <ProfileRightBar />
          </div>
        </div>
      </div>
    );
  };

  const AuthLayout = () => {
    return (
      <div className="auth-wrapper">
        <Outlet />
      </div>
    );
  };

  // const ProfileLayout = () => {
  //   return (
  //     <div className="auth-wrapper">
  //       <Outlet />
  //     </div>
  //   );
  // };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
      ],
    },
    {
      path: "/auth",
      element: <AuthLayout />,
      children: [
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "register",
          element: <Register />,
        },
        {
          path: "forgot-password",
          element: <ForgotPassword />,
        },
        {
          path: "confirm-account",
          element: <ConfirmAccount />,
        },
        {
          path: "interest-tags",
          element: <InterestTags />,
        },
        {
          path: "setup-profile",
          element: <SetUpProfile />,
        },
        {
          path: "reset-password/:resetToken",
          element: <ResetPassword />,
        },
      ],
    },
  ]);

  return (
    <div className="app">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
