import React, { Component } from "react";
import * as api from "../api";
import DisplayArticleComments from "./DisplayArticleComments";
import Loader from "./Loader";

class DisplaySingleFullArticle extends Component {
  state = { article: [], comments: [], isLoading: true };

  componentDidMount() {
    const { article_id } = this.props;

    const promises = [
      api.getFullArticle(article_id),
      api.getAllArticleComments(article_id),
    ];
    Promise.all(promises).then(([article, comments]) =>
      this.setState({ article, comments, isLoading: false })
    );
  }

  render() {
    const { isLoading } = this.state;
    if (isLoading) return <Loader />;

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
