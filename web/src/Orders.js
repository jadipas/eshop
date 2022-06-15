import axios from "./axios";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import "./Orders.css";

function Orders() {
  const [searchParams] = useSearchParams();
  const [info, setInfo] = useState();
  const [loading, setLoading] = useState(true);
  const [{ basket, user }, dispatch] = useStateValue();

  useEffect(() => {
    const getProductInfo = async () => {
      console.log(user)
      await axios
        .get("/orders", {
          headers: {
            Authorization: "Bearer " + user.accessToken,
          },
        })
        .then(function (response) {
          setInfo(response.data);
          setLoading(false);
        })
        .catch(function (error) {
          console.log(error);
        });
    };

    getProductInfo();
  }, []);

  if (loading) {
    return <div className="productPage">Loading...</div>;
  } else {
  }
}

export default Orders;
