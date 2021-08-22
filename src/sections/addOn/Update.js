import React, { Fragment, useState, useEffect } from "react";
import { isAuthenticated } from "../../auth";
import { updateAddOn, readAddOn, deleteAddOn } from "./apiAddOn";
import { Link, useParams, Redirect } from "react-router-dom";

const UpdateAddOn = () => {
  const { user, token } = isAuthenticated();
  const [values, setValues] = useState({
    title: "",
    price: "",
    available: "",
    addType: "",
    loading: true,
    error: "",
    formData: "",
    redirectToReferrer: false,
    showDelete: false,
  });
  const {
    title,
    price,
    available,
    addType,
    loading,
    error,
    formData,
    redirectToReferrer,
    showDelete,
  } = values;

  const loadAddOn = (addOnId) => {
    readAddOn(addOnId).then((data) => {
      if (data.error) {
        setValues({ ...values, error: true });
      } else {
        setValues({
          ...values,
          title: data.title,
          price: data.price,
          available: data.available,
          addType: data.addType,
          loading: false,
          formData: new FormData(),
        });
      }
    });
  };
  const { addOnId } = useParams();
  useEffect(() => {
    loadAddOn(addOnId);
  }, []);

  const handleChange = (name) => (event) => {
    const value = event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const clickSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, error: "", loading: true });
    updateAddOn(token, addOnId, user._id, formData).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          redirectToReferrer: true,
        });
      }
    });
  };

  const redirectUser = () => {
    if (redirectToReferrer) {
      return <Redirect to="/admin/addOn" />;
    }
  };
  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const showLoading = () =>
    loading && (
      <div className="alert alert-success">
        <p>Updating backend data...</p>
      </div>
    );

  const editAddOnForm = () => {
    return (
      <form>
        <h5 className="text-light-black fw-700">Update Add On</h5>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label className="text-light-black fw-700">
                Title <sup className="fs-16">*</sup>
              </label>
              <input
                type="text"
                value={title}
                onChange={handleChange("title")}
                className="form-control form-control-submit"
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label className="text-light-black fw-700">
                Price <sup className="fs-16">*</sup>
              </label>
              <input
                type="number"
                value={price}
                onChange={handleChange("price")}
                className="form-control form-control-submit"
              />
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-group">
              <label className="text-light-black fw-700">
                Availability<sup className="fs-16">*</sup>
              </label>

              <select
                className="form-control form-control-submit"
                onChange={handleChange("available")}
              >
                {available && (
                  <Fragment>
                    <option value="1">Available</option>
                    <option value="0">Make Not Available</option>
                  </Fragment>
                )}
                {!available && (
                  <Fragment>
                    <option value="0">Not Available</option>
                    <option value="1">Make Available</option>
                  </Fragment>
                )}
              </select>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label className="text-light-black fw-700">
                Type<sup className="fs-16">*</sup>
              </label>

              <select
                className="form-control form-control-submit"
                onChange={handleChange("addType")}
              >
                {addType == 1 && (
                  <Fragment>
                    <option value="1">Premium</option>
                    <option value="0">General</option>
                  </Fragment>
                )}
                {addType == 0 && (
                  <Fragment>
                    <option value="0">General</option>
                    <option value="1">Premium</option>
                  </Fragment>
                )}
              </select>
            </div>
          </div>
        </div>
        <button onClick={clickDelete} className="btn btn-danger m-2">
          Delete Add On
        </button>
        <button onClick={clickSubmit} className="btn-second btn-submit m-2">
          Update Add On
        </button>
      </form>
    );
  };

  const clickDelete = () => {
    setValues({ ...values, showDelete: true });
  };

  const cancelDelete = () => {
    setValues({ ...values, showDelete: false });
  };

  const deleteAddOnClick = (e) => {
    e.preventDefault();
    setValues({ ...values, error: "", loading: true });
    deleteAddOn(token, addOnId, user._id, formData).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          redirectToReferrer: true,
        });
      }
    });
  };
  const deleteConfirm = () => {
    return (
      <Fragment>
        <div className="product-box mb-xl-20">
          <div className="product-box-2">
            <div className="product-caption">
              <div className="title-box">
                <h6 className="product-title text-danger">
                  Are You Sure? All the data will be delete permanently <br />
                  and will not be able to recover again!
                </h6>
              </div>
            </div>
          </div>
          <div className="product-footer-2">
            <div className="discount">
              <span className="text-success fs-12">
                <button onClick={deleteAddOnClick} className="btn btn-danger">
                  Yes, Delete
                </button>
              </span>
            </div>
            <div className="discount-coupon">
              <span className="text-light-white fs-12">
                <button
                  onClick={cancelDelete}
                  className="btn-second btn-submit"
                >
                  No, Cancel
                </button>
              </span>
            </div>
          </div>
        </div>
      </Fragment>
    );
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
                          <Link to="/admin/addOn" className="add-res-tab">
                            All Add On
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <div className="col-xl-8 col-lg-7">
                      <div className="step-content">
                        <div className="step-tab-panel active" id="steppanel1">
                          <div className="general-sec">
                            <div className="row">
                              <div className="col-12">
                                {showLoading()}
                                {showError()}
                                {!showDelete && editAddOnForm()}
                                {showDelete && deleteConfirm()}
                                {redirectUser()}
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
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default UpdateAddOn;
