import React, {Component} from "react";
import axios from 'axios';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import {SignUp} from "./SignUp";
import {ForgotPassword} from "./ForgotPassword";

export class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
     fields: {},
     errors: {}
    }
    this.onSubmit = this.onSubmit.bind(this);
  }

  handleValidation(){
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    //Email
    if(!fields["email"]){
     formIsValid = false;
     errors["email"] = "Email ID is required";
    }

   //Password
   if(!fields["password"]){
      formIsValid = false;
      errors["password"] = "Password is required";
   }

   this.setState({errors: errors});
   return formIsValid;
 }

 onSubmit(e){
   e.preventDefault();
    if(this.handleValidation()){
      var apiBaseUrl = "http://rediy-dev.railsfactory.com/";
      var input = this.state.fields;
      axios.post(apiBaseUrl+'/api/v1/sessions/login', input)
      .then(function (response) {
         console.log(response);
         if(response.data.status == 200){
           console.log("Login successful");
           alert("Login successful");
         }
         else if(response.data.status == 422){
           console.log("Invalid user details. Please enter again");
           alert("Invalid user details. Please enter again");
         }
       })
       .catch(function (error) {
         console.log(error);
       });
    }
  }

  onChange(field, e){
    let fields = this.state.fields;
    fields[field] = e.target.value;
    this.setState({fields});
  }


  render() {
    return (
      <div id="login" className="form-popup" role="dialog">
        <div className="modal-dialog">
          <div className="modal-content">
            <form className="form-theme text-left">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal">&times;</button>
                <h1 className="theme-title text-center">Sign In</h1>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-sm-12">
                    <div className="form-group input">
                      <input
                        value={this.state.fields["email"]}
                        onChange={this.onChange.bind(this, "email")}
                        className="form-control input__field"
                        type="text"
                        id="unit"
                        refs="email"
                        placeholder="Email Id *"
                      />
                      <span style={{color: "red"}}>{this.state.errors["email"]}</span>
                    </div>
                  </div>
                  <div className="col-sm-12">
                    <div className="form-group input">
                      <input
                        value={this.state.fields["password"]}
                        onChange={this.onChange.bind(this, "password")}
                        className="form-control input__field"
                        type="text"
                        id="unit"
                        refs="password"
                        placeholder="Password *"
                      />
                      <span style={{color: "red"}}>{this.state.errors["password"]}</span>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="forgot-password">
                      <p> <Link to="/ForgotPassword">Forgot your password?</Link></p>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="register">
                      <p>New User? <Link to="/SignUp">Register</Link></p>
                    </div>
                  </div>
                  <div className="col-sm-12">
                    <div className="checkbox checkbox-primary">
                      <input id="checkbox1" type="checkbox" />
                      <label htmlFor="checkbox1">
                        Remember Me
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <div className="btn-wrap">
                  <button type="submit" className="btn btn-theme save btn btn-primary" onClick={this.onSubmit}>Sign In</button>
                  <button type="submit" className="btn btn-theme btn btn-danger" data-dismiss="modal">Cancel</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
