import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import {isAuthenticated} from "../../auth";
function Content() {
  const {user}=isAuthenticated();
  return (
    <Fragment>
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
                        <li className="add-res-tab" id="stepbtn2">
                          <Link to="/admin/mainSlider" className="add-res-tab">
                            Main Slide
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <div className="col-xl-8 col-lg-7">
                      <div className="step-content">
                        <div className="step-tab-panel active" id="steppanel1">
                          <div className="general-sec">
                            <form>
                              <div className="row">
                                <div className="col-12">
                                  <h5 className="text-light-black fw-700">
                                    Hi, Admin {user.name}
                                  </h5>
                                  <p><span className="text-info fw-500">What you want to Change Today?</span></p>
                                 
                                  
                                </div>
                              </div>
                            </form>
                          </div>
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