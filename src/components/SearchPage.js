import React, { useEffect, useState } from "react";
import Product from './ProductSearch';
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import IconButton from "@material-ui/core/IconButton";
import TextField from '@material-ui/core/TextField';

export default function SearchPage(props) {
    const [productsJson, setProductsJson] = useState([])
    let [query, setQuery] = useState("")

    const handleOnChange = (event) => {
        setQuery(event.target.value)
    }
    const processQuery = (query) => {
        let productsList = []
        fetch("https://farmer-api-cam.herokuapp.com/api/v1/crop_search/?crops="+query+"&latitude=52.256348829257426&longitude=0.03617957230546")
            .then(response => response.json())
            .then(prodsList => {
                const promises = [];
                prodsList.forEach((prod) => {
                    console.log(prod)
                    let prodToShow = {}
                    let sellerID = prod.seller;
                    const promise = fetch("https://farmer-api-cam.herokuapp.com/api/v1/seller_search/?id="+sellerID)
                                    .then((response) => response.json())
                                    .then(sellerList => {
                                        let seller = sellerList[0]
                                        prodToShow['id'] = prod.id;
                                        prodToShow['seller'] = seller.shop_name;
                                        prodToShow['price'] = prod.price;
                                        prodToShow['rating'] = prod.ratings;
                                        prodToShow['distance'] = 4;
                                        prodToShow['quantity'] = prod.quantity;
                                        prodToShow['type'] = prod.crops;
                                        prodToShow['seller_id'] = seller.id;
                                        productsList.push(prodToShow)
                                    })
                    promises.push(promise)
                })
                Promise.all(promises).then((values) => setProductsJson(productsList))
            })
    }

    //let products = [ {"seller":"John's Local", "price":20, "rating":1, "distance":2.5}, {"seller":"Keepin It Fresh", "price":40, "rating":2, "distance":1.5}]
    const productsList = productsJson.map((val, index) => {
    return (<Product prod={val}></Product>)
  })
    return(
        <div id="search-page">
    <div id="search-box">
    <TextField
               fullWidth
               placeholder="Enter an item"
               margin="normal"
               variant="outlined"
               onChange = {handleOnChange}
               InputProps={{
                endAdornment: (
                  <InputAdornment>
                    <IconButton onClick={() => processQuery(query)}>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                )
              }} />
    </div> 
    <div id="products-list">
      {productsList}            
    </div>
    </div>
    )
          
}