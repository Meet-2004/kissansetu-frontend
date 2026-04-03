import {api} from "@/lib/axios";
import {apis} from "@/lib/axios";
import { handleApi } from "@/lib/apiHndler";
// import apis from "@/lib/axios";
// import { getTokenFromCookies } from "./server-functions";

// const getHeaders = async (isMultipart = false) => {
//   try {
//     // console.log(
//     //   "Attempting to retrieve token from cookies...",
//     //   document.cookie,
//     // );
//     const token = await getTokenFromCookies();
//     console.log("Retrieved token from cookies:", token);
//     return {
//       "Content-Type": isMultipart ? "multipart/form-data" : "application/json",
//       Authorization: `Bearer ${token}`,
//     };
//   } catch (error) {
//     console.error("Error retrieving token from cookies:", error);
//     return {
//       "Content-Type": isMultipart ? "multipart/form-data" : "application/json",
//     };
//   }
// };


//  GET 
export const getApi = (url, config = {}) =>
  handleApi(() => api.get(url, config));

//  POST JSON 
export const postApi = (url, data = {}, config = {}) =>
  handleApi(() =>
    api.post(url, data, {
      headers: { "Content-Type": "application/json" },
      ...config,
    })
  );

//  POST MULTIPART 
export const postMultipartApi = (url, formData, config = {}) =>
  handleApi(() =>
    api.post(url, formData, {
      headers: { "Content-Type": "multipart/form-data" },
      ...config,
    })
  );

//  PUT 
export const putApi = (url, data , config = {}) =>
  handleApi(() => api.put(url, data, {
      headers: { "Content-Type": "multipart/form-data" },
      ...config,
    }));

//  DELETE 
export const deleteApi = (url, config = {}) =>
  handleApi(() => api.delete(url, config));