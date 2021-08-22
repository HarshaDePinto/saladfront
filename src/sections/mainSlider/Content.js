import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import CreateSlide from "./CreateSlide";
import ShowAllSlides from "./ShowAll";
function Content() {
  const [showCreate, setShowCreate] = useState(false);
  const showCreateTab = () => {
    setShowCreate(true);
  };
  const hideCreateTab = () => {
    setShowCreate(false);
  };
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
                          <Link onClick={hideCreateTab} className="add-res-tab">All Slides</Link>
                        </li>
                        <li className="add-res-tab" id="stepbtn2">
                          <Link onClick={showCreateTab} className="add-res-tab">Add New</Link>
                        </li>
                      </ul>
                    </div>
                    <div className="col-xl-8 col-lg-7">
                      <div className="step-content">
                        {!showCreate && (
                          <div className="step-tab-panel active" id="steppanel1">
                            <div className="general-sec">
                              <form>
                                <div className="row">
                                  <div className="col-12">
                                    <ShowAllSlides/>
                                  </div>
                                </div>
                              </form>
                            </div>
                          </div>
                        )}
                        {showCreate && (
                          <div className="step-tab-panel active" id="steppanel1">
                            <div className="general-sec">
                              <form>
                                <div className="row">
                                  <div className="col-12">
                                    
                                        <CreateSlide/>
                                  </div>
                                </div>
                              </form>
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
      </section>
    </Fragment>
  );
}

export default Content;
