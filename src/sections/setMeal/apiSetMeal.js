import { API } from "../../config";

export const getFoodCategory = () => {
  return fetch(`${API}/admin/foodCategories`, {
    method: "GET",
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

export const createSetMeal = (userId, token, setMeal) => {
  return fetch(`${API}/setMeal/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: setMeal,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getFilteredSetMeals = (skip, filters = {}) => {
    const data = {
        
        skip,
        filters
    };
    return fetch(`${API}/setMeals/by/search`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
};

export const updateSetMeal = (token, setMealId,userId, setMeal) => {
  return fetch(`${API}/setMeal/${setMealId}/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: setMeal,
  })
    .then((response) => {
      return response.json();
    })
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

export const deleteSetMeal = (token, setMealId,userId, setMeal) => {
  return fetch(`${API}/setMeal/${setMealId}/${userId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: setMeal,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
