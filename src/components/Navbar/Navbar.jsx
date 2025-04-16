import React, { useContext, useEffect, useRef, useState } from "react";
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
import { Bell, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { fetchCategories } from "../../hooks/useProductData";
import Notifications from "../Notifications/Notifications";
import { useCart } from "../../context/CartContext";
import { Badge } from "@mui/material";
import socket from "./../../utils/socket";
import { toast } from "react-toastify";

import logo from "../../assets/images/logo.png";
import "./Navbar.css";

const Navbar = () => {
  const { token, logout, role } = useContext(AuthContext);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);
  const [categories, setCategories] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();
  const { cartItemCount } = useCart();

  const chatId = localStorage.getItem("chatId");

  const notificationsRef = useRef(null);
  const bellIconRef = useRef(null);

  // * Receive messages from socket server
  const listenForMessages = (chatId) => {
    socket.off("messageReceived");

    socket.on("messageReceived", ({ message }) => {
      if (message.chatId !== chatId) return;

      if (message.senderRole !== "agent") return;

      const newMessage = {
        id: message._id || message.id,
        chatId: message.chatId,
        senderId: message.senderId?._id || message.senderId,
        content: message.content,
        senderRole: message.senderRole,
        createdAt: message.createdAt ? new Date(message.createdAt) : new Date(),
      };

      setNotifications((prev) => {
        if (prev.some((msg) => msg.id === newMessage.id)) {
          return prev;
        }

        const updatedNotifications = [newMessage, ...prev];
        updatedNotifications.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        toast.info(`New message: ${newMessage.content.slice(0, 30)}...`, {
          toastId: newMessage.id,
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        return updatedNotifications.slice(0, 5);
      });
    });
  };

  // * Join chat room
  const joinChat = (existingChatId) => {
    if (!existingChatId) return;

    if (socket.connected) {
      socket.emit("joinChat", {
        chatId: existingChatId,
        userType: "customer",
      });
      listenForMessages(existingChatId);
    } else {
      socket.connect();
      socket.once("connect", () => {
        socket.emit("joinChat", {
          chatId: existingChatId,
          userType: "customer",
        });
        listenForMessages(existingChatId);
      });
    }
  };

  // * Fetch messages from backend
  const getMessagesFromBE = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `http://localhost:3000/messages/customer/${chatId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch messages");
      }

      const data = await response.json();

      const filtered = data
        .filter((msg) => msg.senderRole === "agent")
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5);

      setNotifications(filtered);
    } catch (error) {
      console.error("Error fetching messages:", error);
      setError(error.message);
    }
  };

  // * connect to socket server and listen for messages
  useEffect(() => {
    if (chatId) {
      const fetchMessagesAndJoinChat = async () => {
        await getMessagesFromBE();
        joinChat(chatId);
      };

      fetchMessagesAndJoinChat();

      return () => {
        socket.off("messageReceived");
        socket.disconnect();
      };
    }
  }, [chatId]);

  // * close notifications when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target) &&
        bellIconRef.current &&
        !bellIconRef.current.contains(event.target) &&
        showNotifications
      ) {
        console.log("Click outside, closing notifications");
        setShowNotifications(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showNotifications]);

  // * fetch categories
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

  const toggleNotifications = (event) => {
    event.stopPropagation();
    setShowNotifications(!showNotifications);
  };

  const closeNotifications = () => {
    setShowNotifications(false);
  };

  const notificationCount = notifications ? notifications.length : 0;

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
                    <Badge
                      badgeContent={cartItemCount}
                      color="error"
                      showZero={true}
                    >
                      <i className="bi bi-cart text-4xl"></i>
                    </Badge>
                  </IconButton>
                </Link>
              </Tooltip>
              <div className="relative">
                <Tooltip title="Notifications">
                  <IconButton onClick={toggleNotifications} ref={bellIconRef}>
                    <Badge
                      badgeContent={notificationCount}
                      variant={notificationCount > 0 ? "dot" : undefined}
                      color="error"
                      overlap="circular"
                    >
                      <Bell size={35} />
                    </Badge>
                  </IconButton>
                </Tooltip>
                {showNotifications && (
                  <div className="absolute right-0 mt-2" ref={notificationsRef}>
                    <Notifications
                      onClose={closeNotifications}
                      notifications={notifications}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Nav */}
        <div className="sm:hidden lg:flex justify-center p-3 shadow-2xs bottom-nav relative border-t border-amber-200">
          <div className="container flex items-center gap-5">
            {[
              { name: "Home", path: "/" },
              { name: "Shop", path: "/shop" },
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
                </Link>
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
            "& .MuiDrawer-paper": {
              width: { sm: "400px", md: "400px", xs: "100%" },
            },
            display: { lg: "none" },
            position: "relative",
          }}
        >
          <div className="flex justify-end p-2">
            <IconButton onClick={toggleDrawer}>
              <X />
            </IconButton>
          </div>
          <List className="flex flex-column">
            {[
              { name: "Home", path: "/" },
              { name: "Shop", path: "/shop" },
            ].map((link) => (
              <div key={link.name}>
                <Link
                  to={link.path}
                  className="text-black text-decoration-none text-center"
                >
                  <ListItem button onClick={toggleDrawer}>
                    <ListItemText primary={link.name} />
                  </ListItem>
                </Link>
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
                <IconButton button onClick={toggleDrawer}>
                  <Badge
                    badgeContent={cartItemCount}
                    color="error"
                    showZero={true}
                  >
                    <i className="bi bi-cart text-4xl"></i>
                  </Badge>
                </IconButton>
              </Link>
            </Tooltip>
            <div className="relative">
              <Tooltip title="Notifications">
                <IconButton onClick={toggleNotifications} ref={bellIconRef}>
                  <Badge
                    badgeContent={notifications.length}
                    variant={notifications.length > 0 ? "dot" : undefined}
                    color="error"
                    overlap="circular"
                  >
                    <Bell size={35} />
                  </Badge>
                </IconButton>
              </Tooltip>
              {showNotifications && (
                <div className="absolute right-0 mt-2" ref={notificationsRef}>
                  <Notifications
                    onClose={closeNotifications}
                    notifications={notifications}
                  />
                </div>
              )}
            </div>
          </div>
        </Drawer>
      </nav>
    </React.Fragment>
  );
};

export default Navbar;
