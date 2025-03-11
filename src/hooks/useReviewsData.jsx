// import { create } from "zustand";
// import axios from "axios";
// import { useContext } from "react";
// import { AuthContext } from "../context/AuthContext";

// const baseUrl = "http://localhost:3000/review";

// const useReviewsData = () => {
//   const { token } = useContext(AuthContext);
//   const headers = { accesstoken: `accesstoken_${token}` };

//   const useStore = create((set) => ({
//     reviews: [],
//     loading: false,
//     error: null,

//     fetchReviews: async (productId) => {
//       if (!productId) return;

//       set({ loading: true, error: null });
//       try {
//         const response = await axios.get(`${baseUrl}/${productId}`);
//         set({ reviews: response.data.reviews, loading: false });
//       } catch (error) {
//         set({
//           error: error.response?.data?.message || "Failed to fetch reviews",
//           loading: false,
//         });
//       }
//     },

//     addReview: async (reviewData) => {
//       set({ loading: true, error: null });
//       try {
//         const response = await axios.post(`${baseUrl}`, reviewData, {
//           headers,
//         });
//         set((state) => ({
//           reviews: [...state.reviews, response.data.review],
//           loading: false,
//         }));
//       } catch (error) {
//         set({
//           error: error.response?.data?.message || "Failed to add review",
//           loading: false,
//         });
//       }
//     },

//     updateReview: async (reviewId, updatedData) => {
//       set({ loading: true, error: null });
//       try {
//         const response = await axios.put(
//           `${baseUrl}/${reviewId}`,
//           updatedData,
//           { headers }
//         );
//         set((state) => ({
//           reviews: state.reviews.map((review) =>
//             review._id === reviewId ? response.data.review : review
//           ),
//           loading: false,
//         }));
//       } catch (error) {
//         set({
//           error: error.response?.data?.message || "Failed to update review",
//           loading: false,
//         });
//       }
//     },

//     deleteReview: async (reviewId) => {
//       set({ loading: true, error: null });
//       try {
//         await axios.delete(`${baseUrl}/${reviewId}`, { headers });
//         set((state) => ({
//           reviews: state.reviews.filter((review) => review._id !== reviewId),
//           loading: false,
//         }));
//       } catch (error) {
//         set({
//           error: error.response?.data?.message || "Failed to delete review",
//           loading: false,
//         });
//       }
//     },
//   }));

//   return useStore();
// };

// export default useReviewsData;

import { useState, useEffect, useContext, useCallback } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";

const baseUrl = "http://localhost:3000/review";

const useReviewsData = (productId) => {
  const { token } = useContext(AuthContext);
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
          productId: review.productId,
          reviewRate: review.rating,
          reviewComment: review.review,
        };

        const response = await axios.post(`${baseUrl}`, data, { headers });
        fetchReviews(review.productId);
      } catch (err) {
        console.error(
          "Error adding review:",
          err.response?.data || err.message
        );
        setError(err.response?.data?.message || err.message);
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
