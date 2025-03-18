import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useCartData from "../../hooks/useCartData";
import { ChevronRight, House } from "lucide-react";
import ChatIcon from "../../components/ChatIcon/ChatIcon";

export default function SingleProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mainImage, setMainImage] = useState(""); // Image gallery state
  const { addToCart } = useCartData();

  // Fetch product data
  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `https://e-commerce-api-tau-five.vercel.app/product/${id}`
        );
        const data = await response.json();
        if (data && data.data) {
          setProduct(data.data);
          setMainImage(data.data.images?.[0]?.secure_url || ""); // Set first image as default
        } else {
          setError("Product not found");
        }
      } catch (err) {
        console.error(err);
        setError("Failed to fetch product");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <div className="p-6 text-center text-lg">Loading...</div>;
  if (error) return <div className="p-6 text-center text-red-500">{error}</div>;
  if (!product) return <div className="p-6">No product data available</div>;

  // Destructure product fields
  const {
    title,
    description,
    finalPrice,
    basePrice,
    images,
    brand,
    category,
    stock,
    discount,
  } = product;

  return (
    <div className="w-full mx-auto pb-4">
      <ChatIcon />

      {/* Header */}
      <div className="bg-[#f5f5f9] py-3 px-6 mb-6">
        <div className="container flex justify-between items-center">
          <span className="text-xl text-gray-700 font-medium">{title}</span>
          <div className="flex items-center">
            <Link to="/">
              <House size={18} color="#4B5563" />
            </Link>
            <ChevronRight color="#4B5563" size={20} />
            <span className="text-gray-600">{title}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* 🖼️ Product Image Gallery */}
          <div>
            <div className="border rounded-lg overflow-hidden">
              <img
                src={mainImage}
                alt={title}
                className="w-full h-96 object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>

            {/* Image Thumbnails */}
            <div className="flex gap-3 mt-4">
              {images?.map((img, index) => (
                <img
                  key={index}
                  src={img.secure_url}
                  alt="Product Thumbnail"
                  className={`w-16 h-16 object-cover rounded-md cursor-pointer border ${
                    mainImage === img.secure_url
                      ? "border-blue-500"
                      : "border-gray-300"
                  }`}
                  onClick={() => setMainImage(img.secure_url)}
                />
              ))}
            </div>
          </div>

          {/* 📋 Product Details */}
          <div className="space-y-6">
            <h1 className="text-3xl font-semibold">{title}</h1>
            <p className="text-gray-700">{description}</p>

            {/* 💰 Pricing */}
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-orange-600">
                ${finalPrice}
              </span>
              {basePrice > finalPrice && (
                <span className="text-gray-400 text-lg line-through">
                  ${basePrice + 10}
                </span>
              )}
              {discount && discount.value > 0 && (
                <span className="text-sm bg-red-500 text-white px-2 py-1 rounded-full">
                  {discount.value}% OFF
                </span>
              )}
            </div>

            {/* 🏷️ Stock Status */}
            <p
              className={`text-sm font-medium ${
                stock > 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {stock > 0 ? `In Stock: ${stock} items` : "Out of Stock"}
            </p>

            {/* 🏭 Brand & Category */}
            <div className="text-sm text-gray-600 flex gap-4">
              <span>
                <strong>Brand:</strong> {brand?.name || "N/A"}
              </span>
              <span>
                <strong>Category:</strong> {category?.name || "N/A"}
              </span>
            </div>

            <div className="flex gap-4">
              {/* 🛒 Add to Cart Button */}
              <button
                className={`w-full py-3 text-lg font-medium rounded ${
                  stock > 0
                    ? "bg-blue-600 text-white hover:bg-blue-500 transition duration-150"
                    : "bg-gray-400 text-gray-700 cursor-not-allowed"
                }`}
                onClick={() => addToCart(id, 1)}
                disabled={stock === 0}
              >
                {stock > 0 ? "Add to Cart" : "Out of Stock"}
              </button>

              {/* 🛒 Add to WishList Button */}
              <button
                className={`w-full py-3 text-lg font-medium rounded ${
                  stock > 0
                    ? "bg-blue-600 text-white hover:bg-blue-500 transition duration-150"
                    : "bg-gray-400 text-gray-700 cursor-not-allowed"
                }`}
                onClick={() => addToCart(id, 1)}
                disabled={stock === 0}
              >
                {stock > 0 ? "Add to WishList" : "Out of Stock"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
