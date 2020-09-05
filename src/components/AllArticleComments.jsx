import React from "react";
import CommentCard from "./CommentCard";

const AllArticleComments = ({
  comments,
  loggedIn,
  removeComment,
  setLoginPrompt,
}) => {
  return (
    <ul>
      {comments.map((comment) => {
        return (
          <CommentCard
            comment={comment}
            key={comment.comment_id}
            loggedIn={loggedIn}
            removeComment={removeComment}
            setLoginPrompt={setLoginPrompt}
          />
        );
      })}
    </ul>
  );
};

export default AllArticleComments;
