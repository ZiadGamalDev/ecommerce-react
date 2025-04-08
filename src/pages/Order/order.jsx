import React from "react";
import OrderForm from "../../components/Order/orderForm"; // Import the OrderForm component

const OrderPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold  text-center mb-8">
          Complete Your Order
        </h1>

        {/* Simply render the OrderForm component */}
        <OrderForm />
      </div>
    </div>
  );
};

export default OrderPage;
