import React, { Component } from "react";
import * as api from "../api";
import ArticleCard from "./ArticleCard";
import Loader from "./Loader";
import ErrorDisplay from "./ErrorDisplay";

class AllArticles extends Component {
  state = { articles: [], isLoading: true, sortByValue: "", err: null };

  componentDidMount() {
    const { topic } = this.props;
    const { isLoading } = this.state;
    api
      .getAllArticles(topic)
      .then((articles) =>
        this.setState({ articles, isLoading: false, sortByValue: "" })
      )
      .catch(({ response }) => {
        const { status } = response;
        const {
          data: { msg },
        } = response;
        this.setState({ isLoading: false, err: { msg, status } });
      });
  }

  componentDidUpdate(prevProps, prevState) {
    const { topic } = this.props;

    if (topic !== prevProps.topic) {
      this.setState({ isLoading: true });
      api.getAllArticles(topic).then((articles) =>
        this.setState({
          articles,
          isLoading: false,
          sortByValue: "created_at",
          err: null,
        })
      );
    }

    if (this.state.sortByValue !== prevState.sortByValue) {
      this.setState({ isLoading: true });
      api.getAllArticles(topic, this.state.sortByValue).then((articles) =>
        this.setState({
          articles,
          isLoading: false,
          sortByValue: this.state.sortByValue,
        })
      );
    }
  }

  handleSortByChange = (event) => {
    const { value: sortByValue } = event.target;
    const { topic } = this.props;

    this.setState((previousState) => {
      return { ...previousState, sortByValue };
    });
  };

  render() {
    const { articles, isLoading, err } = this.state;
    if (isLoading) return <Loader />;
    if (err) return <ErrorDisplay err={err} />;

    return (
      <>
        <label htmlFor="sort-articles">Sort articles by </label>
        <select
          id="sort-articles"
          name="sort-articles"
          value={this.state.sortByValue}
          onChange={this.handleSortByChange}
        >
          <option value="created_at">Date</option>
          <option value="comment_count">Comments</option>
          <option value="votes">Votes</option>
        </select>
        <div>
          {articles.map((article) => (
            <ArticleCard article={article} key={article.article_id} />
          ))}
        </div>
      </>
    );
  }
}

export default AllArticles;
