// import React, { useEffect, useState } from "react";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import useReviewsData from "../../hooks/useReviewsData";
// import { renderStars } from "../../utils/renderStars";
// import Loader from "../../layouts/Loader";
// import { useParams } from "react-router-dom";

// const ProductDetails = () => {
//   const {
//     reviews,
//     fetchReviews,
//     addReview,
//     updateReview,
//     deleteReview,
//     loading,
//     error,
//   } = useReviewsData();

//   const { productId } = useParams();

//   useEffect(() => {
//     if (productId) {
//       fetchReviews(productId);
//     }
//   }, [fetchReviews, productId]);

//   const [hoverRating, setHoverRating] = useState(0);
//   const [editingReview, setEditingReview] = useState(null);

//   const formik = useFormik({
//     initialValues: { rating: 0, review: "" },
//     validationSchema: Yup.object({
//       rating: Yup.number().min(1, "Please give a rating").required("Required"),
//       review: Yup.string().required("Review cannot be empty"),
//     }),
//     onSubmit: async (values, { resetForm }) => {
//       if (editingReview) {
//         await updateReview(editingReview._id, values);
//         setEditingReview(null);
//       } else {
//         await addReview({ ...values, productId: productId || "test-product" });
//       }
//       resetForm();
//     },
//   });

//   const handleEdit = (review) => {
//     setEditingReview(review);
//     formik.setValues({ rating: review.rating, review: review.review });
//   };

//   return (
//     <React.Fragment>
//       <div className="max-w-2xl mx-auto p-4">
//         {loading && <Loader />}

//         {error && <p className="text-red-500 text-center">{error}</p>}

//         {/* Reviews List */}
//         {!loading && !error && (
//           <div className="mb-6">
//             {reviews.length > 0 ? (
//               reviews.map((r) => (
//                 <div
//                   key={r._id}
//                   className="border-b pb-2 mb-2 flex justify-between"
//                 >
//                   <div>
//                     <div className="flex">{renderStars(r.rating)}</div>
//                     <p className="text-gray-700">{r.review}</p>
//                   </div>
//                   <div className="flex gap-2">
//                     <button
//                       onClick={() => handleEdit(r)}
//                       className="text-blue-500"
//                     >
//                       Edit
//                     </button>
//                     <button
//                       onClick={() => deleteReview(r._id)}
//                       className="text-red-500"
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <p className="text-gray-500">There are no reviews yet.</p>
//             )}
//           </div>
//         )}

//         {/* Review Form */}
//         <form
//           onSubmit={formik.handleSubmit}
//           className="bg-gray-100 p-4 rounded-lg"
//         >
//           <div className="mb-4">
//             <label className="block font-semibold">Your Rating</label>
//             <div className="flex space-x-2 mt-2">
//               {renderStars(
//                 hoverRating || formik.values.rating,
//                 setHoverRating,
//                 (value) => formik.setFieldValue("rating", value)
//               )}
//             </div>
//             {formik.errors.rating && (
//               <p className="text-red-500 text-sm">{formik.errors.rating}</p>
//             )}
//           </div>

//           <div className="mb-4">
//             <label className="block font-semibold">Your Review</label>
//             <textarea
//               name="review"
//               className="w-full p-2 border rounded mt-2"
//               rows="4"
//               value={formik.values.review}
//               onChange={formik.handleChange}
//             />
//             {formik.errors.review && (
//               <p className="text-red-500 text-sm">{formik.errors.review}</p>
//             )}
//           </div>

//           <button
//             type="submit"
//             className="bg-black text-white px-4 py-2 rounded"
//           >
//             {editingReview ? "Update Review" : "Submit Review"}
//           </button>
//         </form>
//       </div>
//     </React.Fragment>
//   );
// };

// export default ProductDetails;

import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import useReviewsData from "../../hooks/useReviewsData";
import { renderStars } from "../../utils/renderStars";
import Loader from "../../layouts/Loader";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const reviewsData = useReviewsData();
  const { productId } = useParams();

  useEffect(() => {
    if (productId) {
      reviewsData.fetchReviews(productId);
    }
  }, [reviewsData, productId]);

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
        await reviewsData.updateReview(editingReview._id, values);
        setEditingReview(null);
      } else {
        await reviewsData.addReview({ ...values, productId: productId || "test-product" });
      }
      resetForm();
    },
  });

  const handleEdit = (review) => {
    setEditingReview(review);
    formik.setValues({ rating: review.rating, review: review.review });
  };

  return (
    <React.Fragment>
      <div className="max-w-2xl mx-auto p-4">
        {reviewsData.loading && <Loader />}
        {reviewsData.error && <p className="text-red-500 text-center">{reviewsData.error}</p>}

        {/* Reviews List */}
        {!reviewsData.loading && !reviewsData.error && (
          <div className="mb-6">
            {reviewsData.reviews.length > 0 ? (
              reviewsData.reviews.map((r) => (
                <div
                  key={r._id}
                  className="border-b pb-2 mb-2 flex justify-between"
                >
                  <div>
                    <div className="flex">{renderStars(r.rating)}</div>
                    <p className="text-gray-700">{r.review}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(r)}
                      className="text-blue-500"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => reviewsData.deleteReview(r._id)}
                      className="text-red-500"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">There are no reviews yet.</p>
            )}
          </div>
        )}

        {/* Review Form */}
        <form
          onSubmit={formik.handleSubmit}
          className="bg-gray-100 p-4 rounded-lg"
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
