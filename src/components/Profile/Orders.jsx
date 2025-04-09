import React, { useState } from "react";
import useProfileData from "../../hooks/useProfileData";

const Orders = () => {
  const { orders, ordersLoading, ordersError, fetchOrders } = useProfileData();
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5;

  const filteredOrders = orders.filter((order) => {
    if (filter === "all") return true;
    return filter === "paid" ? order.isPaid : !order.isPaid;
  });

  const totalOrders = filteredOrders.length;
  const totalPages = Math.ceil(totalOrders / ordersPerPage);
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(
    indexOfFirstOrder,
    indexOfLastOrder
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (ordersLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 flex-wrap">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilter("all")}
            className={`px-3 py-2 rounded-md font-semibold text-sm transition-colors duration-200 ${
              filter === "all"
                ? "bg-indigo-600 text-white shadow-md"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            All Orders
          </button>
          <button
            onClick={() => setFilter("paid")}
            className={`px-3 py-2 rounded-md font-semibold text-sm transition-colors duration-200 ${
              filter === "paid"
                ? "bg-green-600 text-white shadow-md"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Paid
          </button>
          <button
            onClick={() => setFilter("unpaid")}
            className={`px-3 py-2 rounded-md font-semibold text-sm transition-colors duration-200 ${
              filter === "unpaid"
                ? "bg-yellow-600 text-white shadow-md"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Unpaid
          </button>
        </div>
      </div>

      {/* Error or No Orders */}
      {ordersError ? (
        <div className="bg-red-50 border border-red-200 text-red-800 p-6 rounded-sm shadow-sm max-w-lg mx-auto mb-8">
          <p className="font-medium">{ordersError}</p>
          <button
            onClick={fetchOrders}
            className="mt-4 bg-red-600 text-white px-5 py-2 rounded-md hover:bg-red-700 transition-colors duration-200 shadow-sm"
          >
            Retry
          </button>
        </div>
      ) : filteredOrders.length === 0 ? (
        <div className="bg-blue-50 border border-blue-200 text-blue-800 p-6 rounded-lg shadow-md max-w-lg mx-auto mb-8">
          <p className="font-medium">
            {filter === "all"
              ? "No orders found."
              : filter === "paid"
              ? "No paid orders yet."
              : "No unpaid orders yet."}
            Start shopping now!
          </p>
        </div>
      ) : (
        <React.Fragment>
          {/* Table with Responsive Overflow */}
          <div className="overflow-x-auto rounded-md shadow-sm border border-gray-200 max-w-full mt-4">
            <table className="w-full bg-white">
              <thead className="bg-gray-900 text-white">
                <tr>
                  <th className="py-3 px-2 sm:px-6 text-left text-xs sm:text-sm font-semibold uppercase tracking-widest whitespace-nowrap min-w-[200px]">
                    Order ID
                  </th>
                  <th className="py-3 px-2 sm:px-6 text-left text-xs sm:text-sm font-semibold uppercase tracking-widest whitespace-nowrap min-w-[120px]">
                    Status
                  </th>
                  <th className="py-3 px-2 sm:px-6 text-left text-xs sm:text-sm font-semibold uppercase tracking-widest whitespace-nowrap min-w-[120px]">
                    Total Price
                  </th>
                  <th className="py-3 px-2 sm:px-6 text-left text-xs sm:text-sm font-semibold uppercase tracking-widest whitespace-nowrap min-w-[200px]">
                    Created At
                  </th>
                  <th className="py-3 px-2 sm:px-6 text-left text-xs sm:text-sm font-semibold uppercase tracking-widest whitespace-nowrap min-w-[120px]">
                    Payment
                  </th>
                  <th className="py-3 px-2 sm:px-6 text-left text-xs sm:text-sm font-semibold uppercase tracking-widest whitespace-nowrap min-w-[120px]">
                    Delivered
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentOrders.map((order) => (
                  <tr
                    key={order._id}
                    className="hover:bg-gray-50 transition-colors duration-200 ease-in-out"
                  >
                    <td className="py-3 px-2 sm:px-6 text-sm text-gray-800 font-medium whitespace-nowrap min-w-[200px]">
                      <span className="truncate block max-w-[200px]">
                        {order._id}
                      </span>
                    </td>
                    <td className="py-3 px-2 sm:px-6 text-sm whitespace-nowrap min-w-[120px]">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs sm:text-sm font-medium ${
                          order.orderStatus === "Pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : order.orderStatus === "Delivered"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {order.orderStatus}
                      </span>
                    </td>
                    <td className="py-3 px-2 sm:px-6 text-sm text-gray-800 font-medium whitespace-nowrap min-w-[120px]">
                      ${order.totalPrice.toFixed(2)}
                    </td>
                    <td className="py-3 px-2 sm:px-6 text-sm text-gray-600 whitespace-nowrap min-w-[200px]">
                      {new Date(order.createdAt).toLocaleString()}
                    </td>
                    <td className="py-3 px-2 sm:px-6 text-sm whitespace-nowrap min-w-[120px]">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs sm:text-sm font-medium ${
                          order.isPaid
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {order.isPaid ? "Paid" : "Unpaid"}
                      </span>
                    </td>
                    <td className="py-3 px-2 sm:px-6 whitespace-nowrap min-w-[120px]">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                          order.isDelivered
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {order.isDelivered ? "Yes" : "No"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-6 flex flex-wrap justify-start items-center gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  currentPage === 1
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-indigo-600 text-white hover:bg-indigo-700"
                } transition-colors duration-200`}
              >
                Previous
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-3 py-2 rounded-md text-sm font-medium ${
                      currentPage === page
                        ? "bg-indigo-600 text-white shadow-md"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    } transition-colors duration-200`}
                  >
                    {page}
                  </button>
                )
              )}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  currentPage === totalPages
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-indigo-600 text-white hover:bg-indigo-700"
                } transition-colors duration-200`}
              >
                Next
              </button>
            </div>
          )}
        </React.Fragment>
      )}
    </div>
  );
};

export default Orders;
