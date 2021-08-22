import React, {Fragment } from 'react';
import Top from './Top';
import Details from './Details';
import Meals from './Meals';


function Content({foodCategory}){
    return (
        <Fragment>
            <Top foodCategoryId={foodCategory._id}/>
            <Details foodCategoryDetail={foodCategory}/>
            <Meals foodCategoryId={foodCategory._id}/>
        </Fragment>
    );
}



export default Content;