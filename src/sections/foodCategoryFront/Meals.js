import React, { useState, useEffect } from "react";
import { API } from "../../config";
import { Link } from "react-router-dom";
import Video from "../../layoutes/Video";
import FoodList from "./FoodList";
import { getCart } from "./apiFrontCategory";

import CartItems from "./CartItems";
function Meals(foodCategoryId) {
  const [cartItems, setCartItems] = useState([]);
  const [changeCart, setChangeCart] = useState(false);

  useEffect(() => {
    setCartItems(getCart());
  }, [changeCart]);

  return (
    <section className="section-padding restaurent-meals bg-light-theme">
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-3 col-lg-3"></div>
          <div className="col-xl-6 col-lg-6">
            
            <FoodList foodCategoryId={foodCategoryId} setChangeCart={setChangeCart} changeCart={changeCart} />
          </div>
          <div className="col-xl-3 col-lg-3">
            <div className="sidebar">
              <div className="cart-detail-box">
                <CartItems cartItems={cartItems} />
              </div>
              <Video />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Meals;
