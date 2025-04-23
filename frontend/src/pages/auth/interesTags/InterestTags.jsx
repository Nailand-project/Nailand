import { useState } from "react";
import { interestTags } from "../../../mockData";
import "./interestTags.scss";
import { useNavigate } from "react-router-dom";

const InterestTags = () => {
  const [selected, setSelected] = useState([]);
  const navigate = useNavigate();

  const handleSelect = (tag, category) => {
    const isSelected = selected.find((item) => item.tag === tag);

    if (isSelected) {
      setSelected(selected.filter((item) => item.tag !== tag));
    } else {
      const selectedCategories = [
        ...new Set(selected.map((item) => item.category)),
      ];
      const newCategorySet = new Set([...selectedCategories, category]);

      if (selected.length >= 5) {
        alert("You can select a maximum of 5 tags.");
        return;
      }

      if (newCategorySet.size > 3) {
        alert("You can select tags from a maximum of 3 categories.");
        return;
      }

      setSelected([...selected, { tag, category }]);
    }
  };

  const isChecked = (tag) => {
    return selected.some((item) => item.tag === tag);
  };

  const handleContinue = () => {
    if (selected.length < 3) {
      alert("Please select at least 3 tags before continuing.");
      return;
    }

    // navigate to next step
    navigate("/auth/setup-profile");
  };

  return (
    <div className="interest-tags">
      <div className="itags-top">
        <h2>Interest Tag</h2>
        <p>
          Select at least 3 and a maximum of 5 tags from up to 3 different
          interest categories. This helps us personalize your experience.
        </p>
      </div>

      <div className="itags-bottom">
        <ul>
          {interestTags?.map((interestTag, catIndex) => (
            <li key={catIndex}>
              <span className="cat-name">{interestTag.category}</span>
              <div className="tags">
                {interestTag.tags.map((tag) => (
                  <div className="tag-container" key={tag.id}>
                    <input
                      type="checkbox"
                      checked={isChecked(tag.tag)}
                      onChange={() =>
                        handleSelect(tag.tag, interestTag.category)
                      }
                    />
                    <span className="tag">{tag.tag}</span>
                  </div>
                ))}
              </div>
            </li>
          ))}
        </ul>

        <button onClick={handleContinue}>Continue to set up profile</button>
      </div>
    </div>
  );
};

export default InterestTags;
