import React, { Fragment, useState, useEffect } from "react";
import { isAuthenticated } from "../../auth";
import {
  updateFoodCategory,
  readFoodCategory,
  deleteFoodCategory,
} from "./apiFoodCategory";
import { Link, useParams, Redirect } from "react-router-dom";

const UpdateCategory = () => {
  const { user, token } = isAuthenticated();
  const [values, setValues] = useState({
    title: "",
    description: "",
    photo1: "",
    photo2: "",
    loading: true,
    error: "",
    formData: "",
    redirectToReferrer: false,
    showDelete: false,
  });
  const {
    title,
    description,
    loading,
    error,
    formData,
    redirectToReferrer,
    showDelete,
  } = values;

  const loadCategory = (foodCategoryId) => {
    readFoodCategory(foodCategoryId).then((data) => {
      if (data.error) {
        setValues({ ...values, error: true });
      } else {
        setValues({
          ...values,
          title: data.title,
          description: data.description,
          loading: false,
          formData: new FormData(),
        });
      }
    });
  };
  const { foodCategoryId } = useParams();
  useEffect(() => {
    loadCategory(foodCategoryId);
  },[]);

  const handleChange = (name) => (event) => {
    const value =
      name === "photo1"
        ? event.target.files[0]
        : event.target.value && name === "photo2"
        ? event.target.files[0]
        : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const clickSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, error: "", loading: true });
    updateFoodCategory(token, foodCategoryId, user._id, formData).then(
      (data) => {
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setValues({
            ...values,
            redirectToReferrer: true,
          });
        }
      }
    );
  };

  const redirectUser = () => {
    if (redirectToReferrer) {
      return <Redirect to="/admin/foodCategory" />;
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

  const editCategoryForm = () => {
    return (
      <form>
        <h5 className="text-light-black fw-700">Update The Food Category</h5>
        <div className="row">
          <div className="col-md-12">
            <div className="form-group">
              <label className="text-light-black fw-700">
                Title <sup className="fs-16">*max 40</sup>
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
                Description <sup className="fs-16">*max 60</sup>
              </label>
              <input
                type="text"
                value={description}
                onChange={handleChange("description")}
                className="form-control form-control-submit"
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label className="text-light-black fw-700">
                Category Thumbnail <sup className="fs-16">*max 1mb 125x125</sup>
              </label>
              <input
                type="file"
                name="photo1"
                accept="image/*"
                onChange={handleChange("photo1")}
                className="form-control form-control-submit"
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label className="text-light-black fw-700">
                Category Detail Image{" "}
                <sup className="fs-16">*max 1mb 1920x270</sup>
              </label>
              <input
                type="file"
                name="photo2"
                accept="image/*"
                onChange={handleChange("photo2")}
                className="form-control form-control-submit"
              />
            </div>
          </div>
        </div>
        <button onClick={clickDelete} className="btn btn-danger m-2">
          Delete Food Category
        </button>
        <button onClick={clickSubmit} className="btn-second btn-submit m-2">
          Update Food Category
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

  const deleteCategory = (e) => {
    e.preventDefault();
    setValues({ ...values, error: "", loading: true });
    deleteFoodCategory(token, foodCategoryId, user._id, formData).then((data) => {
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
                <button onClick={deleteCategory} className="btn btn-danger">
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
                          <Link to="/admin/foodCategory" className="add-res-tab">
                            Food Categories
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
                                {!showDelete && editCategoryForm()}
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

export default UpdateCategory;
