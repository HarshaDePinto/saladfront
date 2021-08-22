import React, { Fragment, useState } from "react";
import AddOnSingle from "./AddOnSingle";

const SetAddOn = ({ addOns, handleFilters }) => {
  

  const [checked, setChecked] = useState([]);

  const handleToggle = (f) => () => {
    const currentAddOns = checked.indexOf(f);
    const newCheckedAddOns = [...checked];
    if (currentAddOns === -1) {
      newCheckedAddOns.push(f);
    } else {
      newCheckedAddOns.splice(currentAddOns, 1);
    }

    //console.log(newCheckedCategoryId);
    setChecked(newCheckedAddOns);
    handleFilters(newCheckedAddOns);
  };
  return addOns.map((f, i) => (
    <Fragment key={i}>
      <form>
      <div className="row">
      <div className="col-md-12">
        <div className="form-check">
          <input
            className="form-check-input "
            type="checkbox"
            onChange={handleToggle(f)}
            className="form-check-input"
            type="checkbox"
            value={checked.indexOf(f === -1)}
          />
          <AddOnSingle addOnId={f} />
        </div>
      </div>
      </div>
      </form>
    </Fragment>
  ));
};

export default SetAddOn;
