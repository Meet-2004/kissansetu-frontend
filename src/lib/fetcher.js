import { getApi, putApi } from "@/services/apiService";

export async function fetcher(url){
   const api= await getApi(url)
   return api.data;
}
export async function putSwr(url){
   const api= await putApi(url)
   // return api.data;
}
