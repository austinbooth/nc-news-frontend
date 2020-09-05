import React, { Component } from "react";
import * as api from "../api";
import { formatDate } from "../utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretUp, faCaretDown } from "@fortawesome/free-solid-svg-icons";

class CommentCard extends Component {
  state = {
    ...this.props.comment,
    optimisticVotes: 0,
  };

  render() {
    const { comment_id, author, votes, created_at, body } = this.state;
    const date = formatDate(created_at);

    const modifyVotes = (votes) => {
      if (this.props.loggedIn) {
        api.patchVotes("comment", comment_id, votes);
        this.setState((currentState) => {
          currentState.votes += votes;
          return {
            ...currentState,
            optimisticVotes: currentState.optimisticVotes + votes,
          };
        });
      } else {
        this.props.setLoginPrompt(true);
      }
    };

    return (
      <li className="article-comment">
        <section className="vote-buttons-and-comment-body-section">
          <section className="comment-buttons">
            <button
              className="voteButton"
              aria-label="Up vote"
              disabled={this.state.optimisticVotes === 1}
              onClick={() => modifyVotes(1)}
            >
              <FontAwesomeIcon icon={faCaretUp} size="2x" />
            </button>
            {votes}
            <button
              className="voteButton"
              aria-label="Down vote"
              disabled={this.state.optimisticVotes === -1}
              onClick={() => modifyVotes(-1)}
            >
              <FontAwesomeIcon icon={faCaretDown} size="2x" />
            </button>
          </section>
          <section className="comment-meta-data">
            <p>By {author}</p>
            <p>{date}</p>
            {this.state.author === this.props.loggedIn && (
              <button
                className="delete-btn"
                onClick={() => this.props.removeComment(comment_id)}
              >
                Delete comment
              </button>
            )}
          </section>
          <p className="comment-body">{body}</p>
        </section>
      </li>
    );
  }
}

export default CommentCard;
