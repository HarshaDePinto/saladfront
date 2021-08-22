import React, { Fragment } from "react";
import MetaTags from "react-meta-tags";
import Header from "../../layoutes/Header";
import UpdateAddOn from "../../sections/addOn/Update";
function EditAddOn() {
    return (
      <Fragment>
        <MetaTags>
          <title>Salad Factory | Add On Edit</title>
          <meta name="description" content="#" />
        </MetaTags>
        <Header/>
       <UpdateAddOn/>
      </Fragment>
    );
  }
  
  export default EditAddOn;