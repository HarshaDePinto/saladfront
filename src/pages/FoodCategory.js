import React, { Fragment, useState, useEffect } from "react";
import MetaTags from "react-meta-tags";
import Header from "../layoutes/Header";
import { readFoodCategory } from "./apiFront";
import { useParams } from "react-router-dom";
import Content from "../sections/foodCategoryFront/Content";

function FoodCategoryFront() {
  const [foodCategory, setFoodCategory] = useState({});
  const [error, setError] = useState(false);
  const loadSingleFoodCategory = (foodCategoryId) => {
    readFoodCategory(foodCategoryId).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setFoodCategory(data);
      }
    });
  };
  const { foodCategoryId } = useParams();
  useEffect(() => {
    loadSingleFoodCategory(foodCategoryId);
  }, []);
  return (
    <Fragment>
      <MetaTags>
        <title>Salad Factory | {foodCategory.title}</title>
        <meta name="description" content="#" />
      </MetaTags>
      <Header />
      <Content foodCategory={foodCategory}/>
    </Fragment>
  );
}

export default FoodCategoryFront;
