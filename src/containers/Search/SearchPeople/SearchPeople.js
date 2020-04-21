import React from "react";
import { connect } from "react-redux";
import * as actionCreator from "../../../store/index";
import Spinner from "../../../components/Spinner/Spinner";
import SearchNavigation from "../../../components/SearchNavigation/SearchNavigation";
import styles from "./SearchPeople.module.css";

import Pagination from "../../../components/Pagination/Pagination";
import PeopleSearchCard from "../../UI/Cards/PeopleSearchCard/PeopleSearchCard";

class SearchSeries extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageNumber: 1
    };
  }

  componentDidMount() {
    this.props.getMovieSearch(
      this.props.match.params.query,
      this.state.pageNumber
    );
    this.props.getPeopleSearch(
      this.props.match.params.query,
      this.state.pageNumber
    );
    this.props.getMovieSearchCollections(
      this.props.match.params.query,
      this.state.pageNumber
    );
    this.props.getSerieSearch(
      this.props.match.params.query,
      this.state.pageNumber
    );
    this.props.getRandomFooter();
  }

  nextPageHandler = () => {
    let currentPage = this.state.pageNumber + 1;
    this.props.getPeopleSearch(this.props.match.params.query, currentPage);
    this.setState({
      pageNumber: currentPage
    });
    window.scrollTo(0, 0);
  };

  prevPageHandler = () => {
    let currentPage = this.state.pageNumber - 1;
    this.props.getPeopleSearch(this.props.match.params.query, currentPage);
    this.setState({
      pageNumber: currentPage
    });
    window.scrollTo(0, 0);
  };

  render() {
    const {
      movieSearch,
      peopleSearch,
      serieSearch,
      movieCollections: movieC
    } = this.props;

    let movieSearchResults = movieSearch ? movieSearch.total_results : null;
    let serieSearchResults = serieSearch ? serieSearch.total_results : null;
    let peopleSearchResults = peopleSearch ? peopleSearch.total_results : null;
    let movieCollectionsResults = movieC ? movieC.total_results : null;

    let peopleSearchTotalPages = peopleSearch ? peopleSearch.total_pages : null;
    let content;
    if (this.props.loading) {
      content = <Spinner />;
    } else {
      content = (
        <div className={styles.Container}>
          <div className={styles.Navigation}>
            <SearchNavigation
              mResults={movieSearchResults}
              sResults={serieSearchResults}
              people={peopleSearchResults}
              mCollection={movieCollectionsResults}
              query={this.props.match.params.query}
              type="people"
            />
          </div>
          <div className={styles.Results}>
            <h1>Search > People Results</h1>
            <div>
              {peopleSearch !== null && peopleSearch.results.length > 0 ? (
                peopleSearch.results.map(person => {
                  return (
                    <PeopleSearchCard
                      img={person.profile_path}
                      name={person.name}
                      key={person.id}
                      personId={person.id}
                    />
                  );
                })
              ) : (
                <h2>There is no match for {this.props.match.params.query} </h2>
              )}
            </div>
            {peopleSearch && peopleSearch.total_pages > 1 ? (
              <Pagination
                currentPage={this.state.pageNumber}
                totalPages={peopleSearchTotalPages}
                nextPage={this.nextPageHandler}
                prevPage={this.prevPageHandler}
              />
            ) : null}
          </div>
        </div>
      );
    }
    return content;
  }
}

const mapStateToProps = state => {
  return {
    loading: state.spinner.loading,
    movieSearch: state.search.movieSearch,
    movieCollections: state.search.movieCollections,
    serieSearch: state.search.serieSearch,
    peopleSearch: state.search.peopleSearch
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getRandomFooter: () => dispatch(actionCreator.fetchRandomBackground()),
    getMovieSearch: (query, pageNumber) =>
      dispatch(actionCreator.fetchMovieSearch(query, pageNumber)),
    getMovieSearchCollections: (query, pageNumber) =>
      dispatch(actionCreator.fetchMovieCollections(query, pageNumber)),
    getSerieSearch: (query, pageNumber) =>
      dispatch(actionCreator.fetchSerieSearch(query, pageNumber)),
    getPeopleSearch: (query, pageNumber) =>
      dispatch(actionCreator.fetchPeopleSearch(query, pageNumber))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchSeries);
