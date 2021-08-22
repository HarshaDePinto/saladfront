import React, { Fragment, useState, useEffect } from "react";
import { getAddOn } from "./apiAddToCart";
import { Link } from "react-router-dom";

function GetAddOnToMeal({
  setAddOnsT,
  addOnPriceT,
  setAddOnPriceT,
}) {
  const [allAddOns, setAllAddOns] = useState([]);
  const [error, setError] = useState(false);
  const [checked, setChecked] = useState([]);
  const [cTitle, setCTitle] = useState([]);

  const getAllAddOn = () => {
    getAddOn().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setAllAddOns(data);
      }
    });
  };
  useEffect(() => {
    getAllAddOn();
  }, []);

  const handleToggle = (a) => () => {
    const currentAddOnId = checked.indexOf(a._id);
    const newCheckedAddOnId = [...checked];
    const newCTitle = [...cTitle];
    let price=0;
    const pTitle=[a.title, ' (', a.price,' LKR )'].join('');

    if (currentAddOnId === -1) {
      newCheckedAddOnId.push(a._id);
      newCTitle.push(pTitle);
      price=addOnPriceT+a.price;
    } else {
      newCheckedAddOnId.splice(currentAddOnId, 1);
      newCTitle.splice(currentAddOnId, 1);
      price=addOnPriceT-a.price;
    }
    setAddOnPriceT(price);
    setChecked(newCheckedAddOnId);
    setCTitle(newCTitle);
    setAddOnsT(newCTitle);
    console.log(price);
  };

  return (
    <Fragment>
      <h6>Add On (Choose from the list):</h6>
      <div className="row">
        {allAddOns.map((a, i) => (
          <Fragment key={i}>
            {a.addType === 0 && (
              <div className="col-md-6">
                <div className="form-group">
                  <div className="form-check">
                    <input
                      onChange={handleToggle(a)}
                      className="form-check-input "
                      type="checkbox"
                      className="form-check-input"
                      type="checkbox"
                      value={checked.indexOf(a._id === -1)}
                    />
                    <label className="form-check-label text-light-black fw-700">
                      {a.title} <span className="text-info">{a.price} LKR</span>
                    </label>
                  </div>
                </div>
              </div>
            )}
          </Fragment>
        ))}
      </div>
      <h6>Add on Premium Throw Ins (Choose from the list):</h6>
      <div className="row">
        {allAddOns.map((a, i) => (
          <Fragment key={i}>
            {a.addType === 1 && (
              <div className="col-md-6">
                <div className="form-group">
                  <div className="form-check">
                    <input
                      onChange={handleToggle(a)}
                      className="form-check-input "
                      type="checkbox"
                      className="form-check-input"
                      type="checkbox"
                      value={checked.indexOf(a._id === -1)}
                    />
                    <label className="form-check-label text-light-black fw-700">
                      {a.title} <span className="text-info">{a.price} LKR</span>
                    </label>
                  </div>
                </div>
              </div>
            )}
          </Fragment>
        ))}
      </div>
    </Fragment>
  );
}
export default GetAddOnToMeal;
