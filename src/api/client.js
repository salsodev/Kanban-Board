import axios from "axios";

export const api = axios.create({
  baseURL:
    process.env.REACT_APP_ENV === "production"
      ? process.env.REACT_APP_PRODUCTION_BASE_API
      : process.env.REACT_APP_DEVELOPMENT_BASE_API,
  withCredentials: true,
});
