import React, { Fragment, useState,useEffect } from "react";
import { readAddOn } from "./apiFrontCategory";

function AddOnSingle({addOnId}){
    const [error, setError] = useState(false);
  const [addOnName, setAddOnName] = useState([]);

  const loadAddOn = (addOnId) => {
    readAddOn(addOnId).then((data) => {
      if (data.error) {
        setError(true);
      } else {
        setAddOnName(data);
      }
    });
  };
  useEffect(() => {
    loadAddOn(addOnId);
  }, []);

  return(
    <Fragment>
        <label className="form-check-label text-light-black fw-500">
            {addOnName.title} ({addOnName.price} LKR)
          </label>
    </Fragment>)

}

export default AddOnSingle;