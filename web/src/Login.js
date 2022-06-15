import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import "./Login.css";
import logo from "./images/Fwash_Logo.png";
import axios from "./axios";
import { useStateValue } from "./StateProvider";

function Login() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rpassword, setRpassword] = useState("");
  const [loginMode, setMode] = useState(true);
  const [{basket, user},dispatch] = useStateValue();

  const signIn = async (e) => {
    e.preventDefault();

    const response = await axios.post("/login", {
      username: email,
      password: password,
    });
    
    //console.log(response.data);
    dispatch({
      type: "SET_USER",
      user: response.data
    });
    nav("/");
  };

  const register = async (e) => {
    e.preventDefault();

    const response = await axios.post("/register", {
      email: email,
      username: username,
      password: password,
      rpassword: password,
    });
    console.log(response);
    nav("/");
  };

  const changePage = () => {
    setMode(!loginMode);
  };

  if (loginMode) {
    return (
      <div className="login">
        <Link to="/">
          <img className="login__logo" src={logo} alt="" />
        </Link>

        <div className="login__container">
          <h1>Sign-in</h1>

          <form>
            <h5>E-mail or Username</h5>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <h5>Password</h5>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              className="login__signInButton"
              onClick={signIn}
              type="submit"
            >
              Sign-in
            </button>
          </form>

          <p>
            By signing-in you agree to a bunch of illegal stuff that we can
            exploit
          </p>

          <button className="login__registerButton" onClick={changePage}>
            Create your Account
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="login">
        <Link to="/">
          <img className="login__logo" src={logo} alt="" />
        </Link>

        <div className="login__container">
          <h1>Sign-in</h1>

          <form>
            <h5>E-mail</h5>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <h5>Username</h5>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <h5>Password</h5>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <h5>Password</h5>
            <input
              type="password"
              value={rpassword}
              onChange={(e) => setRpassword(e.target.value)}
            />

            <button
              className="login__signInButton"
              onClick={register}
              type="submit"
            >
              Create your Account
            </button>
          </form>

          <p>
            By signing-in you agree to a bunch of illegal stuff that we can
            exploit
          </p>

          <button className="login__registerButton" onClick={changePage}>
            Sign-in
          </button>
        </div>
      </div>
    );
  }
}

export default Login;
