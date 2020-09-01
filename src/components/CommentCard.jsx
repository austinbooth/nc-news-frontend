import React from "react";

const CommentCard = (props) => {
  const { comment_id, author, votes, created_at, body } = props.comment;
  return (
    <li key={comment_id} className="article-comment">
      {body}
    </li>
  );
};

export default CommentCard;
