import axios from "./axios";
import React, { useEffect, useState } from "react";
import { useStateValue } from "./StateProvider";
import { Link } from "react-router-dom";
import "./Orders.css";

function Orders() {
  const [info, setInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [{ basket, user }, dispatch] = useStateValue();

  useEffect(() => {
    const getProductInfo = async () => {
      console.log(user);
      await axios
        .get("/orders", {
          headers: {
            Authorization: "Bearer " + user.accessToken,
          },
        })
        .then(function (response) {
          setInfo(response.data.orders);
          console.log(response.data.orders);
          //console.log(info);
          setLoading(false);
          return response.data.orders;
        })
        .catch(function (error) {
          console.log(error);
        });
    };

    getProductInfo();
    console.log(info);
  }, []);

  if (loading) {
    return <div className="productPage">Loading...</div>;
  } else {
    return (
      <div className="orders">
        {info.map((order, index) => {
          return (
            <div key={index} className="orders__row">
              <h3>{order.date}</h3>
              <div className="orders__rowTitles">
                <h4>Product ID</h4>
                <h4>Name</h4>
                <h4>Amount</h4>
              </div>
              {order.products.map((product, id) => {
                return (
                  <div key={id} className="orders__rowContent">
                    <p>{product.id}</p>
                    <p>
                      <Link to={"/product_page?id=" + product.id}>{product.name}</Link>
                    </p>
                    <p>{product.amount}</p>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    );
  }
}

export default Orders;
