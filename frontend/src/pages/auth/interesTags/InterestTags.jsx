import { useState } from "react";
import { tags } from "../../../mockData";
import "./interestTags.scss";
import { useNavigate } from "react-router-dom";

const InterestTags = () => {
  const [selected, setSelected] = useState([]);

  const navigate = useNavigate();

  console.log(selected);

  const handleSelected = (tag) => {
    selected.includes(tag)
      ? setSelected(selected.filter((item) => item !== tag))
      : setSelected([...selected, tag]);
  };

  return (
    <div className="interest-tags">
      <div className="itags-top">
        <h2>Interest Tag</h2>
        <p>
          Select at least 3 tags which is of interest to you as that will help
          us to recommend content of your choice
        </p>
        <p className="customize">
          Customize your tag here if what you are looking for is not found
        </p>
      </div>
      <div className="itags-bottom">
        <ul>
          {tags.map((tag) => (
            <li
              className={selected.includes(tag) && "selected"}
              onClick={() => handleSelected(tag)}
              key={tag.id}
            >
              #{tag.name}
            </li>
          ))}
        </ul>
        <button onClick={() => navigate("/auth/setup-profile")}>
          Continue to set up profile
        </button>
      </div>
    </div>
  );
};

export default InterestTags;
