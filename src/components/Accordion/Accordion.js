import React, { Component } from "react";
import Accpart from "./Accpart";
import styles from "./Accordion.module.css";

class Accordion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeAccordion: this.props.children[0].props.name
    };
  }

  contentShowHandler = name => {
    let newer = name;
    let current = this.state.activeAccordion;
    if (current === newer) {
      newer = null;
    }
    this.setState({
      activeAccordion: newer
    });
  };

  render() {
    return (
      <div className="container">
        {this.props.children.map((item, i) => {
          return (
            <React.Fragment key={i}>
              <div
                className={styles.Heading}
                style={{
                  backgroundColor:
                    item.props.name === this.state.activeAccordion
                      ? `${this.props.activeBg}`
                      : `${this.props.unactiveBg}`
                }}
                onClick={() => {
                  this.contentShowHandler(item.props.name);
                }}
              >
                {item.props.head}
              </div>
              <Accpart
                mySt={item.props.name}
                isActive={this.state.activeAccordion}
              >
                {item}
              </Accpart>
            </React.Fragment>
          );
        })}
      </div>
    );
  }
}

export default Accordion;
