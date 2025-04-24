import "./enterCode.scss";
import React, { useRef, useState, useEffect } from "react";
import { useFormik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { MdOutlineEmail } from "react-icons/md";
import { FaRegClock } from "react-icons/fa";


const EnterCode = () => {

  const navigate = useNavigate();
  const { state } = useLocation();
  const [codeTouched, setCodeTouched] = useState(false);
  const [codeError, setCodeError] = useState("");
  const email = state?.email;

  const inputsRef = Array.from({ length: 6 }, () => useRef());

  const [timeLeft, setTimeLeft] = useState(180);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
    setTimeLeft((prev) => prev - 1);
  }, 1000);

  return () => clearInterval(timer);
}, [timeLeft]);

  const formik = useFormik({
    initialValues: { code: ["", "", "", "", "", ""] },
    validationSchema: Yup.object({
      code: Yup.array().of(Yup.string().matches(/^\d$/, "Must be a digit")),
    }),
    onSubmit: async (values) => {
      const joinedCode = values.code.join("");
      try {
        const response = await fetch("/api/verify-reset-code", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, code: joinedCode }),
        });

        if (response.ok) {
          setCodeError("");
          navigate("/reset-password", { state: { email } });
        } else {
          setCodeError("Invalid code. Please try again.");
          setCodeTouched(true);
        }
      } catch (err) {
        setCodeError("Something went wrong. Please try again.");
        console.error(err);
      }
    },
  });

  const handleChange = (index, e) => {
    const value = e.target.value;
    if (!/^\d?$/.test(value)) return;

    const newCode = [...formik.values.code];
    newCode[index] = value;
    formik.setFieldValue("code", newCode);

    if (value && index < 5) {
      inputsRef[index + 1].current.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !formik.values.code[index] && index > 0) {
      inputsRef[index - 1].current.focus();
    }
  };
   return(
      <div className="wrapper">
         <div className="enter-code mt-5">
         <MdOutlineEmail className="email-icon" />
         <h3>We sent you a code</h3>
         <p>Enter the code we sent to your Email</p>
         <form onSubmit={formik.handleSubmit}>
      <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>

        {formik.values.code.map((digit, index) => {
          const isTouched = codeTouched;
          const hasError = !/^\d$/.test(digit);

          return(
            <input
            key={index}
            type="text"
            maxLength="1"
            ref={inputsRef[index]}
            value={digit}
            onChange={(e) => handleChange(index, e)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            className={`digit-input ${
              // isTouched && hasError ? "invalid" :
              // isTouched && !hasError ? "valid" : ""
              // isTouched
              //   ? hasError
              //     ? "invalid" // ❌ red when not a digit
              //     : "valid"   // ✅ green when digit
              //     : ""
              formik.touched.code && formik.errors.code?.[index]
                ? "is-invalid"
                : formik.touched.code && !formik.errors.code?.[index] && digit
                ? "is-valid"
                : ""
            }`}
          />
          );
         })}
      </div>
      {codeError && (
        <div className="text-danger text-left mt-2">{codeError}</div>
      )}

      {codeTouched && !codeError && formik.values.code.every(val => /^\d$/.test(val)) && (
        <div className="text-success text-center mt-2">verification successful!</div>
      )}
      <div className="d-flex justify-content-end  mt-3">
        <p className="text-light mb-0">
        <FaRegClock />
         {Math.floor(timeLeft / 60)}:
         {String(timeLeft % 60).padStart(2, '0')}
        </p>
      </div>
      <button type="submit" className="btn mt-5 w-100 reset-btn">
        Continue to reset password
      </button>
      </form>
     </div>  
    </div>
   )
}

export default EnterCode;