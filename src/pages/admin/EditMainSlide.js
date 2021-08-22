import React, { Fragment } from "react";
import MetaTags from "react-meta-tags";
import Header from "../../layoutes/Header";
import UpdateSlide from "../../sections/mainSlider/UpdateSlide";
function EditMainSlide() {
    return (
      <Fragment>
        <MetaTags>
          <title>Salad Factory | Main Slide Edit</title>
          <meta name="description" content="#" />
        </MetaTags>
        <Header/>
       <UpdateSlide/>
      </Fragment>
    );
  }
  
  export default EditMainSlide;