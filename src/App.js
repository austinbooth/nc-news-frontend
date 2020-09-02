import React, { Component } from "react";
import "./App.css";
import Header from "./components/Header";
import Nav from "./components/Nav";
import { render } from "@testing-library/react";
import { Router } from "@reach/router";
import AllArticles from "./components/AllArticles";
import SingleFullArticle from "./components/SingleFullArticle";

class App extends Component {
  state = { loggedIn: "jessjelly", active: undefined };

  changeLoggedInUser = (user) => {
    this.setState({ loggedIn: user, active: this.state.active });
  };

  changeNavButtonSelected = (active) => {
    this.setState({ active, loggedIn: this.state.loggedIn });
  };

  render() {
    return (
      <div className="App">
        <Header
          loggedIn={this.state.loggedIn}
          changeLoggedInUser={this.changeLoggedInUser}
        />
        <Nav
          loggedIn={this.state.loggedIn}
          active={this.state.active}
          changeNavButtonSelected={this.changeNavButtonSelected}
        />
        <Router className="router">
          <AllArticles path="/" />
          <AllArticles path="/:topic" />
          <SingleFullArticle
            path="/article/:article_id"
            changeNavButtonSelected={this.changeNavButtonSelected}
            loggedIn={this.state.loggedIn}
          />
        </Router>
      </div>
    );
  }
}

export default App;
