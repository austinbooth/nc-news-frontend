import React, { Component } from "react";
import * as api from "../api";
import DisplayArticleComments from "./DisplayArticleComments";
import Loader from "./Loader";

class DisplaySingleFullArticle extends Component {
  state = { article: [], comments: [], author: {}, isLoading: true };

  componentDidMount() {
    const { article_id } = this.props;
    const author = this.props.location.search.slice(8);

    const promises = [
      api.getFullArticle(article_id),
      api.getAllArticleComments(article_id),
      api.getUser(author),
    ];
    Promise.all(promises).then(([article, comments, author]) =>
      this.setState({ article, comments, author, isLoading: false })
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
    const { avatar_url } = this.state.author;
    const dateObj = new Date(created_at);
    console.log(avatar_url);
    return (
      <div className="full-article">
        <h2>{title}</h2>
        <section className="article-meta-data">
          <h3>By: {author}</h3>
          <h3>Topic: {topic}</h3>
          <h3>Published: {dateObj.toString()}</h3>
          <h3>Number of votes: {votes}</h3>
          <img src={avatar_url} alt="the author" className="author-image"></img>
        </section>
        <p>{body}</p>
        <section>
          <h2>Comments ({comment_count}):</h2>
          <DisplayArticleComments comments={this.state.comments} />
        </section>
      </div>
    );
  }
}

export default DisplaySingleFullArticle;
