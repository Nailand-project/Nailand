import { useState } from "react";
import OTPInput from "../../../components/otpInput/OTPInput";
import "./confirmAccount.scss";
import { MdOutlineEmail } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { FaRegClock } from "react-icons/fa";

const ConfirmAccount = () => {
  const [otp, setOtp] = useState("");
  const [isVerified, setIsVerified] = useState(true);
  const [confirmed, setConfirmed] = useState(false);

  const navigate = useNavigate();

  const handleResend = async (e) => {
    e.preventDefault();

    if (!otp || otp.length < 6) {
      alert("OTP of 6 digits is required!");
    }
  };

  const handleConfirm = async () => {
    setConfirmed((prev) => !prev);
  };
  const handleContinue = async () => {
    navigate("/auth/interest-tags");
  };

  return (
    <div className="confirm-account">
      {confirmed ? (
        <div className="completed">
          <img src="/robot-logo.png" alt="" />
          <div className="texts">
            <h3>Account confirmed</h3>
            <p>Your account has been successfully confirmed</p>
          </div>
          <button onClick={handleContinue} className="completed-btn">
            Continue
          </button>
        </div>
      ) : (
        <div className="confirm-container">
          <h2 className="title">Confirm account</h2>
          <div className="wrapper101">
            <div className="code-container">
              <MdOutlineEmail className="email-icon" />
              <h5>We sent you a code</h5>
              <p>
                Enter the code we just sent to <br />
                johnonline201@gmail.com
              </p>
              <form>
                <OTPInput
                  isVerified={false}
                  value={otp}
                  onChange={(val) => {
                    setOtp(val);
                  }}
                />
                <div className="count-down">
                  {isVerified && (
                    <span className="account-verified">
                      Verification successfull
                    </span>
                  )}
                  <div className="clock">
                    <FaRegClock />
                    <span className="count">1:29</span>
                  </div>
                </div>
              </form>
            </div>
            {isVerified ? (
              <button onClick={handleConfirm} className="continue-btn">
                Continue
              </button>
            ) : (
              <div className="buttons">
                <button onClick={() => navigate(-1)} className="back-btn">
                  Back
                </button>
                <button onClick={handleResend} className="resend-btn">
                  Resend code
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ConfirmAccount;
