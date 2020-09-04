import axios from "axios";

const instance = axios.create({
  baseURL: "https://nc-news-ab.herokuapp.com/api/",
});

export const getAllTopics = () => {
  return instance.get("topics").then(({ data: { topics } }) => topics);
};

export const getAllArticles = (topic, sort_by) => {
  return instance
    .get("articles", { params: { topic, sort_by } })
    .then(({ data: { articles } }) => articles);
};

export const getFullArticle = (article_id) => {
  return instance
    .get(`articles/${article_id}`)
    .then(({ data: { article } }) => article);
};

export const getAllArticleComments = (article_id) => {
  return instance
    .get(`articles/${article_id}/comments`)
    .then(({ data: { comments } }) => comments);
};

export const getUser = (username) => {
  return instance.get(`users/${username}`).then(({ data: { user } }) => user);
};

export const patchVotes = (modify, id, inc_votes) => {
  return instance.patch(`${modify}s/${id}`, { inc_votes });
};

export const postComment = (username, article_id, body) => {
  return instance
    .post(`articles/${article_id}/comments`, { username, body })
    .then(({ data: { comment } }) => comment);
};

export const deleteComment = (comment_id) => {
  return instance.delete(`comments/${comment_id}`);
};
