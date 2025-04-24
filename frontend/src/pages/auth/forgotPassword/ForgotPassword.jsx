import "./forgotPassword.scss";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await fetch("/api/send-reset-code", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: values.email }),
        });
        if (response.ok) {
          navigate("/auth/enter-code", { state: { email: values.email } });
        } else {
          console.error("Failed to send code");
        }
      } catch (err) {
        console.error(err);
      }
    },
  });

  return (
    <div className="forgot-password">
      <div className="content">
        <h2>Forgot Password</h2>
        <p>Please enter your email to receive a code for password reset</p>
        <form onSubmit={formik.handleSubmit}>
          <div>
            <input
              type="email"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.email && (
              <div>{formik.errors.email}</div>
            )}
          </div>
          <button type="submit">Send code</button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
