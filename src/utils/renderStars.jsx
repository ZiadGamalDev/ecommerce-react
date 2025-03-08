export const renderStars = (rating, onHover, onClick) => {
  return Array.from({ length: 5 }, (_, index) => (
    <span
      key={index}
      onMouseEnter={() => onHover && onHover(index + 1)}
      onMouseLeave={() => onHover && onHover(0)}
      onClick={() => onClick && onClick(index + 1)}
      className={`cursor-pointer text-2xl ${
        index < rating ? "text-yellow-500" : "text-gray-300"
      }`}
    >
      ★
    </span>
  ));
};
