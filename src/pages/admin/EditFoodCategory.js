import React, { Fragment } from "react";
import MetaTags from "react-meta-tags";
import Header from "../../layoutes/Header";
import UpdateCategory from "../../sections/foodCategory/UpdateCategory";
function EditFoodCategory() {
    return (
      <Fragment>
        <MetaTags>
          <title>Salad Factory | Food Category Edit</title>
          <meta name="description" content="#" />
        </MetaTags>
        <Header/>
       <UpdateCategory/>
      </Fragment>
    );
  }
  
  export default EditFoodCategory;