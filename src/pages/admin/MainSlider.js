import React, { Fragment } from "react";
import MetaTags from "react-meta-tags";
import Header from "../../layoutes/Header";
import Content from "../../sections/mainSlider/Content";
function MainSlider() {
    return (
      <Fragment>
        <MetaTags>
          <title>Salad Factory | MainSlider</title>
          <meta name="description" content="#" />
        </MetaTags>
        <Header/>
        <Content/>
      </Fragment>
    );
  }
  
  export default MainSlider;