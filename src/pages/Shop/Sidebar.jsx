// Sidebar.jsx
import { useEffect, useState } from "react";

export default function Sidebar({ loading, categories, brands, search, selectedCategory, selectedBrands, priceRange, newPriceRange, onSearchChange, onCategoryClick, onBrandChange, onPriceChange }) {
    const [sliderValue, setSliderValue] = useState(newPriceRange[1] || priceRange[1]);

    const handleSliderChange = (e) => {
        const newMax = Number(e.target.value);
        setSliderValue(newMax);

        const min = priceRange[0] || 0;
        onPriceChange([min, newMax]);
    };

    useEffect(() => {
        if (newPriceRange[1]) {
            setSliderValue(newPriceRange[1]);
        }
    }, [newPriceRange]);

    return (
        <aside className="w-[200px] block space-y-6">
            {loading && <div className="text-center text-gray-600">Loading...</div>}

            {/* -- Search -- */}
            <div className="border border-gray-200 rounded-md overflow-hidden shadow-sm">
                <div className="bg-[#f6f7f8] px-2 py-2 border-b border-gray-200">
                    <span className="font-semibold text-gray-700 text-sm">Search</span>
                </div>
                <div className="p-2 space-y-2">
                    <input type="text" value={search} onChange={(e) => onSearchChange(e.target.value)} placeholder="Type to search..." className="w-full border border-gray-300 rounded p-1 text-sm" />
                </div>
            </div>

            {/* -- Categories -- */}
            <div className="border border-gray-200 rounded-md overflow-hidden shadow-sm">
                <div className="bg-[#f6f7f8] px-2 py-2 border-b border-gray-200">
                    <span className="font-semibold text-gray-700 text-sm">Categories</span>
                </div>
                <div className="p-1 space-y-2">
                    {categories.map(({ name }) => (
                        <button
                            key={name}
                            onClick={() => onCategoryClick(name)}
                            className={`w-full flex justify-between items-center 
                          text-gray-700 hover:bg-gray-50 px-2 py-1 rounded 
                          ${selectedCategory === name ? "bg-gray-200 font-semibold" : ""}`}>
                            <span className="text-sm">{name}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* -- Price Range -- */}
            <div className="border border-gray-200 rounded-md overflow-hidden shadow-sm">
                <div className="bg-[#f6f7f8] px-2 py-2 border-b border-gray-200">
                    <span className="font-semibold text-gray-700 text-sm">Price</span>
                </div>
                <div className="p-2 space-y-2 text-sm">
                    <input type="range" min={priceRange[0]} max={priceRange[1]} value={sliderValue} onChange={handleSliderChange} className="w-full appearance-none outline-none cursor-pointer" />
                    <div className="text-gray-700 text-sm">
                        {priceRange[0]} - {sliderValue}
                    </div>
                </div>
            </div>

            {/* -- Brands -- */}
            <div className="border border-gray-200 rounded-md overflow-hidden shadow-sm">
                <div className="bg-[#f6f7f8] px-2 py-2 border-b border-gray-200">
                    <span className="font-semibold text-gray-700 text-sm">Brands</span>
                </div>
                <div className="p-2 space-y-2">
                    {brands.map((brand) => (
                        <div key={brand._id} className="flex justify-between items-center hover:bg-gray-50 px-2 py-1 rounded">
                            <div className="flex items-center gap-2">
                                <input type="checkbox" id={brand._id} className="h-4 w-4 text-blue-600 cursor-pointer" checked={selectedBrands.includes(brand.slug)} onChange={() => onBrandChange(brand.slug)} />
                                <label htmlFor={brand._id} className="text-xs text-gray-700 cursor-pointer">
                                    {brand.slug}
                                </label>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </aside>
    );
}
