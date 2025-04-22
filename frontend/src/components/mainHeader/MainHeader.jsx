import "./mainHeader.scss";
import { MdOutlineStorefront } from "react-icons/md";
import { Link } from "react-router-dom";

const MainHeader = () => {
  return (
    <div className="main-header">
      <div className="header-wrapper">
        <div className="ph-left">
          <Link to="/" className="logo">
            Nailand
          </Link>
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
            <Link to="/profile">
              <img src="/person-logo.png" alt="" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainHeader;
