import { createBrowserRouter } from "react-router-dom";
import LayOut from "../layouts/Layout.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { lazy, Suspense } from "react";
import NotFound from "../components/NotFound/NotFound.jsx";
import Cart from "../pages/Cart/Cart.jsx";
import WishList from "../pages/WishList/WishList.jsx";
import AuthRoute from "./AuthRoute.jsx";
import GuestRoute from "./GuestRoute.jsx";
import Loader from "../layouts/Loader.jsx";

const Home = lazy(() => import("../pages/Home/Home.jsx"));
const About = lazy(() => import("../pages/About/About.jsx"));
const Contact = lazy(() => import("../pages/Contact/Contact.jsx"));
const Register = lazy(() => import("../pages/Auth/Register.jsx"));
const Login = lazy(() => import("../pages/Auth/Login.jsx"));
const Profile = lazy(() => import("../pages/Profile/Profile.jsx"));

const routes = createBrowserRouter([
  {
    path: "/",
    element: <LayOut />,
    children: [
      {
        path: "",
        element: (
          <AuthRoute>
            <Suspense fallback={<Loader />}>
              <Home />
            </Suspense>
          </AuthRoute>
        ),
      },
      {
        path: "about",
        element: (
          <AuthRoute>
            <Suspense fallback={<Loader />}>
              <About />
            </Suspense>
          </AuthRoute>
        ),
      },
      {
        path: "contact",
        element: (
          <AuthRoute>
            <Suspense fallback={<Loader />}>
              <Contact />
            </Suspense>
          </AuthRoute>
        ),
      },
      {
        path: "cart",
        element: (
          <AuthRoute>
            <Suspense fallback={<Loader />}>
              <Cart />
            </Suspense>
          </AuthRoute>
        ),
      },
      {
        path: "register",
        element: (
          <GuestRoute>
            <Suspense fallback={<Loader />}>
              <Register />
            </Suspense>
          </GuestRoute>
        ),
      },
      {
        path: "login",
        element: (
          <GuestRoute>
            <Suspense fallback={<Loader />}>
              <Login />
            </Suspense>
          </GuestRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <AuthRoute>
            <Suspense fallback={<Loader />}>
              <Profile />
            </Suspense>
          </AuthRoute>
        ),
      },
      {
        path: "wishlist",
        element: (
          <AuthRoute>
            <Suspense fallback={<Loader />}>
              <Profile />
            </Suspense>
          </AuthRoute>
        ),
      },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default routes;
