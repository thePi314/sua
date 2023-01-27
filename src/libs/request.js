import axios from "axios";
import { BACKEND_ADDRESS } from "../config";

const DefaultSettings = {
  BaseUrl: BACKEND_ADDRESS,
  Headers: {
    "Content-Type": "application/json"
  },
};

const parseQueryParam = (queryParams = {}) => {
  let params = {
    ...DefaultSettings.queryParams,
    ...queryParams,
  };

  let validParams = Object.keys(params).filter((key) => {
    return params[key] || params[key] == 0;
  });

  return validParams
    .map((key) => {
      return `${key}=${
        Array.isArray(params[key]) ? `${params[key].join(",")}` : params[key]
      }`;
    })
    .join("&");
};

export const httpBasic = (
  method,
  url,
  headers = {},
  queryParams = {},
  data = null
) => {
  return axios({
    method: method,
    url: `${DefaultSettings.BaseUrl}${url}?${parseQueryParam(queryParams)}`,
    headers: {
      ...DefaultSettings.Headers,
      ...headers,
      "Auth-Token": localStorage.getItem("Auth-Token")
    },
    data: data,
  });
};

export const httpGet = (url, queryParams = {}, headers = {}) => {
  return httpBasic("GET", url, headers, queryParams);
};

export const httpPut = (url, data, queryParams = {}, headers = {}) => {
  return httpBasic("PUT", url, headers, queryParams, data);
};

export const httpPost = (url, data, queryParams = {}, headers = {}) => {
  return httpBasic("POST", url, headers, queryParams, data);
};

export const httpDelete = (url, queryParams = {}, headers = {}, data = {}) => {
  return httpBasic("DELETE", url, headers, queryParams, data);
};
