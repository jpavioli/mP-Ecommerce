const express = require('express');
const router = express.Router();

const {Client, Config, CheckoutAPI} = require('@adyen/api-library');

const config = new Config();
config.apiKey = 'AQEyhmfxJ43IbBxCw0m/n3Q5qf3VaY9UCJ14XWZE03G/k2NFinJpT1NbYyCJzYdFaECRzTMQwV1bDb7kfNy1WIxIIkxgBw==-32WumCr+lJaQ6prjyzRMFLIFzrfpVyRSxU7bWio/uew=-n#2KHpD*ZXb]8@U@';
config.merchantAccount = 'AdyenRecruitment_NY2';
const client = new Client({ config });
client.setEnvironment("TEST");
const checkout = new CheckoutAPI(client);

router.post('/paymentsResponse', (req, res) => {
  const { countryCode, shopperLocale, currency, value } = req.body;
  const paymentsResponse = checkout.paymentMethods({
    merchantAccount: config.merchantAccount,
    countryCode: countryCode,
    shopperLocale: shopperLocale,
    amount: { currency: currency, value: value, },
    channel: "Web",
    allowedPaymentMethods:["scheme"]
  }).then(aydenRes => res.status(200).json(aydenRes))
    .catch(err => res.status(err.statusCode).json(err));
  }
)

router.post('/makePayment', (req, res) => {
    const total = req.body.cart.reduce((a, b) => a + b.name.cost, 0)
    const STATE_DATA = req.body.paymentMethod
    const orderRef = req.body.orderID
    const {Client, Config, CheckoutAPI} = require('@adyen/api-library');
    const config = new Config();
    // Set your X-API-KEY with the API key from the Customer Area.
    config.apiKey = 'AQEyhmfxJ43IbBxCw0m/n3Q5qf3VaY9UCJ14XWZE03G/k2NFinJpT1NbYyCJzYdFaECRzTMQwV1bDb7kfNy1WIxIIkxgBw==-32WumCr+lJaQ6prjyzRMFLIFzrfpVyRSxU7bWio/uew=-n#2KHpD*ZXb]8@U@';
    config.merchantAccount = 'AdyenRecruitment_NY2';
    const client = new Client({ config });
    client.setEnvironment("TEST");
    const checkout = new CheckoutAPI(client);
    let payementsData = {
        merchantAccount: config.merchantAccount,
    // STATE_DATA is the paymentMethod field of an object passed from the front end or client app, deserialized from JSON to a data structure.
        paymentMethod: STATE_DATA,
        amount: { currency: "EUR", value: total * 100, },
        reference: orderRef,
        returnUrl: `https://vast-reaches-23927.herokuapp.com/`
    }
    payementsData.lineItems = []
    req.body.cart.forEach(item=>{
      payementsData.lineItems.push({
            id: item.id,
            description: item.name.product_id,
            amountExcludingTax: item.name.cost * 100,
            amountIncludingTax: item.name.cost * 108,
            taxAmount: item.name.cost * 8,
            taxPercentage: 8,
            quantity: 1,
            taxCategory: 'Low'
        })
    })
    checkout.payments(payementsData).then(aydenRes => res.status(200).json(aydenRes))
      .catch(err => res.status(err.statusCode).json(err));
  }
)

module.exports = router;
