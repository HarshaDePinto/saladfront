import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import General from "./General";

import AddNew from "./AddNew";
import { getAddOn } from "./apiAddOn";


function Content() {
  const [allAddOns, setAllAddOns] = useState([]);
  const [error, setError] = useState(false);
  

  const getAllAddOn = () => {
    getAddOn().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setAllAddOns(data);
      }
    });
  };
  useEffect(() => {
    getAllAddOn();
  }, []);
  const [showGeneral, setShowGeneral] = useState(true);
  const [showPremium, setShowPremium] = useState(false);
  const [showCreate, setShowCreate] = useState(false);

  const ShowGeneralTab = () => {
    setShowGeneral(true);
    setShowPremium(false);
    setShowCreate(false);
  };
  const ShowPremiumTab = () => {
    setShowGeneral(false);
    setShowPremium(true);
    setShowCreate(false);
  };
  const ShowCreateTab = () => {
    setShowGeneral(false);
    setShowPremium(false);
    setShowCreate(true);
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
                        <li className="add-res-tab" id="stepbtn2">
                          <Link
                            onClick={ShowGeneralTab}
                            className="add-res-tab"
                          >
                            General Add On
                          </Link>
                        </li>
                        <li className="add-res-tab" id="stepbtn2">
                          <Link
                            onClick={ShowPremiumTab}
                            className="add-res-tab"
                          >
                            Premium Add on
                          </Link>
                        </li>
                        <li className="add-res-tab" id="stepbtn2">
                          <Link onClick={ShowCreateTab} className="add-res-tab">
                            Create Add On
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
                                  {showGeneral && (
                                    <General addOns={allAddOns} addType={0} />
                                  )}
                                  {showPremium && (
                                    <General addOns={allAddOns} addType={1} />
                                  )}
                                  {showCreate && <AddNew />}
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
