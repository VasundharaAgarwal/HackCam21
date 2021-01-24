import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import React from 'react';
import { setCart } from "../redux/main";
import { connect } from "react-redux";
class CounterButtonGroup extends React.Component {
    componentWillMount() {
      console.log(this.props)
    }
  
    handleIncrement = () => {
      var productInCart = this.props.cart[this.props.prod.id]
      if(productInCart)
        this.props.setCart({...this.props.cart, [this.props.prod.id]:{...productInCart, "quantity" : productInCart['quantity']+1}})
      else
        this.props.setCart({...this.props.cart, [this.props.prod.id]:{...this.props.prod, "quantity" : 1}})
     
    };
  
    handleDecrement = () => {
      var productInCart = this.props.cart[this.props.prod.id]
      if(productInCart)
        var quantity = productInCart['quantity']
        if(quantity > 1)
          this.props.setCart({...this.props.cart, [this.props.prod.id]:{...productInCart, "quantity" : quantity-1}})
        else {
          var newCart = {...this.props.cart}
          delete newCart[this.props.prod.id]
          this.props.setCart(newCart)
        }
    };
    render() {
      return (
        <ButtonGroup class="counter-button-group" size="small" aria-label="small outlined button group">
          <Button onClick={this.handleDecrement}>-</Button>
          <Button disabled>{this.props.cart[this.props.prod.id]?this.props.cart[this.props.prod.id]["quantity"]:0}</Button>
          <Button onClick={this.handleIncrement}>+</Button>
        </ButtonGroup>
      );
    }
  }

  const mapStateToProps = (state) => ({
    cart : state.cart,
  });
  
  const mapDispatchToProps = {
    setCart
  };
  
const CounterButtonGroupContainer = connect(mapStateToProps, mapDispatchToProps)(CounterButtonGroup);
export default CounterButtonGroupContainer;