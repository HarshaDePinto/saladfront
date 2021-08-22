import React, { Fragment, useState, useEffect } from "react";
import { isAuthenticated } from "../../auth";
import {
  updateMainSlide,
  readMainSlide,
  deleteMainSlide,
} from "../../pages/admin/apiAdmin";
import { Link, useParams, Redirect } from "react-router-dom";

const UpdateSlide = () => {
  const { user, token } = isAuthenticated();
  const [values, setValues] = useState({
    title: "",
    subtitle: "",
    photo: "",
    position: "",
    colPosition: "",
    active: false,
    loading: true,
    error: "",
    formData: "",
    redirectToReferrer: false,
    showDelete: false,
  });
  const {
    title,
    subtitle,
    loading,
    error,
    active,
    formData,
    redirectToReferrer,
    showDelete,
  } = values;

  const loadMainSlide = (mainSlideId) => {
    readMainSlide(mainSlideId).then((data) => {
      if (data.error) {
        setValues({ ...values, error: true });
      } else {
        setValues({
          ...values,
          title: data.title,
          subtitle: data.subtitle,
          active: data.active,
          loading:false,
          formData: new FormData(),
        });
      }
    });
  };
  const { mainSlideId } = useParams();
  useEffect(() => {
    loadMainSlide(mainSlideId);
  },[]);

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const clickSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, error: "", loading: true });
    updateMainSlide(token, mainSlideId, user._id, formData).then((data) => {
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
      return <Redirect to="/admin/mainSlider" />;
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

  const editSlideForm = () => {
    return (
      <form>
        <h5 class="text-light-black fw-700">Update The Main Slide</h5>
        <div className="row">
          <div className="col-md-12">
            <div className="form-group">
              <label className="text-light-black fw-700">
                Title <sup className="fs-16">*max 32</sup>
              </label>
              <input
                type="text"
                value={title}
                onChange={handleChange("title")}
                className="form-control form-control-submit"
              />
            </div>
          </div>
          <div className="col-md-12">
            <div className="form-group">
              <label className="text-light-black fw-700">
                Subtitle <sup className="fs-16">*max 60</sup>
              </label>
              <input
                type="text"
                value={subtitle}
                onChange={handleChange("subtitle")}
                className="form-control form-control-submit"
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label className="text-light-black fw-700">
                Slider Image <sup className="fs-16">*max 1mb</sup>
              </label>
              <input
                type="file"
                name="photo"
                accept="image/*"
                onChange={handleChange("photo")}
                className="form-control form-control-submit"
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label className="text-light-black fw-700">
                Make Active<sup className="fs-16">*</sup>
              </label>

              <select
                className="form-control form-control-submit"
                onChange={handleChange("active")}
              >
                {active && (
                  <Fragment>
                    <option value="1">Active</option>
                    <option value="0">Make Deactivated</option>
                  </Fragment>
                )}
                {!active && (
                  <Fragment>
                    <option value="0">Deactivated</option>
                    <option value="1">Make Active</option>
                  </Fragment>
                )}
              </select>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label className="text-light-black fw-700">
                Title Position<sup className="fs-16">*</sup>
              </label>

              <select
                className="form-control form-control-submit"
                onChange={handleChange("position")}
              >
                <option>Please Select</option>
                <option value="justify-content-start">Start</option>
                <option value="justify-content-center">Center</option>
                <option value="justify-content-end">End</option>
              </select>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label className="text-light-black fw-700">
                Subtitle Position<sup className="fs-16">*</sup>
              </label>

              <select
                className="form-control form-control-submit"
                onChange={handleChange("colPosition")}
              >
                <option>Please Select</option>
                <option value="">Start</option>
                <option value="text-center">Center</option>
                <option value="text-right">End</option>
              </select>
            </div>
          </div>
        </div>
        <button onClick={clickDelete} className="btn btn-danger m-2">
          Delete The Slide
        </button>
        <button onClick={clickSubmit} className="btn-second btn-submit m-2">
          Update The Slide
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

  const deleteSlide = (e) => {
    e.preventDefault();
    setValues({ ...values, error: "", loading: true });
    deleteMainSlide(token, mainSlideId, user._id, formData).then((data) => {
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
                <button onClick={deleteSlide} className="btn btn-danger">
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
            <div className="col-lg-9">
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
                            All Slides
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
                                {!showDelete && editSlideForm()}
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
            <div className="col-lg-3"></div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default UpdateSlide;
