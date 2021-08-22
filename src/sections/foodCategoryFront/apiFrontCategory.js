import { API } from "../../config";
export const getMealByCategory = (foodCategoryId) => {
  return fetch(`${API}/setMeals/byCategory/${foodCategoryId}`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const addItem = (item,addOn, next) => {
  let cart = [];
  if (typeof window !== undefined) {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }
    cart.push({
      ...item,
      ...addOn,
      count: 1,
    });
    cart = Array.from(new Set(cart.map((p) => p._id))).map((id) => {
      return cart.find((p) => p._id === id);
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

export const getAddOn = () => {
  return fetch(`${API}/addOns/addOnIds`, {
    method: "GET",
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};
export const readAddOn = (addOnId) => {
  return fetch(`${API}/addOn/${addOnId}`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};