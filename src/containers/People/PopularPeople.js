import React from "react";
import { connect } from "react-redux";
import * as actionCreator from "../../store/index";
import PersonCard from "../UI/Cards/PersonCard/PersonCard";
import styles from "../Movies/PopularMovies/PopularMovies.module.css";
import Spinner from "../../components/Spinner/Spinner";

class PopularPeople extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.props.getPopularPeople();
    this.props.getRandomFooter();
    window.scrollTo(0, 0);
  }
  render() {
    let content;
    if (this.props.loading) {
      content = <Spinner />;
    } else {
      content = (
        <div className={styles.Container}>
          {this.props.popularPeople != null
            ? this.props.popularPeople.map(person => {
                return (
                  <PersonCard
                    key={person.id}
                    personId={person.id}
                    img={person.profile_path}
                    name={person.name}
                  />
                );
              })
            : null}
        </div>
      );
    }
    return (
      <div className={styles.Wrap}>
        <h1> Popular People</h1>
        {content}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    popularPeople: state.people.popularPeople,
    loading: state.spinner.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getPopularPeople: () => dispatch(actionCreator.fetchPopularPeople()),
    getRandomFooter: () => dispatch(actionCreator.fetchRandomBackground())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PopularPeople);
