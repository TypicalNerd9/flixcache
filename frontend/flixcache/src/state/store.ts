import { configureStore } from "@reduxjs/toolkit";
import trendingReducer from '../features/trending/trendingSlice'
import searchReducer from '../features/search/searchSlice'
import detailsModalReducer from '../features/modal/detailsModalSlice'
import { flixcacheApi } from "../services/flixcache";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
    reducer: {
        [flixcacheApi.reducerPath]: flixcacheApi.reducer,
        trending: trendingReducer,
        search: searchReducer,
        detailsModal: detailsModalReducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(flixcacheApi.middleware)
});

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;