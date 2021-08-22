import React, { Fragment, useState, useEffect } from "react";
import { getMainSlides } from "../../pages/admin/apiAdmin";
import { API } from "../../config";
import { Link } from "react-router-dom";

const ShowAllSlides = () => {
  const [allSlides, setAllSlides] = useState([]);
  const [error, setError] = useState(false);

  const getSlides = () => {
    getMainSlides("createdAt").then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setAllSlides(data);
      }
    });
  };

  useEffect(() => {
    getSlides();
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
      <h5 className="text-light-black fw-700">All Slides</h5>
      {showError()}
      {allSlides.map((s, i) => (
        <Fragment key={i}>
          <div className="product-box mb-md-20">
            <div className="product-img">
              {!s.active && (
                <span className="text-custom-white type-tag bg-gradient-orange">
                  Deactivated
                </span>
              )}
              {s.active && (
                <span className="type-tag bg-gradient-green text-custom-white">
                  Active
                </span>
              )}
              <img
                src={`${API}/mainSlide/photo/${s._id}`}
                className="img-fluid full-width"
                alt="product-img"
              />
            </div>

            <div className="product-caption">
              <h6 className="product-title">
                <span className="text-light-black ">{s.title}</span>
              </h6>
              <p className="text-light-white">{s.subtitle}</p>

              <div className="product-btn">
                <Link to={`/admin/editMainSlide/${s._id}`}>
                  <button className="btn-first white-btn text-light-black fw-600 mx-2">
                    Edit
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </Fragment>
      ))}
    </Fragment>
  );
};

export default ShowAllSlides;
