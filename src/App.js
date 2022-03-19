import './App.css';
import React from "react";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Header from "./Header.js";
import Home from "./Home.js";
import Checkout from "./Checkout.js";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        < Header />
        <Routes>
          <Route path='/' element={< Home />}/> 
          <Route path='checkout' element={< Checkout /> }/> 
          <Route path='*' element={<h1>404 Page Not Found</h1>}/> 
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
