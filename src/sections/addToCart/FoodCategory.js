import React, { Fragment, useState, useEffect } from "react";
import { getFoodCategory } from "./apiAddToCart";
import { Link } from "react-router-dom";
import { API } from "../../config";

function FoodCategory() {
  const [allCategory, setAllCategory] = useState([]);
  const [error, setError] = useState(false);
  const getCategories = () => {
    getFoodCategory().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setAllCategory(data);
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
      <h5 className="text-light-black fw-700">
        All Categories ({allCategory.length}){" "}
      </h5>
      {showError()}
      {allCategory.map((c, i) => (
        <Fragment key={i}>
          <div className="testimonial-wrapper my-2">
            <div className="testimonial-box">
              <div className="testimonial-img p-relative">
                <img
                  src={`${API}/foodCategory/photo2/${c._id}`}
                  className="img-fluid full-width"
                  alt="testimonial-img"
                />

                <div className="overlay">
                  <div className="brand-logo">
                    <img
                      src={`${API}/foodCategory/photo1/${c._id}`}
                      className="img-fluid"
                      alt="logo"
                    />
                  </div>
                </div>
              </div>
              <div className="testimonial-caption padding-15">
                <h5 className="fw-600">
                  <span className="text-light-black">{c.title}</span>
                </h5>

                <p className="text-light-black">{c.description}</p>

                <Link
                  to={`/foodCategory/${c._id}`}
                  className="btn-second btn-submit"
                >
                  Check More
                </Link>
              </div>
            </div>
          </div>
        </Fragment>
      ))}
    </Fragment>
  );
}

export default FoodCategory;
