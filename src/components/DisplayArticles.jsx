import React, { Component } from "react";
import * as api from "../api";
import ArticleCard from "./ArticleCard";

class DisplayArticles extends Component {
  state = { articles: [], isLoading: true };
  componentDidMount() {
    const { topic } = this.props;
    const { isLoading } = this.state;
    api
      .getAllArticles(topic)
      .then((articles) => this.setState({ articles, isLoading: false }));
  }

  componentDidUpdate(prevProps, prevState) {
    const { topic } = this.props;
    const { isLoading } = this.state;

    if (topic !== prevProps.topic)
      api
        .getAllArticles(topic)
        .then((articles) => this.setState({ articles, isLoading: false }));
  }

  render() {
    const { articles, isLoading } = this.state;
    if (isLoading) return <div>Loading articles...</div>;

    return (
      <div>
        {articles.map((article) => (
          <ArticleCard article={article} key={article.article_id} />
        ))}
      </div>
    );
  }
}

export default DisplayArticles;
