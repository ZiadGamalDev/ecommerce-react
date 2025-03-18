import React, { useEffect } from "react";
import { ChevronRight, House, ShoppingBag, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import useWishList from "../../hooks/useWishListData";
import "../Cart/cart.css";
import Loader from "../../layouts/Loader";
import useCartData from "../../hooks/useCartData";
import ChatIcon from "../../components/ChatIcon/ChatIcon";

const WishList = () => {
  const { wishlist, isLoading, removeFromWishlist } = useWishList();
  const { addToCart } = useCartData();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  if (isLoading) return <Loader />;

  return (
    <React.Fragment>
      <ChatIcon />
      <div className="w-full mx-auto pb-4">
        {/* Header */}
        <div className="bg-[#f5f5f9] py-3 px-6 mb-6">
          <div className="container flex justify-between items-center">
            <span className="text-xl text-gray-700 font-medium">WishList</span>
            <div className="flex items-center">
              <Link to="/">
                <House size={18} color="#4B5563" />
              </Link>
              <ChevronRight color="#4B5563" />
              <span className="text-gray-600">WishList</span>
            </div>
          </div>
        </div>

        <div className="flex gap-6 py-12">
          <div className="w-full bg-white border border-gray-200 rounded-sm p-4">
            {wishlist.length > 0 ? (
              <div className="w-full overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-4 px-6 font-semibold border">
                        Product
                      </th>
                      <th className="text-center py-4 px-4 font-semibold border">
                        Price
                      </th>
                      <th className="text-center py-4 px-4 font-semibold border">
                        Stock status
                      </th>
                      <th className="text-center py-4 px-4 font-semibold border">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {wishlist.map((item) => (
                      <tr key={item._id} className="border-b">
                        <td className="py-4 px-6 border">
                          <div className="flex items-center gap-4">
                            <button
                              className="text-gray-400 hover:text-[#f04706] transition-all duration-200 ease-in-out"
                              onClick={() => removeFromWishlist(item._id)}
                            >
                              <Trash2 size={18} />
                            </button>
                            <div className="w-16 h-16 flex items-center">
                              <img
                                src={
                                  item.images[0]?.secure_url ||
                                  "/default-product.jpg"
                                }
                                alt={item.title}
                                className="max-h-14"
                              />
                            </div>
                            <div>
                              <Link
                                to={`/product/${item._id}`}
                                className="font-semibold text-sm text-[#3b5998] hover:text-[#000] transition-all"
                              >
                                {item.title}
                              </Link>
                            </div>
                          </div>
                        </td>
                        <td className="text-center py-4 px-4 text-[#f04706] font-semibold border">
                          ${item.appliedPrice || "N/A"}
                        </td>
                        <td className="text-center py-4 px-5 border">
                          <span
                            className={
                              item.stock > 0 ? "text-green-600" : "text-red-600"
                            }
                          >
                            {item.stock > 0 ? "In Stock" : "Out of Stock"}
                          </span>
                        </td>
                        <td className="text-center py-4 px-4 font-semibold">
                          <button
                            disabled={item.stock < 1}
                            onClick={() => addToCart(item._id, 1)}
                            className="group"
                          >
                            <div
                              className={`flex gap-2 items-center py-1 px-4 ${
                                item.stock > 0
                                  ? "bg-[#000] hover:bg-[#4f4f4f] group-hover:shadow-md"
                                  : "bg-gray-400 cursor-not-allowed"
                              } text-gray-300 rounded-3xl transition-all duration-700 ease-in-out`}
                            >
                              <ShoppingBag size={18} />
                              <span>Add to cart</span>
                            </div>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="flex flex-col justify-center items-center py-10">
                <span className="text-gray-600 text-xl font-medium">
                  Your wishlist is empty 🛒
                </span>
                <Link
                  to="/shop"
                  className="text-[#f7f7f9] py-3 px-4 bg-[#2d3741] rounded transition duration-300 search mt-4"
                >
                  <span>Browse products</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default WishList;
