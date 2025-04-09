import { RouterProvider } from "react-router-dom";
import routes from "./routes/routes";
import "./App.css";
import React from "react";
import Up_top from "./components/Up-to-top/Up-to-top";
import AuthProvider from "./context/AuthContext";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { SocketProvider } from "./context/socketContext";
function App() {
  return (
    <React.Fragment>
      <Up_top />
      <AuthProvider>
        <SocketProvider>
          <RouterProvider router={routes} />
        </SocketProvider>
      </AuthProvider>
    </React.Fragment>
  );
}

export default App;
