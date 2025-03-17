import React, { useState } from "react";
import Slider from "../../components/HomeComponents/Slider/Slider";
import FeaturesSection from "../../components/HomeComponents/Features/Features";

import "./Home.css";

import banner1 from "../../assets/images/banners/banner-01.jpg";
import banner2 from "../../assets/images/banners/banner-02.jpg";
import banner3 from "../../assets/images/banners/banner-03.jpg";
import banner4 from "../../assets/images/banners/banner-04.jpg";
import banner5 from "../../assets/images/banners/banner-05.jpg";
import Categories from "../../components/HomeComponents/Categoies/Categoies";
import Deals from "../../components/HomeComponents/Deals/Deals";
import LatestNews from "../../components/HomeComponents/LatestNews/LatestNews";
import Client from "./../../components/HomeComponents/Client/Client";
import ChatIcon from "../../components/ChatIcon/ChatIcon";

const Home = () => {
  const products = [
    {
      id: 1,
      label: "128 GB GREEN IN 2013",
      category: "Smart Phones",
      productName: "Oneplus 8",
      price: "60.99",
      image: banner1,
    },
    {
      id: 2,
      label: "SMART WATCHES",
      category: "Apple Watch",
      productName: "Series 4",
      price: "14.99",
      image: banner2,
    },
    {
      id: 3,
      label: "POPULAR PRODUCT",
      category: "Polaroid Now",
      productName: "Instant i-Type",
      price: "90.99",
      image: banner3,
    },
    {
      id: 4,
      label: "POPULAR PRODUCT",
      category: "Microsoft Surface",
      productName: "Wireless Keyboard",
      price: "37.85",
      image: banner4,
    },
    {
      id: 5,
      label: "POPULAR PRODUCT",
      category: "Bang & Olufsen",
      productName: "Beoplay A1 Speaker",
      price: "10.99",
      image: banner5,
    },
  ];

  return (
    <React.Fragment>
      <ChatIcon />

      <Slider />
      <div className="my-5 mx-auto">
        <FeaturesSection />
      </div>

      <div className="pb-12">
        <div className="flex justify-between main">
          <div className="w-1/3 pr-2 first">
            <ProductCard {...products[0]} />
          </div>

          <div className="w-1/3 px-2 second">
            <ProductCard {...products[1]} />
          </div>

          <div className="w-1/3 pl-2 third">
            <ProductCard {...products[2]} />
          </div>
        </div>
      </div>

      <div className="pb-12">
        <div className="w-full bg-[#274B66] text-white py-3 overflow-hidden">
          <div className="marquee-container">
            <div className="marquee-content">
              {[...Array(2)].map((_, index) => (
                <React.Fragment key={index}>
                  <span className="flex items-center">
                    <span className="text-lg  mr-10">
                      Mega offers now on Amazon Fresh | Up to 40% off
                    </span>
                    <span className="w-20 h-[1px] bg-gray-300 ml-2"></span>
                  </span>

                  <span className="flex items-center">
                    <span className="text-lg  mr-10">
                      FREE Delivery over ₹499. Fulfilled by Amazon.
                    </span>
                    <span className="w-20 h-[1px] bg-gray-300 ml-2"></span>
                  </span>

                  <span className="flex items-center">
                    <span className="text-lg  mr-10">
                      Flat $10 Instant Cashback on Wallet & UPI Transaction
                    </span>
                    <span className="w-20 h-[1px] bg-gray-300 ml-2"></span>
                  </span>

                  <span className="flex items-center">
                    <span className="text-lg  mr-10">
                      Limited Time Deal: Get 50% Off on Selected Electronics!
                    </span>
                    <span className="w-20 h-[1px] bg-gray-300 ml-2"></span>
                  </span>

                  <span className="flex items-center">
                    <span className="text-lg  mr-10">
                      Sign Up Now & Get Extra 20% Off Your First Order!
                    </span>
                    <span className="w-20 h-[1px] bg-gray-300 ml-2"></span>
                  </span>

                  <span className="flex items-center">
                    <span className="text-lg mr-10">
                      Buy 1 Get 1 Free on All Fashion Items – Limited Stock!
                    </span>
                    <span className="w-20 h-[1px] bg-gray-300 ml-2"></span>
                  </span>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Categories />

      <Deals />

      <div className="pb-12">
        <div className="flex justify-between main gap-5">
          <div className="first-part w-1/2">
            <ProductCard {...products[3]} />
          </div>

          <div className="second-part w-1/2">
            <ProductCard {...products[4]} />
          </div>
        </div>
      </div>

      <LatestNews />

      <Client />
    </React.Fragment>
  );
};

const ProductCard = ({ label, category, productName, price, image }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="w-full h-48 overflow-hidden relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute top-4 left-4 bg-yellow-400 px-3 py-1 rounded-md text-black font-bold text-sm z-10">
        {label}
      </div>
      <div className="absolute left-0 top-0 w-1/2 h-full p-4 flex flex-col justify-end z-10">
        <div className="text-white">
          <p className="text-sm opacity-90">{category}</p>
          <span className="text-xl font-bold mb-2">{productName}</span>
          <div className="flex items-center">
            <span className="text-xs text-white opacity-80">FROM</span>
            <span className="text-xl font-bold text-yellow-400 ml-2">
              ${price}/-
            </span>
          </div>
        </div>
      </div>
      <img
        src={image}
        alt={productName}
        className={`absolute top-0 left-0 w-full h-full object-cover transition-transform duration-1000 ${
          isHovered ? "scale-110" : "scale-100"
        }`}
      />
    </div>
  );
};

export default Home;
