import React, { Component } from "react";
import { render } from "@testing-library/react";
import * as api from "../api";

class CommentCard extends Component {
  state = { ...this.props.comment, optimisticVotes: 0 };

  render() {
    const { comment_id, author, votes, created_at, body } = this.state;
    const date = api.formatDate(created_at);

    const modifyVotes = (votes) => {
      api.patchVotes("comment", comment_id, votes);
      this.setState((currentState) => {
        currentState.votes += votes;
        return {
          ...currentState,
          optimisticVotes: currentState.optimisticVotes + votes,
        };
      });
    };

    return (
      <li className="article-comment">
        {body}
        <section className="comment-meta-data">
          <h4>By {author}</h4>
          <h4>At {date}</h4>
          <h4>{votes} votes</h4>
          <section className="comment-buttons">
            <button
              disabled={this.state.optimisticVotes === 1}
              onClick={() => modifyVotes(1)}
            >
              Up vote
            </button>
            <button
              disabled={this.state.optimisticVotes === -1}
              onClick={() => modifyVotes(-1)}
            >
              Down vote
            </button>
            {this.state.author === this.props.loggedIn && (
              <button
                className="delete-btn"
                onClick={() => this.props.removeComment(comment_id)}
              >
                Delete comment
              </button>
            )}
          </section>
        </section>
      </li>
    );
  }
}

export default CommentCard;
