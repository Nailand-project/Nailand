import "./resetPassword.scss";
import React, { useState } from "react";
import { useFormik } from "formik";
import { useParams, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify"

const ResetPassword = () => {
  const navigate= useNavigate()

  const [showPassword, setShowPassword] = useState(false)
  const { resetToken } = useParams();
  const [isPasswordChanged, setIsPasswordChanged] = useState(false);

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm your password"),
    }),
    onSubmit: async (values, {setSubmitting}) => {
      try {
        const response = await axios.post(
          `http://localhost:5000/api/reset-password/${resetToken}`,
          {
            password: values.password,
          }
        );

        toast.success("Password has been reset!", {
          position: "top-center",
          autoClose: 3000,
        });

        setIsPasswordChanged(true);
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Failed to reset password",
          {
            position: "top-center",
            autoClose: 3000,
          }
        );
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleContinue = async () => {
    navigate("/auth/login");
  };

  return (
    <div className="reset-password">
      {isPasswordChanged ?(
        <div className="content">
        <img src="/robot-logo.png"
        className="img-fluid"/>
        <h2 className="text-center">Password Changed</h2>
        <p className="text-center">Your password has been changed sucessfully</p>
        <button onClick={handleContinue} className="btn">Back to log in</button>
     </div>
      ):(
        <div className="wrapper">
       <h2>Reset Password</h2>
       <p>Please type something you'll remember</p>
     <form onSubmit={formik.handleSubmit}>
     <dt className="label text-light">Enter password</dt>
     <dd className="password-input">
     <input
       type={showPassword ? "text": "password"}
       name="password"
       onChange={formik.handleChange}
       onBlur={formik.handleBlur}
       value={formik.values.password}
     />
     <span
       onClick={() => setShowPassword(!showPassword)}
       className="password-toggle-icon eye-icon"
         style={{
           position: "absolute",
           right: "15px",
           top: "50%",
           transform: "translateY(-50%)",
           cursor: "pointer",
           color: "#888"
         }}
     >
       {showPassword ? <FaEyeSlash /> : <FaEye />}
     </span>
     </dd>
     
     {formik.touched.password && formik.errors.password && (
       <div className="text-danger error-msg">
         <span>{formik.errors.password}</span>
       </div>
     )}
     <div>
       <span className="val-text">Use 8-10 characters</span>
     </div>
     <span className="val-text">
     Atleast one number and any numerical like (@#$*_)
     </span>

     <dt className="label text-light">Re-enter password</dt>
     <dd className="password-input">
      <input
       type={showPassword ? "text": "password"}
       name="confirmPassword"
       onChange={formik.handleChange}
       onBlur={formik.handleBlur}
       value={formik.values.confirmPassword}
      />
      <span
       onClick={() => setShowPassword(!showPassword)}
       className="password-toggle-icon eye-icon"
         style={{
           position: "absolute",
           right: "15px",
           top: "50%",
           transform: "translateY(-50%)",
           cursor: "pointer",
           color: "#888"
         }}
     >
       {showPassword ? <FaEyeSlash /> : <FaEye />}
     </span>
     </dd>
     
     {formik.touched.confirmPassword && formik.errors.confirmPassword && (
       <div className="text-danger">
         <span>{formik.errors.confirmPassword}</span>
       </div>
     )}
     
     

     <button className="btn reset-password-btn w-100" type="submit">Reset Password</button>
   </form>
     </div>
      )}
   </div>
  )
};

export default ResetPassword;
