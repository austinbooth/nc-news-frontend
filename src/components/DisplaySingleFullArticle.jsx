import React, { Component } from "react";
import * as api from "../api";
import DisplayArticleComments from "./DisplayArticleComments";
import Loader from "./Loader";

class DisplaySingleFullArticle extends Component {
  state = { article: [], comments: [], author: {}, isLoading: true };

  componentDidMount() {
    const { article_id } = this.props;

    const promises = [
      api.getFullArticle(article_id),
      api.getAllArticleComments(article_id),
    ];
    Promise.all(promises)
      .then(([article, comments]) => {
        const { author } = article;
        return Promise.all([article, comments, api.getUser(author)]);
      })
      .then(([article, comments, author]) =>
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
    const date = api.formatDate(created_at);

    return (
      <div className="full-article">
        <h2>{title}</h2>
        <section className="article-meta-data">
          <h3 className="article-author">By: {author}</h3>
          <h3 className="article-topic">Topic: {topic}</h3>
          <h3 className="article-published">Published: {date}</h3>
          <h3 className="article-votes">Votes: {votes}</h3>
          <img
            src={avatar_url}
            alt="the author"
            className="article-author-image"
          ></img>
        </section>
        <p>{body}</p>
        <section>
          <h2 className="article-comments-heading">
            Comments ({comment_count}):
          </h2>
          <DisplayArticleComments comments={this.state.comments} />
        </section>
      </div>
    );
  }
}

export default DisplaySingleFullArticle;
