import React, { Component } from "react";

class Accpart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: null
    };
  }
  componentDidMount() {
    this.setState({
      height: this.itemerino.scrollHeight
    });
  }
  render() {
    let styles = {
      maxHeight:
        this.props.mySt === this.props.isActive
          ? `${this.state.height + 40}px`
          : "0px",
      padding: `${
        this.props.mySt === this.props.isActive ? "20px 10px" : "0px 10px"
      }`
    };
    return (
      <div
        ref={item => {
          this.itemerino = item;
        }}
        className="content"
        style={styles}
      >
        {this.props.children}
      </div>
    );
  }
}

export default Accpart;
