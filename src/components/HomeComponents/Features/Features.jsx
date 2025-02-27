import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  TruckIcon,
  PiggyBankIcon,
  ClockIcon,
  DollarSign,
  Percent,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import styles from "./feature.module.css"

const FeatureBox = ({ icon, title, description }) => (
  <div className={`flex items-center justify-center px-4 py-6 gap-4 border-r border-gray-200 ${styles.box}`}>
    <div className={`text-orange-500 ${styles.boxIcon}`}>{icon}</div>
    <div className="flex flex-col">
      <span className={`font-semibold text-lg ${styles.textInfo}`}>{title}</span>
      <span className="text-gray-600 text-sm">
        <i>{description}</i>
      </span>
    </div>
  </div>
);

const NextArrow = (props) => {
  const { style, onClick } = props;
  return (
    <div
      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-200 rounded-full p-2 cursor-pointer z-10 hover:bg-gray-300"
      onClick={onClick}
    >
      <ChevronRight size={20} />
    </div>
  );
};

const PrevArrow = (props) => {
  const {  style, onClick } = props;
  return (
    <div
      className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-200 rounded-full p-2 cursor-pointer z-10 hover:bg-gray-300"
      onClick={onClick}
    >
      <ChevronLeft size={20} />
    </div>
  );
};

const FeaturesSection = () => {
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
    {
      icon: <TruckIcon size={35} strokeWidth={1.5} />,
      title: "Free Delivery",
      description: "Free shipping on all order",
    },
    {
      icon: <PiggyBankIcon size={35} strokeWidth={1.5} />,
      title: "Big Saving Shop",
      description: "Save big every order",
    },
    {
      icon: <ClockIcon size={35} strokeWidth={1.5} />,
      title: "Online Support 24/7",
      description: "Support online 24 hours a day",
    },
    {
      icon: <DollarSign size={35} strokeWidth={1.5} />,
      title: "Money Back Return",
      description: "Back guarantee under 7 days",
    },
    {
      icon: <Percent size={32} strokeWidth={1.5} />,
      title: "Member Discount",
      description: "On every order over $120.00",
    },
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
    <div className="w-full bg-white">
      {windowWidth < 1024 ? (
        <div className="py-4 pb-12 px-2 overflow-hidden">
          <Slider {...sliderSettings}>
            {features.map((feature, index) => (
              <div key={index} className="px-2">
                <FeatureBox
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                />
              </div>
            ))}
          </Slider>
        </div>
      ) : (
        <div className="flex flex-wrap justify-center border-t border-b border-gray-200">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`flex-1 ${
                index < features.length - 1 ? "border-r border-gray-200" : ""
              }`}
            >
              <FeatureBox
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FeaturesSection;
