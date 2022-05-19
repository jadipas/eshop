import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "./axios";
import "./ProductPage.css";

function ProductPage() {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const getProductInfo = async () => {
      try{
        const response = await axios({
          method: "post",
          //Stripe expects the total in a currencies subunits
          url: `/product_page?id=${searchParams.get("id")}`,
        });
      }catch(error){
        console.log(error)
      }
      //getProductInfo(response.data.clientSecret);
    };

    getProductInfo();
  }, []);

  return <div className="productPage">ProductPage</div>;
}

export default ProductPage;
