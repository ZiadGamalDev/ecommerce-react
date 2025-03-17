export default function Rating() {
    return (
        <div className="flex items-center space-x-0.5 text-yellow-400 text-[9px]">
            <i className="far fa-star"></i>
            <i className="far fa-star"></i>
            <i className="far fa-star"></i>
            <i className="far fa-star"></i>
            <i className="far fa-star"></i>
            <span className="ml-1 text-[9px] text-gray-600">(0)</span>
        </div>
    );
}
