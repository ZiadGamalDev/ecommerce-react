import React, { useRef, useEffect, useState } from "react";
import Slider from "react-slick";
import {
  ChevronLeft,
  ChevronRight,
  Eye,
  Heart,
  Loader,
  ShoppingCart,
} from "lucide-react";

import "./Deals.css";
import { Tooltip } from "@mui/material";
import { fetchProducts } from "../../../hooks/useProductData";
import useCartData from "../../../hooks/useCartData";
import useWishList from "../../../hooks/useWishListData";
import { Link } from "react-router-dom";

const Deals = () => {
  const featuredSliderRef = useRef(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { addToCart } = useCartData();

  const { isLoading, addToWishlist } = useWishList();

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      try {
        const data = await fetchProducts();
        const uniqueProducts = data.filter(
          (product, index, self) =>
            index === self.findIndex((p) => p.id === product.id)
        );
        setProducts(uniqueProducts);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  const featuredSliderSettings = {
    className: "slider",
    infinite: products.length > 4,
    slidesToShow: Math.min(4, products.length),
    speed: 500,
    rows: 2,
    slidesPerRow: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(3, products.length),
          slidesToScroll: Math.min(3, products.length),
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: Math.min(2, products.length),
          slidesToScroll: Math.min(2, products.length),
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const renderStars = (rating) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <span
            key={i}
            className={`text-lg ${
              i < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"
            }`}
          >
            ★
          </span>
        ))}
        <span className="text-sm text-gray-500 ml-1">
          ({rating > 0 ? rating : 0})
        </span>
      </div>
    );
  };

  if (loading) return <Loader />;
  if (error) return <div>Error: {error}</div>;

  return (
    <React.Fragment>
      <div className="pt-6 pb-12">
        <div className="flex main-product">
          <div className="w-full px-2 order-2 right-products">
            <div className="relative">
              <div className="flex justify-between items-center mb-4">
                <div className="flex space-x-6">
                  <span className="text-xl font-bold text-gray-500">
                    Featured Products
                  </span>
                </div>
                <div className="flex gap-2">
                  <button
                    className="p-1 rounded bg-gray-200 hover:bg-gray-300 duration-200 transition"
                    onClick={() => featuredSliderRef.current.slickPrev()}
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    className="p-1 rounded bg-gray-200 hover:bg-gray-300 duration-200 transition"
                    onClick={() => featuredSliderRef.current.slickNext()}
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>

              <Slider ref={featuredSliderRef} {...featuredSliderSettings}>
                {products.map((product) => (
                  <div key={product.id}>
                    <div className="card">
                      <div className="relative">
                        <img
                          src={product.images[0]}
                          alt={product.title}
                          className="w-full h-48 object-cover"
                        />
                        <div className="icons-container absolute top-2 right-2 flex gap-2 flex-col">
                          <Tooltip title="Wishlist" placement="left">
                            <button
                              className="p-2 bg-white rounded shadow-md hover:bg-gray-100 transition-all duration-200 iconHover"
                              onClick={() => addToWishlist(product)}
                              disabled={isLoading}
                            >
                              <span>
                                <Heart
                                  size={20}
                                  className={`text-gray-700 ${
                                    isLoading ? "opacity-50" : ""
                                  }`}
                                />
                              </span>
                            </button>
                          </Tooltip>
                          <Tooltip title="Shopping Cart" placement="left">
                            <button
                              className="p-2 bg-white rounded shadow-md hover:bg-gray-100 transition-all duration-200 iconHover"
                              onClick={() => addToCart(product.id, 1)}
                            >
                              <span>
                                <ShoppingCart
                                  size={20}
                                  className="text-gray-700"
                                />
                              </span>
                            </button>
                          </Tooltip>
                          <Tooltip title="View" placement="left">
                            <Link
                            to={`/product/${product.id}`}
                              className="p-2 bg-white rounded shadow-md hover:bg-gray-100 transition-all duration-200 iconHover"
                            >
                              <span>
                                <Eye size={20} className="text-gray-700" />
                              </span>
                            </Link>
                          </Tooltip>
                        </div>
                      </div>
                      <div className="p-4">
                        <span className="text-lg font-semibold text-gray-800 mb-2">
                          {product.title}
                        </span>
                        <span className="text-sm text-gray-600 mb-2 line-clamp-2">
                          {product.description}
                        </span>
                        <div className="mb-2">{renderStars(product.rate)}</div>
                        <div className="text-[#f04706] font-bold">
                          ${product.finalPrice.toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Deals;
