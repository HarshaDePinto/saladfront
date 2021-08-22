import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getFoodCategory, getFilteredSetMeals } from "./apiSetMeal";
import CheckBox from "./CheckBox";
import CreatSetMeal from "./CreateNew";
import { API } from "../../config";
import {
  calculateRating,
  processRatingStars,
  fetchFlavorIcon,
} from "../../helper/helper";
//svg

import lemon from "../../assets/img/svg/lemon.svg";
import chef from "../../assets/img/svg/chef.svg";
import chili from "../../assets/img/svg/chili.svg";
import protein from "../../assets/img/svg/protein.svg";
import leaf from "../../assets/img/svg/leaf.svg";
import heart from "../../assets/img/svg/heart.svg";
function Content() {
  const [myFilters, setMyFilters] = useState({
    filters: { category: [] },
  });
  const [foodCategories, setFoodCategories] = useState([]);
  const [error, setError] = useState(false);
  const [skip, setSkip] = useState(0);
  const [filteredResults, setFilteredResults] = useState();
  const [showCreate, setShowCreate] = useState(false);
  const hideCreateForm = () => {
    setShowCreate(false);
  };
  const showCreateForm = () => {
    setShowCreate(true);
  };
  const getCategories = () => {
    getFoodCategory().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setFoodCategories(data);
      }
    });
  };

  const getImage = (s) => {
    return (
      <img
        src={`${API}/setMeal/photo/${s}`}
        className="img-fluid full-width"
        alt="product-img"
      />
    );
  };

  useEffect(() => {
    getCategories();
  }, []);

  const handleFilters = (filters, filterBy) => {
    //console.log(filters, filterBy);
    const newFilters = { ...myFilters };
    newFilters.filters[filterBy] = filters;
    loadFilterResults(myFilters.filters);
    setMyFilters(newFilters);
  };
  const loadFilterResults = (newFilters) => {
    // console.log(newFilters);
    getFilteredSetMeals(skip, newFilters).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setFilteredResults(data.data);
        setSkip(0);
      }
    });
  };

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
      <section className="register-restaurent-sec section-padding bg-light-theme">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <div className="sidebar-tabs main-box padding-20 mb-md-40">
                <div id="add-restaurent-tab" className="step-app">
                  <div className="row">
                    <div className="col-xl-4 col-lg-5 mb-md-40">
                      <ul className="step-steps steps-2">
                        <li className="add-res-tab" id="stepbtn1">
                          <Link to="/admin/dashboard" className="add-res-tab">
                            Dashboard
                          </Link>
                        </li>
                        {showCreate && (
                          <li className="add-res-tab" id="stepbtn1">
                            <Link
                              onClick={hideCreateForm}
                              className="add-res-tab"
                            >
                              All Set Meals
                            </Link>
                          </li>
                        )}
                        {!showCreate && (
                          <Fragment>
                            <li className="add-res-tab" id="stepbtn1">
                              <Link
                                onClick={showCreateForm}
                                className="add-res-tab"
                              >
                                Add A New Set Meals
                              </Link>
                            </li>
                            <CheckBox
                              categories={foodCategories}
                              handleFilters={(filters) =>
                                handleFilters(filters, "category")
                              }
                            />
                          </Fragment>
                        )}
                      </ul>
                    </div>
                    <div className="col-xl-8 col-lg-7">
                      <div className="step-content">
                        <div className="step-tab-panel active" id="steppanel1">
                          {showCreate && (
                            <div className="general-sec">
                              <CreatSetMeal />
                            </div>
                          )}

                          {!showCreate && (
                            <div class="card-body no-padding">
                              <div className="row">
                                {filteredResults &&
                                  filteredResults.map((item, i) => (
                                    <div
                                      key={i}
                                      className="col-lg-4 col-md-6 col-sm-6"
                                    >
                                      <div className="product-box mb-xl-20">
                                        <div className="product-img">
                                          {getImage(item._id)}

                                          <div className="overlay">
                                            <div className="product-tags padding-10">
                                              <span className="circle-tag">
                                                <img src={heart} alt="tag" />
                                              </span>
                                              {item.trending === true ? (
                                                <span className="type-tag bg-gradient-green text-custom-white">
                                                  Trending
                                                </span>
                                              ) : (
                                                ""
                                              )}
                                              {item.discount > 0 ? (
                                                <div className="custom-tag">
                                                  {" "}
                                                  <span className="text-custom-white rectangle-tag bg-gradient-red">
                                                    {" "}
                                                    {item.discount}%{" "}
                                                  </span>{" "}
                                                </div>
                                              ) : (
                                                ""
                                              )}
                                              {item.discount > 0 ||
                                              item.discount !== "" ? (
                                                <Fragment />
                                              ) : (
                                                ""
                                              )}
                                            </div>
                                          </div>
                                        </div>
                                        <div className="product-caption">
                                          <div className="title-box">
                                            <h6 className="product-title">
                                              <Link
                                                to="/"
                                                className="text-light-black "
                                              >
                                                {" "}
                                                {item.title}
                                              </Link>
                                            </h6>

                                            <div className="tags">
                                              <span
                                                className={
                                                  "text-custom-white rectangle-tag " +
                                                  calculateRating(item.rating) +
                                                  ""
                                                }
                                              >
                                                {item.rating}
                                              </span>
                                            </div>
                                          </div>

                                          <p className="text-light-white">
                                            {item.subtitle}
                                          </p>
                                          <div className="product-details">
                                            <div className="price-time">
                                              {" "}
                                              <span className="text-light-black time">
                                                {item.time} min
                                              </span>
                                              <span className="text-light-white price">
                                                {item.price} LKR
                                              </span>
                                            </div>
                                            <div className="rating">
                                              <span>
                                                {processRatingStars(
                                                  item.rating
                                                )}
                                              </span>
                                              <span className="text-light-white text-right">
                                                {item.totalRating} ratings
                                              </span>
                                            </div>
                                          </div>
                                          <div className="product-footer">
                                            {item.flavors[0]
                                              .split(",")
                                              .map((flavor, i) => (
                                                <span
                                                  key={i}
                                                  className="text-custom-white square-tag"
                                                >
                                                  {flavor === "leaf" && (
                                                    <img
                                                      src={leaf}
                                                      alt={flavor}
                                                    />
                                                  )}
                                                  {flavor === "chili" && (
                                                    <img
                                                      src={chili}
                                                      alt={flavor}
                                                    />
                                                  )}
                                                  {flavor === "chef" && (
                                                    <img
                                                      src={chef}
                                                      alt={flavor}
                                                    />
                                                  )}
                                                  {flavor === "protein" && (
                                                    <img
                                                      src={protein}
                                                      alt={flavor}
                                                    />
                                                  )}
                                                  {flavor === "lemon" && (
                                                    <img
                                                      src={lemon}
                                                      alt={flavor}
                                                    />
                                                  )}
                                                </span>
                                              ))}
                                          </div>
                                          <div className="product-footer">
                                            {foodCategories.map((c,i)=>(
                                                <Fragment key={i}>
                                                  {c._id===item.category &&(
                                                    <p className="category-btn">Cat: {c.title}</p>
                                                  )}
                                                </Fragment>))}
                                          
                                          </div>
                                          <div className="product-btn">
                                            <Link
                                              to={`/admin/editSetMeal/${item._id}`}
                                            >
                                              <button className="btn-first white-btn full-width text-light-green fw-600">
                                                Edit
                                              </button>
                                            </Link>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
}

export default Content;
