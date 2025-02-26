import React, { useState } from "react";
import { Drawer, IconButton, List, ListItem, ListItemText, Menu, MenuItem, Tooltip, Typography } from "@mui/material";
import { KeyboardArrowDown } from "@mui/icons-material";

import logo from "../../assets/images/logo.png"

// import styles from "./Navbar.module.css"
import "./Navbar.css"
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
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

  return (
    <React.Fragment>
      <nav className="w-full bg-[#ffcc00] position-sticky top-0">
        {/* Top Nav */}
        <div className="flex justify-between items-center p-3 container">
          <img src={logo} alt="logo" />
          {/* Menu Hamburger */}
          <div className="sm:flex lg:hidden items-center gap-4">
            <IconButton onClick={toggleDrawer}>
              <label className="hamburger">
                <svg viewBox="0 0 32 32">
                  <path className="line line-top-bottom" d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"></path>
                  <path className="line" d="M7 16 27 16"></path>
                </svg>
              </label>
            </IconButton>
          </div>

          <div className="md:hidden lg:flex sm:hidden items-center gap-4 collection">
            <div className="bg-white flex gap-3 rounded-sm">
              <select className="p-2 select border-r-2">
                <option>All Collection</option>
              </select>
              <div className="flex border-0 p-2">
                <input type="text" placeholder="Search for product..." className="outline-none" />
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
                <span className="headText"><b>(+001) 123-456-7890</b></span>
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
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                keepMounted
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={handleCloseUserMenu}><Typography sx={{ textAlign: 'center' }}>Login</Typography></MenuItem>
                <MenuItem onClick={handleCloseUserMenu}><Typography sx={{ textAlign: 'center' }}>Register</Typography></MenuItem>
                <MenuItem onClick={handleCloseUserMenu}><Typography sx={{ textAlign: 'center' }}>WishList</Typography></MenuItem>
              </Menu>
              <Tooltip title="Open Cart">
                <IconButton>
                  <i className="bi bi-cart text-4xl"></i>
                </IconButton>
              </Tooltip>
            </div>
          </div>
        </div>

        {/* Bottom Nav */}
        <div className="sm:hidden lg:flex bg-white justify-center p-2 shadow-2xs bottom-nav">
          <div className="container flex items-center gap-5">
            {[{ name: "Home", path: "/" }, { name: "About", path: "/about" }, { name: "Shop", path: "/shop" }, { name: "Contact", path: "/contact" }].map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 font-semibold rounded-md text-decoration-none ${location.pathname === link.path ? "bg-gray-800 text-white" : "text-black links"}`}
              >
                {link.name} {link.name === "Shop" && <KeyboardArrowDown className="ml-1" />}
              </Link>
            ))}
          </div>
        </div>

        {/* Side Menu Medium and Small screens */}
        <Drawer anchor="right" open={mobileOpen} onClose={toggleDrawer} sx={{ "& .MuiDrawer-paper": { width: { sm: "300px", md: "400px" } }, display: { lg: "none" } }}>
          <div className="flex items-center justify-center">
            <div className="bg-white flex gap-3 rounded-sm flex-column">
              <select className="p-2 select border-r-2 w-70 mt-3 mb-1">
                <option>All Collection</option>
              </select>
              <div className="flex border-0 p-2 bg-[#ffcc00] rounded-sm sm:w-65">
                <input type="text" placeholder="Search for product..." className="outline-none" />
                <button className="search flex justify-center items-center gap-2 bg-gray-900 md:py-2 md:px-4 sm:px-3 text-white rounded">
                  <i className="bi bi-search sm:text-xs"></i>
                  <span className="text-xs">Search</span>
                </button>
              </div>
            </div>
          </div>
          <List className="flex flex-column mt-3">
            {[{ name: "Home", path: "/" }, { name: "About", path: "/about" }, { name: "Shop", path: "/shop" }, { name: "Contact", path: "/contact" }].map((link) => (
              <Link key={link.path} to={link.path} className="text-black text-decoration-none text-center">
                <ListItem button onClick={toggleDrawer}>
                  <ListItemText primary={link.name} /> {link.name === "Shop" && <KeyboardArrowDown className="ml-1" />}
                </ListItem>
              </Link>
            ))}
          </List>
          <div className="flex justify-evenly gap-3">
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <i className="bi bi-person text-4xl"></i>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              keepMounted
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={handleCloseUserMenu}><Typography sx={{ textAlign: 'center' }}>Login</Typography></MenuItem>
              <MenuItem onClick={handleCloseUserMenu}><Typography sx={{ textAlign: 'center' }}>Register</Typography></MenuItem>
              <MenuItem onClick={handleCloseUserMenu}><Typography sx={{ textAlign: 'center' }}>WishList</Typography></MenuItem>
            </Menu>
            <Tooltip title="Open Cart">
              <IconButton>
                <i className="bi bi-cart text-4xl"></i>
              </IconButton>
            </Tooltip>
          </div>
        </Drawer>
      </nav>
    </React.Fragment>
  );
};

export default Navbar;
