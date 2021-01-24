import React, { useEffect, useState } from "react";
import Product from './ProductCart';
import { setCart, } from "../redux/main";
import { connect } from "react-redux";
import Button from '@material-ui/core/Button';
function CartPage(props) {
    const productsInCartAsList = Object.keys(props.cart)
                                    .map(id => ({...props.cart[id], "id":id}))
    
    const productsInCart = productsInCartAsList.map((val, index) => {
        return (<Product prod={val}></Product>)
    })

    const confirmTransaction = () => {
        const timestamp = new Date().toLocaleString("en-GB", {timeZone: "Europe/London"});
        const date = timestamp.split(" ")[0]
        const date_sep = date.substring(0, date.length - 1).split("/")
        const date_reformatted = date_sep[2]+"-"+date_sep[1]+"-"+date_sep[0]
        const time = timestamp.split(" ")[1]
       
        productsInCartAsList.forEach(prod => {
            const transaction = 
                {
                    "when": date_reformatted+" "+time,
                    "item": prod.type,
                    "price": prod.price,
                    "quantity": prod.quantity,
                    "status": true,
                    "user": props.user.id,
                    "seller": prod['seller_id']
                }
                fetch('https://cors-anywhere.herokuapp.com/https://farmer-api-cam.herokuapp.com/api/v1/history_search/', {
                    method: 'POST', 
                    headers: {
                      'Content-Type': 'application/json',
                      'Content-Encoding': 'identity'
                    },
                    body: JSON.stringify(transaction),
                  })
                  .then(response => response.json())
                  .then(data => {
                    console.log('Success:', data);
                  })
                  .catch((error) => {
                    console.error('Error:', error);
                  });
        })
        props.setCart({})
        
        
    }
    const getBill = () => {
        let totalAmt = 0;
        productsInCartAsList.forEach((prod) => {
            totalAmt += prod.quantity * prod.price;
        })
        console.log(totalAmt)
        return totalAmt;
        
    }
    return <div id="cart-page">
        <div id="cart-header">{props.user.name+"'s Cart"}</div>
        <div id="cart-contents">
        {productsInCart}
        </div>
        <div id="bill">{"Amount Due = \u00A3"+ (getBill())}</div>
        <Button variant="outlined" id="confirm-trans" onClick={() => confirmTransaction()}>Confirm Purchase</Button>
    </div>
}

const mapStateToProps = (state) => ({
    cart : state.cart,
    user : state.user
  });
  
  const mapDispatchToProps = {
    setCart
  };
  
const CartPageContainer = connect(mapStateToProps, mapDispatchToProps)(CartPage);
export default CartPageContainer;