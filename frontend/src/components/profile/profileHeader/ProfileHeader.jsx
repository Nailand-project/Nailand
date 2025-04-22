import "./profileHeader.scss";
import { MdOutlineStorefront } from "react-icons/md";

const ProfileHeader = () => {
  return (
    <div className="profile-header">
      <div className="wrapper">
        <div className="ph-left">
          <span className="logo">Nailand</span>
          <div className="scan-btn">
            <img src="/scan-logo.png" alt="" />
            <span>Scan chat to search people or communities</span>
          </div>
        </div>
        <div className="ph-right">
          <div className="icons">
            <img src="/home-logo.png" alt="" />
            <img src="/people-logo.png" alt="" />
            <MdOutlineStorefront className="store-icon" />
          </div>
          <div className="user">
            <img src="/email-logo.png" alt="" />
            <img src="/person-logo.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
