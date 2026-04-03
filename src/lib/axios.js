// import axios from "axios";

// const instance = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_API_URL,
//   headers: {
//     "Content-Type": "application/json",
//   },
//    withCredentials: true, 
// });

// export default instance;

import axios from "axios";
 export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true, // cookie auth
});
 export const apis = axios.create({
  // baseURL: process.env.NEXT_PUBLIC_API_URLS,
  withCredentials: true, // cookie auth
});

// export default api;

api.interceptors.response.use(
  (response) => response,
  async (error) => {

    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {

      originalRequest._retry = true;

      try {

        await api.post("/users/refresh", {}, {
          withCredentials: true
        });

        // retry original request
        return api(originalRequest);

      } catch (err) {
        window.location.href = "/";
        console.log("Refresh token expired");
      }
    }

    return Promise.reject(error);
  }
);