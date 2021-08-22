import React, { useState , useEffect} from "react";
import { Link,withRouter  } from "react-router-dom";
import classNames from "classnames";
import collection from "../assets/images/dum/nav-1.jpg";
import { signOut, isAuthenticated } from "../auth";
import { Fragment } from "react";
import { getFoodCategory } from "../sections/foodCategory/apiFoodCategory";


function Menu({ history }) {
  const [allFoodCategory, setAllFoodCategory] = useState([]);
  const [error, setError] = useState(false);
  const getAllFoodCategory = () => {
    getFoodCategory().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setAllFoodCategory(data);
      }
    });
  };
  useEffect(() => {
    getAllFoodCategory();
  }, []);
  const { user } = isAuthenticated();
  const [navMethod, setNavMethod] = useState(false);

  const toggleNav = () => {
    if (!navMethod) {
      setNavMethod(true);
    } else {
      setNavMethod(false);
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
  return (
    <div className="catring parent-megamenu">
      {showError()}
      <Link
        to="#"
        className={classNames(navMethod ? "active" : "")}
        onClick={toggleNav}
      >
        <span>
          Explore <i className="fas fa-caret-down" />
        </span>
        <i className="fas fa-bars" />
      </Link>
      <div
        className={classNames(navMethod ? "megamenu show" : "megamenu")}
        onClick={toggleNav}
      >
        <div className="row">
          <div className="col-sm-12">
            <div className="row">
              <div className="col-lg-4 col-md-5">
                <div className="ex-collection-box h-100">
                  <Link to="#">
                    <img
                      src={collection}
                      className="img-fluid full-width h-100"
                      alt=""
                    />
                  </Link>
                  <div className="category-type overlay padding-15"></div>
                </div>
              </div>
              <div className="col-lg-8 col-md-7">
                <div className="row">
                  <div className="col-lg-4 col-sm-6">
                    <div className="menu-style">
                      <div className="menu-title">
                        <h6 className="cat-name">
                          <Link to="#" className="text-light-black">
                            Our Menu
                          </Link>
                        </h6>
                      </div>
                      <ul>
                        {allFoodCategory.map((c,i)=>(
                          <Fragment key={i}>
                              <li>
                                <Link to="/" className="text-light-white fw-500" >
                                  {c.title}
                                </Link>
                              </li>
                          </Fragment>))}
                       
                      </ul>
                    </div>
                  </div>
                  <div className="col-lg-4 col-sm-6">
                    <div className="menu-style">
                      <div className="menu-title">
                        <h6 className="cat-name">
                          <Link to="#" className="text-light-black">
                            Join With Us
                          </Link>
                        </h6>
                      </div>
                      <ul>
                        <li>
                          <Link
                            to="/register"
                            className="text-light-white fw-500"
                          >
                            Register
                          </Link>
                        </li>
                        <li>
                          <Link to="/login" className="text-light-white fw-500">
                            Login
                          </Link>
                        </li>
                        <li>
                          <Link to="/" className="text-light-white fw-500">
                            Privacy
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-lg-4 col-sm-6">
                    <div className="menu-style">
                      {isAuthenticated() && isAuthenticated().user.role === 1 && (
                        <Fragment>
                          <div className="menu-title">
                            <h6 className="cat-name">
                              <Link to="#" className="text-light-black">
                                Hi, {user.name}
                              </Link>
                            </h6>
                          </div>
                          <ul>
                            <li>
                              <Link
                                to="/admin/dashboard"
                                className="text-light-white fw-500"
                              >
                                Dashboard
                              </Link>
                            </li>
                            <li>
                              <Link
                                to="/admin/webFront"
                                className="text-light-white fw-500"
                              >
                                WebFront
                              </Link>
                            </li>
                            <li>
                              <Link
                                to="/admin/foodCategory"
                                className="text-light-white fw-500"
                              >
                                Food Category
                              </Link>
                            </li>
                            <li>
                              <Link
                                to="/admin/setMeals"
                                className="text-light-white fw-500"
                              >
                                Set Meals
                              </Link>
                            </li>
                            <li>
                              <Link
                                onClick={() =>
                                  signOut(() => {
                                    history.push("/");
                                  })
                                }
                              >
                                Sign Out
                              </Link>
                            </li>
                          </ul>
                        </Fragment>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(Menu);
