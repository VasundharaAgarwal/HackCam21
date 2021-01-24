
import React, { useEffect, useState } from "react";
import Rating from '@material-ui/lab/Rating';
import Button from '@material-ui/core/Button';
import CounterButtonGroup from './CounterButtonGroup'
export default function Product(props) {
    return (
      <div className="product">
          <div className="product-seller">{props.prod.seller}</div>
          <Rating className="product-rating" value={props.prod.rating} readOnly size="small"/>
          <div className="product-price">{"Price per unit = \u00A3"+props.prod.price}</div>
          <div className="product-distance">{props.prod.distance+" km away"}</div>
          <CounterButtonGroup prod={props.prod}/>
      </div>
    );
  }