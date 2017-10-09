import React, {Component} from "react";
import {render} from "react-dom";
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
// import { Values } from "redux-form-website-template";
//import style from "../assets/css/style.css";

import {Home} from "./components/Home";
import {SignIn} from "./components/SignIn";
import {SignUp} from "./components/SignUp";
import {ForgotPassword} from "./components/ForgotPassword";
import {ResetPassword} from "./components/ResetPassword";

class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/SignUp">Sign Up</Link></li>
            <li><Link to="/SignIn">Sign In</Link></li>
            <li><Link to="/ResetPassword">Reset Password</Link></li>
          </ul>
          <hr/>
          <Route exact path="/" component={Home} />
          <Route path={"/SignUp"} component={SignUp} />
          <Route path={"/SignIn"} component={SignIn} />
          <Route path={"/ResetPassword"} component={ResetPassword} />
          <Route path={"/ForgotPassword"} component={ForgotPassword} />        
        </div>
      </Router>
    );
  }
}

render(
  <App />,
  window.document.getElementById("app")
);
