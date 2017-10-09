import React, {Component} from "react";
import axios from 'axios';

export class ResetPassword extends React.Component {
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
     errors["email"] = "Email is required";
    }

    if(typeof fields["email"] !== "undefined"){
      let lastAtPos = fields["email"].lastIndexOf('@');
      let lastDotPos = fields["email"].lastIndexOf('.');

      if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields["email"].indexOf('@@') == -1 && lastDotPos > 2 && (fields["email"].length - lastDotPos) > 2)) {
        formIsValid = false;
        errors["email"] = "Enter valid email";
      }
    }

    //OTP
    if(!fields["otp_pin"]){
       formIsValid = false;
       errors["otp_pin"] = "OTP is required";
    }

    if(typeof fields["otp_pin"] !== "undefined"){
       if(!fields["otp_pin"].match(/[0-9]$/)){
           formIsValid = false;
           errors["otp_pin"] = "Must be a number";
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

    this.setState({errors: errors});
    return formIsValid;
  }

  onSubmit(e){
    e.preventDefault();
    if(this.handleValidation()){
      var apiBaseUrl = "http://rediy-dev.railsfactory.com/";
      let input = {
        "email" : this.state.fields["email"],
        "otp_pin" : this.state.fields["otp_pin"],
        "password" : this.state.fields["password"],
        "password_confirmation" : this.state.fields["password_confirmation"]
      }
      console.log(input);
      axios.post(apiBaseUrl+'/api/v1/users/reset_password', input)
      .then(function (response) {
        console.log(response);
        if(response.data.status == 200){
          console.log("Password reset successfully");
          alert("Password reset successfully");
        }
        else if(response.data.status == 404){
          console.log("Invalid details");
          alert("Invalid details");
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
      <div id="reset-password" className="form-popup" role="dialog">
        <div className="modal-dialog">
          <div className="modal-content">
            <form className="form-theme text-left">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal">&times;</button>
                <h1 className="theme-title text-center">Reset Password</h1>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-sm-12">
                    <div className="form-group input">
                      <input
                        value={this.state.fields["email"]}
                        onChange={this.onChange.bind(this, "email")}
                        className="form-control input__field"
                        placeholder="Email Id *"
                        id="unit"
                        refs="email"
                        type="email"
                      />
                      <span style={{color: "red"}}>{this.state.errors["email"]}</span>
                    </div>
                  </div>
                  <div className="col-sm-12">
                    <div className="form-group input">
                      <input
                        value={this.state.fields["otp_pin"]}
                        onChange={this.onChange.bind(this, "otp_pin")}
                        className="form-control input__field"
                        placeholder="OTP *"
                        id="unit"
                        refs="otp_pin"
                        type="number"
                      />
                      <span style={{color: "red"}}>{this.state.errors["otp_pin"]}</span>
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
                  <div className="col-sm-12">
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
                </div>
              </div>
              <div className="modal-footer">
                <div className="btn-wrap">
                  <button type="submit" className="btn btn-theme save btn btn-primary" onClick={this.onSubmit}>Submit</button>
                  <button type="submit"className="btn btn-theme  btn btn-danger" data-dismiss="modal">Cancel</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
