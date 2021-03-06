import React, { Component } from "react";
import * as api from "../api";
import { formatDate } from "../utils";
import AllArticleComments from "./AllArticleComments";
import Loader from "./Loader";
import CommentForm from "./CommentForm";
import ErrorDisplay from "./ErrorDisplay";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretUp, faCaretDown } from "@fortawesome/free-solid-svg-icons";

class SingleFullArticle extends Component {
  state = {
    article: {},
    comments: [],
    author: {},
    optimisticVotes: 0,
    isLoading: true,
    err: null,
  };

  componentDidMount() {
    const { article_id, changeNavButtonSelected } = this.props;

    const promises = [
      api.getFullArticle(article_id),
      api.getAllArticleComments(article_id),
    ];
    Promise.all(promises)
      .then(([article, comments]) => {
        const { author, topic } = article;
        changeNavButtonSelected(topic);
        return Promise.all([article, comments, api.getUser(author)]);
      })
      .then(([article, comments, author]) =>
        this.setState({ article, comments, author, isLoading: false })
      )
      .catch(({ response }) => {
        const { status } = response;
        const {
          data: { msg },
        } = response;
        this.setState({ isLoading: false, err: { msg, status } }, () =>
          console.log(this.state)
        );
      });
  }

  addComment = (newComment) => {
    this.setState((currentState) => {
      const { comments, article } = currentState;
      article.comment_count = `${+article.comment_count + 1}`;
      return { ...currentState, comments: [newComment, ...comments], article };
    });
  };

  removeComment = (comment_id) => {
    const comments = this.state.comments.filter(
      (comment) => comment.comment_id !== comment_id
    );
    this.setState((currentState) => {
      const { article } = currentState;
      article.comment_count = `${+article.comment_count - 1}`;
      return { ...currentState, comments, article };
    });
    api.deleteComment(comment_id);
  };

  toggleLoader = () => {
    this.setState((currentState) => {
      return { ...currentState, isLoading: !currentState.isLoading };
    });
  };

  render() {
    const { isLoading, err } = this.state;
    if (isLoading) return <Loader />;
    if (err) return <ErrorDisplay err={err} />;

    const {
      article_id,
      title,
      body,
      votes,
      topic,
      author,
      comment_count,
      created_at,
    } = this.state.article;
    const { avatar_url } = this.state.author;
    const date = formatDate(created_at);

    const modifyVotes = (votes) => {
      if (this.props.loggedIn) {
        api.patchVotes("article", article_id, votes);
        this.setState(
          ({ article, comments, author, optimisticVotes, isLoading }) => {
            article.votes += votes;
            return {
              article,
              comments,
              author,
              optimisticVotes: optimisticVotes + votes,
              isLoading,
            };
          }
        );
      } else {
        this.props.setLoginPrompt(true);
      }
    };

    return (
      <>
        <div className="full-article">
          <h2>{title}</h2>
          <section className="article-meta-data">
            <p className="article-author">By: {author}</p>
            <p className="article-topic">{topic}</p>
            <p className="article-published">{date}</p>
            <img
              src={avatar_url}
              alt="the author"
              className="article-author-image"
            ></img>
            <section className="up-down-vote-buttons">
              <button
                aria-label="Up vote"
                disabled={this.state.optimisticVotes === 1}
                onClick={() => modifyVotes(1)}
              >
                <FontAwesomeIcon icon={faCaretUp} size="2x" />
              </button>
              {votes}
              <button
                aria-label="Down vote"
                disabled={this.state.optimisticVotes === -1}
                onClick={() => modifyVotes(-1)}
              >
                <FontAwesomeIcon icon={faCaretDown} size="2x" />
              </button>
            </section>
          </section>

          <p>{body}</p>
        </div>
        {this.props.loggedIn && (
          <CommentForm
            loggedIn={this.props.loggedIn}
            article_id={article_id}
            addComment={this.addComment}
            toggleLoader={this.toggleLoader}
          />
        )}

        <section className="article-comments">
          <h2 className="article-comments-heading">
            Comments ({comment_count}):
          </h2>
          <AllArticleComments
            comments={this.state.comments}
            loggedIn={this.props.loggedIn}
            removeComment={this.removeComment}
            setLoginPrompt={this.props.setLoginPrompt}
          />
        </section>
      </>
    );
  }
}

export default SingleFullArticle;
