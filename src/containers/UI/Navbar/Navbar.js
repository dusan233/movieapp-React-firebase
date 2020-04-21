import React from "react";
import styles from "./Navbar.module.css";
import { Collapse } from "react-burgers";
import Sidebar from "../Sidebar/Sidebar";
import Searchbar from "../../../components/SearchBar/Searchbar";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actionCreator from "../../../store/index";

import AccountCard from "../../../components/AccountCard/AccountCard";

import logo from "../../../assets/img/primary-green-d70eebe18a5eb5b166d5c1ef0796715b8d1a2cbc698f96d311d62f894ae87085.svg";

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebar: false,
      navHeight: 0
    };
    this.myRef = React.createRef();
  }

  componentDidMount() {
    const height = this.myRef.current.offsetHeight;
    this.setState({
      navHeight: height
    });
    window.addEventListener("resize", this.handleSidebarOnResize);
    document.body.style.paddingTop = `${this.myRef.current.offsetHeight}px`;
    document.documentElement.style.paddingTop = "0px";
  }

  handleSidebarOnResize = () => {
    if (window.innerWidth >= 650) {
      this.setState({
        sidebar: false
      });
    }
  };

  handleSidebar = () => {
    this.setState({
      sidebar: !this.state.sidebar
    });
    console.log(this.state.navHeight);
  };

  render() {
    return (
      <React.Fragment>
        <div ref={this.myRef} className={styles.Main}>
          <nav className={styles.Navbar}>
            <div className={styles.Container}>
              <Link to="/">
                <img src={logo} alt="" />
              </Link>
              <div className={styles.Part1}>
                <ul>
                  <li>
                    MOVIES
                    <div>
                      <ul>
                        <Link
                          style={{ color: "white", textDecoration: "none" }}
                          to="/popularmovies"
                        >
                          <li>Popular</li>
                        </Link>
                        <Link
                          style={{ color: "white", textDecoration: "none" }}
                          to="/topratedmovies"
                        >
                          <li>Top Rated</li>
                        </Link>
                        <Link
                          style={{ color: "white", textDecoration: "none" }}
                          to="/upcomingmovies"
                        >
                          <li>Upcoming</li>
                        </Link>
                      </ul>
                    </div>
                  </li>
                  <li>
                    TV SHOWS
                    <div>
                      <ul>
                        <Link
                          style={{ color: "white", textDecoration: "none" }}
                          to="/popularseries"
                        >
                          <li>Popular</li>
                        </Link>
                        <Link
                          style={{ color: "white", textDecoration: "none" }}
                          to="/topratedseries"
                        >
                          <li>Top Rated</li>
                        </Link>
                      </ul>
                    </div>
                  </li>
                  <li>
                    PEOPLE
                    <div>
                      <ul>
                        <Link
                          style={{ color: "white", textDecoration: "none" }}
                          to="/popularpeople"
                        >
                          <li>Popular People</li>
                        </Link>
                      </ul>
                    </div>
                  </li>
                </ul>
              </div>
              <div className={styles.Part2}>
                {this.props.isAuthenticated ? (
                  <AccountCard logout={this.props.logoutUser} />
                ) : (
                  <Link
                    style={{ color: "white", textDecoration: "none" }}
                    to="/login"
                  >
                    <span href="/">LOGIN</span>
                  </Link>
                )}

                <span className={styles.Burger}>
                  <Collapse
                    onClick={this.handleSidebar}
                    color="white"
                    width="30"
                    padding="5px"
                    active={this.state.sidebar}
                  />
                </span>
              </div>
            </div>
          </nav>
          <Searchbar />
        </div>

        <Sidebar
          closeSideBar={this.handleSidebar}
          active={this.state.sidebar}
          navbar={this.state.navHeight}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.spinner.loading,
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logoutUser: () => dispatch(actionCreator.logout())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar);
