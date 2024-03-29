const express = require("express");
const app = express();
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST);
const bodyParser = require("body-parser");
const cors = require("cors");
const util = require("util");

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
const { response } = require("express");
const connection = mysql.createConnection({
  host: "localhost",
  user: process.env.SQL_USER,
  password: process.env.SQL_PASSWORD,
  database: "db",
});

connection.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }

  console.log("connected as id " + connection.threadId);
});

//Set-up query with promisify for async queries
const query = util.promisify(connection.query).bind(connection);

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
                  username: req.body.username,
                  email: result[0].email,
                };
                const access_token = jwt.sign(
                  user,
                  process.env.ACCESS_TOKEN_SECRET
                );
                res.json({
                  status: 200,
                  accessToken: access_token,
                  username: req.body.username,
                  message: "OK"
                });
                //res.json({access_token: access_token});
              } else {
                res.status(401).send({
                  message: "Incorrect credentials",
                });
              }
            } catch (e) {
              res.sendStatus(500);
            }
          } else {
            console.log("No result found");
            res.status(401).send({
              message: "Incorrect credentials",
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
  console.log("Authenticated->");
  connection.query(
    'select * from orders where user_id=(select user_id from users where username="' +
      req.user.username +
      '");',
    async (err, rows, fields) => {
      if (err) {
        console.log("Error in fetching: " + err);
        throw err;
      }

      if (rows.length > 0) {
        //console.log("Order result: ", rows);

        const final = await Promise.all(rows.map(async (o) => {
          const tdate = o.date.toString().split(" ");
          const ndate = tdate[1] + " " + tdate[2] + " " + tdate[3];

          //console.log(o);
          const counts = o.product_ids.split(",").reduce((r, s) => {
            const key = s;
            //console.log("s ", s);
            r[key] = (r[key] || 0) + 1;

            return r;
          }, {});
          //console.log(Object.keys(counts));
          const products = await Promise.all(
            Object.keys(counts).map(async (id) => {
              //console.log("query for products");
              //console.log("SELECT * FROM product where id=" + id);
              try {
                const result = await query(
                  "SELECT * FROM product where id=" + id
                );

                const ans = {
                  id: result[0].id,
                  desc: result[0].desc,
                  price: result[0].price,
                  name: result[0].name,
                  img: result[0].img,
                  amount: counts[id],
                };

                console.log(ans);
                return ans;
              } catch (e) {
                console.log(e);
              }
            })
          );

          return {
            date: ndate,
            products: products,
          };
        }));

        //console.log(final);
        //response.sendStatus(200);
        res.json({ orders: final });

        /*
        //OK - Created
        response.status(201).send({
          orders: final,
        });*/
      } else {
        console.log("No result found");
        /*response.status(406).send({
          err_msg: "No past orders for user",
        });*/
      }
    }
  );
});

//Authentication Middleware
function authenticateToken(req, res, next) {
  const auth_header = req.headers["authorization"];
  //console.log(auth_header);
  const token = auth_header && auth_header.split(" ")[1];
  if (token === null) res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    //console.log(user);
    next();
  });
}

app.listen(process.env.PORT || 4000, () => {
  console.log("Server is listening on port 4000");
});

//connection.end();
