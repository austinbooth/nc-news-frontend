import React from "react";

const CommentCard = (props) => {
  const { comment_id, author, votes, created_at, body } = props.comment;
  return <li className="article-comment">{body}</li>;
};

export default CommentCard;
