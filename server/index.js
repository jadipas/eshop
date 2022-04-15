const express = require('express')
const app = express()
require('dotenv').config()
const stripe = require('stripe')(process.env.STRIPE_SECRET_TEST)
const bodyParser = require('body-parser')
const cors = require('cors')

app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json())

app.use(cors())

app.post("/payments/create", async (request, response) => {
    const total = request.query.total;
    console.log('Payment Request Received for ', total);

    const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: "USD",
    })

    //OK - Created
    response.status(201).send({
        clientSecret: paymentIntent.client_secret,
    })
})

app.listen(process.env.PORT || 4000, ()=> {
    console.log("Server is listening on port 4000")
})