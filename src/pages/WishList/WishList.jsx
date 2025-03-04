import React from "react";
import { ChevronRight, House, ShoppingBag, Trash2 } from "lucide-react";

import "../Cart/cart.css";
import { Link } from "react-router-dom";

import product from "../../assets/images/06-300x330.jpg";

const WishList = () => {
  return (
    <React.Fragment>
      <div className="w-full mx-auto pb-4">
        {/* Header */}
        <div className="bg-[#f5f5f9] py-3 px-6 mb-6">
          <div className="container flex justify-between items-center">
            <span className="text-xl text-gray-700 font-medium">WishList</span>
            <div className="flex items-center">
              <Link to="/">
                <House size={18} color="#4B5563" />
              </Link>
              <ChevronRight />
              <span className="text-gray-600">WishList</span>
            </div>
          </div>
        </div>

        <div className="flex gap-6 container py-12">
          <div className="w-full bg-white border border-gray-200 rounded-sm child">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-4 px-6 font-semibold border">
                    Product
                  </th>
                  <th className="text-center py-4 px-4 font-semibold border">
                    Price
                  </th>
                  <th className="text-center py-4 px-4 font-semibold">
                    Stock status
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-4 px-6 border">
                    <div className="flex items-center gap-4">
                      <button className="text-gray-400 hover:text-[#f04706] transition-all duration-200 ease-in-out">
                        <Trash2 size={18} />
                      </button>
                      <div className="w-16 h-16 flex items-center">
                        <img
                          src={product}
                          alt="Samsung NX Mini Camera"
                          className="max-h-14"
                        />
                      </div>
                      <div>
                        <Link
                          to={"/"}
                          className="font-semibold text-sm text-[#3b5998] text-decoration-none hover:text-[#000] duration-500 ease-in-out transition-all"
                        >
                          Samsung NX Mini Mirrorless Digital Camera with 9mm and
                          9-27mm Lenses and Case Kit
                        </Link>
                      </div>
                    </div>
                  </td>
                  <td className="text-center py-4 px-4 text-[#f04706] font-semibold border">
                    $89.0
                  </td>
                  <td className="text-center py-4 px-5 border">
                    <span className="text-green-600">In Stock</span>
                  </td>
                  <td className="text-center py-4 px-4 font-semibold">
                    <button className="">
                      <div className="flex gap-2 items-center py-1 px-4 bg-[#000] text-gray-300 rounded-3xl hover:bg-[#4f4f4f] transition-all duration-700 ease-in-out">
                        <ShoppingBag size={18} />
                        <span>Add to cart</span>
                      </div>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default WishList;
