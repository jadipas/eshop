const express = require("express");
const app = express();
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST);
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  user: process.env.SQL_USER,
  password: process.env.SQL_PASSWORD,
  database: "db",
});

connection.connect();

app.post("/payments/create", async (request, response) => {
  const total = request.query.total;
  console.log("Payment Request Received for ", total);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "USD",
  });

  //OK - Created
  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

app.post("/product_page", async (request, response) => {
  const id = request.query.id;
  console.log("Product id >> ", id);
  connection.query("SELECT * FROM  product WHERE id=" + id, (err, result, fields) => {
    if (err) throw err;

    console.log("The solution is: ", result);

    //OK - Created
    response.status(201).send({
      id: result[0].id,
      desc: result[0].desc,
      price: result[0].price,
      name: result[0].name,
      img: result[0].img,
    });
  });
});

app.listen(process.env.PORT || 4000, () => {
  console.log("Server is listening on port 4000");
});

//connection.end();
