import React, { useState, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { create_member } from "@/utils/create_member";

const MyForm = (props) => {
  const [selectedType, setSelectedType] = useState(
    props.form_type ? props.form_type : ""
  );
  const [hydrated, setHydrated] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  const initialValues = {
    type: props.form_type ? props.form_type : "",
    name: "",
    email: "",
    designation: "",
    ctc: "",
    upi: "",
  };

  const validationSchema = Yup.object({
    type: Yup.string().required("Type is required"),
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    designation: Yup.string().when("type", {
      is: "employees",
      then: () => Yup.string().required("Designation is required"),
    }),
    ctc: Yup.number().when("type", {
      is: "employees",
      then: () =>
        Yup.number()
          .required("CTC is required")
          .positive("CTC must be positive"),
    }),
    upi: Yup.string().when("type", {
      is: "vendors",
      then: () =>
        Yup.string()
          .required("UPI ID is required")
          .matches(/^[\w.-]+@[\w.-]+$/, "Invalid UPI ID"),
    }),
  });

  const onSubmit = async (values) => {
    // console.log("Form data", values);
    try {
      const create = await create_member(values.type, values);
      if (create) {
        setShowPopup(true);
      }
    } catch (err) {
      throw err;
    }
  };

  const handlePopupClose = () => {
    setShowPopup(false);
    window.location.reload(); // Refresh the page
  };

  if (!hydrated) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center">
          {props.form_type ? props.form_type : "Add Member"}
        </h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting, setFieldValue, values }) => (
            <Form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <div className="mb-4">
                <label
                  htmlFor="type"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Type
                </label>
                <Field
                  name="type"
                  as="select"
                  disabled={!!props.form_type}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  onChange={(e) => {
                    setFieldValue(
                      "type",
                      props.form_type ? props.form_type : e.target.value
                    );
                    setSelectedType(
                      props.form_type ? props.form_type : e.target.value
                    );
                  }}
                  value={values.type}
                >
                  {props.form_type ? (
                    <option value={props.form_type}>{props.form_type}</option>
                  ) : (
                    <>
                      <option value="">Select type</option>
                      <option value="vendors">vendors</option>
                      <option value="employees">employees</option>
                    </>
                  )}
                  {/* {!props.form_type && (
                    <>
                      <option value="">Select type</option>
                      <option value="vendors">vendors</option>
                      <option value="employees">employees</option>
                    </>
                  )} */}
                </Field>
                <ErrorMessage
                  name="type"
                  component="div"
                  className="text-red-500 text-xs italic"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Name
                </label>
                <Field
                  name="name"
                  type="text"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-xs italic"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Email
                </label>
                <Field
                  name="email"
                  type="email"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-xs italic"
                />
              </div>

              {selectedType === "employees" && (
                <>
                  <div className="mb-4">
                    <label
                      htmlFor="designation"
                      className="block text-gray-700 text-sm font-bold mb-2"
                    >
                      Designation
                    </label>
                    <Field
                      name="designation"
                      type="text"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    <ErrorMessage
                      name="designation"
                      component="div"
                      className="text-red-500 text-xs italic"
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="ctc"
                      className="block text-gray-700 text-sm font-bold mb-2"
                    >
                      CTC
                    </label>
                    <Field
                      name="ctc"
                      type="number"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    <ErrorMessage
                      name="ctc"
                      component="div"
                      className="text-red-500 text-xs italic"
                    />
                  </div>
                </>
              )}

              {selectedType === "vendors" && (
                <div className="mb-4">
                  <label
                    htmlFor="upi"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    UPI
                  </label>
                  <Field
                    name="upi"
                    type="text"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                  <ErrorMessage
                    name="upi"
                    component="div"
                    className="text-red-500 text-xs italic"
                  />
                </div>
              )}

              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  disabled={isSubmitting}
                >
                  Submit
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-70">
          <div className="bg-black p-4 rounded shadow-lg">
            <p>Added successfully!</p>
            <button
              onClick={handlePopupClose}
              className="mt-4 px-4 py-2 bg-green-800 text-white rounded"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyForm;
