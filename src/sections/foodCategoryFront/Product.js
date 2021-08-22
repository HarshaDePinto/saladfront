import React, { Fragment, useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { API } from "../../config";
import { processRatingStars } from "../../helper/helper";
import { addItem, getAddOn } from "./apiFrontCategory";
//svg
import lemon from "../../assets/img/svg/lemon.svg";
import chef from "../../assets/img/svg/chef.svg";
import chili from "../../assets/img/svg/chili.svg";
import protein from "../../assets/img/svg/protein.svg";
import leaf from "../../assets/img/svg/leaf.svg";
import heart from "../../assets/img/svg/heart.svg";
import SetAddOn from "./AddOn";

function Product({ meal, setChangeCart, changeCart }) {
  const [allAddOns, setAllAddOns] = useState([]);
  const [showAddOn, setShowAddOn] = useState(false);
  const [values, setValues] = useState({
    productAddOn: [],
    productMeal: [],
  });

  const { productAddOn } = values;

  const handleFilters = (filters) => {
    setValues({ ...values, productAddOn: filters });
  };

  const addOnShowHandler = () => {
    if (showAddOn) {
      setShowAddOn(false);
    } else {
      setShowAddOn(true);
    }
  };
  const [error, setError] = useState(false);
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

  const [redirect, setRedirect] = useState(false);
  const addToCart = () => {
    addItem(meal, productAddOn, () => {
      setRedirect(true);
      if (changeCart) {
        setChangeCart(false);
      } else {
        setChangeCart(true);
      }
    });
  };

  const makeRedirect = (redirect) => {
    if (redirect) {
      return <Redirect to={`/foodCategory/${meal.category}`} />;
    }
  };
  return (
    <Fragment>
      <div className="restaurent-product-list">
        <div className="restaurent-product-detail">
          <div className="restaurent-product-left">
            <div className="restaurent-product-title-box">
              <div className="restaurent-product-box">
                <div className="restaurent-product-title">
                  <h6 className="mb-2">
                    <Link to="#" className="text-light-black fw-600">
                      {meal.title}
                    </Link>
                  </h6>
                  <p className="text-light-white">{meal.calorie} Cal.</p>
                </div>
                <div className="restaurent-product-label">
                  {!showAddOn && (
                    <span
                      onClick={addOnShowHandler}
                      className="rectangle-tag bg-gradient-red text-custom-white"
                    >
                      Add To Cart
                    </span>
                  )}
                  {showAddOn && (
                    <Fragment>
                      <span onClick={addToCart} className="rectangle-tag bg-gradient-red text-custom-white">
                        Proceed
                      </span>
                      <span onClick={addOnShowHandler} className="rectangle-tag bg-dark text-custom-white">
                        Cancel
                      </span>
                    </Fragment>
                  )}
                </div>
              </div>
              <div className="restaurent-product-rating">
                <div className="ratings">{processRatingStars(meal.rating)}</div>
                <div className="rating-text"></div>
              </div>
            </div>
            <div className="restaurent-product-caption-box">
              <span className="text-light-white">{meal.description}</span>
            </div>
            {showAddOn && (
              <SetAddOn
                addOns={allAddOns}
                handleFilters={(filters) => handleFilters(filters, "addOns")}
              />
            )}

            <div className="restaurent-tags-price">
              <div className="restaurent-tags">
                {meal.flavors[0].split(",").map((flavor, i) => (
                  <span key={i} className="text-custom-white square-tag">
                    {flavor === "leaf" && <img src={leaf} alt={flavor} />}
                    {flavor === "chili" && <img src={chili} alt={flavor} />}
                    {flavor === "chef" && <img src={chef} alt={flavor} />}
                    {flavor === "protein" && <img src={protein} alt={flavor} />}
                    {flavor === "lemon" && <img src={lemon} alt={flavor} />}
                  </span>
                ))}
              </div>{" "}
              <span className="circle-tag">
                <img src={heart} alt="tag" />
              </span>
              <div className="restaurent-product-price">
                <h6 className="text-success fw-600 no-margin">
                  {meal.price}LKR+
                </h6>
              </div>
            </div>
          </div>

          <div className="restaurent-product-img">
            <img
              src={`${API}/setMeal/photo/${meal._id}`}
              className="img-fluid"
              alt="#"
            />
          </div>
        </div>
      </div>

      {makeRedirect(redirect)}
    </Fragment>
  );
}
export default Product;
