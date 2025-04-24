import "./PasswordChanged.scss"
import React from "react";
import { useNavigate } from "react-router-dom";


const PasswordChanged = () => {
   const navigate = useNavigate();
   
   const handleContinue = async () => {
      navigate("/auth/login");
   };

   return (
      <div className="password-changed">
         <div className="wrapper">
          <div className="content mt-5">
            <img src="/robot-logo.png"
            className="img-fluid"/>
            <h2 className="text-center text">Password Changed</h2>
            <p className="text-center text">Your password has been changed sucessfully</p>
            <button onClick={handleContinue} className="btn">Back to log in</button>
          </div>
         </div>
      </div>
   )
};

export default PasswordChanged;