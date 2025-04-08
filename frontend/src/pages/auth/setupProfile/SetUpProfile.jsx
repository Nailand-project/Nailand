import "./setUpProfile.scss";
import { SlPicture } from "react-icons/sl";
import { MdOutlineCameraAlt } from "react-icons/md";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SetUpProfile = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [created, setCreated] = useState(false);
  const [inputs, setInputs] = useState({
    fullNameL: "",
    userName: "",
    gender: "",
    email: "",
    country: "",
    address: "",
    phone: "",
    bio: "",
  });

  const navigate = useNavigate();

  const { fullNameL, userName, gender, email, country, address, phone, bio } =
    inputs;

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  console.log(inputs);

  const handleContinue = async () => {
    navigate("/");
  };

  return (
    <div className="setup-profile">
      {created ? (
        <div className="completed">
          <img src="/robot-logo.png" alt="" />
          <div className="texts">
            <h3>Welcome to Nailand</h3>
            <p>Your account has been successfully created</p>
          </div>
          <button onClick={handleContinue} className="completed-btn">
            Continue
          </button>
        </div>
      ) : (
        <>
          <h2>Set up profile</h2>
          <form>
            <div className="input-container">
              <label>Full name</label>
              <input
                type="text"
                name="fullName"
                value={fullNameL}
                onChange={handleChange}
              />
            </div>
            <div className="input-container">
              <label>User name</label>
              <input
                type="text"
                name="userName"
                value={userName}
                onChange={handleChange}
              />
            </div>
            <div className="input-container">
              <label>Gender</label>
              <select name="gender" value={gender} onChange={handleChange}>
                <option value=""></option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div className="input-container">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={handleChange}
              />
            </div>
            <div className="input-container">
              <label>Country</label>
              <select name="country" value={country} onChange={handleChange}>
                <option value=""></option>
                <option value="nigeria">Nigeria</option>
                <option value="southAfrica">South Africa</option>
                <option value="ghana">Ghana</option>
                <option value="cameroun">Cameroun</option>
                <option value="usa">United States</option>
              </select>
            </div>
            <div className="input-container">
              <label>Address</label>
              <input
                type="text"
                name="address"
                value={address}
                onChange={handleChange}
              />
            </div>
            <div className="input-container">
              <label>Phone</label>
              <input
                type="text"
                name="phone"
                value={phone}
                onChange={handleChange}
              />
            </div>
            <div className="input-container">
              <label>Bio</label>
              <textarea
                name="bio"
                value={bio}
                rows={5}
                cols={10}
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="camera-container">
              <span>Profile picture</span>
              <div className="buttons">
                {profilePic ? (
                  <img
                    className="temp-image"
                    src={URL.createObjectURL(profilePic)}
                    alt=""
                  />
                ) : (
                  <div className="btn">
                    <SlPicture />
                    <label htmlFor="file2" id="file">
                      Upload from file
                    </label>
                    <input
                      style={{ display: "none" }}
                      type="file"
                      id="file2"
                      onChange={(e) => setProfilePic(e.target.files[0])}
                    />
                  </div>
                )}

                <div className="btn">
                  <MdOutlineCameraAlt />
                  <span>Take a photo</span>
                </div>
              </div>
            </div>
            <button onClick={() => setCreated((prev) => !prev)}>
              Continue
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default SetUpProfile;
