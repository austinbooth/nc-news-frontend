import React from "react";
import CommentCard from "./CommentCard";

const AllArticleComments = ({ comments }) => {
  return (
    <ul>
      {comments.map((comment) => {
        return <CommentCard comment={comment} />;
      })}
    </ul>
  );
};

export default AllArticleComments;
