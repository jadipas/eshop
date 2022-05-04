import './App.css';
import React, { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Header from "./Header.js";
import Home from "./Home.js";
import Checkout from "./Checkout.js";
import Payment from "./Payment.js";
import Login from "./Login.js";
import Footer from "./Footer.js";
import Orders from "./Orders.js";
import ProductPage from "./ProductPage.js";
import Wrapper from "./Wrapper.js";
import { auth } from './firebase';
import { useStateValue } from './StateProvider';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { PaypalScriptProvider } from "@paypal/react-paypal-js";

const promise = loadStripe('pk_test_51Kk2d8LBJ8OXprnJAjjc0xgpazGuMEG7Dpi32h6VjLJQJkttEUxRxnmGzH9IymP5LX6BEMjn0m46GUM5fyZZEUYD00JSrRzkcB');

function App() {
  const [{}, dispatch] = useStateValue();
  
  useEffect(() => {
    //will run once when the app component loads bcs list is empty

    
    auth.onAuthStateChanged(authUser => {
      
      dispatch({
        type: 'SET_USER',
        user: authUser,
      })

      
      if (authUser) {
        //the user just logged in || was logged in
        dispatch({
          type: 'SET_USER',
          user: authUser,
        })

      } else {
        // the user is logged out
        dispatch({
          type: 'SET_USER',
          user: null,
        })
      }
      
    })
  }, [])
  return (
    <PaypalScriptProvider options={{"client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID, "currency": "EUR"}}>
      <BrowserRouter>
        <div className="app">
          <Wrapper>
            <Routes>
              <Route path='/' element={
                <>
                  < Header />
                  < Home />
                  < Footer />
                </>
              }/> 
              <Route path='checkout' element={
                <>
                  < Header />
                  < Checkout />  
                  < Footer />
                </>
              }/>
              <Route path='payment' element={
                <>
                  < Header />
                  <Elements stripe={promise}>
                    < Payment />  
                  </Elements>
                </>
              }/>
              <Route path='orders' element={
                <>
                  < Header />
                  < Orders />
                  < Footer />
                </>
              }/>
              <Route path='product_page' element={
              <>
                < Header />
                < ProductPage />
                < Footer />
              </>
            }/>
              <Route path='login' element={< Login /> }/> 
              <Route path='*' element={<h1>404 Page Not Found</h1>}/> 
            </Routes>
          </Wrapper>
        </div>
      </BrowserRouter>
    </PaypalScriptProvider>
  );
}

export default App;
