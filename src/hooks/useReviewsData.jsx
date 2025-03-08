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

import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const baseUrl = "http://localhost:3000/review";

const useReviewsData = (productId) => {
  const { token } = useContext(AuthContext);
  const headers = { accesstoken: `accesstoken_${token}` };
  
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (productId) {
      fetchReviews(productId);
    }
  }, [productId]);

  const fetchReviews = async (productId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${baseUrl}/${productId}`);
      setReviews(response.data.reviews);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to fetch reviews");
    } finally {
      setLoading(false);
    }
  };

  const addReview = async (reviewData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${baseUrl}`, reviewData, { headers });
      setReviews((prevReviews) => [...prevReviews, response.data.review]);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to add review");
    } finally {
      setLoading(false);
    }
  };

  const updateReview = async (reviewId, updatedData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.put(`${baseUrl}/${reviewId}`, updatedData, { headers });
      setReviews((prevReviews) =>
        prevReviews.map((review) => (review._id === reviewId ? response.data.review : review))
      );
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
      setReviews((prevReviews) => prevReviews.filter((review) => review._id !== reviewId));
    } catch (error) {
      setError(error.response?.data?.message || "Failed to delete review");
    } finally {
      setLoading(false);
    }
  };

  return { reviews, loading, error, fetchReviews, addReview, updateReview, deleteReview };
};

export default useReviewsData;
