import React from "react";
import { Link } from "@reach/router";
import * as api from "../api";

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
    <Link to={`/article/${article_id}`} className="article-card">
      <div className="articleCard">
        <h2>{title}</h2>
        <h3>By {author}</h3>
        <div className="article-card-metadata">
          <h3>{api.formatDate(created_at)}</h3>
          <h3>{topic}</h3>
          <h3>{votes} votes</h3>
          <h3>{comment_count} comments</h3>
        </div>
      </div>
    </Link>
  );
};

export default ArticleCard;
