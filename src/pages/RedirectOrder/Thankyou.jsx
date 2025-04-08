import React from "react";
import { useLocation, Navigate,useNavigate } from "react-router-dom";

const ThankYou = () => {
  const location = useLocation();
  const orderDetails = location.state?.orderDetails;
const navigate = useNavigate();
  if (!orderDetails) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-2xl">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-[#f04608] to-[#d63e00] p-8 text-center rounded-t-xl">
          <h1 className="text-4xl font-bold text-white mb-4">
            Thank You for Your Order!
          </h1>
          <p className="text-xl text-white/90">
            Your order has been successfully placed and will be shipped soon.
          </p>
        </div>

        {/* Order Details Grid */}
        <div className="p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Details</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Left Column */}
            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="font-semibold text-lg mb-2">Order Information</p>
                <div className="space-y-2">
                  <p><span className="font-medium">Order ID: </span>{orderDetails.orderId}</p>
                  <p><span className="font-medium">Payment Method: </span>{orderDetails.paymentMethod}</p>
                  {orderDetails.totalPrice && (
                    <p className="text-xl text-[#f04706] font-bold mt-2">
                      Total: ${orderDetails.totalPrice.toFixed(2)}
                    </p>
                  )}
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="font-semibold text-lg mb-2">Contact Numbers</p>
                <ul className="space-y-1">
                  {orderDetails.phoneNumbers.map((phone, index) => (
                    <li key={index} className="text-gray-700">{phone}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="font-semibold text-lg mb-2">Shipping Address</p>
                <p className="text-gray-700 leading-relaxed">
                  {orderDetails.shippingAddress.address}<br />
                  {orderDetails.shippingAddress.city}, {orderDetails.shippingAddress.postalCode}<br />
                  {orderDetails.shippingAddress.country}
                </p>
              </div>

              {orderDetails.couponCode && (
                <div className="bg-gray-50 p-6 rounded-lg">
                  <p className="font-semibold text-lg mb-2">Applied Coupon</p>
                  <p className="text-gray-700">{orderDetails.couponCode}</p>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center space-x-4 mt-8 border-t pt-8">
            <button
              onClick={() => window.print()}
              className="inline-flex items-center px-6 py-3 bg-[#f04706] hover:bg-[#d63e00] text-white font-semibold rounded-lg transition-all duration-200"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              Print Order Details
            </button>
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center justify-center px-6 py-3 border-2 border-[#f04706] text-[#f04706] hover:bg-[#f04706] hover:text-white font-semibold rounded-lg transition-all duration-200"
            >
              Continue Shopping?
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;
