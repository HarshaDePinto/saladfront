import { API } from "../../config";

export const createFoodCategory = (userId, token, foodCategory) => {
  return fetch(`${API}/foodCategory/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: foodCategory,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getFoodCategory = () => {
  return fetch(`${API}/admin/foodCategories`, {
    method: "GET",
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

export const readFoodCategory = (foodCategoryId) => {
  return fetch(`${API}/foodCategory/${foodCategoryId}`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const updateFoodCategory = (token, foodCategoryId,userId, foodCategory) => {
    return fetch(`${API}/foodCategory/${foodCategoryId}/${userId}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: foodCategory,
    })
      .then((response) => {
        return response.json();
      })
      .catch((err) => console.log(err));
  };

  export const deleteFoodCategory = (token, foodCategoryId,userId, foodCategory) => {
    return fetch(`${API}/foodCategory/${foodCategoryId}/${userId}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: foodCategory,
    })
      .then((response) => {
        return response.json();
      })
      .catch((err) => console.log(err));
  };
