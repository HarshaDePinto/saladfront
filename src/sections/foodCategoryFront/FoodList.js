import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { processRatingStars} from "../../helper/helper";
import { getMealByCategory,addItem } from "./apiFrontCategory";
import { Collapse } from "react-bootstrap";
import { API } from "../../config";

import promoBanner from "../../assets/images/home/ads2.jpg";
//svg
import Product from "./Product";

function FoodList({setChangeCart,changeCart}) {
  const [open, setOpen] = useState(true);


  const colHandler = () => {
    if (open) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };
  const [allMeals, setAllMeals] = useState([]);
  const [error, setError] = useState(false);

  const getAllMeals = (foodCategoryId) => {
    getMealByCategory(foodCategoryId).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setAllMeals(data);
      }
    });
  };
  const { foodCategoryId } = useParams();
  useEffect(() => {
    getAllMeals(foodCategoryId);
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
    <div className="row">
      {showError()}

      <div className="col-lg-12">
        <div className="promocodeimg mb-xl-20 p-relative">
          <img
            src={promoBanner}
            className="img-fluid full-width"
            alt="promocode"
          />
          <div className="promocode-text">
            <div className="promocode-text-content">
              <h5 className="text-custom-white mb-2 fw-600">
                Get $10 off your first order!
              </h5>
              <p className="text-custom-white no-margin">
                Spend $15 or more and get $10 off your first delivery order.
              </p>
            </div>
            <div className="promocode-btn">
              {" "}
              <Link to="/">Get Deal</Link>
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-12 restaurent-meal-head mb-md-40">
        <div className="card">
          <div className="card-header">
            <div className="section-header-left">
              <h3 className="text-light-black header-title">
                <Link
                  className="card-link text-light-black no-margin"
                  onClick={colHandler}
                  aria-controls="user-profile"
                  aria-expanded={open}
                >
                  Most Popular
                </Link>
              </h3>
            </div>
          </div>
          <Collapse in={open}>
            <div>
              <div className="card-body no-padding">
                <div className="row">
                  {allMeals.map((item, i) => (
                    <div key={i} className="col-lg-12">
                      <Product meal={item} setChangeCart={setChangeCart} changeCart={changeCart} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Collapse>
        </div>
      </div>
    </div>
  );
}

export default FoodList;
