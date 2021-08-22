import React, { Fragment } from "react";
import MetaTags from "react-meta-tags";
import Header from "../layoutes/Header";
import Content from "../sections/userDashboard/Content";

function UserDashboard() {
    return (
      <Fragment>
        <MetaTags>
          <title>Salad Factory | UserDashboard</title>
          <meta name="description" content="#" />
        </MetaTags>
        <Header/>
        <Content/>
      </Fragment>
    );
  }
  
  export default UserDashboard;