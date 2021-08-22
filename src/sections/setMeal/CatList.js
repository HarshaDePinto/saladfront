import React, { Fragment, useState, useEffect } from "react";
import { getFoodCategory } from "./apiSetMeal";

const CatList = ({ category }) => {
  const [foodCategories, setFoodCategories] = useState([]);
  const [error, setError] = useState(false);
  const getCategories = () => {
    getFoodCategory().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setFoodCategories(data);
      }
    });
  };

  useEffect(() => {
    getCategories();
  }, []);

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );
  return (
    <Fragment>
      {showError()}
      {foodCategories.map((c, i) => (
        <option key={i} value={c._id} selected={c._id === category && true}>
          {c.title}
        </option>
      ))}
    </Fragment>
  );
};

export default CatList;
