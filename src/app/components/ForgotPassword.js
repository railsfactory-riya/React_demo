import React, {Component} from "react";
import axios from 'axios';

export class ForgotPassword extends React.Component {
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
    this.setState({errors: errors});
    return formIsValid;
  }

  onSubmit(e){
    e.preventDefault();
    if(this.handleValidation()){
      var apiBaseUrl = "http://rediy-dev.railsfactory.com/";
      var input = this.state.fields;
      axios.post(apiBaseUrl+'/api/v1/users/forgot_password', input)
      .then(function (response) {
         console.log(response);
         if(response.data.status == 200){
           console.log("Varify your Email Id");
           alert("Varify your Email Id");
         }
         else if(response.data.status == 404){
           console.log("Email not found");
           alert("Email not found");
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
      <div id="forgot-password" className="form-popup" role="dialog">
        <div className="modal-dialog">
          <div className="modal-content">
            <form className="form-theme text-left">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal">&times;</button>
                <h1 className="theme-title text-center">Forgot Password</h1>
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
                </div>
              </div>
              <div className="modal-footer">
                <div className="btn-wrap">
                  <button type="submit" className="btn btn-theme save  btn btn-primary" onClick={this.onSubmit}>Submit</button>
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
