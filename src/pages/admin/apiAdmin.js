import { API } from "../../config";

export const createMainSlide = (userId, token, mainSlide) => {
    return fetch(`${API}/mainSlider/create/${userId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: mainSlide,
    })
      .then((response) => {
        return response.json();
      })
      .catch((err) => console.log(err));
  };

  export const getMainSlides = (sortBy) => {
    return fetch(`${API}/mainSlides?sortBy=${sortBy}&order=desc`, {
      method: "GET",
    })
      .then((response) => response.json())
      .catch((err) => console.log(err));
  };

  export const readMainSlide = mainSlideId => {
    return fetch(`${API}/mainSlide/${mainSlideId}`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

  export const updateMainSlide = (token, mainSlideId,userId, mainSlide) => {
    return fetch(`${API}/mainSlide/${mainSlideId}/${userId}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: mainSlide,
    })
      .then((response) => {
        return response.json();
      })
      .catch((err) => console.log(err));
  };

  export const deleteMainSlide = (token, mainSlideId,userId, mainSlide) => {
    return fetch(`${API}/mainSlide/${mainSlideId}/${userId}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: mainSlide,
    })
      .then((response) => {
        return response.json();
      })
      .catch((err) => console.log(err));
  };

  