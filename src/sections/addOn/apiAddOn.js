import { API } from "../../config";

export const createAddOn = (userId, token, addOn) => {
  return fetch(`${API}/addOn/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: addOn,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getAddOn = () => {
  return fetch(`${API}/addOns`, {
    method: "GET",
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

export const updateAddOn = (token, addOnId, userId, addOn) => {
  return fetch(`${API}/addOn/${addOnId}/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: addOn,
  })
    .then((response) => {
      return response.json();
    })
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

export const deleteAddOn = (token, addOnId,userId, addOn) => {
  return fetch(`${API}/addOn/${addOnId}/${userId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: addOn,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
