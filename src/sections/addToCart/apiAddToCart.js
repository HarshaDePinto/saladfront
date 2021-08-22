import { API } from "../../config";
export const getFoodCategory = () => {
    return fetch(`${API}/admin/foodCategories`, {
      method: "GET",
    })
      .then((response) => response.json())
      .catch((err) => console.log(err));
  };

  export const readSetMeal = setMealId => {
    return fetch(`${API}/setMeal/${setMealId}`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
  };

  export const getAddOn = () => {
    return fetch(`${API}/addOns`, {
      method: "GET",
    })
      .then((response) => response.json())
      .catch((err) => console.log(err));
  };

  export const addItem = (item, next) => {
    let cart = [];
    if (typeof window !== undefined) {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      cart.push({
        ...item,
        count: 1,
      });
  
      localStorage.setItem("cart", JSON.stringify(cart));
      next();
    }
  };

  export const getCart = () => {
    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        return JSON.parse(localStorage.getItem("cart"));
      }
    }
    return [];
  };