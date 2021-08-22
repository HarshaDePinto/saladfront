import React, { Fragment } from "react";
import Banner from "./Banner";
import Category from "./Category";
import CollectionBox from "./CollectionBox";

function Content() {
  return (
    <Fragment>
      <Banner />
      <Category/>
      <CollectionBox/>
    </Fragment>
  );
}

export default Content;
