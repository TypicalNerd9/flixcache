import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = 'http://localhost:8080'

export const flixcacheApi = createApi({
    reducerPath: 'flixcacheApi',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL, timeout: 1000 }),
    tagTypes: ['Users'],
    endpoints: (builder) => ({
        getTrending: builder.query<any, { type: string, timeframe: string}>({
            query: ({type, timeframe}) => ({
                url: `/flix/trending?type=${type}&timeframe=${timeframe}`,
                credentials: "include"
            })
        }),
        getConfig: builder.query<any, undefined>({
            query: () => ({
                url: '/flix/config',
                credentials: "include"
            })
        }),
        getSearch: builder.query<any, { type: string, query: string, page: number}>({
            query: ({type, query, page}) => ({
                url: `/flix/search?type=${type}&query=${query}&page=${page}`,
                credentials: "include"
            })
        }),
        getDetails: builder.query<any, { type: string, mediaId: string}>({
            query: ({type, mediaId}) => ({
                url: `/flix/details?type=${type}&id=${mediaId}`,
                credentials: "include"
            })
        }),
        createUser: builder.mutation<boolean, { username: string, email: string, password: string}>({
            query: ({username, email, password}) => ({
                url: `/user/register`,
                method: 'POST',
                body: {username, email, password}
            }),
        }),
        loginUser: builder.mutation<string, { username: string, password: string}>({
            query: ({username, password}) => ({
                url: `/user/login`,
                method: 'POST',
                body: {username, password},
                responseHandler: (response) => response.text(),
                credentials: "include"
            }),
        }),
        logoutUser: builder.mutation<string, undefined>({
            query: () => ({
                url: `/user/logout`,
                method: 'POST',
                credentials: "include"
            }),
        }),
    }),
})

export const { useGetTrendingQuery, useGetConfigQuery, useGetSearchQuery, useGetDetailsQuery, useCreateUserMutation, useLoginUserMutation, useLogoutUserMutation} = flixcacheApi;