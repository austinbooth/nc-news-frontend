import React from "react";
import { Link } from "@reach/router";

const ArticleCard = ({ article }) => {
  const {
    author,
    title,
    article_id,
    topic,
    created_at,
    votes,
    comment_count,
  } = article;
  return (
    <div className="articleCard">
      <Link to={`/article/${article_id}`}><h2>{title}</h2></Link>
      <h3>{topic}</h3>
    </div>
  );
};

export default ArticleCard;
