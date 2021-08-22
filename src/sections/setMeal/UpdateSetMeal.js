import React, { Fragment, useState, useEffect } from "react";
import { isAuthenticated } from "../../auth";
import CatList from "./CatList";
import { updateSetMeal, readSetMeal, deleteSetMeal } from "./apiSetMeal";
import { Link, useParams, Redirect } from "react-router-dom";
import SeTFlavors from "./SetFlavors";

const UpdateSetMeal = () => {
  const { user, token } = isAuthenticated();
  const allFlavors = ["leaf", "chili", "chef", "protein", "lemon"];
  const handleFilters = (filters) => {
    setValues({ ...values, error: "", flavors: filters });
    formData.set("flavors", filters);
  };
  const [values, setValues] = useState({
    title: "",
    description: "",
    subtitle: "",
    photo: "",
    price: "",
    category: "",
    categories: [],
    flavors: [],
    calorie: "",
    time: "",
    discount: 0,
    discountPrice: "",
    rating: "",
    totalRating: "",
    trending: false,
    label: false,
    combo: false,
    loading: false,
    loading: true,
    error: "",
    formData: "",
    redirectToReferrer: false,
    showDelete: false,
  });
  const {
    title,
    description,
    subtitle,
    time,
    price,
    discount,
    category,
    calorie,
    trending,
    label,
    flavors,
    combo,
    loading,
    error,
    formData,
    redirectToReferrer,
    showDelete,
  } = values;

  const loadSetMeal = (setMealId) => {
    readSetMeal(setMealId).then((data) => {
      if (data.error) {
        setValues({ ...values, error: true });
      } else {
        setValues({
          ...values,
          title: data.title,
          subtitle: data.subtitle,
          description: data.description,
          price: data.price,
          calorie: data.calorie,
          category: data.category,
          time: data.time,
          discount: data.discount,
          flavors: data.flavors,
          rating: data.rating,
          totalRating: data.totalRating,
          loading: false,
          formData: new FormData(),
        });
      }
    });
  };
  const { setMealId } = useParams();
  useEffect(() => {
    loadSetMeal(setMealId);
  }, []);

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const clickSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, error: "", loading: true });
    updateSetMeal(token, setMealId, user._id, formData).then((data) => {
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
      return <Redirect to="/admin/setMeals" />;
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

  const editSetMealForm = () => {
    return (
      <Fragment>
        <form>
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
            <div className="col-md-12">
              <div className="form-group">
                <label className="text-light-black fw-700">
                  Description <sup className="fs-16">*max 2000</sup>
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
                  Time For Preparation <sup className="fs-16">*</sup>
                </label>
                <input
                  type="text"
                  value={time}
                  onChange={handleChange("time")}
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
                  Discount <sup className="fs-16">100%*</sup>
                </label>
                <input
                  type="number"
                  value={discount}
                  onChange={handleChange("discount")}
                  className="form-control form-control-submit"
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label className="text-light-black fw-700">
                  Discounted Price <sup className="fs-16">*</sup>
                </label>
                <input
                  type="number"
                  value={(price * (100 - discount)) / 100}
                  onChange={handleChange("discountPrice")}
                  className="form-control form-control-submit"
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label className="text-light-black fw-700">
                  Calorie Count <sup className="fs-16">*</sup>
                </label>
                <input
                  type="number"
                  value={calorie}
                  onChange={handleChange("calorie")}
                  className="form-control form-control-submit"
                />
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-group">
                <label className="text-light-black fw-700">
                  Meal Thumbnail <sup className="fs-16">*max 1mb 255x150</sup>
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
                  Select Category<sup className="fs-16">*</sup>
                </label>

                <select
                  className="form-control form-control-submit"
                  onChange={handleChange("category")}
                >
                  <option>Please Select</option>
                  <CatList category={category} />
                </select>
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-group">
                <label className="text-light-black fw-700">
                  Make Trending<sup className="fs-16">*</sup>
                </label>

                <select
                  className="form-control form-control-submit"
                  onChange={handleChange("trending")}
                >
                  {trending && (
                    <Fragment>
                      <option value="1">Trending</option>
                      <option value="0">Set No</option>
                    </Fragment>
                  )}
                  {!trending && (
                    <Fragment>
                      <option value="0">Not Trending</option>
                      <option value="1">Set Trending</option>
                    </Fragment>
                  )}
                </select>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label className="text-light-black fw-700">
                  Make Label<sup className="fs-16">*</sup>
                </label>

                <select
                  className="form-control form-control-submit"
                  onChange={handleChange("label")}
                >
                  {label && (
                    <Fragment>
                      <option value="1">Labeled</option>
                      <option value="0">Set No</option>
                    </Fragment>
                  )}
                  {!label && (
                    <Fragment>
                      <option value="0">Not Labeled</option>
                      <option value="1">Set Label</option>
                    </Fragment>
                  )}
                </select>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label className="text-light-black fw-700">
                  Have Combo?<sup className="fs-16">*</sup>
                </label>

                <select
                  className="form-control form-control-submit"
                  onChange={handleChange("combo")}
                >
                  {combo && (
                    <Fragment>
                      <option value="1">Yes</option>
                      <option value="0">Set No</option>
                    </Fragment>
                  )}
                  {!combo && (
                    <Fragment>
                      <option value="0">No</option>
                      <option value="1">Set Yes</option>
                    </Fragment>
                  )}
                </select>
              </div>
            </div>
            
            <SeTFlavors
              flavors={allFlavors}
              handleFilters={(filters) => handleFilters(filters, "flavor")}
            />
          </div>
          <p  > <span className="text-light-green fw-700">Selected:</span>  {JSON.stringify(flavors)}</p>
          <button onClick={clickDelete} className="btn btn-danger m-2">
            Delete Meal
          </button>
          <button onClick={clickSubmit} className="btn-second btn-submit m-2">
            Update Meal
          </button>
        </form>
      </Fragment>
    );
  };

  const clickDelete = () => {
    setValues({ ...values, showDelete: true });
  };

  const cancelDelete = () => {
    setValues({ ...values, showDelete: false });
  };

  const deleteSetMealHandler = (e) => {
    e.preventDefault();
    setValues({ ...values, error: "", loading: true });
    deleteSetMeal(token, setMealId, user._id, formData).then((data) => {
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
                <button
                  onClick={deleteSetMealHandler}
                  className="btn btn-danger"
                >
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
                          <Link to="/admin/setMeals" className="add-res-tab">
                            All Set Meals
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
                                {!showDelete && editSetMealForm()}
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

export default UpdateSetMeal;
