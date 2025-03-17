import { Link } from "react-router-dom";
import Rating from "./Rating";

export default function ProductGrid({ products }) {
    return (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((prd) => (
                <div key={prd._id} className="border rounded-md shadow-sm group relative overflow-hidden transition-all hover:shadow-lg">
                    <Link to={`/product/${prd._id}`}>
                        <div className="relative">
                            <img src={prd.images[0]?.secure_url} alt={prd.title} className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105" />
                        </div>
                    </Link>
                    <div className="p-3 space-y-2">
                        <Link to={`/product/${prd._id}`}>
                            <span className="text-[9px] text-gray-500 uppercase tracking-wide">{prd.title}</span>
                        </Link>
                        <p className="text-sm font-medium text-blue-600 leading-tight truncate">{prd.description}</p>
                        <Rating />
                        <div className="flex items-center space-x-1">
                            <span className="text-orange-600 font-bold text-xs">${prd.finalPrice}</span>
                            <span className="text-[9px] text-gray-400 line-through">${prd.basePrice + 10}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
