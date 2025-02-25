import React, { useState } from "react";
import { IconButton, Menu, MenuItem, Tooltip, Typography } from "@mui/material";
import {
  KeyboardArrowDown,
} from "@mui/icons-material";

import logo from "../../assets/images/logo.png"

// import styles from "./Navbar.module.css"
import "./Navbar.css"
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const location = useLocation();

  return (
    <React.Fragment>
      <nav className="w-full bg-[#ffcc00] position-sticky top-0">
        {/* Top Nav */}
        <div className="flex justify-between items-center p-3 container">
          <div>
            <img src={logo} alt="" />
          </div>
          <div className="flex items-center gap-4">
            <span className="bg-gray-900 text-white py-2 px-3 rounded-md flex items-center justify-center">
              <i className="bi bi-list text-2xl menu"></i>
            </span>

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
                <button className="search flex justify-center items-center gap-2 bg-gray-900 py-2 px-4  text-white rounded">
                  <i className="bi bi-search"></i>
                  <span>Search</span>
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
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
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography sx={{ textAlign: 'center' }}>Login</Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography sx={{ textAlign: 'center' }}>Register</Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography sx={{ textAlign: 'center' }}>WishList</Typography>
                </MenuItem>
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
        <div className="bg-white flex justify-center p-2 shadow-2xs">
          <div className="container flex items-center gap-5">
            {[
              { name: "Home", path: "/" },
              { name: "About", path: "/about" },
              { name: "Shop", path: "/shop" },
              { name: "Contact", path: "/contact" },
            ].map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 font-semibold rounded-md text-decoration-none ${location.pathname === link.path
                  ? "bg-gray-800 text-white"
                  : "text-black links"
                  }`}
              >
                {link.name} {link.name === "Shop" && <KeyboardArrowDown className="ml-1" />}
              </Link>
            ))}
          </div>
        </div>

      </nav>
    </React.Fragment>
  );
};

export default Navbar;
