import React from "react";

const DisplayArticleComments = ({ comments }) => {
  return (
    <div>
      {comments.map((comment) => {
        const { comment_id, author, votes, created_at, body } = comment;
        return <div key={comment_id}>{body}</div>;
      })}
    </div>
  );
};

export default DisplayArticleComments;
