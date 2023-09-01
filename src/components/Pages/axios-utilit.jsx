import axios from "axios";

const client = axios.create({ baseURL: "http://localhost:4000" });

export const request = ({ ...options }) => {
  client.defaults.headers.common.Authorization = `Bearer token`;

  const onSuccess = (response) => response;
  const onError = (error) => {
    // optionally handle error it means if you got an error what you want to do like
    // again going to login page or stay on that ppage and gove error and say try again like that
    // basically it depends on your application what you want to do with that
    return error;
  };

  return client(options).then(onSuccess).catch(onError);
};
