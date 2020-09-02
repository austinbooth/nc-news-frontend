import React from "react";
import CommentCard from "./CommentCard";

const AllArticleComments = ({ comments, loggedIn, removeComment }) => {
  return (
    <ul>
      {comments.map((comment) => {
        return (
          <CommentCard
            comment={comment}
            key={comment.comment_id}
            loggedIn={loggedIn}
            removeComment={removeComment}
          />
        );
      })}
    </ul>
  );
};

export default AllArticleComments;
