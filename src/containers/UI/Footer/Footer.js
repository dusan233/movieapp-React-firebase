import React from "react";
import styles from "./Footer.module.css";
import { connect } from "react-redux";
import logo from "../../../assets/img/primary-green-d70eebe18a5eb5b166d5c1ef0796715b8d1a2cbc698f96d311d62f894ae87085.svg";
import back1 from "../../../assets/footerImg/Furious7-d0f17d0793c58d83056a64d22157c9aff5ffb4c179b60048264e5158916fec22.jpg";
import back2 from "../../../assets/footerImg/TheSimpsons-d14b4bd5b4c4f0c25656543e036478d2878be4240e47ba4daba0eba7b05713ce.jpg";
import back3 from "../../../assets/footerImg/2001ASpaceOdyssey-5454eabbf14918bbea5f90371e0ffd55922ba340e52eea46dd9178ed04f8c04f.jpg";
import back4 from "../../../assets/footerImg/BreakingBad-0541701c71d1c77aae2d4487be97b9a879fc41e881911fd3d32558f1f5f75d44.jpg";
import back5 from "../../../assets/footerImg/Creed-fa6ea547c3225dfbb2b9db3e9c2cb41508771c7842b3a0d696951bcc0a6af327.jpg";
import back6 from "../../../assets/footerImg/Dexter-8a2d3d9433580ebdc6238c83547a7bc4e3f86db51b2f2becbd50f08873f2784d (1).jpg";
import back7 from "../../../assets/footerImg/GameOfThrones-dc37cf50a3cb2df1e837832f719996ec737c9e58cf0328f2302f1497859ad41c.jpg";
import back8 from "../../../assets/footerImg/Jaws-0738d22d1f7eb26437e4f410d42ce2239b34688ad972da1155989e0a9de121ac.jpg";
import back9 from "../../../assets/footerImg/Minions-7626a4bff6ef7b6a7afa6a8641278e23b094d6a882da4129d9a8928d05b3b911.jpg";
import back10 from "../../../assets/footerImg/TheMatrix-bb0fe85661c3587a83566343066fe017ffea28e9823a5ded42f74b599f7d12d6.jpg";
import { withRouter } from "react-router-dom";

class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  checkRoute = () => {
    if (this.props.isAuthenticated) {
      this.props.history.push("/useraccount");
    } else {
      this.props.history.push("/signup");
    }
  };

  render() {
    const { props } = this;

    const background = [
      back1,
      back2,
      back3,
      back4,
      back5,
      back6,
      back7,
      back8,
      back9,
      back10
    ];

    return (
      <div
        style={{
          backgroundImage: `url(${background[props.randomBackground]})`
        }}
        className={styles.Footer}
      >
        <div className={styles.Container}>
          <div className={styles.Footer1}>
            <img src={logo} alt="" />
            <button onClick={this.checkRoute} className={styles.Join}>
              {this.props.username
                ? "Hello " + this.props.username
                : "JOIN THE COMMUNITY"}
            </button>
          </div>
          <div className={styles.Footer2}>
            <a href="/">Github</a>
            <a href="/">Portfolio</a>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    randomBackground: state.spinner.randomBackground,
    username: state.auth.displayName,
    isAuthenticated: state.auth.token !== null
  };
};

export default connect(mapStateToProps)(withRouter(Footer));
