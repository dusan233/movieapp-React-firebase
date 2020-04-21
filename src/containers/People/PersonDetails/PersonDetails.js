import React from "react";

import { connect } from "react-redux";
import * as actionCreator from "../../../store/index";
import PersonOverview from "../../../components/PersonOverview/PersonOverview";
import Spinner from "../../../components/Spinner/Spinner";
import styles from "./PersonDetails.module.css";
import ActingHistory from "../../../components/ActingHistory/ActingHistory";

class PersonDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.getPersonDetails(this.props.match.params.personId);
    this.props.getPersonActing(this.props.match.params.personId);
    this.props.getRandomFooter();
    window.scrollTo(0, 0);
  }

  render() {
    const { personDetails: personD, personActing } = this.props;

    let img = personD ? personD.profile_path : null;
    let name = personD ? personD.name : null;
    let bio = personD ? personD.biography : null;
    let knownFor = personD ? personD.known_for_department : null;
    let gender;
    if (personD && personD.gender === 2) {
      gender = "Male";
    } else if (personD && personD.gender === 1) {
      gender = "Female";
    } else {
      gender = "/";
    }
    let birthDate = personD && personD.birthday ? personD.birthday : "/";
    let placeOfBirth =
      personD && personD.place_of_birth ? personD.place_of_birth : "/";

    let content;
    if (this.props.loading) {
      content = <Spinner />;
    } else {
      content = (
        <div>
          <PersonOverview img={img} name={name} bio={bio} />
          <div className={styles.Wrap}>
            <div className={styles.AditionalInfo}>
              <h2>Personal Info</h2>
              <h4>Known For</h4>
              <p>{knownFor}</p>
              <h4>Gender</h4>
              <p>{gender}</p>
              <h4>Birthday</h4>
              <p>{birthDate}</p>
              <h4>Place of Birth</h4>
              <p>{placeOfBirth}</p>
            </div>
            <div className={styles.ActingContainer}>
              <h1>Actin History</h1>
              <div className={styles.History}>
                {personActing && personActing.length !== 0 ? (
                  personActing.map(role => {
                    return (
                      <ActingHistory
                        key={role.credit_id}
                        mediaId={role.id}
                        mediaType={role.media_type}
                        year={
                          role.release_date
                            ? role.release_date
                            : role.first_air_date
                        }
                        name={role.title || role.original_name}
                        role={role.character}
                      />
                    );
                  })
                ) : (
                  <h3>No acting history for this person</h3>
                )}
              </div>
            </div>
          </div>
          <p>{this.props.match.params.personId}</p>
        </div>
      );
    }
    return content;
  }
}

const mapStateToProps = state => {
  return {
    personDetails: state.people.personDetails,
    loading: state.spinner.loading,
    personActing: state.people.personActing
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getPersonDetails: personId =>
      dispatch(actionCreator.fetchPersonDetails(personId)),
    getRandomFooter: () => dispatch(actionCreator.fetchRandomBackground()),
    getPersonActing: personId =>
      dispatch(actionCreator.fetchPersonActing(personId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PersonDetails);
