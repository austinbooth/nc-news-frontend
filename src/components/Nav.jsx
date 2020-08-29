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
          <button>Home</button>
        </Link>
        <Link to="/articles">
          <button>All articles</button>
        </Link>
        {topics.map((topic) => {
          return (
            <Link
              to={`/articles/${topic.slug}`}
              key={`/articles/${topic.slug}`}
            >
              <button>{topic.slug}</button>
            </Link>
          );
        })}
      </nav>
    );
  }
}

export default Nav;
