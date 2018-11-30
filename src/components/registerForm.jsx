import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";

class RegisterForm extends Form {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        email: "",
        password: "",
        name: ""
      },
      errors: {}
    };
  }

  schema = {
    email: Joi.string()
      .email()
      .required()
      .label("Email"),
    password: Joi.string()
      .min(5)
      .required()
      .label("Password"),
    name: Joi.string()
      .required()
      .label("Name")
  };

  doSubmit = () => {
    console.log("Registering... sooon!");
  };

  render() {
    return (
      <div className="mx-auto col-md-6 col-sm-6 ">
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("email", "Email", "text", true)}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("name", "Name")}
          {this.renderButton("Sign Up")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
