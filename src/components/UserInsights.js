
import React, { useEffect, useState } from "react";
import tomatoes from './../tomatoes.png';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import potatoes from './../potatoes.png';
import lineg from './../lineg.png';
export default function Product(props) {
    const [product, setProduct] = useState('Tomato')
    const [insight, setInsight] = useState('Map')

    const handleProductChange = (event) => {
        setProduct(event.target.value);
      };
    const handleInsightChange = (event) => {
        setInsight(event.target.value);
      };
    var map_src = product == 'Tomato'? tomatoes : potatoes;
    return (
        <div id="insight-page">
        
            <div id="insight-container">
            <img id="insight-map" src={map_src}></img>
            </div>
            <div id="selection-types">
                <div id="product-select-type">Product</div>
                <div id="insight-select-type">Insight Type</div>
            </div>
            <div id="selections">
            <Select
                id="product-select"
                value={product}
                onChange={handleProductChange}
            >
                <MenuItem value={'Tomato'}>Tomato</MenuItem>
                <MenuItem value={'Potato'}>Potato</MenuItem>
                <MenuItem value={'Onion'}>Onion</MenuItem>
                <MenuItem value={'Pepper'}>Pepper</MenuItem>
                <MenuItem value={'Garlic'}>Garlic</MenuItem>
             </Select>
             <Select
                id="insight-select"
                value={insight}
                onChange={handleInsightChange}
            >
                <MenuItem value={'Map'}>Distribution of Buyers</MenuItem>
             </Select>
             
            </div>
            
        </div>
      
      
    );
  }