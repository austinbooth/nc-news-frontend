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
  const dateObj = new Date(created_at);
  const monthLookup = {
    0: "January",
    1: "February",
    2: "March",
    3: "April",
    4: "May",
    5: "June",
    6: "July",
    7: "August",
    8: "September",
    9: "October",
    10: "November",
    11: "December",
  };
  return (
    <Link
      to={`/article/${article_id}?author=${author}`}
      className="article-card"
    >
      <div className="articleCard">
        <h2>{title}</h2>
        <div className="article-card-metadata">
          <h3>{`${dateObj.getDate()} 
              ${monthLookup[dateObj.getMonth()]} 
              ${dateObj.getFullYear()}
              `}</h3>
          <h3>{topic}</h3>
          <h3>{votes} votes</h3>
          <h3>{comment_count} comments</h3>
        </div>
      </div>
    </Link>
  );
};

export default ArticleCard;
