import {configureStore} from "@reduxjs/toolkit";
import moviesReducer from "./reducers/movies";
import userReducer from "./reducers/user";
import tokenReducer from "./reducers/token";
import {persistStore, persistReducer} from "redux-persist";
import storage from "redux-persist/lib/storage";
import {combineReducers} from "redux";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    movies: moviesReducer,
    user: userReducer,
    token: tokenReducer,
  })
);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
