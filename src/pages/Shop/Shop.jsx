// Shop.jsx
import { useState, useEffect, useRef } from "react";
import Sidebar from "./Sidebar";
import ProductGrid from "./ProductGrid";
import PaginationControls from "./PaginationControls";
import { ChevronRight, House } from "lucide-react";
import { Link } from "react-router-dom";
import ChatIcon from "../../components/ChatIcon/ChatIcon";

export default function Shop() {
  const didMount = useRef(false);

  // -- All products from the server
  const [allProducts, setAllProducts] = useState([]);
  // -- Filtered products after local filtering
  const [filteredProducts, setFilteredProducts] = useState([]);
  // -- The subset of filteredProducts shown on the current page
  const [displayedProducts, setDisplayedProducts] = useState([]);

  // -- Loading indicator
  const [loading, setLoading] = useState(true);

  // -- Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 6; // How many items per page?

  // -- Filter data from the server
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  // -- Selected filters
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [search, setSearch] = useState("");

  // -- Price range states
  // priceRange will hold [minPrice, maxPrice] from the backend
  // newPriceRange is the user’s chosen sub-range for filtering
  const [priceRange, setPriceRange] = useState([]);
  const [newPriceRange, setNewPriceRange] = useState([]);

  // 1) Fetch products + categories + brands once
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        // Fetch all products (assuming your endpoint returns { data, minPrice, maxPrice, ... })
        const productRes = await fetch(
          "https://e-commerce-api-tau-five.vercel.app/product"
        );
        const productData = await productRes.json();

        // Fetch categories
        const catRes = await fetch(
          "https://e-commerce-api-tau-five.vercel.app/category"
        );
        const catData = await catRes.json();

        // Fetch brands
        const brandRes = await fetch(
          "https://e-commerce-api-tau-five.vercel.app/brand"
        );
        const brandData = await brandRes.json();

        // Store all fetched data
        setAllProducts(productData.data || []);
        setCategories(catData.data || []);
        setBrands(brandData.data || []);

        // If the backend returns minPrice and maxPrice, set the local slider bounds
        if (
          productData.minPrice !== undefined &&
          productData.maxPrice !== undefined
        ) {
          setPriceRange([productData.minPrice, productData.maxPrice]);

          // On first mount, also set newPriceRange to the same so we include everything initially
          if (!didMount.current) {
            setNewPriceRange([productData.minPrice, productData.maxPrice]);
            didMount.current = true;
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // 2) Local filtering whenever allProducts or any filter changes
  useEffect(() => {
    if (!allProducts.length) {
      setFilteredProducts([]);
      return;
    }

    let result = [...allProducts];

    // (A) Filter by search text
    if (search.trim() !== "") {
      const lowerSearch = search.toLowerCase();
      result = result.filter((product) => {
        const titleMatch = product.title.toLowerCase().includes(lowerSearch);
        const descMatch = product.description
          .toLowerCase()
          .includes(lowerSearch);
        return titleMatch || descMatch;
      });
    }

    // (B) Filter by category
    if (selectedCategory) {
      result = result.filter(
        (product) => product.category?.name === selectedCategory
      );
    }

    // (C) Filter by brand
    if (selectedBrands.length > 0) {
      result = result.filter((product) =>
        selectedBrands.includes(product.brand?.slug)
      );
    }

    // (D) Filter by price range
    if (newPriceRange.length === 2) {
      const [minPrice, maxPrice] = newPriceRange;
      result = result.filter(
        (product) =>
          product.finalPrice >= minPrice && product.finalPrice <= maxPrice
      );
    }

    setFilteredProducts(result);
    setCurrentPage(1); // Reset to page 1 whenever any filter changes
  }, [allProducts, search, selectedCategory, selectedBrands, newPriceRange]);

  // 3) Local pagination whenever filteredProducts or currentPage changes
  useEffect(() => {
    if (filteredProducts.length === 0) {
      setDisplayedProducts([]);
      setTotalPages(1);
      return;
    }

    // Calculate total pages
    const newTotalPages = Math.ceil(filteredProducts.length / limit);
    setTotalPages(newTotalPages);

    // Ensure currentPage doesn’t exceed newTotalPages
    const safePage = Math.min(currentPage, newTotalPages);
    setCurrentPage(safePage);

    // Compute the slice for this page
    const startIndex = (safePage - 1) * limit;
    const endIndex = startIndex + limit;
    const pageItems = filteredProducts.slice(startIndex, endIndex);

    setDisplayedProducts(pageItems);
  }, [filteredProducts, currentPage]);

  // === Handlers passed to Sidebar ===
  const handleSearchChange = (text) => setSearch(text);

  const handleCategoryClick = (catName) => {
    setSelectedCategory((prev) => (prev === catName ? null : catName));
  };

  const handleBrandChange = (brandSlug) => {
    setSelectedBrands((prev) =>
      prev.includes(brandSlug)
        ? prev.filter((b) => b !== brandSlug)
        : [...prev, brandSlug]
    );
  };

  const handlePriceChange = (newRange) => {
    setNewPriceRange(newRange);
  };

  return (
    <div
      className="container mx-auto px-4 py-8"
      style={{ position: "relative" }}
    >
      <div className="flex gap-6">
        <Sidebar
          loading={loading}
          categories={categories}
          brands={brands}
          search={search}
          selectedCategory={selectedCategory}
          selectedBrands={selectedBrands}
          priceRange={priceRange}
          newPriceRange={newPriceRange}
          onSearchChange={handleSearchChange}
          onCategoryClick={handleCategoryClick}
          onBrandChange={handleBrandChange}
          onPriceChange={handlePriceChange}
        />

        <main className="flex-1">
          <ChatIcon />

          {/* Header */}
          <div className="bg-[#f5f5f9] py-3 px-6 mb-6">
            <div className="container flex justify-between items-center">
              <span className="text-xl text-gray-700 font-semibold">
                Archives: Shop
              </span>
              <div className="flex items-center">
                <Link to="/">
                  <House size={18} color="#4B5563" />
                </Link>
                <ChevronRight color="#4B5563" size={20} />
                <span className="text-gray-600">Product</span>
              </div>
            </div>
          </div>
          {loading ? (
            <div className="text-center text-gray-600">Loading...</div>
          ) : filteredProducts.length > 0 ? (
            <>
              <ProductGrid products={displayedProducts} />

              <PaginationControls
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(newPage) => setCurrentPage(newPage)}
              />
            </>
          ) : (
            <div className="text-center text-gray-600">No products found</div>
          )}
        </main>
      </div>
    </div>
  );
}
