import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage"; 
import { loginAPI } from "../features/login/loginAPI";
import { cargoApi } from "../features/cargo/cargoAPI";
import { trackingApi } from "../features/tracking/trackingAPi";
import { registerAPI } from "../features/register/registerAPI";
import { notificationApi } from "../features/notifications/notificationAPI";
import { userApi } from "../features/users/usersAPI";

// Redux Persist configuration
const persistConfig = {
    key: "root",
    storage,
};

// Combine reducers here
const rootReducer = combineReducers({
    [loginAPI.reducerPath]:loginAPI.reducer,
    [cargoApi.reducerPath]:cargoApi.reducer,
    [registerAPI.reducerPath]:registerAPI.reducer,
    [trackingApi.reducerPath]:trackingApi.reducer,
    [notificationApi.reducerPath]:notificationApi.reducer,
    [userApi.reducerPath]:userApi.reducer
   
    // [registerAPI.reducerPath]: registerAPI.reducer,
});

// Wrap the root reducer with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the Redux store
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat(loginAPI.middleware ,cargoApi.middleware ,registerAPI.middleware ,trackingApi.middleware ,notificationApi.middleware ,userApi.middleware)
});

// Create persistor for Redux Persist
export const persistor = persistStore(store);

// Define types for state and dispatch
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
