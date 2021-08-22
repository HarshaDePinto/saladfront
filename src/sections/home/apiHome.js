import { API } from "../../config";

export const getFrontSlide = () => {
  return fetch(`${API}/frontSlides`, {
    method: "GET",
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

export const getHomeFoodCategory = () => {
  return fetch(`${API}/home/foodCategories`, {
    method: "GET",
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

export const getHomeSetMeals = () => {
  return fetch(`${API}/setMeals`, {
    method: "GET",
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};




