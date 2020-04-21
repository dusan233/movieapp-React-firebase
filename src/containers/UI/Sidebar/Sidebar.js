import React from "react";
import styles from "./Sidebar.module.css";
import Accordion from "../../../components/Accordion/Accordion";
import { Link } from "react-router-dom";

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { props } = this;

    let style = {
      top: 64,
      transform: props.active ? "translateX(0px)" : "translateX(-100%)"
    };

    return (
      <div style={style} className={styles.Sidebar}>
        <Accordion activeBg="#01D277" unactiveBg="#081c24">
          <div name="acord1" head="MOVIES" className="content">
            <ul>
              <Link
                onClick={this.props.closeSideBar}
                style={{ color: "white", textDecoration: "none" }}
                to="/popularmovies"
              >
                <li>Popular</li>
              </Link>
              <Link
                onClick={this.props.closeSideBar}
                style={{ color: "white", textDecoration: "none" }}
                to="/topratedmovies"
              >
                <li>Top Rated</li>
              </Link>
              <Link
                onClick={this.props.closeSideBar}
                style={{ color: "white", textDecoration: "none" }}
                to="/upcomingmovies"
              >
                <li>Upcoming</li>
              </Link>
            </ul>
          </div>
          <div name="acord2" head="TV SHOWS" className="content">
            <ul>
              <Link
                onClick={this.props.closeSideBar}
                style={{ color: "white", textDecoration: "none" }}
                to="/popularseries"
              >
                <li>Popular</li>
              </Link>
              <Link
                onClick={this.props.closeSideBar}
                style={{ color: "white", textDecoration: "none" }}
                to="/topratedseries"
              >
                <li>Top Rated</li>
              </Link>
            </ul>
          </div>
          <div name="acord3" head="PEOPLE" className="content">
            <ul>
              <Link
                onClick={this.props.closeSideBar}
                style={{ color: "white", textDecoration: "none" }}
                to="/popularpeople"
              >
                <li>Popular People</li>
              </Link>
            </ul>
          </div>
        </Accordion>
      </div>
    );
  }
}

export default Sidebar;
