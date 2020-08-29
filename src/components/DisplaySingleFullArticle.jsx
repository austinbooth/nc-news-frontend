import React, { Component } from "react";
import * as api from "../api";
import DisplayArticleComments from "./DisplayArticleComments";

class DisplaySingleFullArticle extends Component {
  state = { article: [], comments: [] };

  componentDidMount() {
    const { article_id } = this.props;
    api
      .getFullArticle(article_id)
      .then((article) => this.setState({ article }));

    api
      .getAllArticleComments(article_id)
      .then((comments) => this.setState({ comments }));
  }

  render() {
    const {
      title,
      body,
      votes,
      topic,
      author,
      comment_count,
      created_at,
    } = this.state.article;
    return (
      <div>
        <h2>{title}</h2>
        <h3>By: {author}</h3>
        <h3>Number of votes: {votes}</h3>
        <p>{body}</p>
        <h2>Comments:</h2>
        <DisplayArticleComments comments={this.state.comments} />
      </div>
    );
  }
}

export default DisplaySingleFullArticle;
