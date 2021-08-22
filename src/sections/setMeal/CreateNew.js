import React, { Fragment, useState, useEffect } from "react";
import { isAuthenticated } from "../../auth";
import { createSetMeal, getFoodCategory } from "./apiSetMeal";
import SeTFlavors from "./SetFlavors";

const CreatSetMeal = () => {
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
    time: "",
    photo: "",
    price: "",
    rating: "",
    totalRating:"",
    discount: 0,
    discountPrice: "",
    category: "",
    categories: [],
    flavors: [],
    calorie: "",
    trending: false,
    label: false,
    combo: false,
    loading: false,
    error: "",
    createdSetMeal: "",
    formData: "",
  });

  const {
    title,
    description,
    subtitle,
    time,
    price,
    discount,
    categories,
    calorie,
    loading,
    error,
    createdSetMeal,
    formData,
  } = values;

  const init = () => {
    getFoodCategory().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, categories: data, formData: new FormData() });
      }
    });
  };

  useEffect(() => {
    init();
  }, []);

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;

    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const clickSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, error: "", loading: true });
    createSetMeal(user._id, token, formData).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          title: "",
          description: "",
          subtitle: "",
          photo: "",
          price: "",
          category: "",
          calorie: "",
          veg: false,
          egg: false,
          chill: false,
          lemon: false,
          loading: false,
          createdSetMeal: data.title,
        });
      }
    });
  };

  const newSetMealForm = () => {
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
                  {categories &&
                    categories.map((c, i) => (
                      <Fragment key={i}>
                        <option value={c._id}>{c.title}</option>
                      </Fragment>
                    ))}
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
                  <option>Please Select</option>
                  <option value="1">Make Trending</option>
                  <option value="0">No</option>
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
                  <option>Please Select</option>
                  <option value="1">Make Label</option>
                  <option value="0">No</option>
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
                  <option>Please Select</option>
                  <option value="1">Yes</option>
                  <option value="0">No</option>
                </select>
              </div>
            </div>
            <SeTFlavors
              flavors={allFlavors}
              handleFilters={(filters) => handleFilters(filters, "flavor")}
            />

          </div>
          
          <button onClick={clickSubmit} className="btn-second btn-submit mt-2">
            Add The Set Meal
          </button>
        </form>
      </Fragment>
    );
  };

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );
  const showSuccess = () => (
    <div
      className="alert alert-info"
      style={{ display: createdSetMeal ? "" : "none" }}
    >
      <h2>{`${createdSetMeal}`} is created!</h2>
    </div>
  );

  const showLoading = () =>
    loading && (
      <div className="alert alert-success">
        <h2>Loading...</h2>
      </div>
    );

  return (
    <Fragment>
      <h5 className="text-light-black fw-700">Create New Set Meal</h5>
      {showLoading()}
      {showSuccess()}
      {showError()}
      {newSetMealForm()}
    </Fragment>
  );
};

export default CreatSetMeal;
