import React from "react";
import styles from "./PersonOverview.module.css";
import person from "../../assets/img/iconfinder_icon-person_211874.png";

class PersonOverview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };
  }

  showModalHandler = () => {
    this.setState({
      modal: !this.state.modal
    });
  };
  render() {
    const { props } = this;
    const posterPath = props.img;
    let poster = `https://image.tmdb.org/t/p/w500/${posterPath}`;
    if (props.img === null) {
      poster = person;
    }
    let bio = props.bio
      ? props.bio.slice(0, 350) + "..."
      : "No biography for this person";
    let bioButton =
      bio.length >= 350 ? (
        <button onClick={this.showModalHandler} className={styles.Bio}>
          <i className="fas fa-angle-down" />
        </button>
      ) : null;
    return (
      <React.Fragment>
        <div className={styles.Container}>
          <div className={styles.InnerContainer}>
            <div className={styles.Img}>
              <img src={poster} alt="" />
            </div>
            <div className={styles.Info}>
              <h1>{props.name}</h1>
              <h3>Biography</h3>
              <p>{bio}</p>
              {bioButton}
            </div>
          </div>
        </div>
        <div
          style={{ display: this.state.modal ? "flex" : "none" }}
          className={styles.FullBio}
        >
          <div className={styles.Biography}>
            <div className={styles.Head}>
              <h3>Biography</h3>
              <span onClick={this.showModalHandler}>
                <i className="fas fa-times" />
              </span>
            </div>
            <div className={styles.BioContent}>{props.bio}</div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default PersonOverview;
