import React, { Fragment, useState } from "react";
import classNames from "classnames";
import { Modal } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import logo from "../assets/images/logo/logo.png";
import shopImg from "../assets/images/dum/shop-1.png";
import Menu from "./Menu";
import { signOut, isAuthenticated } from "../auth";
import {itemTotal} from "../layoutes/apiLayouts";
import CartSide from "../sections/addToCart/CartSide";

function Header({ history }) {
  const { user } = isAuthenticated();
  const [values, setValues] = useState({
    locationMethod: false,
    cartMethod: false,
    userMethod: false,
    searchShow: false,
    locationShow: false,
  });

  const { locationMethod, cartMethod, userMethod, searchShow, locationShow } =
    values;

  const toggleLoc = () => {
    if (!locationMethod) {
      setValues({ ...values, locationMethod: true });
    } else {
      setValues({ ...values, locationMethod: false });
    }
  };

  const toggleUser = () => {
    if (!userMethod) {
      setValues({ ...values, userMethod: true });
    } else {
      setValues({ ...values, userMethod: false });
    }
  };

  const toggleCart = () => {
    if (!cartMethod) {
      setValues({ ...values, cartMethod: true });
    } else {
      setValues({ ...values, cartMethod: false });
    }
  };

  const setSearchShow = () => {
    setValues({ ...values, searchShow: true });
  };
  const searchClose = () => {
    setValues({ ...values, searchShow: false });
  };
  const setLocationShow = () => {
    setValues({ ...values, locationShow: true });
  };
  const locationClose = () => {
    setValues({ ...values, locationShow: false });
  };
  return (
    <Fragment>
      <div className="header">
        <header className="full-width">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12 mainNavCol">
                {/* logo */}
                <div className="logo mainNavCol">
                  <Link to="/">
                    <img src={logo} className="img-fluid" alt="" />
                  </Link>
                </div>
                {/* logo */}
                <div className="main-search mainNavCol">
                  {isAuthenticated() && (
                    <Fragment>
                      <form className="main-search search-form full-width">
                        <div className="row">
                          {/* location picker */}
                          <div className="col-lg-6 col-md-5">
                            <Link
                              to="#"
                              className={classNames(
                                locationMethod
                                  ? "delivery-add p-relative open"
                                  : "delivery-add p-relative"
                              )}
                              onClick={toggleLoc}
                            >
                              <span className="icon">
                                <i className="fas fa-map-marker-alt" />
                              </span>
                              <span className="address">Maharagama</span>
                            </Link>
                            <div
                              className={classNames(
                                locationMethod
                                  ? "location-picker open"
                                  : "location-picker"
                              )}
                            >
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Enter a new address"
                              />
                            </div>
                          </div>
                          {/* location picker */}
                          {/* search */}
                          <div className="col-lg-6 col-md-7">
                            <div className="search-box padding-10">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Pizza, Burger, Chinese"
                              />
                            </div>
                          </div>
                          {/* search */}
                        </div>
                      </form>
                    </Fragment>
                  )}
                </div>
                <div className="right-side fw-700 mainNavCol">
                  {!isAuthenticated() && (
                    <Fragment>
                      <div className="gem-points">
                        <Link to="/login">
                          {" "}
                          <span>Login</span>
                        </Link>
                      </div>
                      <div className="gem-points">
                        <Link to="/register">
                          {" "}
                          <span>Register</span>
                        </Link>
                      </div>
                    </Fragment>
                  )}

                  <Menu />

                  <div className="mobile-search">
                    <Link to="#" onClick={setSearchShow}>
                      {" "}
                      <i className="fas fa-search" />
                    </Link>
                  </div>

                  {isAuthenticated() && isAuthenticated().user.role === 0 && (
                    <div className="user-details p-relative">
                      <Link
                        to="#"
                        className={classNames(
                          userMethod
                            ? "text-light-white fw-500 active"
                            : "text-light-white fw-500"
                        )}
                        onClick={toggleUser}
                      >
                        <span>Hi, {user.name}</span>
                      </Link>
                      <div
                        className={classNames(
                          userMethod ? "user-dropdown show" : "user-dropdown"
                        )}
                      >
                        <ul>
                          <li>
                            <Link to="/user/dashboard">
                              <div className="icon">
                              <i className="fa fa-cogs"></i>
                              </div>{" "}
                              <span className="details">Dashboard</span>
                            </Link>
                          </li>
                         
                        </ul>
                        <div className="user-footer">
                          {" "}
                          <span className="text-light-black">
                            Not {user.name}?
                          </span>{" "}
                          <Link 
                            onClick={() =>
                              signOut(() => {
                                history.push("/");
                              })
                            }
                          >
                            Sign Out
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}

                  {isAuthenticated() && isAuthenticated().user.role === 1 && (
                    <div className="user-details p-relative">
                      <span
                        to="#"
                        className={classNames(
                          userMethod
                            ? "text-light-white fw-500 active"
                            : "text-light-white fw-500"
                        )}
                        onClick={toggleUser}
                      >
                        <span>Hi, {user.name}</span>
                      </span>
                      <div
                        className={classNames(
                          userMethod ? "user-dropdown show" : "user-dropdown"
                        )}
                      >
                        <ul>
                          <li>
                            <Link to="/admin/dashboard">
                              <div className="icon">
                              <i className="fa fa-cogs"></i>
                              </div>{" "}
                              <span className="details">Dashboard</span>
                            </Link>
                          </li>
                          <li>
                            <Link to="/admin/webFront">
                              <div className="icon">
                              <i className="fa fa-desktop"></i>
                              </div>{" "}
                              <span className="details">WebFront</span>
                            </Link>
                          </li>
                          <li>
                            <Link to="/admin/foodCategory">
                              <div className="icon">
                              <i className="fa fa-list-ul"></i>
                              </div>{" "}
                              <span className="details">Food Category</span>
                            </Link>
                          </li>
                          <li>
                            <Link to="/admin/setMeals">
                              <div className="icon">
                              <i className="fa fa-puzzle-piece"></i>
                              </div>{" "}
                              <span className="details">Set Meals</span>
                            </Link>
                          </li>
                         
                        </ul>
                        <div className="user-footer">
                          {" "}
                          <span className="text-light-black">
                            Not {user.name}?
                          </span>{" "}
                          <Link
                            onClick={() =>
                              signOut(() => {
                                history.push("/");
                              })
                            }
                          >
                            Sign Out
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}

                  {isAuthenticated() && (
                    <div className="cart-btn notification-btn">
                      <Link to="#" className="text-light-green fw-700">
                        {" "}
                        <i className="fas fa-bell" />
                        <span className="user-alert-notification" />
                      </Link>
                      <div className="notification-dropdown">
                        <div className="product-detail">
                          <Link to="#">
                            <div className="img-box">
                              <img src={shopImg} className="rounded" alt="" />
                            </div>
                            <div className="product-about">
                              <p className="text-light-black">Lil Johnny’s</p>
                              <p className="text-light-white">
                                Spicy Maxican Grill
                              </p>
                            </div>
                          </Link>
                        </div>
                        <div className="rating-box">
                          <p className="text-light-black">
                            How was your last order ?.
                          </p>{" "}
                          <span className="text-dark-white">
                            <i className="fas fa-star" />
                          </span>
                          <span className="text-dark-white">
                            <i className="fas fa-star" />
                          </span>
                          <span className="text-dark-white">
                            <i className="fas fa-star" />
                          </span>
                          <span className="text-dark-white">
                            <i className="fas fa-star" />
                          </span>
                          <span className="text-dark-white">
                            <i className="fas fa-star" />
                          </span>
                          <cite className="text-light-white">
                            Ordered 2 days ago
                          </cite>
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="cart-btn cart-dropdown">
                    <Link
                      to="#"
                      className={classNames(
                        cartMethod
                          ? "text-light-green fw-700 active"
                          : "text-light-green fw-700"
                      )}
                      onClick={toggleCart}
                    >
                      <i className="fas fa-shopping-bag" />
                      <span className="user-alert-cart">{itemTotal()}</span>
                    </Link>
                      <CartSide/>
                  </div>
                  {/* user cart */}
                </div>
              </div>
              <div className="col-sm-12 mobile-search">
                <div className="mobile-address">
                  <Link
                    to="#"
                    className="delivery-add"
                    onClick={setLocationShow}
                  >
                    {" "}
                    <span className="address">Maharagama, SL</span>
                  </Link>
                </div>
                <div className="sorting-addressbox">
                  {" "}
                  <span className="full-address text-light-green">
                  Maharagama, SL
                  </span>
                  <div className="btns">
                    <div className="filter-btn">
                      <button type="button">
                        <i className="fas fa-sliders-h text-light-green fs-18" />
                      </button>{" "}
                      <span className="text-light-green">Sort</span>
                    </div>
                    <div className="filter-btn">
                      <button type="button">
                        <i className="fas fa-filter text-light-green fs-18" />
                      </button>{" "}
                      <span className="text-light-green">Filter</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
      </div>
      <div className="main-sec" />
      <Modal
        show={searchShow}
        id="search-box"
        onHide={searchClose}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <button type="button" className="close" onClick={searchClose}>
            ×
          </button>
          <div className="search-box p-relative full-width">
            <input
              type="text"
              className="form-control"
              placeholder="Pizza, Burger, Chinese"
            />
          </div>
        </Modal.Header>
        <Modal.Body></Modal.Body>
      </Modal>
      <Modal
        show={locationShow}
        id="address-box"
        onHide={locationClose}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <button type="button" className="close" onClick={locationClose}>
            ×
          </button>
          <h4 className="modal-title fw-700">Change Address</h4>
        </Modal.Header>
        <Modal.Body>
          <div className="location-picker">
            <input
              type="text"
              className="form-control"
              placeholder="Enter a new address"
            />
          </div>
        </Modal.Body>
      </Modal>
    </Fragment>
  );
}

export default withRouter(Header);
