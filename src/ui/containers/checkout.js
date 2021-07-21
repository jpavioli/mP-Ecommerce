import React from 'react';
import {connect} from 'react-redux';
import CheckoutCard from '../components/checkoutCard.js';
import AddressForm from '../components/addressForm.js';
import {makePayment,makeDetailsCall} from '../actions/adyenActions.js';
import {settings} from '../../assets/default.js'

import AdyenCheckout from '@adyen/adyen-web';
import '@adyen/adyen-web/dist/adyen.css';

import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';


class Checkout extends React.Component {

  componentDidUpdate(){
    if (this.props.user) {
      const configuration = {
         paymentMethodsResponse: this.props.paymentMethod, // The `/paymentMethods` response from the server.
         clientKey: "test_QE62X2LEK5CJRALERBE3GQHTOIHFPXF5", // Web Drop-in versions before 3.10.1 use originKey instead of clientKey.
         locale: "en-US",
         environment: "test",
         onSubmit: (state, dropin) => {
             // Global configuration for onSubmit
             // Your function calling your server to make the `/payments` request
             makePayment({
               ...state.data,
               cart:this.props.cart
             })
               .then(response=>{
                 if (response.action) {
                   // Drop-in handles the action object from the /payments response
                   dropin.handleAction(response.action);
                 } else {
                   // Your function to show the final result to the shopper
                   let data = {
                     user:this.props.user,
                     cart:this.props.cart,
                     transaction:{id:response.merchantReference,...response.amount,pspReference:response.pspReference}
                   }
                   dropin.setStatus('success');
                   dropin.setStatus('success', { message: `Order #${response.merchantReference} Payment successful!` });
                   setTimeout(()=>{this.props.reset(data)}, 5000);
                 }
               })
               .catch(error => {
                 throw Error(error);
               });
           },
         onAdditionalDetails: (state, dropin) => {
           // Your function calling your server to make a `/payments/details` request
           makeDetailsCall(state.data)
             .then(response => {
               if (response.action) {
                 // Drop-in handles the action object from the /payments response
                 dropin.handleAction(response.action);
               } else {
                 // Your function to show the final result to the shopper
                 let data = {
                   user:this.props.user,
                   cart:this.props.cart,
                   transaction:{id:response.merchantReference,...response.amount,pspReference:response.pspReference}
                 }
                 dropin.setStatus('success');
                 dropin.setStatus('success', { message: `Order #${response.merchantReference} Payment successful!` });
                 setTimeout(()=>{this.props.reset(data)}, 5000);
               }
             })
             .catch(error => {
               console.log(error);
             });
         },
         paymentMethodsConfiguration: {
           scheme: { // Example optional configuration for Cards
             hasHolderName: true,
             holderNameRequired: true,
             enableStoreDetails: true,
             hideCVC: false, // Change this to true to hide the CVC field for stored cards
             name: 'Credit or debit card',
             onSubmit: () => {}, // onSubmit configuration for card payments. Overrides the global configuration.
           }
         },
         allowPaymentMethods:["scheme"],
         onError: (error) => {console.log(error)}
        };
      const checkout = new AdyenCheckout(configuration);
      checkout
          .create('dropin', {
          // Starting from version 4.0.0, Drop-in configuration only accepts props related to itself and cannot contain generic configuration like the onSubmit event.
              openFirstPaymentMethod:false
          })
         .mount('#dropin-container');

     }
  }

  render(){
    return (
      <div>
        <AppBar
          position="fixed"
        >
          <Toolbar>
            <Typography variant="h6" style={{flexGrow: 1}}>
              Buy Some Stuff
            </Typography>
          </Toolbar>
        </AppBar>
        <div style={{ padding: 100 }}>
          <Grid
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <Container maxWidth="lg">
              {this.props.cart.map((product, index) => (
                <CheckoutCard key={product.product_id} product={product} updateCart={this.props.updateCart} />
              ))}
              {!this.props.user ? <AddressForm />:null}
              <div id="dropin-container"></div>
            </Container>
          </Grid>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ cart, paymentMethod, user }) => ({ cart, paymentMethod, user })

const mapDispatchToProps = dispatch => ({
  removeFromCart: id => dispatch({ type: "REMOVE_FROM_CART", id}),
  updateCart: id  => dispatch({type: "UPDATE_CART", id}),
  reset: (data) => dispatch({type:"RESET",data})
})

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
