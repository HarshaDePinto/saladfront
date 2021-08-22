import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCart } from "./apiAddToCart";

function CartSide({
  mealTitleT,
  mealPriceT,
  addOnsT,
  addOnPriceT,
  setRun,
  run,
}) {
  const [cartItems, setCartItems] = useState([]);
  useEffect(() => {
    setCartItems(getCart());
  }, [run]);
  return (
    <Fragment>
      <div className="cart-detail-box">
        <div className="card">
          {mealTitleT && (
            <Fragment>
              <div className="card-header padding-15">Ongoing Order</div>

              <div className="card-body no-padding">
                <div className="cat-product-box">
                  <div className="cat-product">
                    <div className="cat-name">
                      <p className="text-light-green">
                        <span className="text-dark-white"></span> {mealTitleT}
                      </p>{" "}
                      <span className="text-light-white">
                        {addOnsT &&
                          addOnsT.map((a, i) => <div key={i}>{a}</div>)}
                      </span>
                    </div>
                    <div className="price">
                      {" "}
                      <Link to="#" className="text-dark-white fw-500">
                        {mealPriceT} LKR
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="item-total">
                  <div className="total-price border-0">
                    {" "}
                    <span className="text-dark-white fw-700">
                      Items subtotal:
                    </span>
                    <span className="text-dark-white fw-700">
                      {mealPriceT + addOnPriceT} LKR
                    </span>
                  </div>
                </div>
                <div className="card-header padding-15">Already Added</div>
                {cartItems &&
                  cartItems.map((product, i) => (
                    <Fragment key={i}>
                      <div className="cat-product-box">
                        <div className="cat-product">
                          <div className="cat-name">
                            <p className="text-light-green">
                              <span className="text-dark-white"></span>
                              {product[0].title}
                            </p>{" "}
                            <span className="text-light-white">
                              {product[0].itemTotal} LKR
                            </span>
                          </div>
                          <div className="price">
                            {" "}
                            <Link
                              to="#"
                              className="text-dark-white fw-500"
                            ></Link>
                          </div>
                          <div className="delete-btn">
                            <Link to="#" className="text-dark-white">
                              {" "}
                              <i className="far fa-trash-alt" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </Fragment>
                  ))}
              </div>
            </Fragment>
          )}
          {!mealTitleT && (
            <Fragment>
              <div className="card-header padding-15">
                Total Items: {cartItems.length}
              </div>
              <div className="card-body no-padding">
                {cartItems &&
                  cartItems.map((product, i) => (
                    <Fragment key={i}>
                      <div className="cat-product-box">
                        <div className="cat-product">
                          <div className="cat-name">
                            <p className="text-light-green">
                              <span className="text-dark-white"></span>
                              {product[0].title}
                            </p>{" "}
                            <span className="text-light-white">
                              {product[0].itemTotal} LKR
                            </span>
                          </div>
                          <div className="price">
                            {" "}
                            <Link
                              to="#"
                              className="text-dark-white fw-500"
                            ></Link>
                          </div>
                          <div className="delete-btn">
                            <Link to="#" className="text-dark-white">
                              {" "}
                              <i className="far fa-trash-alt" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </Fragment>
                  ))}

                <div className="item-total">
                  <div className="total-price border-0">
                    {" "}
                    <span className="text-dark-white fw-700">
                      Items subtotal:
                    </span>
                    <span className="text-dark-white fw-700">LKR</span>
                  </div>
                </div>
              </div>
            </Fragment>
          )}

          <div className="card-footer padding-15">
            {!mealTitleT && (
              <Link
                to="/"
                className="btn-first green-btn text-custom-white full-width fw-500"
              >
                Proceed to Checkout
              </Link>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default CartSide;
