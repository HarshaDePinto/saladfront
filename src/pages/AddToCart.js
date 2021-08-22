import React, { Fragment } from 'react';
import MetaTags from "react-meta-tags";
import Header from "../layoutes/Header";
import Content from "../sections/addToCart/Content"
function AddToCart() {
    return (
      <Fragment>
        <MetaTags>
          <title>Salad Factory | Add To Cart</title>
          <meta name="description" content="#" />
        </MetaTags>
        <Header/>
        <Content/>
      </Fragment>
    );
  }
  
  export default AddToCart;