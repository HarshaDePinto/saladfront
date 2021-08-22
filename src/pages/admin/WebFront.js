import React, { Fragment } from "react";
import MetaTags from "react-meta-tags";
import Header from "../../layoutes/Header";
import Content from "../../sections/webFront/Content";
function WebFront() {
    return (
      <Fragment>
        <MetaTags>
          <title>Salad Factory | Web Frontend</title>
          <meta name="description" content="#" />
        </MetaTags>
        <Header/>
        <Content/>
      </Fragment>
    );
  }
  
  export default WebFront;