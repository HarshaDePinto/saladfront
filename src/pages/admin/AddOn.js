import React, { Fragment } from "react";
import MetaTags from "react-meta-tags";
import Header from "../../layoutes/Header";
import Content from "../../sections/addOn/Content";
function WebFront() {
    return (
      <Fragment>
        <MetaTags>
          <title>Salad Factory | Add on </title>
          <meta name="description" content="#" />
        </MetaTags>
        <Header/>
        <Content/>
      </Fragment>
    );
  }
  
  export default WebFront;