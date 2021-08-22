import React, { Fragment } from "react";
import MetaTags from "react-meta-tags";
import Header from "../../layoutes/Header";
import UpdateSetMeal from "../../sections/setMeal/UpdateSetMeal";
function EditSetMeal() {
    return (
      <Fragment>
        <MetaTags>
          <title>Salad Factory | Set Meal Edit</title>
          <meta name="description" content="#" />
        </MetaTags>
        <Header/>
       <UpdateSetMeal/>
      </Fragment>
    );
  }
  
  export default EditSetMeal;