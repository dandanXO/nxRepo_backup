import queryString from "query-string";
import axios from "axios";

const parsedQueryString = queryString.parse(window.location.search);
const token = parsedQueryString.token
  ? (parsedQueryString.token as string)
  : "";

export const getUsers = () => {
  return axios.post('/api/v2/loan/quota/refresh',{
    data: undefined,
  }, {
    headers: {
      Authorization: token,
    }
  })
};

export const getLoanRecommend = () => {
  return axios.get('/api/v2/product/personal-recommend?count=',{
    headers: {
      Authorization: token,
    }
  })
};
