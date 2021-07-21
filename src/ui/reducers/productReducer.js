import { v4 as uuidv4 } from 'uuid';

export default function manageCart(state = {
  cart: []
}, action) {
  switch (action.type) {
    case 'ADD_TO_CART':
      const newProduct = { id: uuidv4(), name: action.product }
      return { ...state, cart: [...state.cart, newProduct] }
    case 'REMOVE_FROM_CART':
      const products = state.cart.filter(product => product.id !== action.id);
      return { ...state, cart: [...products] };
    case 'ADD_PAYMENT_METHOD':
      const newPaymentMethod = action.paymentMethod;
      return { ...state, paymentMethod: newPaymentMethod };
    case 'ADD_USER':
      const user = action.user;
      return { ...state,user: user}
    case 'ADD_CHECKOUT':
      const checkout = action.checkout;
      return { ...state,checkout}
    case 'RESET':
      let userObj = {...action.data.user}
      let orderObj = {...action.data.transaction}
      let cartObj = action.data.cart.map(item=>{return {
        id:item.id,
        cost: item.name.cost*100,
        name: item.name.name,
        product_id: item.name.product_id,
        order_id: action.data.transaction.id
      }})
      fetch(`https://vast-reaches-23927.herokuapp.com/users/`, {
          method: 'POST',
          headers: {
            'content-type':'application/json',
          },
          body: JSON.stringify(userObj)
      })
        .then(res=>res.json())
        .then(data=>{
          fetch(`https://vast-reaches-23927.herokuapp.com/orders/`, {
              method: 'POST',
              headers: {
                'content-type':'application/json',
              },
              body: JSON.stringify({...orderObj})
          })
            .then(res=>res.json())
            .then(data=>console.log(data))
            .catch(err=>console.error(err))
          cartObj.forEach(orderProduct=>{
            fetch(`https://vast-reaches-23927.herokuapp.com/orderproducts/`, {
                method: 'POST',
                headers: {
                  'content-type':'application/json',
                },
                body: JSON.stringify(orderProduct)
            })
              .then(res=>res.json())
              .then(data=>console.log(data))
              .catch(err=>console.error(err))
            })

        })
        .catch(err=>console.error(err))
      return {cart:[]}
    default:
      return state;
  }
}
