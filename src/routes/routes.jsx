import { createBrowserRouter } from "react-router-dom";
import "./App.css";
import LayOut from "./components/LayOut/LayOut";
import NotFound from "./components/NotFound/NotFound";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { lazy, Suspense } from "react";

const Home = lazy(() => import("../pages/Home/Home.jsx"));

const routes = createBrowserRouter([
  {
    path: "/",
    element: <LayOut />,
    children: [
      {
        path: "",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Home />
          </Suspense>
        ),
      },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default routes;
