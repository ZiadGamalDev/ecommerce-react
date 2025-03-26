import { useEffect, useState } from "react";
import Slider from "react-slick";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

import img1 from "../../../assets/images/client-01.png";
import img2 from "../../../assets/images/client-02.png";
import img3 from "../../../assets/images/client-03.png";
import img4 from "../../../assets/images/client-04.png";
import img5 from "../../../assets/images/client-06.png";

const ClientBox = ({ image }) => {
  const vibrateVariants = {
    hover: {
      x: [0, -4, 4, -4, 4, 0],
      y: 0,
      transition: {
        duration: 0.3,
        repeat: 3,
      },
    },
  };

  return (
    <div className="flex items-center justify-center px-4 py-6 gap-4">
      <motion.img
        src={image}
        alt="client image"
        className="w-48 object-contain"
        whileHover="hover"
        variants={vibrateVariants}
        initial={{ x: 0, y: 0 }}
      />
    </div>
  );
};

const NextArrow = (props) => {
  const { style, onClick } = props;
  return (
    <div
      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-200 rounded-full p-2 cursor-pointer z-10 hover:bg-gray-300"
      onClick={onClick}
      style={{ ...style }}
    >
      <ChevronRight size={20} />
    </div>
  );
};

const PrevArrow = (props) => {
  const { style, onClick } = props;
  return (
    <div
      className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-200 rounded-full p-2 cursor-pointer z-10 hover:bg-gray-300"
      onClick={onClick}
      style={{ ...style }}
    >
      <ChevronLeft size={20} />
    </div>
  );
};

const Client = () => {
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

  const isTablet = windowWidth >= 768 && windowWidth < 1024;

  const features = [
    { image: img1 },
    { image: img2 },
    { image: img3 },
    { image: img4 },
    { image: img5 },
  ];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: isTablet ? 2 : 1,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    autoplay: true,
    autoplaySpeed: 3000,
    centerMode: true,
    centerPadding: "0px",
  };

  return (
    <div className="pt-6 pb-12 w-full bg-white">
      {windowWidth < 1024 ? (
        <div className="overflow-hidden">
          <Slider {...sliderSettings}>
            {features.map((feature, index) => (
              <div key={index} className="px-2">
                <ClientBox image={feature.image} />
              </div>
            ))}
          </Slider>
        </div>
      ) : (
        <div className="flex flex-wrap justify-between">
          {features.map((feature, index) => (
            <div key={index} className="flex-1 min-w-[200px] max-w-[250px]">
              <ClientBox image={feature.image} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Client;