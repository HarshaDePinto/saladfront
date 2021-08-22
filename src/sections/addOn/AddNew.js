import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../../auth";
import { createAddOn } from "./apiAddOn";

function AddNew() {
  const { user, token } = isAuthenticated();
  const [values, setValues] = useState({
    title: "",
    price: "",
    available: "",
    addType: "",
    loading: false,
    error: "",
    createdAddOn: "",
    formData: "",
  });
  const {
    title,
    price,
    available,
    loading,
    addType,
    error,
    createdAddOn,
    formData,
  } = values;

  useEffect(() => {
    setValues({ formData: new FormData() });
  }, []);

  const handleChange = (name) => (event) => {
    const value = event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };
  const clickSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, error: "", loading: true });
    createAddOn(user._id, token, formData).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          title: "",
          price: "",
          available: "",
          addType: "",
          loading: false,
          createdAddOn: data.title,
        });
      }
    });
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
      style={{ display: createdAddOn ? "" : "none" }}
    >
      <h2>{`${createdAddOn}`} is created!</h2>
    </div>
  );

  const showLoading = () =>
    loading && (
      <div className="alert alert-success">
        <h2>Loading...</h2>
      </div>
    );
  const newAddOnForm = () => {
    return (
      <Fragment>
        <form>
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
                  <option>Please Select</option>
                  <option value="1">Available</option>
                  <option value="0">Not Available</option>
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
                  <option>Please Select</option>
                  <option value="1">Premium</option>
                  <option value="0">General</option>
                </select>
              </div>
            </div>
          </div>
          <button
            onClick={clickSubmit}
            className="btn-second btn-submit float-right"
          >
            Submit
          </button>
        </form>
      </Fragment>
    );
  };
  return (
    <Fragment>
      {showSuccess()}
      {showError()}
      {showLoading()}

      {newAddOnForm()}
    </Fragment>
  );
}

export default AddNew;
