import { RouterProvider } from "react-router-dom";
import routes from "./routes/routes";
import "./App.css";
import React from "react";
import Up_top from "./components/Up-to-top/Up-to-top";

function App() {
  return (
    <React.Fragment>
      <Up_top />
      <RouterProvider router={routes} />
    </React.Fragment>
  );
}

export default App;
