import React, { Fragment, useState } from "react";

const SeTFlavors = ({ flavors, handleFilters }) => {
  const [checked, setChecked] = useState([]);

  const handleToggle = (f) => () => {
    const currentFlavors = checked.indexOf(f);
    const newCheckedFlavors = [...checked];
    if (currentFlavors === -1) {
      newCheckedFlavors.push(f);
    } else {
      newCheckedFlavors.splice(currentFlavors, 1);
    }

    //console.log(newCheckedCategoryId);
    setChecked(newCheckedFlavors);
    handleFilters(newCheckedFlavors);
  };
  return flavors.map((f, i) => (
    <Fragment key={i}>

      <div className="col-md-3">
        <div className="form-check">
          <input
            className="form-check-input "
            type="checkbox"
            onChange={handleToggle(f)}
            className="form-check-input"
            type="checkbox"
            value={checked.indexOf(f === -1)}
          />
          <label className="form-check-label text-light-black fw-700">
          {f}
          </label>
        </div>
      </div>
    </Fragment>
  ));
};

export default SeTFlavors;
