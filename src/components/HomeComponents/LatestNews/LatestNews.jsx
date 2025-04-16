import React, { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import img1 from "../../../assets/images/banners/blog-01.jpg";
import img2 from "../../../assets/images/banners/blog-02.jpg";
import img3 from "../../../assets/images/banners/blog-03.jpg";
import img4 from "../../../assets/images/banners/blog-04.jpg";
import img5 from "../../../assets/images/banners/blog-05.jpg";
import img6 from "../../../assets/images/banners/blog-06.jpg";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

const newsData = [
  {
    image: img1,
    title: "MUST-HAVE ITEMS FOR YOUR SUMMER...",
    description:
      "Summer is here, and it’s time to update your wardrobe with some trendy pieces. In this...",
    link: "#",
  },
  {
    image: img2,
    title: "SUSTAINABLE FASHION: WHAT IT IS AND...",
    description:
      "As the world becomes more environmentally conscious, sustainable fashion is becoming...",
    link: "#",
  },
  {
    image: img3,
    title: "UNVEILING THE HOTTEST FALL FASHION...",
    description:
      "Fall is just around the corner, and it’s time to start thinking about your autumn wardrobe...",
    link: "#",
  },
  {
    image: img4,
    title: "MASTER THE ART OF CLOSET...",
    description:
      "A cluttered closet can make it hard to find what you’re looking for, and it can even...",
    link: "#",
  },
  {
    image: img5,
    title: "THE BENEFITS OF SHOPPING ONLINE VS...",
    description:
      "Welcome to our blog, “Packed and Delivered,” where we dive into the fascinating world of...",
    link: "#",
  },
  {
    image: img6,
    title: "The Ultimate Guide to Finding the...",
    description:
      "Jeans are a staple in most wardrobes, but finding the perfect pair can be a challenge. I...",
    link: "#",
  },
];

const LatestNews = () => {
  const sliderRef = useRef(null);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
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

  return (
    <div className="mx-auto overflow-x-hidden">
      <div className="flex justify-between items-center px-1">
        <span className="text-2xl font-bold text-gray-500">
          Latest News
        </span>
        <div className="flex gap-2">
          <button
            className="p-1 rounded bg-gray-200 hover:bg-gray-300 duration-200 transition"
            onClick={() => sliderRef.current.slickPrev()}
          >
            <ChevronLeft size={20} />
          </button>
          <button
            className="p-1 rounded bg-gray-200 hover:bg-gray-300 duration-200 transition"
            onClick={() => sliderRef.current.slickNext()}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <Slider ref={sliderRef} {...settings}>
        {newsData.map((news, index) => (
          <div key={index} className="mt-3">
            <div className="bg-white overflow-hidden">
              <img
                src={news.image}
                alt={news.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <p className="text-md font-semibold text-gray-800 mb-2">
                  {news.title}
                </p>
                <p className="text-gray-600 text-sm mb-4">{news.description}</p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default LatestNews;
