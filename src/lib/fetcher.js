import { getApi, putMultipartApi } from "@/services/apiService";

export async function fetcher(url){
   const api= await getApi(url)
   // console.log("this is api data",api.data.data);
   return api?.data?.data;
}
export async function putSwr(url){
   const api= await putMultipartApi(url)
   // return api.data;
}
