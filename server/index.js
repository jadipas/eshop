const express = require("express");
const app = express();
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST);
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

//Encryption setup
const bcrypt = require("bcrypt");

//JWT init
const jwt = require("jsonwebtoken");
app.use(express.json());

//MySQL Connection
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

  async function getPaymentIntent() {
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: "USD",
      });

      //OK - Created
      response.status(201).send({
        clientSecret: paymentIntent.client_secret,
      });
    } catch (e) {
      switch (e.type) {
        case "StripeCardError":
          console.log(`A payment error occurred: ${e.message}`);
          break;
        case "StripeInvalidRequestError":
          console.log("An invalid request occurred.");
          break;
        default:
          console.log("Another problem occurred, maybe unrelated to Stripe.");
          break;
      }
    }
  }

  getPaymentIntent();
});

app.post("/product_page", async (request, response) => {
  const id = request.query.id;
  //console.log("Product id >> ", id);

  //Search for product id in db
  connection.query(
    "SELECT * FROM  product WHERE id=" + id,
    (err, result, fields) => {
      if (err) {
        console.log("Error in fetching: " + err);
        next(err);
      } else {
        if (result.length > 0) {
          console.log("The solution is: ", result);

          //OK - Created
          response.status(201).send({
            id: result[0].id,
            desc: result[0].desc,
            price: result[0].price,
            name: result[0].name,
            img: result[0].img,
          });
        } else {
          console.log("No result found");
          response.status(406).send({
            err_msg: "No product with id: " + id + " found",
          });
        }
      }
    }
  );
});

//Register a new User
app.post("/register", async (req, res) => {
  //bcrypt will add a 'salt' to make pass breaking harder
  //and hash = h(salt + pass)
  //eg pass1 == pass2 but salt1 != salt2 so hash1 != hash2

  console.log(req.body);
  if (
    req.body.hasOwnProperty("username") &&
    req.body.hasOwnProperty("email") &&
    req.body.hasOwnProperty("password") &&
    req.body.hasOwnProperty("rpassword")
  ) {
    if (!req.body.password.localeCompare(req.body.rpassword)) {
      try {
        // 10 is the number of rounds and condenses the salt step
        const hashedPass = await bcrypt.hash(req.body.password, 10);
        const user = {
          username: req.body.username,
          password: hashedPass,
          email: req.body.email,
        };

        try {
          connection.query(
            "INSERT INTO users(username,password,email) VALUES('" +
              user.username +
              "','" +
              user.password +
              "','" +
              user.email +
              "');",
            (err, result, fields) => {
              if (err) {
                console.log("Error in creating user: " + err);
                next(err);
              } else {
                res.sendStatus(201);
              }
            }
          );
        } catch (e) {
          console.log(e);
          next(e);
        }
      } catch (e) {
        console.log(e);
        next(e);
      }
    } else {
      console.log("Mismatched passwords");
      res.status(500);
    }
  } else {
    console.log("Missing fields in request");
    next(err);
    res.status(500);
  }
});

//Login existing User
app.post("/login", (req, res) => {
  try {
    connection.query(
      "SELECT * FROM  users WHERE username='" +
        req.body.username +
        "' or email='" +
        req.body.username +
        "'",
      async (err, result, fields) => {
        if (err) {
          console.log("Login error: " + err);
          next(err);
        } else {
          if (result.length > 0) {
            //console.log("The user is: ", result);
            try {
              //Safe way to compare passwords
              if (await bcrypt.compare(req.body.password, result[0].password)) {
                const user = {
                  name: req.body.username,
                  password: req.body.password,
                };
                const access_token = jwt.sign(
                  user,
                  process.env.ACCESS_TOKEN_SECRET
                );
                res.json({
                  accessToken: access_token,
                  username: req.body.username,
                });
                //res.json({access_token: access_token});
              } else {
                res.send("Incorrect password");
              }
            } catch (e) {
              res.sendStatus(500);
            }
          } else {
            console.log("No result found");
            response.status(406).send({
              err_msg: "No user with username: " + res.body.username + " found",
            });
          }
        }
      }
    );
  } catch (e) {
    console.log(e);
    next(e);
  }
});

//Fetch orders of logged in user
app.get("/orders", authenticateToken, (req, res) => {

  res.json({orders: []})
});

//Authentication Middleware
function authenticateToken(req, res, next) {
  const auth_header = req.headers["authorization"];
  console.log(auth_header);
  const token = auth_header && auth_header.split(" ")[1];
  if (token === null) res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    console.log(user);
    next();
  });
}

app.listen(process.env.PORT || 4000, () => {
  console.log("Server is listening on port 4000");
});

//connection.end();
