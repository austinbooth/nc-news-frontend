import React, { Component } from "react";
import "./styles/App.css";
import "./styles/HeaderAndNav.css";
import "./styles/Loader.css";
import "./styles/grid.css";
import "./styles/SingleFullArticle.css";
import "./styles/CommentForm.css";
import "./styles/ArticleCardAndCommentCard.css";
import "./styles/LoginPrompt.css";
import "./styles/Footer.css";
import Header from "./components/Header";
import Nav from "./components/Nav";
import { Router } from "@reach/router";
import AllArticles from "./components/AllArticles";
import SingleFullArticle from "./components/SingleFullArticle";
import ErrorDisplay from "./components/ErrorDisplay";
import LoginPrompt from "./components/LoginPrompt";
import Footer from "./components/Footer";

class App extends Component {
  state = {
    loggedIn: "jessjelly",
    active: null,
    triedToVoteNotLoggedIn: false,
  };

  changeLoggedInUser = (user) => {
    this.setState({ loggedIn: user, active: this.state.active });

    this.setState((currentState) => {
      const newState = { ...currentState, loggedIn: user };
      if (this.state.triedToVoteNotLoggedIn)
        newState.triedToVoteNotLoggedIn = false;
      return newState;
    });
  };

  changeNavButtonSelected = (active) => {
    this.setState({ active, loggedIn: this.state.loggedIn });
  };

  setLoginPrompt = (triedToVoteNotLoggedIn) => {
    this.setState((currentState) => {
      window.scrollTo(0, 0);
      return {
        ...currentState,
        triedToVoteNotLoggedIn,
      };
    });
  };

  render() {
    return (
      <div className="App">
        <Header
          loggedIn={this.state.loggedIn}
          changeLoggedInUser={this.changeLoggedInUser}
        >
          <Nav
            loggedIn={this.state.loggedIn}
            active={this.state.active}
            changeNavButtonSelected={this.changeNavButtonSelected}
          />
          {this.state.triedToVoteNotLoggedIn && <LoginPrompt />}
        </Header>
        <Router className="router">
          <AllArticles path="/" />
          <AllArticles path="/topic/:topic/articles" />
          <SingleFullArticle
            path="/article/:article_id"
            changeNavButtonSelected={this.changeNavButtonSelected}
            loggedIn={this.state.loggedIn}
            setLoginPrompt={this.setLoginPrompt}
          />
          <ErrorDisplay default err={{ status: 404, msg: "Path not found" }} />
        </Router>
        <Footer />
      </div>
    );
  }
}

export default App;
