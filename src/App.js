import React from "react";
import "./App.css";
import Header from "./components/Header";
import Nav from "./components/Nav";
import { Router } from "@reach/router";
import DisplayArticles from "./components/DisplayArticles";
import DisplaySingleFullArticle from "./components/DisplaySingleFullArticle";

function App() {
  return (
    <div className="App">
      <Header />
      <Nav />
      <Router className="router">
        <DisplayArticles path="/" />
        <DisplayArticles path="/:topic" />
        <DisplaySingleFullArticle path="/article/:article_id" />
      </Router>
    </div>
  );
}

export default App;
