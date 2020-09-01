import React, { Component } from "react";
import * as api from "../api";
import ArticleCard from "./ArticleCard";
import Loader from "./Loader";

class AllArticles extends Component {
  state = { articles: [], isLoading: true };
  componentDidMount() {
    const { topic } = this.props;
    const { isLoading } = this.state;
    api
      .getAllArticles(topic)
      .then((articles) => this.setState({ articles, isLoading: false }));
  }

  componentDidUpdate(prevProps) {
    const { topic } = this.props;
    const { isLoading } = this.state;

    if (topic !== prevProps.topic) {
      this.setState({ isLoading: true });
      api
        .getAllArticles(topic)
        .then((articles) => this.setState({ articles, isLoading: false }));
    }
  }

  render() {
    const { articles, isLoading } = this.state;
    if (isLoading) return <Loader />;

    return (
      <div>
        {articles.map((article) => (
          <ArticleCard article={article} key={article.article_id} />
        ))}
      </div>
    );
  }
}

export default AllArticles;
