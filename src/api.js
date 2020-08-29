import axios from "axios";

const instance = axios.create({
  baseURL: "https://nc-news-ab.herokuapp.com/api/",
});

export const getAllTopics = () => {
  return instance.get("topics").then(({ data: { topics } }) => topics);
};

export const getAllArticles = (topic) => {
  return instance
    .get("articles", { params: { topic } })
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
