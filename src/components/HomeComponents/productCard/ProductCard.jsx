// file: components/HomeComponents/productCard/productCard.jsx

import { useState } from "react";


const ProductCard = ({ label, category, productName, price, image }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="w-full h-48 rounded-lg overflow-hidden relative shadow-md"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Label */}
      <div className="absolute top-4 left-4 bg-yellow-400 px-3 py-1 rounded-md text-black font-bold text-sm z-10">
        {label}
      </div>

      {/* Product Info */}
      <div className="absolute left-0 top-0 w-1/2 h-full p-4 flex flex-col justify-end z-10">
        <div className="text-white">
          <p className="text-sm opacity-90">{category}</p>
          <h3 className="text-xl font-bold mb-2">{productName}</h3>
          <div className="flex items-center">
            <span className="text-xs text-white opacity-80">FROM</span>
            <span className="text-xl font-bold text-yellow-400 ml-2">
              ${price}/-
            </span>
          </div>
        </div>
      </div>

      {/* Full size image with background */}
      <img
        src={image}
        alt={productName}
        className={`absolute top-0 left-0 w-full h-full object-cover transition-transform duration-300 ${
          isHovered ? "scale-105" : "scale-100"
        }`}
      />
    </div>
  );
};

const ProductGallery = () => {
  const products = [
    {
      id: 1,
      label: "128 GB GREEN IN 2013",
      category: "Smart Phones",
      productName: "Oneplus 8",
      price: "60.99",
      image: banner1, // استبدل هذا برابط حقيقي للصورة
    },
    {
      id: 2,
      label: "SMART WATCHES",
      category: "Apple Watch",
      productName: "Series 4",
      price: "14.99",
      image: banner2, // استبدل هذا برابط حقيقي للصورة
    },
    {
      id: 3,
      label: "POPULAR PRODUCT",
      category: "Polaroid Now",
      productName: "Instant i-Type",
      price: "90.99",
      image: banner3, // استبدل هذا برابط حقيقي للصورة
    },
  ];


  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-wrap gap-4">
        <div className="w-full sm:hidden">
          <ProductCard
            key={products[0].id}
            label={products[0].label}
            category={products[0].category}
            productName={products[0].productName}
            price={products[0].price}
            image={products[0].image}
          />
        </div>

        <div className="hidden sm:block w-full md:w-1/2 lg:w-1/3">
          <ProductCard
            key={products[0].id}
            label={products[0].label}
            category={products[0].category}
            productName={products[0].productName}
            price={products[0].price}
            image={products[0].image}
          />
        </div>

        <div className="hidden sm:block md:w-1/2 lg:w-1/3">
          <ProductCard
            key={products[1].id}
            label={products[1].label}
            category={products[1].category}
            productName={products[1].productName}
            price={products[1].price}
            image={products[1].image}
          />
        </div>

        <div className="hidden lg:block lg:w-1/3">
          <ProductCard
            key={products[2].id}
            label={products[2].label}
            category={products[2].category}
            productName={products[2].productName}
            price={products[2].price}
            image={products[2].image}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductGallery;
