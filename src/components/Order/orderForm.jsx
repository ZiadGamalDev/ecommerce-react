import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import useConvertFromCartToOrder from "../../hooks/useConvertFromCartToOrder";
import usePayWithStripe from "../../hooks/usePayWithStripe";
import { useNavigate } from "react-router-dom";

const OrderForm = ({ couponCode }) => {
  const navigate = useNavigate();
  const { convertCartToOrder, loading } = useConvertFromCartToOrder();

  const [orderId, setOrderId] = useState(null);
  const {
    payWithStripe,
    checkOutURL,
    loading: stripeLoading,
  } = usePayWithStripe();

  const initialValues = {
    couponCode: "",
    paymentMethod: "Stripe",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    phoneNumbers: [""],
  };

  const validationSchema = Yup.object({
    couponCode: Yup.string().optional(),
    address: Yup.string().required("Address is required"),
    city: Yup.string().required("City is required"),
    postalCode: Yup.string().required("Postal code is required"),
    country: Yup.string().required("Country is required"),
    phoneNumbers: Yup.array()
      .of(Yup.string().required("Phone number is required"))
      .min(1, "At least one phone number is required"),
  });

  const handleSubmit = async (values) => {
    try {
      const createdOrder = await convertCartToOrder(values);
      if (!createdOrder._id) throw new Error("Order ID not found");

      console.log("Order ID:", createdOrder);
      setOrderId(createdOrder._id);

      if (values.paymentMethod === "Stripe") {
        await payWithStripe(createdOrder._id);
      } else {
        navigate("/thankyou", {
          state: {
            orderDetails: {
              orderId: createdOrder._id,
              shippingAddress: {
                address: values.address,
                city: values.city,
                postalCode: values.postalCode,
                country: values.country,
              },
              phoneNumbers: values.phoneNumbers,
              paymentMethod: values.paymentMethod,
              couponCode: values.couponCode || "N/A",
              totalPrice: createdOrder.totalPrice,
            },
          },
        });
      }
    } catch (error) {
      console.error("Order submission error:", error.message);
    }
  };

  useEffect(() => {
    if (checkOutURL) {
      window.location.href = checkOutURL;
    }
  }, [checkOutURL, navigate]);

  return (
    <div className="max-w-md sm:max-w-lg md:max-w-xl lg:max-w-4xl xl:max-w-6xl 2xl:max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Order Details</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values }) => (
          <Form className="space-y-4">
            {/* Coupon Code */}
            <div>
              <label
                htmlFor="couponCode"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Coupon Code (Optional)
              </label>
              <Field
                type="text"
                id="couponCode"
                name="couponCode"
                value={couponCode}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>

            {/* Payment Method */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Payment Method *
              </label>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <Field
                    type="radio"
                    name="paymentMethod"
                    value="Stripe"
                    className="mr-2"
                  />
                  Stripe
                </label>
                <label className="flex items-center">
                  <Field
                    type="radio"
                    name="paymentMethod"
                    value="Cash"
                    className="mr-2"
                  />
                  Cash
                </label>
              </div>
            </div>

            {/* Address Fields */}
            {["address", "city", "postalCode", "country"].map((field) => (
              <div key={field}>
                <label
                  htmlFor={field}
                  className="block text-sm font-medium text-gray-700 mb-1 capitalize"
                >
                  {field.replace(/([A-Z])/g, " $1")} *
                </label>
                <Field
                  type="text"
                  id={field}
                  name={field}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder={`Enter your ${field}`}
                />
                <ErrorMessage
                  name={field}
                  component="span"
                  className="text-red-500 text-sm"
                />
              </div>
            ))}

            {/* Phone Numbers */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Numbers *
              </label>
              <FieldArray name="phoneNumbers">
                {({ remove, push }) => (
                  <div>
                    {values.phoneNumbers.map((_, index) => (
                      <div key={index} className="flex mb-2">
                        <div className="flex-1">
                          <Field
                            type="tel"
                            name={`phoneNumbers.${index}`}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            placeholder="+201234567890"
                          />
                          <ErrorMessage
                            name={`phoneNumbers.${index}`}
                            component="span"
                            className="text-red-500 text-sm"
                          />
                        </div>
                        {index > 0 && (
                          <button
                            type="button"
                            onClick={() => remove(index)}
                            className="ml-2 px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => push("")}
                      className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 text-sm"
                    >
                      Add Another Phone
                    </button>
                  </div>
                )}
              </FieldArray>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || stripeLoading}
              className={`w-full py-3 ${
                loading || stripeLoading
                  ? "bg-gray-400"
                  : "bg-[#f04706] hover:bg-[#d63e00]"
              } text-white font-medium rounded transition-colors`}
            >
              {loading || stripeLoading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                <span>
                  {values.paymentMethod === "Cash"
                    ? "Complete Order"
                    : "Proceed to checkout"}
                </span>
              )}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default OrderForm;
