import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = 'http://localhost:8080'

export const flixcacheApi = createApi({
    reducerPath: 'flixcacheApi',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL, timeout: 1000 }),
    tagTypes: [],
    endpoints: (builder) => ({
        getTrending: builder.query<any, { type: string, timeframe: string}>({
            query: ({type, timeframe}) => `/flix/trending?type=${type}&timeframe=${timeframe}`
        }),
        getConfig: builder.query<any, undefined>({
            query: () => '/flix/config'
        }),
        getSearch: builder.query<any, { type: string, query: string, page: number}>({
            query: ({type, query, page}) => `/flix/search?type=${type}&query=${query}&page=${page}`
        }),
        getDetails: builder.query<any, { type: string, mediaId: string}>({
            query: ({type, mediaId}) => `/flix/details?type=${type}&id=${mediaId}`
        }),
    }),
})

export const { useGetTrendingQuery, useGetConfigQuery, useGetSearchQuery, useGetDetailsQuery } = flixcacheApi;