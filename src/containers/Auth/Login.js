import React from "react";
import styles from "./Auth.module.css";
import { connect } from "react-redux";
import * as actionCreator from "../../store/index";
import { Link } from "react-router-dom";

import AuthSpinner from "../../components/AuthSpinner/AuthSpinner";

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gim
);

const formValid = (formErrors, pass, email) => {
  let valid = true;

  Object.values(formErrors).forEach(val => {
    if (val.length > 1) {
      valid = false;
    }
  });
  if (pass.length === 0 || email.length === 0) {
    valid = false;
  }

  return valid;
};

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      formErrors: {
        email: "",
        password: ""
      }
    };
  }

  componentDidMount() {
    this.props.redirect(false);
    this.props.getRandomFooter();
    window.scrollTo(0, 0);
  }
  onFormSubmit = e => {
    e.preventDefault();
    if (
      formValid(this.state.formErrors, this.state.password, this.state.email)
    ) {
      this.props.logIn(this.state.email, this.state.password);
      this.setState({
        email: "",
        password: ""
      });
    }
  };
  onInputHandle = e => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = this.state.formErrors;

    switch (name) {
      case "password":
        formErrors.password =
          value.length > 0 && value.length > 4
            ? ""
            : "minimum 5 characters required";
        break;
      case "email":
        formErrors.email =
          emailRegex.test(value) && value.length > 0
            ? ""
            : "invalid email address";
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
        <form onSubmit={this.onFormSubmit} action="">
          <h2>Sign up or Log in to your account</h2>
          <button
            style={{ borderBottom: "3px solid #6747C7", color: "#6747C7" }}
            className={styles.Switch}
          >
            Log In
          </button>
          <Link to="/signup">
            <button className={styles.Switch}>Sign Up</button>
          </Link>
          <input
            value={this.state.email}
            onChange={this.onInputHandle}
            name="email"
            type="email"
            placeholder="Email"
          />
          {formErrors.email.length > 0 && (
            <span className={styles.Error}>{formErrors.email}</span>
          )}
          <input
            value={this.state.password}
            onChange={this.onInputHandle}
            name="password"
            type="password"
            placeholder="Password"
          />
          {formErrors.password.length > 0 && (
            <span className={styles.Error}>{formErrors.password}</span>
          )}
          {this.props.error ? (
            <h4 className={styles.ErrorMessage}>{this.props.error}</h4>
          ) : null}
          {this.props.loading ? (
            <AuthSpinner />
          ) : (
            <button className={styles.Login}>Log In</button>
          )}
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    token: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getRandomFooter: () => dispatch(actionCreator.fetchRandomBackground()),
    logIn: (email, password) =>
      dispatch(actionCreator.logInAuthentication(email, password)),
    redirect: path => dispatch(actionCreator.redirect(path))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
