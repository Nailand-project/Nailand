import "./enterCode.scss";
import React, { useRef, useState, useEffect } from "react";
import { useFormik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { MdOutlineEmail } from "react-icons/md";


const EnterCode = () => {

  const navigate = useNavigate();
  const { state } = useLocation();
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
          navigate("/reset-password", { state: { email } });
        } else {
          alert("Invalid code");
        }
      } catch (err) {
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
        {formik.values.code.map((digit, index) => (
          <input
            key={index}
            type="text"
            maxLength="1"
            ref={inputsRef[index]}
            value={digit}
            onChange={(e) => handleChange(index, e)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            className="digit-input"
          />
        ))}
      </div>
      <p className="text-right text-light mt-3">
       Resend code in {timeLeft}s
      </p>
      <button type="submit" className="btn mt-5 w-100 reset-btn">
        Continue to reset password
      </button>
      </form>
     </div>  
    </div>
   )
}

export default EnterCode;