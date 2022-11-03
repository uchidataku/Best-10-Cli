import axios, { AxiosResponse, AxiosRequestConfig } from "axios";
import { camelizeKeys, decamelizeKeys } from "humps";

const token = localStorage.getItem("AUTH_TOKEN");
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
