import { configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  persistReducer,
  persistStore,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./slices/authSlice";
import cropReducer from "./slices/cropSlice";
import bidReducer from "./slices/bidSlice";
import fixedReducer from "./slices/fixedSlice";
import requirementsReducer from "./slices/buyerRequirementSlice"
import profileReducer from "./slices/profileSlice";
 
const cropPersistConfig = {
  key: "crop",
  storage,
};
const requirementsPersistConfig = {
  key: "requirements",
  storage,
};
const authPersistConfig = {
  key: "auth",
  storage,
};
const profilePersistConfig={
  key:"profile",
  storage,
}

export const Store = configureStore({
  reducer: {
    auth:persistReducer(authPersistConfig, authReducer),
    crop: persistReducer(cropPersistConfig, cropReducer),
    bid: bidReducer,
    fixed:fixedReducer,
    requirements:persistReducer(requirementsPersistConfig, requirementsReducer),
    profile:persistReducer(profilePersistConfig,profileReducer),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
   middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

export const persistor = persistStore(Store);
