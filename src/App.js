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
import { auth } from './firebase';
import { useStateValue } from './StateProvider';

function App() {
  const [{}, dispatch] = useStateValue();

  useEffect(() => {
    //will run once when the app component loads bcs list is empty

    
    auth.onAuthStateChanged(authUser => {
      console.log('USER IS >>> ', authUser);
      
      dispatch({
        type: 'SET_USER',
        user: authUser,
      })

      /*
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
      }*/
      
    })
  }, [])
  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route path='/' element={
            <>
              < Header />
              < Home />
            </>
          }/> 
          <Route path='checkout' element={
            <>
              < Header />
              < Checkout />  
            </>
          }/>
          <Route path='payment' element={
            <>
              < Header />
              < Payment />  
            </>
          }/>
          <Route path='login' element={< Login /> }/> 
          <Route path='*' element={<h1>404 Page Not Found</h1>}/> 
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
