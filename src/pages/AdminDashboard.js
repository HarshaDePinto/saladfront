import React, { Fragment } from "react";
import MetaTags from "react-meta-tags";
import Header from "../layoutes/Header";
import Content from "../sections/adminDashboard/Content";
function AdminDashboard() {
    return (
      <Fragment>
        <MetaTags>
          <title>Salad Factory | Admin Dashboard</title>
          <meta name="description" content="#" />
        </MetaTags>
        <Header/>
        <Content/>
      </Fragment>
    );
  }
  
  export default AdminDashboard;