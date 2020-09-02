import React, { Component } from "react";
import { Link } from "@reach/router";
import * as api from "../api";
import { Router } from "@reach/router";
import AllArticles from "./AllArticles";
import SingleFullArticle from "./SingleFullArticle";

class Nav extends Component {
  state = { topics: [] };

  componentDidMount() {
    api.getAllTopics().then((topics) => this.setState({ topics }));
  }

  render() {
    const { topics } = this.state;
    const { active, changeNavButtonSelected } = this.props;

    return (
      <>
        <nav className="nav">
          <Link to="/">
            <button
              className={
                active === undefined ? "selected" : undefined
              }
              onClick={() => {
                changeNavButtonSelected(undefined);
                this.setState({ ...topics });
              }}
            >
              All
            </button>
          </Link>
          {topics.map((topic) => {
            return (
              <Link to={`/${topic.slug}`} key={`/${topic.slug}`}>
                <button
                  className={active === topic.slug ? "selected" : undefined}
                  onClick={() => {
                    changeNavButtonSelected(topic.slug);
                    this.setState({ ...topics });
                  }}
                >
                  {topic.slug}
                </button>
              </Link>
            );
          })}
        </nav>
      </>
    );
  }
}

export default Nav;
