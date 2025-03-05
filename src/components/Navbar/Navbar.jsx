import React, { useContext, useState } from "react";
import {
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

import logo from "../../assets/images/logo.png";

// import styles from "./Navbar.module.css"
import "./Navbar.css";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const { token, logout } = useContext(AuthContext);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);
  const location = useLocation();

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

          <div className="md:hidden lg:flex sm:hidden items-center gap-4 collection">
            <div className="bg-white flex gap-3 rounded-sm">
              <select className="p-2 select border-r-2">
                <option>All Collection</option>
              </select>
              <div className="flex border-0 p-2">
                <input
                  type="text"
                  placeholder="Search for product..."
                  className="outline-none"
                />
                <button className="search flex justify-center items-center gap-2 bg-gray-900 py-2 px-4 text-white rounded">
                  <i className="bi bi-search"></i>
                  <span>Search</span>
                </button>
              </div>
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
                      <MenuItem key="profile" onClick={handleCloseUserMenu}>
                        <Link
                          to="/profile"
                          className="text-decoration-none text-black"
                        >
                          <Typography sx={{ textAlign: "center" }}>
                            Profile
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
                  <Typography sx={{ textAlign: "center" }}>WishList</Typography>
                </MenuItem>
              </Menu>
              <Tooltip title="Open Cart">
                <Link to={"/cart"}>
                  <IconButton>
                    <i className="bi bi-cart text-4xl"></i>
                  </IconButton>
                </Link>
              </Tooltip>
            </div>
          </div>
        </div>

        {/* Bottom Nav */}
        <div className="sm:hidden lg:flex bg-white justify-center p-3 shadow-2xs bottom-nav relative">
          <div className="container flex items-center gap-5">
            {[
              { name: "Home", path: "/" },
              { name: "About", path: "/about" },
              { name: "Shop", path: "/shop" },
              { name: "Categories" },
              { name: "Contact", path: "/contact" },
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
                    <div className="max-w-screen-xl mx-auto flex justify-between">
                      {[
                        {
                          title: "Cameras",
                          items: [
                            "Depth Sensor",
                            "Macro Lens",
                            "Night Mode",
                            "Primary Camera",
                          ],
                        },
                        {
                          title: "Computer & Laptop",
                          items: [
                            "Business Laptops",
                            "Chromebooks",
                            "Gaming Laptops",
                            "Mini PCs",
                          ],
                        },
                        {
                          title: "Mobile & Tablets",
                          items: [
                            "Gaming Tablets",
                            "Kids' Tablets",
                            "Phablets",
                            "Rugged Phones",
                          ],
                        },
                        {
                          title: "Home Speaker",
                          items: [
                            "Mini PCs",
                            "Gaming",
                            "Headphones",
                            "Kids Toys",
                          ],
                        },
                      ].map((category, index) => (
                        <div key={index} className="flex flex-col gap-2">
                          <p className="mb-2 border-b pb-1 text-md font-bold text-gray-600">
                            {category.title}
                          </p>
                          <span className="flex flex-col gap-3">
                            {category.items.map((item, idx) => (
                              <span
                                key={idx}
                                className="hover:text-yellow-600 cursor-pointer transition-all duration-300 ease-in-out text-gray-500 text-sm"
                              >
                                {item}
                              </span>
                            ))}
                          </span>
                        </div>
                      ))}
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
          <div className="flex items-center justify-center">
            <div className="bg-white flex gap-3 rounded-sm flex-column">
              <select className="p-2 select border-r-2 w-70 mt-3 mb-1">
                <option>All Collection</option>
              </select>
              <div className="flex border-0 p-2 bg-[#ffcc00] rounded-sm sm:w-65">
                <input
                  type="text"
                  placeholder="Search for product..."
                  className="outline-none"
                />
                <button className="search flex justify-center items-center gap-2 bg-gray-900 md:py-2 md:px-4 sm:px-3 text-white rounded">
                  <i className="bi bi-search sm:text-xs"></i>
                  <span className="text-xs">Search</span>
                </button>
              </div>
            </div>
          </div>

          <List className="flex flex-column mt-3">
            {[
              { name: "Home", path: "/" },
              { name: "About", path: "/about" },
              { name: "Shop", path: "/shop" },
              { name: "Categories" },
              { name: "Contact", path: "/contact" },
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
                      <div className="bg-gray-100 p-3 shadow-md">
                        {[
                          {
                            title: "Cameras",
                            items: [
                              "Depth Sensor",
                              "Macro Lens",
                              "Night Mode",
                              "Primary Camera",
                            ],
                          },
                          {
                            title: "Laptops",
                            items: [
                              "Business Laptops",
                              "Chromebooks",
                              "Gaming Laptops",
                              "Mini PCs",
                            ],
                          },
                          {
                            title: "Mobiles",
                            items: [
                              "Gaming Tablets",
                              "Kids' Tablets",
                              "Phablets",
                              "Rugged Phones",
                            ],
                          },
                        ].map((category, index) => (
                          <div key={index} className="mt-2">
                            <p className="font-bold text-gray-600">
                              {category.title}
                            </p>
                            <ul>
                              {category.items.map((item, idx) => (
                                <li
                                  key={idx}
                                  className="text-gray-500 text-sm hover:text-yellow-600 cursor-pointer transition-all duration-300"
                                >
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
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
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography sx={{ textAlign: "center" }}>Login</Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography sx={{ textAlign: "center" }}>Register</Typography>
              </MenuItem>
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
          </div>
        </Drawer>
      </nav>
    </React.Fragment>
  );
};

export default Navbar;
