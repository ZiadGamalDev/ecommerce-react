// App.js
import { RouterProvider } from "react-router-dom";
import routes from "./routes/routes";
import "./App.css";
import React from "react";
import Up_top from "./components/Up-to-top/Up-to-top";
import AuthProvider from "./context/AuthContext";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { CartProvider } from "./context/CartContext";
import { NotificationProvider } from "./context/NotificationContext";

function App() {
  return (
    <React.Fragment>
      <Up_top />
      <AuthProvider>
        <CartProvider>
            <NotificationProvider>
              <RouterProvider router={routes} />
            </NotificationProvider>
        </CartProvider>
      </AuthProvider>
    </React.Fragment>
  );
}

export default App;
