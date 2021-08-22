import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  calculateRating,
  processRatingStars,
  fetchFlavorIcon,
} from "../../helper/helper";
import product from "../../data/product.json";
import { getHomeSetMeals } from "./apiHome";
import { API } from "../../config";

//svg
import lemon from "../../assets/img/svg/lemon.svg";
import chef from "../../assets/img/svg/chef.svg";
import chili from "../../assets/img/svg/chili.svg";
import protein from "../../assets/img/svg/protein.svg";
import leaf from "../../assets/img/svg/leaf.svg";
import heart from "../../assets/img/svg/heart.svg";

// Extra
import largeimg1 from "../../assets/images/home/side1.jpg";
import largeimg2 from "../../assets/images/home/side2.jpg";
import largeimg3 from "../../assets/images/home/side3.jpg";
import largeimg4 from "../../assets/images/home/side4.jpg";
import unlimited1 from "../../assets/images/home/ads1.jpg";
import unlimited2 from "../../assets/images/home/ads2.jpg";
import unlimited3 from "../../assets/images/home/ads3.jpg";
import logo from "../../assets/img/tag.jpg";
// Top collection
import tpcl1 from "../../assets/images/home/top1.jpg";
import tpcl2 from "../../assets/images/home/new1.jpg";
import tpcl3 from "../../assets/images/home/top2.jpg";
import tpcl4 from "../../assets/images/home/new2.jpg";

const topcollection = [
  { img: tpcl1, cat: "Top rated" },
  { img: tpcl2, cat: "Top rated" },
];
const bottomcollection = [
  { img: tpcl3, cat: "Top rated" },
  { img: tpcl4, cat: "Top rated" },
];

const CollectionBox = () => {
  const [allSetMeals, setAllSetMeals] = useState([]);
  const [error, setError] = useState(false);

  const getMeals = () => {
    getHomeSetMeals().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setAllSetMeals(data);
      }
    });
  };
  useEffect(() => {
    getMeals();
  }, []);

  const getImage = (s) => {
    return (
      <img
        src={`${API}/setMeal/photo/${s}`}
        className="img-fluid full-width"
        alt="product-img"
      />
    );
  };
  return (
    <section className="ex-collection section-padding">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="section-header-left">
              <h3 className="text-light-black header-title title">
                Explore our collections
              </h3>
            </div>
          </div>
        </div>
        <div className="row">
          {topcollection.map((item, i) => (
            <div key={i} className="col-md-6">
              <div className="ex-collection-box mb-xl-20">
                <img src={item.img} className="img-fluid full-width" alt="" />
                <div className="category-type overlay padding-15">
                  {" "}
                  <Link to="/" className="category-btn">
                    {item.cat}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="row">
          <div className="col-lg-3 col-md-4">
            <div className="large-product-box mb-xl-20 p-relative">
              <img src={largeimg1} className="img-fluid full-width" alt="" />
              <div className="category-type overlay padding-15">
                <button className="category-btn">Most popular near you</button>{" "}
                <Link
                  to="/"
                  className="btn-first white-btn text-light-black fw-600 full-width"
                >
                  See all
                </Link>
              </div>
            </div>
          </div>
          <div className="col-lg-9 col-md-8">
            <div className="row">
              {allSetMeals.map((item, i) => (
                <div key={i} className="col-lg-4 col-md-6 col-sm-6">
                  <div className="product-box mb-xl-20">
                    <div className="product-img">
                      <Link>{getImage(item._id)}</Link>
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
                          {item.discount > 0 || item.discount !== "" ? (
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
                          <Link className="text-light-black ">
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
                      <p className="text-light-white">{item.subtitle}</p>
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
                          <span>{processRatingStars(item.rating)}</span>
                          <span className="text-light-white text-right">
                            {item.totalRating} ratings
                          </span>
                        </div>
                      </div>
                      <div className="product-footer">
                        {item.flavors[0].split(",").map((flavor, i) => (
                          <span
                            key={i}
                            className="text-custom-white square-tag"
                          >
                            {flavor === "leaf" && (
                              <img src={leaf} alt={flavor} />
                            )}
                            {flavor === "chili" && (
                              <img src={chili} alt={flavor} />
                            )}
                            {flavor === "chef" && (
                              <img src={chef} alt={flavor} />
                            )}
                            {flavor === "protein" && (
                              <img src={protein} alt={flavor} />
                            )}
                            {flavor === "lemon" && (
                              <img src={lemon} alt={flavor} />
                            )}
                          </span>
                        ))}
                      </div>
                      <div className="product-btn">
                        <Link to={`/addToCart/${item._id}`}
                          className=" btn-first white-btn full-width text-light-green fw-600"
                        >
                          Add To Cart
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* advertisement banner*/}
        <div className="row">
          <div className="col-12">
            <div className="banner-adv2 mb-xl-20">
              <img src={unlimited1} className="img-fluid full-width" alt="" />
              <span className="text">
                Unlimited Free Delivery with.
                <img src={logo} alt="" />
                <Link to="/" className="btn-second btn-submit">
                  Try 30 Days FREE
                </Link>
              </span>
              <span className="close-banner" />
            </div>
          </div>
        </div>

        <div className="row">
          {bottomcollection.map((item, i) => (
            <div key={i} className="col-md-6">
              <div className="ex-collection-box mb-sm-20">
                <img src={item.img} className="img-fluid full-width" alt="" />
                <div className="category-type overlay padding-15">
                  {" "}
                  <Link to="/" className="category-btn">
                    {item.cat}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CollectionBox;
