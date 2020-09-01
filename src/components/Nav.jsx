import React, { Component } from "react";
import { Link } from "@reach/router";
import * as api from "../api";

class Nav extends Component {
  state = { topics: [], active: undefined };
  componentDidMount() {
    api.getAllTopics().then((topics) => this.setState({ topics }));
  }
  render() {
    const { topics, active } = this.state;

    return (
      <nav className="nav">
        <Link to="/">
          <button
            className={this.state.active === undefined ? "selected" : undefined}
            onClick={() => this.setState({ ...topics, active: undefined })}
          >
            All
          </button>
        </Link>
        {topics.map((topic) => {
          return (
            <Link to={`/${topic.slug}`} key={`/${topic.slug}`}>
              <button
                className={active === topic.slug ? "selected" : undefined}
                onClick={() => this.setState({ ...topics, active: topic.slug })}
              >
                {topic.slug}
              </button>
            </Link>
          );
        })}
      </nav>
    );
  }
}

export default Nav;
