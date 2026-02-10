import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";

export const Store = configureStore({
                    reducer:{
                        auth:authReducer,

                    },
                  });
