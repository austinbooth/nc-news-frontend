import React, { Component } from "react";
import * as api from "../api";

class CommentForm extends Component {
  state = { comment: null };

  handleChange = (event) => {
    const { value: comment } = event.target;
    this.setState({ comment });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { comment } = this.state;
    const { loggedIn, article_id, addComment, toggleLoader } = this.props;
    toggleLoader();
    api
      .postComment(loggedIn, article_id, comment)
      .then((comment) => addComment(comment))
      .then(() => {
        this.setState({ comment: null });
        toggleLoader();
      });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h4>Comment as {this.props.loggedIn}</h4>
        <label htmlFor="body">
          Comment:
          <textarea
            onChange={this.handleChange}
            id="body"
            name="body"
            required
          ></textarea>
        </label>
        <br />
        <button type="submit">Comment</button>
      </form>
    );
  }
}

export default CommentForm;
