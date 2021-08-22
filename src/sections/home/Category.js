import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper";
import { getHomeFoodCategory } from "./apiHome";
import { API } from "../../config";

// install Swiper components
SwiperCore.use([Navigation]);

const Category = () => {
  const [allFoodCategory, setAllFoodCategory] = useState([]);
  const [error, setError] = useState(false);
  const getFoodCategory = () => {
    getHomeFoodCategory().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setAllFoodCategory(data);
      }
    });
  };
  useEffect(() => {
    getFoodCategory();
  }, []);
  const settings = {
    slidesPerView: 2,
    spaceBetween: 15,
    loop: false,
    breakpoints: {
      576: {
        slidesPerView: 3,
        spaceBetween: 15,
      },
      768: {
        slidesPerView: 4,
        spaceBetween: 40,
      },
      992: {
        slidesPerView: 6,
        spaceBetween: 40,
      },
      1200: {
        slidesPerView: 6,
        spaceBetween: 15,
      },
    },
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
    <section className="browse-cat u-line section-padding">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="section-header-left">
              {showError()}
              <h3 className="text-light-black header-title title">
                Our Food Categories{" "}
                <span className="fs-14">
                  <Link to="/restaurant">See all </Link>
                </span>
              </h3>
            </div>
          </div>
          <div className="col-12">
            <Swiper
              className="category-slider swiper-container"
              {...settings}
              navigation
            >
              {allFoodCategory.map((c, i) => (
                <SwiperSlide key={i}>
                  <Link to={`/foodCategory/${c._id}`} className="categories">
                    <div className="icon text-custom-white bg-light-green ">
                      <img src={`${API}/foodCategory/photo1/${c._id}`} className="rounded-circle" alt="" />
                    </div>{" "}
                    <span className="text-light-black cat-name">
                      {c.title}{" "}
                    </span>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Category;
