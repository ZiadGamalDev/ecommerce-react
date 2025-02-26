import React, { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

import img1 from "../../assets/images/1.avif";
import img2 from "../../assets/images/2.jpg";

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [fadeState, setFadeState] = useState("fade-in");

  const slides = [
    {
      id: 1,
      image: img1,
      badge: "Weekend Discounts",
      title: "The New Branded",
      subtitle: "Home Wireless Speaker",
      price: "$29.99/-",
      buttonText: "SHOP NOW",
    },
    {
      id: 2,
      image: img2,
      badge: "Limited Offer",
      title: "Premium Quality",
      subtitle: "Portable Bluetooth Speaker",
      price: "$39.99/-",
      buttonText: "BUY NOW",
    },
  ];

  const nextSlide = useCallback(() => {
    setFadeState("fade-out");
    setTimeout(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
      setFadeState("fade-in");
    }, 300);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setFadeState("fade-out");
    setTimeout(() => {
      setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
      setFadeState("fade-in");
    }, 300);
  }, [slides.length]);

  const goToSlide = (index) => {
    if (index === currentSlide) return;
    setFadeState("fade-out");
    setTimeout(() => {
      setCurrentSlide(index);
      setFadeState("fade-in");
    }, 1500);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  useEffect(() => {
    AOS.init({ duration: 1000, once: false, offset: 0 });
  }, []);

  useEffect(() => {
    AOS.refresh();
  }, [currentSlide]);

  return (
    <React.Fragment>
      <div className="relative w-full mx-auto h-[500px] overflow-hidden">
        {/* Slides */}
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 w-full h-full transition-opacity duration-300 ${
              index === currentSlide
                ? fadeState === "fade-in"
                  ? "opacity-100"
                  : "opacity-0"
                : "opacity-0 pointer-events-none"
            }`}
          >
            <img
              src={slide?.image}
              alt={slide.title}
              className="w-full h-full object-cover absolute inset-0"
            />

            <div
              key={currentSlide}
              className={`absolute inset-0 flex items-center mx-3 ${
                index === 0
                  ? "justify-start"
                  : index === 1
                  ? "justify-end"
                  : "justify-center"
              }`}
            >
              <div
                className="w-full px-8 md:px-16 flex flex-col items-start max-w-lg"
                data-aos={
                  index === 0
                    ? "fade-left"
                    : index === 1
                    ? "fade-right"
                    : "fade-up"
                }
              >
                <span className="bg-orange-500 text-white px-4 py-1 rounded text-sm mb-4">
                  {slide.badge}
                </span>

                <h2 className="text-3xl md:text-4xl font-medium text-light mb-1">
                  {slide.title}
                </h2>

                <h3 className="text-3xl md:text-4xl font-bold text-light mb-4">
                  {slide.subtitle}
                </h3>

                <div className="mb-6">
                  <span className="text-sm text-sky-100">From</span>
                  <span className="text-2xl text-orange-500 font-bold ml-2">
                    {slide.price}
                  </span>
                </div>

                <button className="bg-gray-700 hover:bg-gray-800 text-white px-6 py-3 rounded font-medium transition-all duration-300 ease-in-out">
                  {slide.buttonText}
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 z-10 -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded"
          aria-label="Previous slide"
        >
          <ChevronLeft size={24} />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 z-10 -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded"
          aria-label="Next slide"
        >
          <ChevronRight size={24} />
        </button>

        {/* Custom Bullets */}
        <div className="absolute bottom-4 left-0 right-0">
          <div className="flex justify-center gap-2">
            {slides.map((_, index) => (
              <button
                disabled
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ease-in-out ${
                  index === currentSlide ? "bg-orange-500 w-6" : "bg-gray-300"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Slider;
