import axios, { AxiosResponse, AxiosRequestConfig } from "axios";
import { camelizeKeys, decamelizeKeys } from "humps";
import { API_HOST } from "./url";

const token = localStorage.getItem("AUTH_TOKEN");
const client = axios.create({
  baseURL: API_HOST
});

if (token) {
  client.interceptors.request.use(async (request) => {
    request.headers = {
      ...request.headers,
      authorization: `Bearer ${token}`
    };
    return request;
  });
}

client.interceptors.response.use((response: AxiosResponse) => {
  if (response.data) {
    response.data = camelizeKeys(response.data);
  }
  return response;
});

client.interceptors.request.use((config: AxiosRequestConfig) => {
  const newConfig = { ...config };
  if (config.params) {
    newConfig.params = decamelizeKeys(config.params);
  }
  if (config.data) {
    newConfig.data = decamelizeKeys(config.data);
  }
  return newConfig;
});

export default client;
