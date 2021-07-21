import React from 'react';
import {connect} from 'react-redux';
import CartCard from '../components/cartCard.js';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import '@adyen/adyen-web/dist/adyen.css';

class CartContainer extends React.Component {

  URL = (route) => {return `http://localhost:6969/adyen/${route}`}

  initiateCheckout = () => {
    const total = this.props.cart.reduce((a, b) => a + b.name.cost, 0)
    fetch(this.URL("paymentsResponse"), {
        method: 'POST',
        headers: {
          'content-type':'application/json',
        },
        body: JSON.stringify({
          "countryCode": "US",
          "shopperLocale": "en-US",
          "currency": "USD",
          "value": total * 100
      })
    })
      .then(res=>res.json())
      .then(data=>{
        this.props.addPaymentMethod(data)
      })
      .catch(err=>console.error(err))
  }

  render(){
    return (
      <div>
        {this.props.cart.length !== 0 ?
            <div>
              {this.props.cart.map((product, index) => (
                <CartCard key={product.product_id} product={product} removeFromCart={this.props.removeFromCart} />
              ))}
              <Divider />
              <div key="total">
                <Typography component="h5" variant="h5">
                  Total ${this.props.cart.reduce((a, b) => a + b.name.cost, 0)}
                </Typography>
              </div>
              <Divider />
              <div key="button">
                <Button variant="contained"
                  onClick={()=>this.initiateCheckout()}
                >Checkout</Button>
              </div>
            </div>
        :
        <Typography>
          Cart is Empty!
        </Typography>
      }
      </div>
    );
  }
}

const mapStateToProps = ({ cart }) => ({ cart })

const mapDispatchToProps = dispatch => ({
  removeFromCart: id => dispatch({ type: "REMOVE_FROM_CART", id}),
  addPaymentMethod: paymentMethod => dispatch({ type: "ADD_PAYMENT_METHOD", paymentMethod}),
})

export default connect(mapStateToProps, mapDispatchToProps)(CartContainer)
