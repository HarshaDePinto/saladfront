import React, { Fragment, useState } from "react";

const CheckBox = ({ categories, handleFilters }) => {
  const [checked, setChecked] = useState([]);

  const handleToggle = (c) => () => {
    const currentCategoryId = checked.indexOf(c);
    const newCheckedCategoryId = [...checked];
    if (currentCategoryId === -1) {
      newCheckedCategoryId.push(c);
    } else {
      newCheckedCategoryId.splice(currentCategoryId, 1);
    }

    //console.log(newCheckedCategoryId);
    setChecked(newCheckedCategoryId);
    handleFilters(newCheckedCategoryId)
  };
  return categories.map((c, i) => (
    <Fragment key={i}>
      <li className="add-res-tab mx-2" id="stepbtn1">
        <input
          onChange={handleToggle(c._id)}
          className="form-check-input"
          type="checkbox"
          value={checked.indexOf(c._id===-1)}
        />
        <label className="form-check-label h6">{c.title}</label>
      </li>
    </Fragment>
  ));
};

export default CheckBox;
