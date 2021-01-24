
import React, { useEffect, useState } from "react";
import CounterButtonGroup from './CounterButtonGroup'
export default function Product(props) {
    return (
      <div className="product">
          <div className="product-type">{props.prod.type}</div>
          <div className="product-seller">{props.prod.seller}</div>
          <div className="product-total-price">{"\u00A3"+props.prod.price+" x "+props.prod.quantity+"= \u00A3"+(props.prod.price*props.prod.quantity)}</div>
          <CounterButtonGroup prod={props.prod}/>
      </div>
    );
  }