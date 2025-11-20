# E-Commerce Frontend (React)

A simple e-commerce frontend built with **React.js** to simulate user activity and support live chat testing with the backend. This project was used during development of the **Customer Support System** in the ITI Graduation Project.

## 🌐 Live Demo

- **Production App:** https://ecommerce-customer.ziadgamal.com
- **Backend API:** https://ecommerce-api.ziadgamal.com
- **Legacy Vercel:** https://ecommerce-react-two-pi.vercel.app (redirects to new domain)

## 🎯 Purpose

- Simulate product search, browsing, and account behavior
- Test customer-side socket chat with support agents
- Serve as an external app consuming our e-commerce and support APIs

## 🛠️ Tech Stack

- React.js
- Axios
- React Router DOM
- Socket.IO client
- Tailwind CSS

## 🛠️ Features

- 🔐 Auth (JWT-based)
- 🛍️ Product listing
- 🧠 Simulates customer behavior (search, cart, view product)
- 📡 Socket.IO client for real-time support chat integration

> This frontend was mainly used to test the customer support features. It's not a full e-commerce store.

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/ZiadGamalDev/ecommerce-react.git
cd ecommerce-react

# Install dependencies
npm install

# Create .env file for development
echo "VITE_API_URL=http://localhost:3001/" > .env
echo "VITE_SOCKET_URL=http://localhost:3000/" >> .env
echo "VITE_CHAT_CLIENT_URL=http://localhost:4201/" >> .env

# Start development server
npm run dev
```

## 🔧 Environment Variables

### Development (.env)
```bash
VITE_API_URL=http://localhost:3001/
VITE_SOCKET_URL=http://localhost:3000/
VITE_CHAT_CLIENT_URL=http://localhost:4201/
```

### Production (.env.production)
```bash
VITE_API_URL=https://ecommerce-api.ziadgamal.com/
VITE_SOCKET_URL=https://customer-support-api.ziadgamal.com/
VITE_CHAT_CLIENT_URL=https://ecommerce-chat.ziadgamal.com/
```

## 🔗 Part of ITI Graduation Project

This project is one of multiple connected apps that together form the **Customer Support System**.

### Related Repositories:
- **E-commerce Backend:** [ecommerce-node](https://github.com/ZiadGamalDev/ecommerce-node)
- **Customer Support Backend:** [customer-support-node](https://github.com/ZiadGamalDev/customer-support-node)
- **E-commerce Chat Widget:** [ecommerce-chat-angular](https://github.com/ZiadGamalDev/ecommerce-chat-angular)
- **E-commerce Admin Panel:** [ecommerce-admin-react](https://github.com/ZiadGamalDev/ecommerce-admin-react)

👉 [View Root Repository](https://github.com/ZiadGamalDev/customer-support-system)
