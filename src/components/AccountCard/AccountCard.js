import React from "react";

import styles from "./AccountCard.module.css";
import { Link } from "react-router-dom";

class AccountCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: false
    };
  }

  componentDidMount() {}

  closeOptionsHandler = e => {
    if (e.target.classList.contains("AccountCard_Container_20D-H")) {
      return;
    } else {
      this.setState({
        options: false
      });
    }
  };

  showOptionsHandler = () => {
    this.setState(prevState => {
      return {
        options: !prevState.options
      };
    });
  };
  render() {
    return (
      <div className={styles.Container}>
        <div onClick={this.showOptionsHandler}>
          <i className="fas fa-user-circle"></i>
        </div>
        <div
          style={{ display: this.state.options ? "block" : "none" }}
          className={styles.Options}
        >
          <Link onClick={this.showOptionsHandler} to="/useraccount">
            <h4>Account</h4>
          </Link>

          <h4
            onClick={() => {
              this.props.logout();
              this.showOptionsHandler();
            }}
          >
            Logout
          </h4>
        </div>
      </div>
    );
  }
}

export default AccountCard;
