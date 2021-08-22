import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";

function General({ addOns, addType }) {
  const [showAllGeneral, setShowAllGeneral] = useState(true);


 

  return (
    <Fragment>
      <div className="sidebar">
        <div className="cart-detail-box">
          <div className="card">
            {showAllGeneral && addType === 0 && (
              <h5 className="card-header padding-15 fw-700">
                All General Add On
              </h5>
            )}

            {showAllGeneral && addType === 1 && (
              <h5 className="card-header padding-15 fw-700">
                All Premium Add On
              </h5>
            )}
            <div className="card-body no-padding" id="scrollstyle-4">
              {addOns.map((a, i) => (
                <Fragment key={i}>
                  {a.addType === addType && (
                    <Fragment>
                      <div className="cat-product-box">
                        <div className="cat-product">
                          <div className="cat-name">
                            <p className="text-light-green fw-700">{a.title}</p>
                            {a.available && (
                              <span className="text-success fw-700">
                                Available
                              </span>
                            )}
                            {!a.available && (
                              <span className="text-info fw-700">
                                Not Available
                              </span>
                            )}
                          </div>
                          <div className="price">
                            <span className="text-primary fw-700">
                              {a.price} LKR
                            </span>
                          </div>
                         
                          <div className="delete-btn">
                            <Link to={`/admin/editAddOn/${a._id}`} className="btn-first green-btn text-custom-white">
                              Edit
                            </Link>
                          </div>
                        </div>
                      </div>
                    </Fragment>
                  )}
                </Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default General;
