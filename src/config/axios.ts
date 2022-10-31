import axios, { AxiosResponse, AxiosRequestConfig } from "axios";
import { camelizeKeys, decamelizeKeys } from "humps";

const token =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NjcxMjI4MzAsImV4cCI6MTY2NzcyNzYzMCwianRpIjoiNDgzNDcxZDUtMjdmMy00MzEwLThkYzktMDliZDkyNmFhYTNiIiwic3ViIjoiYTE5MDlkNjQtNmU4ZS00ZDQ4LTkzMzUtZTM2MzRlYzg5OGUzIn0.gagzFn9lW0P-uCT2LEZihlM8yIuU8OvUdl4hXsi2aEk";

const client = axios.create({
  baseURL: "http://localhost:3000",
  headers: { Authorization: `Bearer ${token}` },
});

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
