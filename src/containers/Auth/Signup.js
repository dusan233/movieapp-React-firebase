import React from "react";

import styles from "./Auth.module.css";
import { connect } from "react-redux";
import * as actionCreator from "../../store/index";
import { Link, Redirect } from "react-router-dom";

import AuthSpinner from "../../components/AuthSpinner/AuthSpinner";

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gim
);

const formValid = (formErrors, pass, email, username) => {
  let valid = true;

  Object.values(formErrors).forEach(val => {
    if (val.length > 1) {
      valid = false;
    }
  });
  if (pass.length === 0 || email.length === 0 || username.length === 0) {
    valid = false;
  }

  return valid;
};

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      formErrors: {
        username: "",
        email: "",
        password: ""
      }
    };
  }
  componentDidMount() {
    this.props.getRandomFooter();
    window.scrollTo(0, 0);
  }
  onFormSubmit = e => {
    e.preventDefault();
    if (
      formValid(
        this.state.formErrors,
        this.state.password,
        this.state.email,
        this.state.username
      )
    ) {
      this.props.signUp(
        this.state.username,
        this.state.email,
        this.state.password
      );
      this.setState({
        username: "",
        email: "",
        password: ""
      });
    }
  };
  onInputHandler = e => {
    const { name, value } = e.target;
    let formErrors = this.state.formErrors;
    switch (name) {
      case "username":
        formErrors.username =
          value.length < 5 ? "minimum 5 characters required" : "";
        break;
      case "email":
        formErrors.email =
          emailRegex.test(value) && value.length > 0
            ? ""
            : "invalid email address";
        break;
      case "password":
        formErrors.password =
          value.length < 6 ? "minimum 6 characters required" : "";
        break;
      default:
        formErrors.email = "";
    }

    this.setState({ formErrors, [name]: value });
  };
  render() {
    const { formErrors } = this.state;
    return (
      <div className={styles.FormContainer}>
        {this.props.redirect ? <Redirect to="/login" /> : null}
        <form onSubmit={this.onFormSubmit} action="">
          <h2>Sign up or Log in to your account</h2>
          <Link to="/login">
            <button className={styles.Switch}>Log In</button>
          </Link>
          <button
            style={{ borderBottom: "3px solid #6747C7", color: "#6747C7" }}
            className={styles.Switch}
          >
            Sign Up
          </button>
          <input
            value={this.state.username}
            onChange={this.onInputHandler}
            type="text"
            name="username"
            placeholder="Username"
          />
          {formErrors.username.length > 0 ? (
            <span className={styles.Error}>{formErrors.username}</span>
          ) : (
            ""
          )}
          <input
            value={this.state.email}
            onChange={this.onInputHandler}
            type="email"
            name="email"
            placeholder="Email"
          />
          {formErrors.email.length > 0 ? (
            <span className={styles.Error}>{formErrors.email}</span>
          ) : (
            ""
          )}
          <input
            value={this.state.password}
            onChange={this.onInputHandler}
            type="password"
            name="password"
            placeholder="Password"
          />
          {formErrors.password.length > 0 ? (
            <span className={styles.Error}>{formErrors.password}</span>
          ) : (
            ""
          )}
          {this.props.error ? (
            <h4 className={styles.ErrorMessage}>{this.props.error}</h4>
          ) : null}
          {this.props.loading ? (
            <AuthSpinner />
          ) : (
            <button className={styles.Login}>Create Account</button>
          )}
          <p className={styles.Terms}>
            By proceeding you agree to our <span>Terms of Service</span>
          </p>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    redirect: state.auth.redirectIt
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getRandomFooter: () => dispatch(actionCreator.fetchRandomBackground()),
    signUp: (username, email, password) =>
      dispatch(actionCreator.signInAuthentication(username, email, password))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Signup);
