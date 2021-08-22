import { API } from "../config";

export const readFoodCategory = (foodCategoryId) => {
    return fetch(`${API}/foodCategory/${foodCategoryId}`, {
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
      .catch((err) => console.log(err));
  };