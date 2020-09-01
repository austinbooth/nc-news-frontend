import React, { Component } from "react";
import { Link } from "@reach/router";
import * as api from "../api";
import { Router } from "@reach/router";
import AllArticles from "./AllArticles";
import SingleFullArticle from "./SingleFullArticle";

class Nav extends Component {
  state = { topics: [], active: undefined };
  componentDidMount() {
    api.getAllTopics().then((topics) => this.setState({ topics }));
  }

  changeNavButtonSelected = (active) => {
    const { topics } = this.state;
    this.setState({ active });
  };

  render() {
    const { topics, active } = this.state;

    return (
      <>
        <nav className="nav">
          <Link to="/">
            <button
              className={
                this.state.active === undefined ? "selected" : undefined
              }
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
                  onClick={() =>
                    this.setState({ ...topics, active: topic.slug })
                  }
                >
                  {topic.slug}
                </button>
              </Link>
            );
          })}
        </nav>
        <Router className="router">
          <AllArticles path="/" />
          <AllArticles path="/:topic" />
          <SingleFullArticle
            path="/article/:article_id"
            changeNavButtonSelected={this.changeNavButtonSelected}
          />
        </Router>
      </>
    );
  }
}

export default Nav;
