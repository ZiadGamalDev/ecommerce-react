import React, { useEffect } from "react";
import { House, Minus, Plus, Trash2 } from "lucide-react";

import "./cart.css";
import { Link } from "react-router-dom";

import useCartData from "../../hooks/useCartData";
import Loader from "../../layouts/Loader";

const Cart = () => {
  // const [quantity, setQuantity] = useState(1);

  // const increaseQuantity = () => {
  //   setQuantity(quantity + 1);
  // };

  // const decreaseQuantity = () => {
  //   if (quantity > 1) {
  //     setQuantity(quantity - 1);
  //   }
  // };

  const { cart, loading, getCart, addToCart, deleteFromCart } = useCartData();

  useEffect(() => {
    getCart();
  }, []);

  if (loading) return <Loader />;

  return (
    <React.Fragment>
      <div className="w-full mx-auto pb-4">
        {/* Header */}
        <div className="bg-[#f5f5f9] py-3 px-6 mb-6">
          <div className="container flex justify-between items-center">
            <span className="text-xl text-gray-700 font-medium">Cart</span>
            <div className="flex items-center">
              <Link to="/">
                <House size={18} color="#4B5563" />
              </Link>
              <span className="mx-2 text-gray-400">&gt;</span>
              <span className="text-gray-600">Cart</span>
            </div>
          </div>
        </div>

        <div className="flex gap-6 container py-12 cartContent">
          {/* Left Section - Cart Items */}
          <div className="w-2/3 bg-white border border-gray-200 rounded-sm child">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-4 px-6 font-semibold">Product</th>
                  <th className="text-center py-4 px-4 font-semibold">Price</th>
                  <th className="text-center py-4 px-4 font-semibold">
                    Quantity
                  </th>
                  <th className="text-center py-4 px-4 font-semibold">
                    Subtotal
                  </th>
                </tr>
              </thead>
              <tbody>
                {cart?.products?.map((item) => (
                  <tr className="border-b" key={item.productId}>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-4">
                        <button
                          className="text-gray-400 hover:text-[#f04706] transition-all duration-200 ease-in-out"
                          onClick={() => deleteFromCart(item.productId)}
                        >
                          <Trash2 size={18} />
                        </button>
                        <div className="w-17 h-17 flex items-center">
                          <img
                            src={
                              item.image || "../../assets/images/06-300x330.jpg"
                            }
                            alt={item.title}
                            className="max-h-16"
                          />
                        </div>
                        <div>
                          <p className="font-semibold text-sm">{item.title}</p>
                        </div>
                      </div>
                    </td>
                    <td className="text-center py-4 px-4 text-[#f04706] font-semibold">
                      ${item.basePrice.toFixed(2)}
                    </td>
                    <td className="text-center py-4 px-4">
                      <div className="flex items-center justify-center">
                        <button
                          onClick={() => addToCart(item.productId, -1)}
                          className="w-9 h-9 flex items-center justify-center border border-gray-300 rounded-sm"
                        >
                          <Minus size={14} />
                        </button>
                        <input
                          type="text"
                          value={item.quantity}
                          readOnly
                          className="w-11 h-9 mx-2 border border-gray-300 rounded-sm text-center focus:outline-none"
                        />
                        <button
                          onClick={() => addToCart(item.productId, 1)}
                          className="w-9 h-9 flex items-center justify-center border border-gray-300 rounded-sm"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </td>
                    <td className="text-center py-4 px-4 text-[#f04706] font-semibold">
                      ${item.finalPrice.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="p-4 flex gap-3 couponDiv">
              <input
                type="text"
                placeholder="Coupon code"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500 transition-all duration-200 ease-in-out"
              />
              <div className="flex gap-3 cartBtns">
                <button className="px-4 py-2 bg-gray-700 text-white rounded search">
                  <span>Apply coupon</span>
                </button>
                <button className="px-4 py-2 bg-gray-700 text-white rounded empty">
                  <span>Empty Cart</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Section - Cart Totals */}
          <div className="w-1/3">
            <div className="bg-[#f5f5f5] p-6 rounded-sm h-auto">
              <span className="text-xl font-semibold">Cart totals</span>
              <div className="border-b border-gray-300 pb-3 mt-2">
                <div className="flex justify-between">
                  <span className="text-gray-600 font-semibold">Subtotal</span>
                  <span className="font-medium text-gray-500">
                    ${cart?.subTotal?.toFixed(2)}
                  </span>
                </div>
              </div>
              <div className="flex justify-between mb-6 pt-3 border-b border-gray-300 pb-3">
                <span className="text-gray-600 font-semibold">Total</span>
                <span className="text-gray-600 font-semibold">
                  ${cart?.subTotal?.toFixed(2)}
                </span>
              </div>
              <button className="w-full py-3 bg-[#f04706] text-white font-medium rounded proceed">
                <span>Proceed to checkout</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Cart;
