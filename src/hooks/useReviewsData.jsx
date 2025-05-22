import { useState, useContext, useCallback } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";

const baseUrl = `${import.meta.env.VITE_API_URL}review`;

const useReviewsData = (productId) => {
  const { token, user } = useContext(AuthContext);
  const headers = { accesstoken: `accesstoken_${token}` };

  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const fetchReviews = useCallback(async (productId) => {
    setLoading(true);
    try {
      const response = await axios.get(`${baseUrl}/${productId}`, { headers });
      console.log(response.data.reviews);

      setReviews(response.data.reviews);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const addReview = useCallback(
    async (review) => {
      setLoading(true);
      try {
        const headers = { accesstoken: `accesstoken_${token}` };

        const data = {
          productId: review.id,
          reviewRate: review.rating,
          reviewComment: review.review,
        };

        console.log(data);
        

        const response = await axios.post(`${baseUrl}`, data, { headers });
        fetchReviews(review.id);
      } 
      catch (err) {
        const message = err.response?.data?.message || err.message;
        setError(message);
      
        if (message === "You have already reviewed this product") {
          Swal.fire({
            icon: "info",
            title: "You already reviewed this product",
            text: "You can update your existing review instead.",
            confirmButtonText: "OK",
          });
        } else {
          console.error("Error adding review:", message);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: message,
          });
        }
      } finally {
        setLoading(false);
      }
    },
    [fetchReviews, token]
  );

  const updateReview = async (reviewId, updatedData, productId) => {
    setLoading(true);
    setError(null);
    try {
      if (!reviewId) {
        throw new Error("Review ID is undefined");
      }
      if (!updatedData.rating || !updatedData.review) {
        throw new Error("Rating or Review is missing");
      }

      const payload = {
        reviewRate: updatedData.rating,
        reviewComment: updatedData.review,
      };

      const response = await axios.put(`${baseUrl}/${reviewId}`, payload, {
        headers,
      });

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "The Review has been successfully Updated",
        showConfirmButton: false,
        timer: 2000,
      });

      await fetchReviews(productId);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to update review");
    } finally {
      setLoading(false);
    }
  };

  const deleteReview = async (reviewId) => {
    setLoading(true);
    setError(null);
    try {
      await axios.delete(`${baseUrl}/${reviewId}`, { headers });
      setReviews((prevReviews) =>
        prevReviews.filter((review) => review._id !== reviewId)
      );
    } catch (error) {
      setError(error.response?.data?.message || "Failed to delete review");
    } finally {
      setLoading(false);
    }
  };

  return {
    reviews,
    loading,
    error,
    fetchReviews,
    addReview,
    updateReview,
    deleteReview,
  };
};

export default useReviewsData;
