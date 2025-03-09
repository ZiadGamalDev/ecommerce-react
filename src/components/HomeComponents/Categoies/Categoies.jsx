import { useEffect, useState } from "react";
import Slider from "react-slick";
import { ChevronRight, ChevronLeft } from "lucide-react";

import camera from "../../../assets/images/Cameras.png";

import "./Categories.css"

const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <div
      className="slick-arrow absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-200 rounded-full p-2 cursor-pointer z-10 hover:bg-gray-300"
      onClick={onClick}
    >
      <ChevronRight size={20} />
    </div>
  );
};

const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div
      className="slick-arrow absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-200 rounded-full p-2 cursor-pointer z-10 hover:bg-gray-300"
      onClick={onClick}
    >
      <ChevronLeft size={20} />
    </div>
  );
};

const CategoryCard = ({ title, items, image, active }) => (
  <div
    className={`relative flex flex-row items-center border transition-all cursor-pointer duration-500 hover:shadow-md categoryCart`}
  >
    <div className="w-2/3 flex flex-col justify-center pl-4">
      <span className={`font-semibold text-lg text-gray-800 catTitle`}>{title}</span>
      <i className={"text-gray-600"}>{items} Items</i>
    </div>

    <div className="w-1/3 flex justify-center items-center">
      <img src={image} alt={title} className="w-30 h-30 object-contain" />
    </div>
  </div>
);

const Categories = () => {
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const categories = [
    { title: "Cameras", items: 13, image: camera },
    { title: "Stationery", items: 6, image: camera },
    { title: "Shoes", items: 7, image: camera },
    { title: "Gaming", items: 6, image: camera },
    { title: "Kids' Tablets", items: 3, image: camera },
    { title: "Computer & Laptop", items: 16, image: camera },
    { title: "Furniture", items: 8, image: camera },
    { title: "Mobile & Tablets", items: 15, image: camera },
    { title: "Headphones", items: 8, image: camera },
    { title: "Home Speaker", items: 2, image: camera },
  ];

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: windowWidth >= 1024 ? 3 : windowWidth >= 768 ? 2 : 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <div className="w-full pb-12">
      {windowWidth < 1200 ? (
        <Slider {...sliderSettings}>
          {categories.map((category, index) => (
            <CategoryCard key={index} {...category} active={index === 0} />
          ))}
        </Slider>
      ) : (
        <div className="grid grid-cols-5 md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1">
          {categories.map((category, index) => (
            <CategoryCard key={index} {...category} active={index === 0} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Categories;
