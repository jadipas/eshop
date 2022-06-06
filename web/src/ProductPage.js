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

  const addToBasket = (e) => {
    // dispatch item to data layer
    e.preventDefault();
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
          <div className="productPage__image">
            <ImageSlider images={info.img.split(',')} />
          </div>
          <div className="productPage__info">
            <h1>{info.name}</h1>

            <p>{info.desc}</p>
          </div>
        </div>
      );
    }
  }
}

export default ProductPage;
