import React from 'react';
import {connect} from 'react-redux';
import ProductCard from '../components/productCard.js'
import Grid from '@material-ui/core/Grid';

class ProductGrid extends React.Component {

  constructor(props){
    super(props)
    this.state =
    {
      products:props.products
    }
  }

  render()
  {
    return (
      <div>
        <Grid container spacing={2}>
          {this.state.products.map(product => { return (
            <Grid item xs={3} key={product.product_id} >
              <ProductCard key={product.product_id} product={product} addToCart={this.props.addToCart} />
            </Grid>
          )})}
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = ({ cart }) => ({ cart })

const mapDispatchToProps = dispatch => ({
  addToCart: product => dispatch({ type: "ADD_TO_CART", product }),
  removeFromCart: id => dispatch({ type: "REMOVE_FROM_CART", id})
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductGrid)
