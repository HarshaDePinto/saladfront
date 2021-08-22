import React from "react";
import { Link } from "react-router-dom";

function CartItems({cartItems}) {
    return (
        <div className="card">
          <div className="card-header padding-15 fw-700">
            Number Of Meals: {`${cartItems.length}`}
          </div>
          <div className="card-body no-padding" id="scrollstyle-4">
            {cartItems.map((p, i) => (
              <div key={i} className="cat-product-box">
                <div className="cat-product">
                  <div className="cat-name">
                    <Link to="#">
                      <p className="text-light-green fw-700">
                        <span className="text-dark-white">{i+1}</span> {p.title}
                      </p>{" "}
                      <span className="text-light-white fw-700">
                        small, chilli chicken
                      </span>
                    </Link>
                  </div>
                  <div className="delete-btn">
                    <Link to="#" className="text-dark-white">
                      {" "}
                      <i className="far fa-trash-alt" />
                    </Link>
                  </div>
                  <div className="price">
                    {" "}
                    <Link to="#" className="text-dark-white fw-500">
                      $2.25
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="card-footer padding-15">
            {" "}
            <Link
              to="/checkout "
              className="btn-first green-btn text-custom-white full-width fw-500"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      );
}

export default CartItems;
