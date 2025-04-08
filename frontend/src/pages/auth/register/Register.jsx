import "./register.scss";
import { Link, useNavigate } from "react-router-dom";
import { FaEyeSlash, FaRegEye } from "react-icons/fa";
import { useMemo, useState } from "react";
import { IoIosCheckmark } from "react-icons/io";

const Register = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const minLength = useMemo(() => password.length >= 8, [password]);
  const hasNumber = useMemo(() => /[0-9]/.test(password), [password]);
  const hasSymbol = useMemo(
    () => /[!@#$%^&*(),.?":{}|<>]/.test(password),
    [password]
  );

  const isValid = minLength && hasNumber && hasSymbol;

  const handleCreate = async (e) => {
    e.preventDefault();

    if (!email || !password || !confirmPassword) {
      return alert("Please fill in all fields");
    }

    if (password !== confirmPassword) {
      return alert("Password and confirm password do not match");
    }

    navigate("/auth/confirm-account");
  };

  const handleGoogleAuth = async (e) => {
    e.preventDefault();
  };

  const handleAppleAuth = async (e) => {
    e.preventDefault();
  };

  return (
    <div className="register">
      <div className="reg-left">
        <img src="/reg-logo.png" alt="Reg logo" />
        <p>
          Hello! Create an account to unlock a world of exclusive benefits,
          connect with like-minded individuals, and stay ahead of the learning
          curve
        </p>
      </div>
      <div className="reg-right">
        <form>
          <h2 className="title">Create your account</h2>
          <div className="social-login-container">
            <button onClick={handleGoogleAuth}>
              <img src="/google-logo.png" className="google" />
              <span>Continue with Google</span>
            </button>
            <button onClick={handleAppleAuth}>
              <img src="/apple-logo.png" className="google" />
              <span>Continue with Apple</span>
            </button>
          </div>
          <div className="or-container">
            <div className="line"></div>
            <div className="or">or</div>
            <div className="line"></div>
          </div>
          <div className="input-container">
            <label>Enter email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-container">
            <label>Enter password</label>
            <div className="password-wrapper">
              <input
                type={show ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {show ? (
                <FaRegEye
                  className="eye-icon"
                  onClick={() => setShow((prev) => !prev)}
                />
              ) : (
                <FaEyeSlash
                  className="eye-icon"
                  onClick={() => setShow((prev) => !prev)}
                />
              )}
            </div>
          </div>
          <div className="validations">
            <div className="val-item">
              {minLength && <IoIosCheckmark className="val-icon valid" />}
              <span className="val-text">Use 8-10 characters</span>
            </div>
            <div className="val-item">
              {hasNumber && hasSymbol && (
                <IoIosCheckmark className="val-con valid" />
              )}
              <span className="val-text">
                Atleast one number and any numerical like (@#$*_)
              </span>
            </div>
          </div>
          <div className="input-container">
            <label>Confirm password</label>
            <div className="password-wrapper">
              <input
                type={show ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {show ? (
                <FaRegEye
                  className="eye-icon"
                  onClick={() => setShow((prev) => !prev)}
                />
              ) : (
                <FaEyeSlash
                  className="eye-icon"
                  onClick={() => setShow((prev) => !prev)}
                />
              )}
            </div>
          </div>
          <button onClick={handleCreate}>Create account</button>
          <div className="agree-container">
            <div className="agree">
              <input type="checkbox" />
              <span>I agree to Nailand's terms and condition</span>
            </div>
            <span className="redirect">
              Already have an account? <Link to={"/auth/login"}>Login</Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
