import React from "react";
import "./Header.css";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { Link } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import { getTotalItems } from "./reducer";
import logo from "./images/Fwash_Logo.png";

function Header() {
  const [{ basket, user }, dispatch] = useStateValue();

  const handleAuthentication = () => {
    if (user) {
      dispatch({
        type: "SET_USER",
        user: null,
      });
    }
  };

  return (
    <div className="header">
      <Link to="/">
        <img className="header__logo" src={logo} alt="" />
      </Link>

      {/*<div className='header__search'>
            <input className='header__searchInput' type='text'/>
            <SearchIcon className='header__searchIcon' />
        </div>*/}

      <div className="header__nav">
        <Link to={!user && "/login"}>
          {/*console.log(user)*/}
          <div className="header__option" onClick={handleAuthentication}>
            <span className="header__optionLineOne">
              {" "}
              Hello {user ? user.username : "Guest"}
            </span>
            <span className="header__optionLineTwo">
              {" "}
              {user ? "Sign-out" : "Sign-in"}
            </span>
          </div>
        </Link>

        {user ? (
          <Link to="/orders">
            <div className="header__option">
              <span className="header__optionLineOne"> Past </span>
              <span className="header__optionLineTwo"> Orders</span>
            </div>
          </Link>
        ) : null}


        <Link to="/checkout">
          <div className="header__optionBasket">
            <ShoppingBasketIcon />
            <span className="header__optionLineTwo header__basketCount">
              {getTotalItems(basket)}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Header;
