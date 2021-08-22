import React, { Fragment, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { readSetMeal, addItem } from "./apiAddToCart";
import FoodCategory from "./FoodCategory";
import CartSide from "./CartSide";
import SetMealCart from "./SetMeal";
import GetAddOnToMeal from "./AddOnCart";
function Content() {
  const [run, setRun] = useState(false);
  const [error, setError] = useState(false);
  const [mealTitleT, setMealTitleT] = useState();
  const [mealPriceT, setMealPriceT] = useState();
  const [addOnsT, setAddOnsT] = useState([]);
  const [addOnPriceT, setAddOnPriceT] = useState(0);
  const loadSetMeal = (setMealId) => {
    readSetMeal(setMealId).then((data) => {
      if (data.error) {
        setError(true);
      } else {
        setMealTitleT(data.title);
        setMealPriceT(data.price);
      }
    });
  };

  const cartItem = [
    {
      title: mealTitleT,
      mealPrice:mealPriceT,
      addOnItem: addOnsT,
      itemTotal: addOnPriceT + mealPriceT,
    },
  ];

  const addToCart = () => {
    addItem(cartItem, () => {
      if (run) {
        setRun(false);
      } else {
        setRun(true);
      }
    });
  };

  useEffect(() => {
    loadSetMeal(setMealId);
  }, []);
  const { setMealId } = useParams();
  return (
    <section className="register-restaurent-sec section-padding bg-light-theme">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-9">
            <div className="sidebar-tabs main-box padding-20 mb-md-40">
              <div id="add-restaurent-tab" className="step-app">
                <div className="row">
                  <div className="col-xl-8 col-lg-7">
                    <div className="step-content">
                      <div className="step-tab-panel active" id="steppanel1">
                        <div className="general-sec">
                          <form>
                            <div className="row">
                              <div className="col-12">
                                <SetMealCart setMealId={setMealId} />
                              </div>
                            </div>
                            <h4>Please Let Us Know Your Preferences...</h4>
                            
                            <GetAddOnToMeal
                              setAddOnsT={setAddOnsT}
                              addOnPriceT={addOnPriceT}
                              setAddOnPriceT={setAddOnPriceT}
                            />
                          </form>
                          <Link
                            onClick={addToCart}
                            className="btn-first white-btn full-width text-light-green fw-600"
                          >
                            Add Item To The Cart
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-4 col-lg-5 mb-md-40">
                    <div className="sidebar">
                      <CartSide
                        mealTitleT={mealTitleT}
                        mealPriceT={mealPriceT}
                        addOnsT={addOnsT}
                        addOnPriceT={addOnPriceT}
                        setRun={setRun}
                        run={run}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3">
            <FoodCategory />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Content;
