import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "./axios";
import ImageSlider from "./ImageSlider";
import "./ProductPage.css";
import { useStateValue } from "./StateProvider";

function ProductPage() {
  const [searchParams] = useSearchParams();
  const [info, setInfo] = useState();
  const [loading, setLoading] = useState(true);
  const [{ basket }, dispatch] = useStateValue();
  const [q, setQ] = useState(
    basket.find((basketItem) => basketItem.id === info.id)
      ? basket.find((basketItem) => basketItem.id === info.id).quantity
      : 0
  );
  const [isDisabled, setisDisabled] = useState(!(q > 1));

  console.log(q);

  const decreaseQuantity = (e) => {
    //remove item from basket
    e.preventDefault();

    if (q > 1) {
      setQ(q - 1);
      dispatch({
        type: "DECREASE_QUANTITY",
        id: info.id,
      });
    } else if (q === 1) {
      setQ(q - 1);
      setisDisabled(true);
      dispatch({
        type: "REMOVE_FROM_BASKET",
        id: info.id,
      });
    }
  };

  const increaseQuantity = (e) => {
    //remove item from basket
    e.preventDefault();
    console.log(q);
    if (q === 0) {
      dispatch({
        type: "ADD_TO_BASKET",
        item: {
          id: info.id,
          title: info.name,
          image: info.img,
          price: info.price,
          rating: 0,
        },
      });
      setQ(q + 1);
      setisDisabled(false);
    } else {
      setQ(q + 1);
      dispatch({
        type: "INCREASE_QUANTITY",
        id: info.id,
      });
    }
  };

  useEffect(() => {
    const getProductInfo = async () => {
      console.log("started >>>");
      try {
        const response = await axios({
          method: "post",
          //Retrieve product from base
          url: `/product_page?id=${searchParams.get("id")}`,
        });

        setInfo(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
      //getProductInfo(response.data.clientSecret);
    };

    getProductInfo();
  }, []);

  if (loading) {
    return <div className="productPage">Loading...</div>;
  } else {
    if ("err_msg" in info) {
      return (
        <div className="productPage">
          <h1>{info.err_msg}</h1>
        </div>
      );
    } else {
      return (
        <div className="productPage">
          <h1>{info.name}</h1>
          <div className="productPage__image">
            <ImageSlider images={info.img.split(",")} />
          </div>
          <div className="productPage__price">{info.price}$</div>
          <div className="productPage__quantity">
            <button
              className="productPage__quantityButton"
              onClick={decreaseQuantity}
              disabled={isDisabled}
            >
              -
            </button>
            <p>{q}</p>
            <button
              className="productPage__quantityButton"
              onClick={increaseQuantity}
            >
              +
            </button>
          </div>
          <div className="productPage__info">
            <p>{info.desc}</p>
          </div>
        </div>
      );
    }
  }
}

export default ProductPage;
