import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Slider from "react-slick";
import useReviewsData from "../../hooks/useReviewsData";
import { renderStars } from "../../utils/renderStars";
import Loader from "../../layouts/Loader";
import { useParams } from "react-router-dom";

import "./details.css";
import { Alert } from "@mui/material";
import ChatIcon from "../../components/ChatIcon/ChatIcon";
import SingleProduct from "../SingleProduct/SingleProduct";

const ProductDetails = () => {
  const { id } = useParams();
  const reviewsData = useReviewsData(id);

  useEffect(() => {
    if (id) {
      reviewsData.fetchReviews(id);
    }
  }, [id, reviewsData.fetchReviews]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const [hoverRating, setHoverRating] = useState(0);
  const [editingReview, setEditingReview] = useState(null);

  const formik = useFormik({
    initialValues: { rating: 0, review: "" },
    validationSchema: Yup.object({
      rating: Yup.number().min(1, "Please give a rating").required("Required"),
      review: Yup.string().required("Review cannot be empty"),
    }),
    onSubmit: async (values, { resetForm }) => {
      if (editingReview) {
        await reviewsData.updateReview(editingReview._id, values, id);
        setEditingReview(null);
      } else {
        await reviewsData.addReview({ ...values, id });
      }
      resetForm();
    },
  });

  const handleEdit = (review) => {
    if (!review?._id) {
      console.error("Review ID is undefined");
      return;
    }

    setEditingReview(review);
    formik.setValues({
      rating: review.reviewRate,
      review: review.reviewComment,
    });
  };

  const sliderSettings = {
    className: "slider",
    infinite: reviewsData.reviews && reviewsData.reviews.length > 4,
    slidesToShow: 4,
    slidesToScroll: 1,
    speed: 500,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(
            3,
            reviewsData.reviews ? reviewsData.reviews.length : 3
          ),
          slidesToScroll: Math.min(
            3,
            reviewsData.reviews ? reviewsData.reviews.length : 3
          ),
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: Math.min(
            2,
            reviewsData.reviews ? reviewsData.reviews.length : 2
          ),
          slidesToScroll: Math.min(
            2,
            reviewsData.reviews ? reviewsData.reviews.length : 2
          ),
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

  return (
    <React.Fragment>
      <ChatIcon />
      <div className="p-4">
        {reviewsData.loading && <Loader />}
        {reviewsData.error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {reviewsData.error}
          </Alert>
        )}

        <SingleProduct />

        {/* Reviews List with Slider */}
        {reviewsData.reviews && reviewsData.reviews.length > 0 ? (
          <div className="w-full slider-container">
            <Slider {...sliderSettings}>
              {reviewsData.reviews.map((r) => (
                <div key={r._id} className="px-2 inline-block align-top">
                  <div className="bg-white shadow-md rounded p-6 text-left max-w-md">
                    {" "}
                    {/* تغيير من max-w-xs إلى max-w-md */}
                    <div className="space-x-2 mb-3 flex justify-start">
                      {renderStars(r.reviewRate)}
                    </div>
                    <p className="text-gray-700 text-[17px] my-3">
                      {r.reviewComment}
                    </p>
                    <div className="flex justify-between items-center mt-4 space-x-4">
                      <button
                        onClick={() => handleEdit(r)}
                        className="text-gray-100 bg-[#1f2937] py-2 px-4 rounded text-sm font-semibold search"
                      >
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => reviewsData.deleteReview(r._id)}
                        className="px-4 py-2 bg-[#f04706] text-white font-medium rounded proceed"
                      >
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        ) : (
          <div className="w-full my-6 bg-white rounded-xl mx-4 p-6 text-left">
            <p className="text-gray-700 italic text-2xl font-semibold text-decoration-underline">
              No reviews available
            </p>
          </div>
        )}

        {/* Review Form */}
        <form
          onSubmit={formik.handleSubmit}
          className="bg-gray-100 p-4 rounded-lg w-[500px] mt-6 flex justify-center flex-col"
        >
          <div className="mb-4">
            <label className="block font-semibold">Your Rating</label>
            <div className="flex space-x-2 mt-2">
              {renderStars(
                hoverRating || formik.values.rating,
                setHoverRating,
                (value) => formik.setFieldValue("rating", value)
              )}
            </div>
            {formik.errors.rating && (
              <p className="text-red-500 text-sm">{formik.errors.rating}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block font-semibold">Your Review</label>
            <textarea
              name="review"
              className="w-full p-2 border rounded mt-2"
              rows="4"
              value={formik.values.review}
              onChange={formik.handleChange}
            />
            {formik.errors.review && (
              <p className="text-red-500 text-sm">{formik.errors.review}</p>
            )}
          </div>

          <button
            type="submit"
            className="bg-black text-white px-4 py-2 rounded"
          >
            {editingReview ? "Update Review" : "Submit Review"}
          </button>
        </form>
      </div>
    </React.Fragment>
  );
};

export default ProductDetails;
