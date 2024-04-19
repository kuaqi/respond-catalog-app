import AsyncStorage from "@react-native-async-storage/async-storage"
import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist"
import { favouritesReducer, FavouritesState } from "./slice/FavouritesSlice"

// For use with useSelectors from react-redux
export type RootState = {
  favourites: FavouritesState,
}

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['favourites'],
  blacklist: [],
}

const rootReducer = combineReducers({
  favourites: favouritesReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const middlewares = {
  immutableCheck: false,
  serializableCheck: {
    ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
  },
}

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware(middlewares)
})

export const persistor = persistStore(store)
