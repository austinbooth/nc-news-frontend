import React from "react";
import { Link } from "@reach/router";
import { formatDate } from "../utils";

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
        <div className="article-card-metadata">
          <p className="author">By {author}</p>
          <p className="date">{formatDate(created_at)}</p>
          <p className="topic">{topic}</p>
          <p className="votes">{votes} votes</p>
          <p className="comments">{comment_count} comments</p>
        </div>
      </div>
    </Link>
  );
};

export default ArticleCard;
