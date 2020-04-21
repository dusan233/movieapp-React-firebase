import React from "react";
import styles from "./Searchbar.module.css";
import { Link, withRouter } from "react-router-dom";

class Searchbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: ""
    };
  }

  searchQueryHandler = e => {
    this.setState({
      searchQuery: e.target.value
    });
  };

  searchSomething = e => {
    if (e.keyCode === 13 && this.state.searchQuery.length > 0) {
      this.props.history.push({
        pathname: `/search/movie/${this.state.searchQuery}`
      });
    } else {
      return;
    }
  };

  render() {
    return (
      <div className={styles.Search}>
        <div className={styles.SearchWrap}>
          <input
            className={styles.Searchbar}
            placeholder="Search for a movie, tv show, person..."
            type="text"
            value={this.state.searchQuery}
            onChange={this.searchQueryHandler}
            onKeyDown={this.searchSomething}
          />
          <Link to={{ pathname: `/search/movie/${this.state.searchQuery}` }}>
            <button className={styles.SearchButton}>
              <i className="fas fa-search" />
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

export default withRouter(Searchbar);
