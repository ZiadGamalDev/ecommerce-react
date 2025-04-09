import React, { useContext, useEffect, useState } from "react";
import {
  CircularProgress,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import { KeyboardArrowDown } from "@mui/icons-material";
import { Bell } from "lucide-react";

import logo from "../../assets/images/logo.png";

// import styles from "./Navbar.module.css"
import "./Navbar.css";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useNotifications } from "../../hooks/useSocket";

import { fetchCategories } from "../../hooks/useProductData";
import Notifications from "./../Notifications/Notifications";

const Navbar = () => {
  const { token, logout, role, userId } = useContext(AuthContext);
  const { unreadCount } = useNotifications(userId);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [notification, setNotification] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const getCategories = async () => {
      setLoading(true);
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getCategories();
  }, []);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const toggleDrawer = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMouseEnter = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }
    setIsCategoriesOpen(true);
  };

  const handleMouseLeave = () => {
    const id = setTimeout(() => {
      setIsCategoriesOpen(false);
    }, 100);
    setTimeoutId(id);
  };

  const handleToggleCategories = () => {
    setIsCategoriesOpen((prev) => !prev);
  };

  const handleNotificationMenu = (event) => {
    setNotification(event.currentTarget);
  };

  const handleCloseNotificationMenu = () => {
    setNotification(null);
  };

  return (
    <React.Fragment>
      <nav className="w-full bg-[#ffcc00] position-sticky top-0 z-50">
        {/* Top Nav */}
        <div className="flex justify-between items-center p-3 container">
          <img src={logo} alt="logo" />
          {/* Menu Hamburger */}
          <div className="sm:flex lg:hidden items-center gap-4">
            <div className="background" onClick={toggleDrawer}>
              <button className="menu__icon">
                <span></span>
                <span></span>
                <span></span>
              </button>
            </div>
          </div>

          <div className="md:hidden lg:flex sm:hidden items-center gap-4 concat">
            <div className="flex items-center gap-2">
              <i className="bi bi-headphones text-5xl p-1 head"></i>
              <div className="flex flex-col">
                <span className="headText">
                  <b>(+001) 123-456-7890</b>
                </span>
                <span className="headText">sales@yourcompany.com</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <i className="bi bi-person text-4xl"></i>
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                keepMounted
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {token
                  ? [
                      <MenuItem
                        key="profileOrDashboard"
                        onClick={handleCloseUserMenu}
                      >
                        <Link
                          to={role === "admin" ? "/dashboard" : "/profile"}
                          className="text-decoration-none text-black"
                        >
                          <Typography sx={{ textAlign: "center" }}>
                            {role === "admin" ? "Dashboard" : "Profile"}
                          </Typography>
                        </Link>
                      </MenuItem>,
                      <MenuItem key="logout" onClick={handleCloseUserMenu}>
                        <Typography
                          sx={{ textAlign: "center", cursor: "pointer" }}
                          onClick={logout}
                        >
                          Logout
                        </Typography>
                      </MenuItem>,
                    ]
                  : [
                      <MenuItem key="login" onClick={handleCloseUserMenu}>
                        <Link
                          to="/login"
                          className="text-decoration-none text-black"
                        >
                          <Typography sx={{ textAlign: "center" }}>
                            Login
                          </Typography>
                        </Link>
                      </MenuItem>,
                      <MenuItem key="register" onClick={handleCloseUserMenu}>
                        <Link
                          to="/register"
                          className="text-decoration-none text-black"
                        >
                          <Typography sx={{ textAlign: "center" }}>
                            Register
                          </Typography>
                        </Link>
                      </MenuItem>,
                    ]}
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography sx={{ textAlign: "center" }}>
                    <Link
                      className="text-decoration-none text-[#000]"
                      to={"/wishlist"}
                    >
                      WishList
                    </Link>
                  </Typography>
                </MenuItem>
              </Menu>
              <Tooltip title="Open Cart">
                <Link to={"/cart"}>
                  <IconButton>
                    <i className="bi bi-cart text-4xl"></i>
                  </IconButton>
                </Link>
              </Tooltip>
              <IconButton onClick={handleNotificationMenu} className="relative">
                <Bell size={30} />
                {unreadCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#f04706] text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {unreadCount > 99 ? "99+" : unreadCount}
                  </span>
                )}
              </IconButton>
              <Menu
                sx={{ mt: "45px", maxWidth: "700px" }}
                id="menu-appbar"
                anchorEl={notification}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                keepMounted
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                open={Boolean(notification)}
                onClose={handleCloseNotificationMenu}
              >
                <Notifications />
              </Menu>
            </div>
          </div>
        </div>

        {/* Bottom Nav */}
        <div className="sm:hidden lg:flex bg-white justify-center p-3 shadow-2xs bottom-nav relative">
          <div className="container flex items-center gap-5">
            {[
              { name: "Home", path: "/" },
              { name: "Shop", path: "/shop" },
              { name: "Categories" },
            ].map((link) => (
              <div
                key={link.name}
                onMouseEnter={
                  link.name === "Categories" ? handleMouseEnter : undefined
                }
                onMouseLeave={
                  link.name === "Categories" ? handleMouseLeave : undefined
                }
              >
                <Link
                  to={link.path || "#"}
                  className={`px-3 py-2 font-semibold rounded text-decoration-none ${
                    location.pathname === link.path
                      ? "bg-gray-800 text-white"
                      : link.name === "Categories" && isCategoriesOpen
                      ? "bg-gray-800 text-white  links"
                      : "text-black links"
                  }`}
                >
                  {link.name}
                  {link.name === "Categories" && (
                    <KeyboardArrowDown className="ml-1" />
                  )}
                </Link>

                {link.name === "Categories" && isCategoriesOpen && (
                  <div
                    className="absolute left-0 top-full w-full bg-white p-4 z-50 transition-opacity duration-300 ease-in-out"
                    style={{
                      opacity: isCategoriesOpen ? 1 : 0,
                      transition: "all 0.3s ease-in-out",
                    }}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="mx-auto flex justify-between overflow-auto max-w-screen-lg">
                      {loading ? (
                        <div className="flex justify-center items-center h-full">
                          <CircularProgress />
                        </div>
                      ) : (
                        <div className="mx-auto flex justify-between overflow-auto max-w-screen-lg">
                          {categories.map((category, index) => (
                            <div
                              key={index}
                              className="flex flex-col gap-2 min-w-[200px]"
                            >
                              <p className="mb-2 border-b pb-1 text-md font-bold text-gray-600">
                                {category.name}
                              </p>
                              <span className="flex flex-col gap-3">
                                {category.brands.map((brand, idx) => (
                                  <span
                                    key={idx}
                                    className="hover:text-yellow-600 cursor-pointer transition-all duration-300 ease-in-out text-gray-500 text-sm"
                                  >
                                    {brand.name}
                                  </span>
                                ))}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Side Menu Medium and Small screens */}
        <Drawer
          anchor="right"
          open={mobileOpen}
          onClose={toggleDrawer}
          sx={{
            "& .MuiDrawer-paper": { width: { sm: "300px", md: "400px" } },
            display: { lg: "none" },
          }}
        >
          <List className="flex flex-column mt-3">
            {[
              { name: "Home", path: "/" },
              { name: "Shop", path: "/shop" },
              { name: "Categories" },
            ].map((link) => (
              <div key={link.name}>
                {link.name === "Categories" ? (
                  <div>
                    <ListItem button onClick={handleToggleCategories}>
                      <ListItemText primary="Categories" />
                      <KeyboardArrowDown
                        className={`ml-1 transition-transform duration-300 ${
                          isCategoriesOpen ? "rotate-180" : ""
                        }`}
                      />
                    </ListItem>
                    {isCategoriesOpen && (
                      <div className="bg-gray-100 p-3 shadow-md h-[300px] overflow-auto">
                        {loading ? (
                          <div className="flex justify-center items-center h-full">
                            <CircularProgress />
                          </div>
                        ) : (
                          categories.map((category, index) => (
                            <div key={index} className="mt-2">
                              <u className="font-bold text-gray-600">
                                {category.name}
                              </u>
                              <ul>
                                {category.brands.map((brand, idx) => (
                                  <li
                                    key={idx}
                                    className="text-gray-500 text-sm hover:text-yellow-600 cursor-pointer transition-all duration-300"
                                  >
                                    {brand.name}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))
                        )}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to={link.path}
                    className="text-black text-decoration-none text-center"
                  >
                    <ListItem button onClick={toggleDrawer}>
                      <ListItemText primary={link.name} />
                    </ListItem>
                  </Link>
                )}
              </div>
            ))}
          </List>

          <div className="flex justify-evenly gap-3">
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <i className="bi bi-person text-4xl"></i>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              keepMounted
              transformOrigin={{ vertical: "top", horizontal: "right" }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {token
                ? [
                    <MenuItem key="logout" onClick={handleCloseUserMenu}>
                      <Typography
                        sx={{ textAlign: "center", cursor: "pointer" }}
                        onClick={logout}
                      >
                        Logout
                      </Typography>
                    </MenuItem>,
                  ]
                : [
                    <MenuItem key="login" onClick={handleCloseUserMenu}>
                      <Link
                        to="/login"
                        className="text-decoration-none text-black"
                      >
                        <Typography sx={{ textAlign: "center" }}>
                          Login
                        </Typography>
                      </Link>
                    </MenuItem>,
                    <MenuItem key="register" onClick={handleCloseUserMenu}>
                      <Link
                        to="/register"
                        className="text-decoration-none text-black"
                      >
                        <Typography sx={{ textAlign: "center" }}>
                          Register
                        </Typography>
                      </Link>
                    </MenuItem>,
                  ]}
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography sx={{ textAlign: "center" }}>WishList</Typography>
              </MenuItem>
            </Menu>
            <Tooltip title="Open Cart">
              <Link to={"/cart"}>
                <IconButton button onClick={toggleDrawer}>
                  <i className="bi bi-cart text-4xl"></i>
                </IconButton>
              </Link>
            </Tooltip>
            <IconButton onClick={handleNotificationMenu} className="relative">
              <Bell size={30} />
              {unreadCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#f04706] text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {unreadCount > 99 ? "99+" : unreadCount}
                </span>
              )}
            </IconButton>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={notification}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              keepMounted
              transformOrigin={{ vertical: "top", horizontal: "right" }}
              open={Boolean(notification)}
              onClose={handleCloseNotificationMenu}
            >
              <Notifications />
            </Menu>
          </div>
        </Drawer>
      </nav>
    </React.Fragment>
  );
};

export default Navbar;
