import React, { Fragment, useState, useEffect } from "react";
import { isAuthenticated } from "../../auth";
import { createMainSlide } from "../../pages/admin/apiAdmin";


const CreateSlide = () => {
  const { user, token } = isAuthenticated();

  const [values, setValues] = useState({
    title: "",
    subtitle: "",
    position: "",
    colPosition: "",
    photo: "",
    active: false,
    loading: false,
    error: "",
    createdSlide: "",
    formData: "",
  });

  const {
    title,
    subtitle,
    loading,
    error,
    createdSlide,
    formData,
  } = values;

  useEffect(() => {
    setValues({ ...values, formData: new FormData() });
  }, []);

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const clickSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, error: "", loading: true });
    createMainSlide(user._id, token, formData).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          title: "",
          subtitle: "",
          photo: "",
          position: "",
          colPosition: "",
          active: false,
          loading: false,
          createdSlide: data.title,
        });
      }
    });
  };
  const newSlideForm = () => {
    return (
      <form>
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
                <option>Please Select</option>
                <option value="1">Make Active</option>
                <option value="0">No</option>
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
        <button onClick={clickSubmit} className="btn-second btn-submit">
          Add The Slide
        </button>
      </form>
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
      style={{ display: createdSlide ? "" : "none" }}
    >
      <h2>{`${createdSlide}`} is created!</h2>
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
      <h5 class="text-light-black fw-700">Create New Slide</h5>
      {showLoading()}
      {showSuccess()}
      {showError()}
      {newSlideForm()}
    </Fragment>
  );
};

export default CreateSlide;
