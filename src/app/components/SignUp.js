import React, {Component} from "react";
import axios from 'axios';

export class SignUp extends React.Component {
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

    //Firstname
    if(!fields["fname"]){
       formIsValid = false;
       errors["fname"] = "First Name is required";
    }

    if(typeof fields["fname"] !== "undefined"){
       if(!fields["fname"].match(/^[a-zA-Z]+$/)){
           formIsValid = false;
           errors["fname"] = "Only letters";
       }
    }

    //Lastname
    if(!fields["lname"]){
       formIsValid = false;
       errors["lname"] = "Last Name is required";
    }

    if(typeof fields["lname"] !== "undefined"){
       if(!fields["lname"].match(/^[a-zA-Z]+$/)){
           formIsValid = false;
           errors["lname"] = "Only letters";
       }
    }

    //Phone
    if(!fields["phno"]){
       formIsValid = false;
       errors["phno"] = "Phone Number is required";
    }

    if(typeof fields["phno"] !== "undefined"){
       if(!fields["phno"].match(/^[0-9]{10,10}$/)){
           formIsValid = false;
           errors["phno"] = "Only 10 Digit Numbers";
       }
    }

    //Email
    if(!fields["email"]){
     formIsValid = false;
     errors["email"] = "Email ID is required";
    }

    if(typeof fields["email"] !== "undefined"){
      let lastAtPos = fields["email"].lastIndexOf('@');
      let lastDotPos = fields["email"].lastIndexOf('.');

      if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields["email"].indexOf('@@') == -1 && lastDotPos > 2 && (fields["email"].length - lastDotPos) > 2)) {
        formIsValid = false;
        errors["email"] = "Email is not valid";
      }
   }

   //Password
   if(!fields["password"]){
      formIsValid = false;
      errors["password"] = "Password is required";
   }

   if(typeof fields["password"] !== "undefined"){
      if(!fields["password"].match(/[0-9a-zA-Z]{8,8}$/)){
          formIsValid = false;
          errors["password"] = "Minimum 8 Characters";
      }
   }

   //Confirm Password
   if(!fields["password_confirmation"]){
      formIsValid = false;
      errors["password_confirmation"] = "Confirm Password is required";
   }

   if(typeof fields["password_confirmation"] !== "undefined"){
      if(!fields["password_confirmation"].match(fields["password"])) {
      formIsValid = false;
      errors["password_confirmation"] = 'Passwords do not match.';
    }
   }

   //Buyer & Tenant
   if(!fields["buyer"] && !fields["tenant"]){
      formIsValid = false;
      fields["buyer"] = false;
      fields["tenant"] = false;
      errors["buyer"] = "Your interest type is required";
   }

   if(!fields["buyer"]){
      fields["buyer"] = false;
   }

   if(!fields["tenant"]){
      fields["tenant"] = false;
   }

   //Registration Successful
   if(!errors["fname"] && !errors["lname"] && !errors["email"] && !errors["password"] && !errors["password_confirmation"] && !errors["buyer"]){
     var apiBaseUrl = "http://rediy-dev.railsfactory.com/";
     let input = {
       "user" : {
         "first_name" : this.state.fields["fname"],
         "last_name" : this.state.fields["lname"],
         "email" : this.state.fields["email"],
         "phone_number" : "No Phone",
         "password" : this.state.fields["password"],
         "password_confirmation" : this.state.fields["password_confirmation"]
       } ,
       "owner": false,
       "buyer": this.state.fields["buyer"],
       "tenant": this.state.fields["tenant"]
     }
     console.log(input);
     axios.post(apiBaseUrl+'/api/v1/users/signup', input)
     .then(function (response) {
       console.log(response);
       if(response.data.status == 422){
         alert("Registration Successful");
       }
    })
    .catch(function (error) {
      console.log(error);
    });
   }
   else if(!errors["fname"] && !errors["lname"] && !errors["phno"] && !errors["email"] && !errors["password"] && !errors["password_confirmation"]){
     var apiBaseUrl = "http://rediy-dev.railsfactory.com/";
     let input = {
       "user" : {
         "first_name" : this.state.fields["fname"],
         "last_name" : this.state.fields["lname"],
         "email" : this.state.fields["email"],
         "phone_number" : this.state.fields["phno"],
         "password" : this.state.fields["password"],
         "password_confirmation" : this.state.fields["password_confirmation"]
       } ,
       "owner": true,
       "buyer": false,
       "tenant": false
     }
     console.log(input);
     axios.post(apiBaseUrl+'/api/v1/users/signup', input)
     .then(function (response) {
       console.log(response);
       if(response.data.status == 422){
         alert("Registration Successful");
       }
    })
    .catch(function (error) {
      console.log(error);
    });
   }
   this.setState({errors: errors});
   return formIsValid;
 }

 onSubmit(e){
    e.preventDefault();
     if(this.handleValidation()){
       //alert("Form submit");
    }
  }

  onChange(field, e){
    let fields = this.state.fields;
    fields[field] = e.target.value;
    this.setState({fields});
  }


  render() {
    return (
      <div id="register" className="form-popup" role="dialog" tabindex="-1" aria-labelledby="myModalLabel">
        <div className="modal-dialog">
          <div className="modal-content">
            <form className="form-theme text-left">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal">&times;</button>
                <h1 className="theme-title text-center">Sign Up</h1>
                <ul className="tab-register">
                  <li className="active"><a href="#tab-1" data-toggle="tab">Buyer / Tenant</a></li>
                  <li><a href="#tab-2" data-toggle="tab">Seller / Landlord</a></li>
                </ul>
              </div>
              <div className="modal-body tab-content">
                <div id="tab-1" className="tab-pane active">
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="form-group input">
                        <input
                          value={this.state.fields["fname"]}
                          onChange={this.onChange.bind(this, "fname")}
                          className="form-control input__field"
                          type="text"
                          id="unit"
                          refs="fname"
                          placeholder="Firstname *"
                        />
                        <span style={{color: "red"}}>{this.state.errors["fname"]}</span>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group input">
                        <input
                          value={this.state.fields["lname"]}
                          onChange={this.onChange.bind(this, "lname")}
                          className="form-control input__field"
                          type="text" id="unit"
                          refs="lname"
                          placeholder="Lastname *"
                        />
                        <span style={{color: "red"}}>{this.state.errors["lname"]}</span>
                      </div>
                    </div>
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
                    <div className="col-sm-6">
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
                        <div className="form-group input">
                          <input
                            value={this.state.fields["password_confirmation"]}
                            onChange={this.onChange.bind(this, "password_confirmation")}
                            className="form-control input__field"
                            placeholder="Password confirmation *"
                            id="unit"
                            refs="password_confirmation"
                            type="password"
                          />
                          <span style={{color: "red"}}>{this.state.errors["password_confirmation"]}</span>
                        </div>
                    </div>
                    <div>
                      <div className="col-sm-12">
                          <div className="font-grey">I am interested as a</div>
                      </div>
                      <div className="col-sm-6">
                        <div className="checkbox checkbox-primary">
                          <input
                            refs="buyer"
                            value={true}
                            onChange={this.onChange.bind(this, "buyer")}
                            id="buyer"
                            type="checkbox"
                          />
                          <label htmlFor="buyer">
                            Buyer
                          </label>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="checkbox checkbox-primary">
                          <input
                            refs="tenant"
                            value={true}
                            onChange={this.onChange.bind(this, "tenant")}
                            id="tenant"
                            type="checkbox"
                          />
                          <label htmlFor="tenant">
                            Tenant
                          </label>
                        </div>
                      </div>
                      <span style={{color: "red"}}>{this.state.errors["buyer"]}</span>
                    </div>
                  </div>
                </div>
                <div id="tab-2" className="tab-pane">
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="form-group input">
                        <input
                          value={this.state.fields["fname"]}
                          onChange={this.onChange.bind(this, "fname")}
                          className="form-control input__field"
                          type="text"
                          id="unit"
                          refs="fname"
                          placeholder="Firstname *"
                        />
                        <span style={{color: "red"}}>{this.state.errors["fname"]}</span>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group input">
                        <input
                          value={this.state.fields["lname"]}
                          onChange={this.onChange.bind(this, "lname")}
                          className="form-control input__field"
                          type="text"
                          id="unit"
                          refs="lname"
                          placeholder="Lastname *"
                        />
                        <span style={{color: "red"}}>{this.state.errors["lname"]}</span>
                      </div>
                    </div>
                    <div className="col-sm-12">
                      <div className="form-group input">
                        <input
                          value={this.state.fields["phno"]}
                          onChange={this.onChange.bind(this, "phno")}
                          className="form-control input__field"
                          type="text"
                          id="unit"
                          refs="phno"
                          placeholder="Phone *"
                        />
                        <span style={{color: "red"}}>{this.state.errors["phno"]}</span>
                      </div>
                    </div>
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
                    <div className="col-sm-6">
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
                      <div className="form-group input">
                        <input
                          value={this.state.fields["password_confirmation"]}
                          onChange={this.onChange.bind(this, "password_confirmation")}
                          className="form-control input__field"
                          type="text"
                          id="unit"
                          refs="password_confirmation"
                          placeholder="Confirm Password"
                        />
                        <span style={{color: "red"}}>{this.state.errors["password_confirmation"]}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <div className="btn-wrap">
                  <button type="submit" className="btn btn-theme save btn btn-primary" onClick={this.onSubmit}>Sign Up</button>
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
