import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";

const API_URL = "http://localhost:3000/wishList";

const useWishList = () => {
  const { token } = useContext(AuthContext);
  const [wishlist, setWishlist] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const headers = {
    "Content-Type": "application/json",
    accesstoken: `accesstoken_${token}`,
  };
  const fetchWishlist = async () => {
    try {
      const response = await fetch(API_URL, { headers });
      if (!response.ok) {
        throw new Error("Failed to fetch wishlist");
      }
      const data = await response.json();
      setWishlist(
        data?.wishlist?.products?.map((item) => item.productId) || []
      );
    } catch (err) {
      console.error("Error fetching wishlist:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, [token]);

  const addToWishlist = async (product) => {
    if (!product || !product.id) {
      console.error("Invalid product data:", product);
      return;
    }
  
    if (wishlist.some((item) => item.productId === product.id)) {
      Swal.fire({
        position: "top-center",
        icon: "warning",
        title: "This product is already added to your wishlist!",
        showConfirmButton: false,
        timer: 2500
      });
      return;
    }
    
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers,
        body: JSON.stringify({ productId: product.id }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        if (errorData.message === "Product already in wishlist") {
          Swal.fire({
            position: "top-end",
            icon: "warning",
            title: "This product is already added to your wishlist!",
            showConfirmButton: false,
            timer: 2500
          });
          return;
        }
          throw new Error("Failed to add product to wishlist");
      }
  
      const data = await response.json();
      setWishlist((prev) => [...prev, { productId: product.id }]);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "The product has been successfully added to your wishlist!",
        showConfirmButton: false,
        timer: 2500
      });
    } catch (err) {
      console.error("Error adding to wishlist:", err);
    }
  };
  

  const removeFromWishlist = async (productId) => {
    try {
      const response = await fetch(`${API_URL}/${productId}`, {
        method: "DELETE",
        headers,
      });

      if (!response.ok) {
        throw new Error("Failed to remove product from wishlist");
      }

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "The product has been successfully deleted",
        showConfirmButton: false,
        timer: 2000
      });

      fetchWishlist();
    } catch (err) {
      console.error("Error removing from wishlist:", err);
    }
  };

  return { wishlist, isLoading, addToWishlist, removeFromWishlist };
};

export default useWishList;
