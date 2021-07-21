import {settings} from '../../assets/default.js'
const { v4: uuidv4 } = require('uuid');

const URL = (route) => {return `${settings.url}adyen/${route}`}

export async function makePayment(data){
  try {
    let orderID = uuidv4()
    let promise = await fetch(URL('makePayment'),{
        method: 'POST',
        headers: {
          'content-type':'application/json',
        },
        body: JSON.stringify({...data,orderID})
    })
    let response = await promise.json()
    return response
  } catch(e) {
    console.log(e)
  }

}

export function makeDetailsCall(data){
  console.log(data)
}
