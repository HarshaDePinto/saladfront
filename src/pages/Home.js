import React, { Fragment } from "react";
import MetaTags from "react-meta-tags";
import Header from "../layoutes/Header";
import Content from "../sections/home/Content";

function HomePage() {
  return (
    <Fragment>
      <MetaTags>
        <title>Salad Factory | Homepage</title>
        <meta name="description" content="#" />
      </MetaTags>
      <Header/>
      <Content/>
    </Fragment>
  );
}

export default HomePage;
