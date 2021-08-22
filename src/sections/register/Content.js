import React, { useState } from "react";
import { signUp } from "../../auth";
import { Link } from "react-router-dom";
import banner from "../../assets/images/dum/banner-1.jpg";
import logo from "../../assets/images/logo/green.png";
import burger from "../../assets/images/dum/burger.png";
import facebook from "../../assets/images/logo/facebook-logo.svg";
import google from "../../assets/images/logo/google-logo.png";

function Content() {
  const [values, setValues] = useState({
    name: "",
    mobile: "",
    password: "",
    error: "",
    success: false,
    showPassword: false,
  });
  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };
  const { name, mobile, password, success, error, showPassword } = values;

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    signUp({ name, mobile, password }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, success: false });
      } else {
        setValues({
          ...values,
          error: "",
          name: "",
          mobile: "",
          password: "",
          success: true,
        });
      }
    });
  };

  const setShowPassword = () => {
    if (!showPassword) {
      setValues({ ...values, showPassword: true });
    } else {
      setValues({ ...values, showPassword: false });
    }
  };

  const signUpForm = () => {
    return (
      <form>
        <h4 className="text-light-black fw-600 mt-5">Create your account</h4>
        {showError()}
        {showSuccess()}
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-6">
            <div className="form-group">
              <label className="text-light-white fs-14">Full Name</label>
              <input
                type="text"
                className="form-control form-control-submit"
                id="name"
                value={name}
                onChange={handleChange("name")}
              />
            </div>
          </div>

          <div className="col-12">
            <div className="form-group">
              <label className="text-light-white fs-14">Mobile Number</label>
              <input
                type="text"
                className="form-control form-control-submit"
                id="mobile"
                value={mobile}
                onChange={handleChange("mobile")}
              />
            </div>
            <div className="form-group">
              <label className="text-light-white fs-14">
                Password (6 character minimum with a number)
              </label>
              <input
                type={showPassword ? "text" : "password"}
                className="form-control form-control-submit"
                id="password"
                value={password}
                onChange={handleChange("password")}
              />
              <div
                className="fa fa-fw fa-eye field-icon"
                onClick={setShowPassword}
              />
            </div>
            <div className="form-group">
              <button
                onClick={clickSubmit}
                className="btn-second btn-submit full-width"
              >
                Create your account
              </button>
            </div>
            <div className="form-group text-center">
              {" "}
              <span>or</span>
            </div>
            <div className="form-group">
              <button
                type="submit"
                className="btn-second btn-facebook full-width"
              >
                <img src={facebook} alt="logo" />
                Continue with Facebook
              </button>
            </div>
            <div className="form-group">
              <button
                type="submit"
                className="btn-second btn-google full-width"
              >
                <img src={google} alt="logo" />
                Continue with Google
              </button>
            </div>
            <div className="form-group text-center">
              <p className="text-light-black mb-0">
                Have an account? <Link to="/login">Sign in</Link> |{" "}
                <Link to="/">Back To Home</Link>
              </p>
            </div>{" "}
            <span className="text-light-black fs-12 terms">
              By creating your Salad Factory account, you agree to the{" "}
              <Link to="#"> Terms of Use </Link> and{" "}
              <Link to="#"> Privacy Policy.</Link>
            </span>
          </div>
        </div>
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
      style={{ display: success ? "" : "none" }}
    >
      New Account Created, <Link to="/login">Please Sign In</Link>
    </div>
  );
  return (
    <div className="inner-wrapper">
      <div className="container-fluid no-padding">
        <div className="row no-gutters overflow-auto">
          <div className="col-md-6">
            <div className="main-banner">
              <img
                src={banner}
                className="img-fluid full-width main-img"
                alt="banner"
              />
              <div className="overlay-2 main-padding">
                <img src={logo} className="img-fluid" alt="logo" />
              </div>
              <img src={burger} className="footer-img" alt="footer-img" />
            </div>
          </div>
          <div className="col-md-6">
            <div className="section-2 user-page main-padding">
              <div className="login-sec">
                <div className="login-box">{signUpForm()}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Content;
