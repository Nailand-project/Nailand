import React from "react";
import "./login.scss";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios"
import * as Yup from "yup";
import { FcGoogle } from "react-icons/fc";
import { useEffect, useState } from "react";
import { FaApple, FaEye, FaEyeSlash } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const Login = () => {

  const [showPassword, setShowPassword] = useState(false)

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("Email is required"),
      password: Yup.string()
        .required("Password is required"),
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        const res = await axios.post("http://localhost:5000/api/login", values);
        const { token } = res.data;
    
        localStorage.setItem("token", token);
        toast.success("Login successful!", {
          position: "top-center",
          autoClose: 3000,
        });
        navigate("/home"); 
      } catch (err) {
        if (err.response?.data?.message) {
          setErrors({ password: err.response.data.message });
        } else {
          toast.error("Sorry, you've input wrong email or password", {
            // position: "top-center",
            autoClose: 3000,
            // hideProgressBar: true,
            // closeOnClick: true,
            // pauseOnHover: true,
            // draggable: true,
          });
        }
      } finally {
        setSubmitting(false);
      }
    },
  });

  
  return (
    <div className="login">
      <div className="container">
        <div className="row">
          <div className="text-center col-md-6 login-left">
            <img src="/robot-logo.png" className="img-fluid" />
            <div>
              <p>
                We’re glad you’re back! Log in to your account to pick up where
                you left off
              </p>
            </div>
          </div>
          <div className="col-md-6 login-right">
            <div className="wrapper">
              <h2>Log In</h2>
              <div className="d-flex justify-content-center my-2">
              <a
                href="http://localhost:5000/auth/google"
                className="w-100 btn btn-light google-apple-btn d-flex align-items-center justify-content-center"
              >
                <FcGoogle className="icon me-2" />
                Continue with Google
              </a>
              </div>

              <div className="d-flex justify-content-center my-2">
              <a
                href="http://localhost:5000/auth/apple"
                className="w-100 btn btn-light google-apple-btn d-flex align-items-center justify-content-center"
              >
                <FaApple className="icon me-2" />
                Continue with Apple
              </a>
              </div>

              <div className="d-flex align-items-center my-3">
                <div className="flex-grow-1 border-bottom"></div>
                <span className="mx-2 text-light">or</span>
                <div className="flex-grow-1 border-bottom"></div>
              </div>

              <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={true}
                newestOnTop={false}
                // closeOnClick
                // rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                className="custom-toast-container"
                toastClassName="custom-toast"
              />
              <form className="" onSubmit={formik.handleSubmit}>
                <dt className="label text-light">Enter Email</dt>
                <dd className="login-input">
                  <input
                    type="email"
                    name="email"
                    className={`form-control ${
                      formik.touched.email && formik.errors.email
                        ? "is-invalid"
                        : ""
                    }`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                  />
                </dd>
                <dd>
                  {formik.touched.email && formik.errors.email ? (
                    <div className="invalid-feedback">
                      {formik.errors.email}
                    </div>
                  ) : null}
                </dd>
                <dd className="text-danger error-msg">
                  <span>{formik.errors.email}</span>
                </dd>

                <dt className="label text-light">Enter Password</dt>
                <dd className="login-input password-input">
                  <input
                    type={showPassword ? "text": "password"}
                    name="password"
                    className={`form-control ${
                      formik.touched.password && formik.errors.password
                        ? "is-invalid"
                        : ""
                    }`}
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
                <dd>
                  {formik.touched.password && formik.errors.password ? (
                    <div className="invalid-feedback">
                      {formik.errors.password}
                    </div>
                  ) : null}
                </dd>
                <dd className="text-danger error-msg">
                  <span>{formik.errors.password}</span>
                </dd>
                <div className="remember-forgot">
                  <label className="remember-box">
                    <input className="" type="checkbox" />
                    Remember my password
                  </label>
                  <Link to={"/auth/forgot-password"}>Forgot password?</Link>
                </div>
                <button type="submit" className=" w-100 login-btn">
                  Log In
                </button>
                <div className="signup-link">
                  <p>
                    Don't have an account? <Link className="a" to={"/auth/register"}>Signup</Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
