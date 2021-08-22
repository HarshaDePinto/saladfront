import React, { Fragment } from "react";
import MetaTags from "react-meta-tags";
import Header from "../../layoutes/Header";
import Content from "../../sections/setMeal/Content";
function SetMeals() {
    return (
      <Fragment>
        <MetaTags>
          <title>Salad Factory | Set Meals</title>
          <meta name="description" content="#" />
        </MetaTags>
        <Header/>
        <Content/>
      </Fragment>
    );
  }
  
  export default SetMeals;