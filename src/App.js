import React from 'react';
import {connect} from 'react-redux';

import Main from './ui/containers/main.js';
import Checkout from './ui/containers/checkout.js';

function App(props) {

  return (
    <div className="App">
      {
        !props.paymentMethod ?
          <Main />
          :
          <Checkout />
      }

    </div>
  );
}

const mapStateToProps = ({ paymentMethod }) => ({ paymentMethod })

export default connect(mapStateToProps)(App);
