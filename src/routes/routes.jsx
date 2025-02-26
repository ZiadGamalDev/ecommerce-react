import { createBrowserRouter } from "react-router-dom";
import LayOut from "../layouts/Layout.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { lazy, Suspense } from "react";
import NotFound from "../components/NotFound/NotFound.jsx";
import Loader from "../components/Loader/Loader.jsx";
// import About from "../pages/About/About.jsx";
// import Contact from "../pages/Contact/Contact.jsx";

const Home = lazy(() => import("../pages/Home/Home.jsx"));
const About = lazy((() => import("../pages/About/About.jsx")));
const Contact = lazy((() => import("../pages/Contact/Contact.jsx")));

const routes = createBrowserRouter([
  {
    path: "/",
    element: <LayOut />,
    children: [
      {
        path: "",
        element: (
          <Suspense fallback={<Loader />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "about",
        element: (
          <Suspense fallback={<Loader />}>
            <About />
          </Suspense>
        ),
      },
      {
        path: "contact",
        element: (
          <Suspense fallback={<Loader />}>
            <Contact />
          </Suspense>
        ),
      },
      { path: "*", element: <NotFound/> },
    ],
  },
]);

export default routes;
