import React, { Component } from "react";
import { Link } from "@reach/router";
import * as api from "../api";

class Nav extends Component {
  state = { topics: [] };
  componentDidMount() {
    api.getAllTopics().then((topics) => this.setState({ topics }));
  }
  render() {
    const { topics } = this.state;

    return (
      <nav className="nav">
        <Link to="/">
          <button>All</button>
        </Link>
        {topics.map((topic) => {
          return (
            <Link to={`/${topic.slug}`} key={`/${topic.slug}`}>
              <button>{topic.slug}</button>
            </Link>
          );
        })}
      </nav>
    );
  }
}

export default Nav;
