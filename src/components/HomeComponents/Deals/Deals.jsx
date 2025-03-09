import React, { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  ChevronLeft,
  ChevronRight,
  Eye,
  Heart,
  ShoppingCart,
} from "lucide-react";

import "./Deals.css";
import { Tooltip } from "@mui/material";

const Deals = () => {
  const featuredSliderRef = useRef(null);

  // Featured products data
  const products = [
    {
      id: 1,
      name: "Jmdi Power Bank Mi First Copy",
      brand: "AMPEREFUSION",
      price: 25.0,
      originalPrice: 44.0,
      rating: 0,
      reviews: 0,
      onSale: true,
      image:
        "https://wordpress.templatetrip.com/WCM003_egudgets/wp-content/uploads/2023/08/15-300x330.jpg",
      timer: "57:00:31",
    },
    {
      id: 2,
      name: "Oculus Go Standalone Virtual Reality Headset",
      brand: "ENERGOTECH",
      price: 95.0,
      rating: 0,
      reviews: 0,
      image:
        "https://wordpress.templatetrip.com/WCM003_egudgets/wp-content/uploads/2023/08/13-300x330.jpg",
    },
    {
      id: 3,
      name: 'Google Pixelbook 12.3" Multi-Touch',
      brand: "CIRCUITMASTERS",
      price: 65.0,
      rating: 4.5,
      reviews: 2,
      image:
        "https://wordpress.templatetrip.com/WCM003_egudgets/wp-content/uploads/2023/08/11-300x330.jpg",
    },
    {
      id: 4,
      name: 'MSI 27" Modern AM271P All-in-One',
      brand: "SPARKFLARE",
      price: 75.0,
      rating: 0,
      reviews: 0,
      image:
        "https://wordpress.templatetrip.com/WCM003_egudgets/wp-content/uploads/2023/08/09-300x330.jpg",
    },
    {
      id: 5,
      name: "Fully-Automatic Front Loading Washer",
      brand: "VOLTVIBE",
      price: 40.0,
      maxPrice: 66.0,
      rating: 0,
      reviews: 0,
      onSale: true,
      soldOut: true,
      image:
        "https://wordpress.templatetrip.com/WCM003_egudgets/wp-content/uploads/2023/08/16-300x330.jpg",
    },
    {
      id: 6,
      name: "Samsung NX Mini Mirrorless Digital Camera",
      brand: "NEXUSELECTRONICS",
      price: 89.0,
      rating: 4.5,
      reviews: 2,
      image:
        "https://wordpress.templatetrip.com/WCM003_egudgets/wp-content/uploads/2023/08/14-300x330.jpg",
    },
    {
      id: 7,
      name: "Stainless Steel Dual Basket Professional",
      brand: "ELECTRAWAVE",
      price: 100.0,
      rating: 0,
      reviews: 0,
      image:
        "https://wordpress.templatetrip.com/WCM003_egudgets/wp-content/uploads/2023/08/12-300x330.jpg",
    },
    {
      id: 8,
      name: "Samsung Galaxy Note 20 Ultra Mystic",
      brand: "QUANTUMELECTRO",
      price: 57.0,
      rating: 0,
      reviews: 0,
      image:
        "https://wordpress.templatetrip.com/WCM003_egudgets/wp-content/uploads/2023/08/10-300x330.jpg",
    },
    {
      id: 9,
      name: "Bose Light Headphones Wireless",
      brand: "TECHNOVA",
      price: 75.0,
      maxPrice: 49.0,
      rating: 5,
      reviews: 2,
      image:
        "https://wordpress.templatetrip.com/WCM003_egudgets/wp-content/uploads/2023/08/08-300x330.jpg",
    },
    {
      id: 10,
      name: "Vivo iQ00 7 Legend - 4000 mA",
      brand: "AMPEREFUSION",
      price: 65.0,
      rating: 4.5,
      reviews: 2,
      image:
        "https://wordpress.templatetrip.com/WCM003_egudgets/wp-content/uploads/2023/08/18-300x330.jpg",
    },
  ];

  // Settings for the featured products slider
  const featuredSliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4, // الافتراضي (عمودين - 4 منتجات)
    slidesToScroll: 1, // يتحرك بعمود واحد فقط (منتجين فوق بعض)
    arrows: false,
    responsive: [
      {
        breakpoint: 1024, // الشاشات المتوسطة (3 أعمدة)
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768, // الشاشات الصغيرة (2 عمودين)
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480, // الهواتف (1 عمود فقط)
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  // Render stars based on rating
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

  return (
    <React.Fragment>
      <div className="mx-auto pt-6 pb-12">
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
                {Array.from(
                  { length: Math.ceil(products.length / 2) },
                  (_, index) => {
                    const firstProduct = products[index * 2];
                    const secondProduct = products[index * 2 + 1];

                    return (
                      <div key={index} className="grid grid-rows-2 gap-4">
                        {firstProduct && (
                          <div className="card border p-4 hover:shadow-lg transition-shadow duration-200 bg-white relative cursor-pointer">
                            <div className="icons-container absolute top-2 right-2 transition-opacity duration-300 flex gap-2 flex-col z-100 justify-between items-center">
                              <Tooltip title="Wishlist" placement="left">
                                <button
                                  className="p-2 bg-white rounded shadow-md hover:bg-gray-100 transition-all duration-200 iconHover"
                                  onClick={() => alert("wishlist")}
                                >
                                  <span>
                                    <Heart
                                      size={22}
                                      className="text-gray-700"
                                    />
                                  </span>
                                </button>
                              </Tooltip>
                              <Tooltip title="Shopping Cart" placement="left">
                                <button
                                  className="p-2 bg-white rounded shadow-md hover:bg-gray-100 transition-all duration-200 iconHover"
                                  onClick={() => alert("cart")}
                                >
                                  <span>
                                    <ShoppingCart
                                      size={22}
                                      className="text-gray-700"
                                    />
                                  </span>
                                </button>
                              </Tooltip>
                              <Tooltip title="View" placement="left">
                                <button
                                  className="p-2 bg-white rounded shadow-md hover:bg-gray-100 transition-all duration-200 iconHover"
                                  onClick={() => alert("view")}
                                >
                                  <span>
                                    <Eye size={22} className="text-gray-700" />
                                  </span>
                                </button>
                              </Tooltip>
                            </div>

                            <div className="relative mb-3">
                              {firstProduct.onSale && (
                                <div className="absolute top-0 left-0 bg-orange-500 text-white text-xs px-2 py-1 rounded-tr-lg rounded-bl-lg">
                                  Sale
                                </div>
                              )}
                              {firstProduct.soldOut && (
                                <div className="absolute top-0 right-0 bg-gray-600 text-white text-xs px-2 py-1 rounded-tl-lg rounded-br-lg">
                                  Sold Out
                                </div>
                              )}
                              <img
                                src={firstProduct.image}
                                alt={firstProduct.name}
                                className="mx-auto h-48 object-contain"
                              />
                            </div>

                            <div className="text-xs text-gray-500 uppercase mb-1">
                              {firstProduct.brand}
                            </div>
                            <span className="text-sm font-medium text-gray-800 mb-2 line-clamp-2 h-12">
                              {firstProduct.name}
                            </span>

                            <div className="mb-2">
                              {renderStars(firstProduct.rating)}
                            </div>

                            <div className="flex items-center">
                              <span className="text-orange-600 font-bold">
                                ${firstProduct.price.toFixed(2)}
                              </span>
                              {firstProduct.originalPrice && (
                                <span className="text-gray-400 line-through ml-2 text-sm">
                                  ${firstProduct.originalPrice.toFixed(2)}
                                </span>
                              )}
                            </div>
                          </div>
                        )}

                        {secondProduct && (
                          <div className="card border p-4 hover:shadow-lg transition-shadow duration-200 bg-white relative cursor-pointer">
                            <div className="icons-container absolute top-2 right-2 transition-opacity duration-300 flex gap-2 flex-col z-100 justify-between items-center">
                              <Tooltip title="Wishlist" placement="left">
                                <button
                                  className="p-2 bg-white rounded shadow-md hover:bg-gray-100 transition-all duration-200 iconHover"
                                  onClick={() => alert("wishlist")}
                                >
                                  <span>
                                    <Heart
                                      size={22}
                                      className="text-gray-700"
                                    />
                                  </span>
                                </button>
                              </Tooltip>
                              <Tooltip title="Shopping Cart" placement="left">
                                <button
                                  className="p-2 bg-white rounded shadow-md hover:bg-gray-100 transition-all duration-200 iconHover"
                                  onClick={() => alert("cart")}
                                >
                                  <span>
                                    <ShoppingCart
                                      size={22}
                                      className="text-gray-700"
                                    />
                                  </span>
                                </button>
                              </Tooltip>
                              <Tooltip title="View" placement="left">
                                <button
                                  className="p-2 bg-white rounded shadow-md hover:bg-gray-100 transition-all duration-200 iconHover"
                                  onClick={() => alert("view")}
                                >
                                  <span>
                                    <Eye size={22} className="text-gray-700" />
                                  </span>
                                </button>
                              </Tooltip>
                            </div>

                            <div className="relative mb-3">
                              {secondProduct.onSale && (
                                <div className="absolute top-0 left-0 bg-orange-500 text-white text-xs px-2 py-1 rounded-tr-lg rounded-bl-lg">
                                  Sale
                                </div>
                              )}
                              {secondProduct.soldOut && (
                                <div className="absolute top-0 right-0 bg-gray-600 text-white text-xs px-2 py-1 rounded-tl-lg rounded-br-lg">
                                  Sold Out
                                </div>
                              )}
                              <img
                                src={secondProduct.image}
                                alt={secondProduct.name}
                                className="mx-auto h-48 object-contain"
                              />
                            </div>

                            <div className="text-xs text-gray-500 uppercase mb-1">
                              {secondProduct.brand}
                            </div>
                            <span className="text-sm font-medium text-gray-800 mb-2 line-clamp-2 h-12">
                              {secondProduct.name}
                            </span>

                            <div className="mb-2">
                              {renderStars(secondProduct.rating)}
                            </div>

                            <div className="flex items-center">
                              <span className="text-orange-600 font-bold">
                                ${secondProduct.price.toFixed(2)}
                              </span>
                              {secondProduct.originalPrice && (
                                <span className="text-gray-400 line-through ml-2 text-sm">
                                  ${secondProduct.originalPrice.toFixed(2)}
                                </span>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  }
                )}
              </Slider>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Deals;
