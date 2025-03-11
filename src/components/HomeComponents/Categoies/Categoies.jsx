import { useEffect, useState, useRef } from "react";
import Slider from "react-slick";
import { ChevronRight, ChevronLeft } from "lucide-react";
import "./Categories.css";
import { fetchCategories } from "../../../hooks/useProductData";
import Loader from "../../../layouts/Loader";

const CategoryCard = ({ title, items, image }) => (
  <div
    className={`relative flex flex-row items-center border transition-all cursor-pointer duration-500 hover:shadow-md categoryCart`}
    style={{ maxWidth: "450px", width: "100%", margin: "0" }} // إزالة الهوامش
  >
    <div className="w-2/3 flex flex-col justify-center pl-4">
      <span className={`font-semibold text-lg text-gray-800 catTitle`}>
        {title}
      </span>
      <i className={"text-gray-600"}>
        <span className={`font-bold `}>Brands:</span> {items} Items
      </i>
    </div>

    <div className="w-1/3 flex justify-center items-center">
      <img src={image} alt={title} className="w-30 h-30 object-contain" />
    </div>
  </div>
);

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const sliderRef = useRef(null);

  useEffect(() => {
    const getCategories = async () => {
      setLoading(true);
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getCategories();
  }, []);

  const sliderSettings = {
    className: "slider",
    infinite: categories.length > 4,
    slidesToShow: Math.min(4, categories.length),
    speed: 500,
    rows: 2,
    slidesPerRow: 1,
    arrows: false,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(3, categories.length),
          slidesToScroll: Math.min(3, categories.length),
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: Math.min(2, categories.length),
          slidesToScroll: Math.min(2, categories.length),
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

  if (loading) return <Loader />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="w-full pb-12">
      <div className="relative">
        <div className="flex justify-between items-center mb-4 px-2">
          <div className="flex space-x-6">
            <span className="text-xl font-bold text-gray-500">
              Categories
            </span>
          </div>
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

        <Slider ref={sliderRef} {...sliderSettings}>
          {categories.map((category) => (
            <div key={category.id} style={{ padding: "0" }}> {/* إزالة الهوامش هنا */}
              <CategoryCard
                title={category.name}
                items={category.brands.length}
                image={category.image}
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Categories;