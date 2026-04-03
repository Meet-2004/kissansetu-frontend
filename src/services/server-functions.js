// "use server";

// import { cookies } from "next/headers";

// export const getTokenFromCookies = async () => {
//   console.log("hello functon");
//   try {
//     const cookieStore = await cookies();
//     console.log("cookieStore", cookieStore);
//     // console.log("cookie_data", cookie_data);
//     const token = cookieStore.get("accessToken") || "";
//     // const token = cookieStore.get("accessToken")?.value || "";
//     // const token = await cookies.get("accessToken") ||""
//     console.log("Retrieved token from cookies:", token);

//     console.log(token);
//     return token || null;
//   } catch (error) {
//     console.error("Error retrieving token from cookies:", error);
//     return null;
//   }
// };
