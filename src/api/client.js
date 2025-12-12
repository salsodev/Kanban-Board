import axios from "axios";

export const api = axios.create({
  baseURL:
    process.env.REACT_APP_ENV === "production"
      ? process.env.REACT_APP_PRODUCTION_BASE_API
      : process.env.REACT_APP_DEVELOPMENT_BASE_API,
  withCredentials: true,
});

// api.interceptors.response.use(
//   (resp) => resp,
//   (error) => {
//     if (error.response?.status === 401) {
//       window.location.href = "/login"; // client-side redirect
//     }
//     return Promise.reject(error);
//   }
// );
